import { useEffect, useMemo, useState } from "react";
import type { EventTypeFormModel } from "../models/eventTypeForm";
import type {
  EventTypeModel,
  EventTypeResponse,
} from "@shared/models/dtos/eventType.model";
import { useCommonFetch } from "@shared/hooks/useCommonFetch";
import globalApiProvider from "@shared/providers/globalApi.provider";
import eventTypeProvider from "../providers/eventType.provider";
import { useErrorModal } from "@shared/contexts/ErrorModalProvider";
import { formatFluentValidatorError } from "@shared/utils/formatFluentValidatorError";
import { useGlobalLoading } from "@shared/contexts/GlobalLoadingProvider";

const useEventType = () => {
  const [responseDataTable, setResponseData] =
    useState<EventTypeResponse | null>(null);
  const { actionType, isLoading, commonFetch } = useCommonFetch();

  const [showModalForm, setShowModalForm] = useState(false);
  const [showModalConfirmDelete, setShowModalConfirmDelete] = useState(false);
  const [selectedRowId, setSelectedRow] = useState<number | null>(null);
  const [showModalError, setShowModalError] = useState(false);
  const { showErrorGlobal } = useErrorModal();
  const { setGlobalLoading } = useGlobalLoading();

  useEffect(() => {
    read();
  }, []);

  const selectedObjectRow = useMemo(
    () =>
      selectedRowId != null
        ? responseDataTable?.data.find((i) => i.id == selectedRowId)
        : undefined,
    [selectedRowId, responseDataTable]
  );

  const read = async () => {
    const response = await commonFetch("READ", () =>
      globalApiProvider.getAllEventTypes()
    );
    if (response) setResponseData(response);
  };

  const handleCloseFormModal = () => setShowModalForm(false);
  const handleShowFormModal = () => setShowModalForm(true);
  const handleCloseDeleteModal = () => setShowModalConfirmDelete(false);
  const hideModalError = () => setShowModalError(false);

  const handleShowDeleteModal = (obj: EventTypeModel) => {
    setSelectedRow(obj.id);
    setShowModalConfirmDelete(true);
  };

  const handleShowUpdateFormModal = (obj: EventTypeModel) => {
    setSelectedRow(obj.id);
    setShowModalForm(true);
  };

  const handleSaveFormModal = async (formData: EventTypeFormModel) => {
    const isUpdate = selectedRowId != null;

    setGlobalLoading(
      true,
      isUpdate ? "Actualizando registro" : "Insertando registro..."
    );
    const response = await commonFetch(isUpdate ? "UPDATE" : "CREATE", () =>
      isUpdate
        ? eventTypeProvider.updateEvent(selectedRowId, formData)
        : eventTypeProvider.createEvent(formData)
    );
    setGlobalLoading(false);
    setShowModalForm(false);

    console.log(response);
    if (!response) return;

    if ("errors" in response) {
      showErrorGlobal(formatFluentValidatorError(response.errors as any));
      return;
    }

    if (!isUpdate) {
      setResponseData((pre) => ({
        ...pre!,
        data: [...pre!.data, response.data],
      }));
      return;
    }

    setResponseData((prev) => ({
      ...prev!,
      data: prev!.data.map((item) =>
        item.id === selectedRowId
          ? { ...selectedObjectRow!, ...formData }
          : item
      ),
    }));
  };

  const handleDelete = async () => {
    setGlobalLoading(true, "Actualizando...");
    const response = await commonFetch("DELETE", () =>
      eventTypeProvider.deleteEvent(selectedRowId!)
    );
    setGlobalLoading(false);
    setShowModalConfirmDelete(false);
    if (!response?.success) return;

    setSelectedRow(null);
    setResponseData((pre) => ({
      ...pre!,
      data: pre!.data.filter((i) => i.id != selectedRowId),
    }));
  };

  return {
    handleShowUpdateFormModal,
    handleCloseDeleteModal,
    showModalConfirmDelete,
    handleShowDeleteModal,
    handleCloseFormModal,
    handleSaveFormModal,
    handleShowFormModal,
    selectedObjectRow,
    responseDataTable,
    showModalError,
    hideModalError,
    showModalForm,
    handleDelete,
    actionType,
    isLoading,
  };
};

export default useEventType;
