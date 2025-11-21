import ConstApiUrls from "@shared/const/applicationApi.const";
import { useCommonFetch } from "@shared/hooks/useCommonFetch";
import type {
  ReservationDatableTableResponse,
  ReservationDataTable,
  ReservationModel,
} from "@shared/models/dtos/reservation.model";
import { BaseCrudProvider } from "@shared/providers/baseCrud.provider";
import { useEffect, useMemo, useState } from "react";
import type { ReservationFormModel } from "../models/reservationForm.model";
import type {
  ClientDataTableResponse,
  ClientModel,
} from "@shared/models/dtos/client.model";
import globalApiProvider from "@shared/providers/globalApi.provider";
import type {
  EventTypeModel,
  EventTypeResponse,
} from "@shared/models/dtos/eventType.model";
import { toQueryString } from "@shared/utils/fetch.util";
import type { ReservationFilterFormModel } from "../models/reservationFilterForm.model";
import { useGlobalLoading } from "@shared/contexts/GlobalLoadingProvider";
import { useErrorModal } from "@shared/contexts/ErrorModalProvider";
import { formatFluentValidatorError } from "@shared/utils/formatFluentValidatorError";
import { useErrorStore } from "@shared/hooks/useErrorStore";

const reservationProvider = new BaseCrudProvider<
  ReservationFormModel,
  ReservationModel | ReservationDatableTableResponse
>(ConstApiUrls.baseReservation);

const ConstRowsPerPage = 50;

const useReservations = () => {
  const [responseDataTable, setResponseData] =
    useState<ReservationDatableTableResponse | null>(null);
  const [isLoadingFormData, setIsLoadingFormData] = useState(false);
  const [error, setError] = useState<any>(null);

  const [clients, setClients] = useState<ClientModel[]>([]);
  const [eventTypes, setEventTypes] = useState<EventTypeModel[]>([]);

  const { actionType, isLoading, commonFetch } = useCommonFetch();
  const [activePageNumber, setActivePageNumber] = useState(1);
  const [selectedRowId, setSelectedRow] = useState<number | null>(null);

  const [showReservationFormModal, setShowReservationFormModal] =
    useState(false);
  const [showFilterForm, setShowFilterForm] = useState(false);
  const [showModalConfirmDelete, setShowModalConfirmDelete] = useState(false);

  const [formFilterData, setFormFilterData] =
    useState<ReservationFilterFormModel | null>(null);

  const { showErrorGlobal } = useErrorModal();
  const { setGlobalLoading } = useGlobalLoading();
  const { setError: setErrorGlobal } = useErrorStore();

  const numberPages = useMemo(
    () => Math.ceil((responseDataTable?.totalCount ?? 0) / ConstRowsPerPage),
    [responseDataTable]
  );

  useEffect(() => {
    getAll();
  }, []);

  const selectedObjectRow = useMemo(
    () =>
      selectedRowId != null
        ? responseDataTable?.data?.find((i) => i.id == selectedRowId)
        : undefined,
    [selectedRowId, responseDataTable]
  );

  const handleShowFormModal = () => {
    setShowReservationFormModal(true);
  };
  const handleCloseFormModal = () => {
    setShowReservationFormModal(false);
    setSelectedRow(null);
  };

  const handleSaveReservationForm = async (formData: ReservationFormModel) => {
    const isUpdate = selectedRowId != null;

    setGlobalLoading(
      true,
      isUpdate ? "Actualizando registro" : "Insertando registro..."
    );

    const response = await commonFetch(isUpdate ? "UPDATE" : "CREATE", () =>
      isUpdate
        ? reservationProvider.update(selectedRowId, formData)
        : reservationProvider.create(formData)
    );
    setGlobalLoading(false);
    setShowReservationFormModal(false);
    if (!response) return;

    if ("errors" in response) {
      showErrorGlobal(formatFluentValidatorError(response.errors as any));
      return;
    }

    queryDataTable(formFilterData, ConstRowsPerPage, activePageNumber);
  };

  const handleToggleFilterForm = () => setShowFilterForm((pre) => !pre);

  const getAll = async () => {
    queryDataTable(formFilterData, ConstRowsPerPage, activePageNumber);

    setIsLoadingFormData(true);
    getRequiredFormData()
      .then((res) => {
        setClients(res.clients);
        setEventTypes(res.events);
      })
      .catch((err) => {
        setErrorGlobal("");
        setError(err);
      })
      .finally(() => {
        setIsLoadingFormData(false);
      });
  };

  const handleConfirmFilter = (data: ReservationFilterFormModel | null) => {
    queryDataTable(data, ConstRowsPerPage, activePageNumber);
    setShowFilterForm(false);
  };

  const queryDataTable = (
    formData: ReservationFilterFormModel | null,
    pageSize: number,
    pageNumber: number
  ) => {
    setFormFilterData(formData);

    const queryParams = toQueryString({
      ...(formData ? formData : {}),
      pageSize,
      pageNumber,
    });

    reservationProvider
      .getAll(queryParams)
      .then((res) => setResponseData(res as ReservationDatableTableResponse))
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangePage = (pageNumber: number) => {
    setActivePageNumber(pageNumber);
    queryDataTable(formFilterData, ConstRowsPerPage, activePageNumber);
  };

  const handleCloseDeleteModal = () => setShowModalConfirmDelete(false);

  const handleShowDeleteModal = (obj: ReservationDataTable) => {
    setSelectedRow(obj.id);
    setShowModalConfirmDelete(true);
  };
  const handleShowUpdateFormModal = (obj: ReservationDataTable) => {
    setSelectedRow(obj.id);
    setShowReservationFormModal(true);
  };

  const handleDelete = async () => {
    setGlobalLoading(true, "Actualizando...");
    const response = await commonFetch("DELETE", () =>
      reservationProvider.delete(selectedRowId!)
    );
    setGlobalLoading(false);
    setShowModalConfirmDelete(false);
    if (!response) return;

    queryDataTable(formFilterData, ConstRowsPerPage, activePageNumber);
  };

  return {
    error,
    clients,
    isLoading,
    eventTypes,
    actionType,
    numberPages,
    handleDelete,
    showFilterForm,
    activePageNumber,
    handleChangePage,
    selectedObjectRow,
    isLoadingFormData,
    responseDataTable,
    handleConfirmFilter,
    handleShowFormModal,
    handleCloseFormModal,
    handleShowDeleteModal,
    handleToggleFilterForm,
    showModalConfirmDelete,
    handleCloseDeleteModal,
    showReservationFormModal,
    handleSaveReservationForm,
    handleShowUpdateFormModal,
  };
};

export default useReservations;

async function getRequiredFormData() {
  const promises = [
    globalApiProvider.getAllClients(),
    globalApiProvider.getAllEventTypes(),
  ];

  const [clients, events] = await Promise.all(promises);
  return {
    clients: (clients as ClientDataTableResponse).data,
    events: (events as EventTypeResponse).data,
  };
}
