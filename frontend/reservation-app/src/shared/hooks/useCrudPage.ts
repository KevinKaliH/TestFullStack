import { useMemo, useState } from "react";
import { useCommonFetch } from "@shared/hooks/useCommonFetch";
import { useErrorModal } from "@shared/contexts/ErrorModalProvider";
import { useGlobalLoading } from "@shared/contexts/GlobalLoadingProvider";
import type {
  BaseDataModel,
  BaseResponseModel,
} from "@shared/models/dtos/baseResponse.model";
import { formatFluentValidatorError } from "@shared/utils/formatFluentValidatorError";

interface useCrudPageProps<T> {
  create: (formData: T) => Promise<any>;
  read: () => Promise<any>;
  update: (id: number, formData: T) => Promise<any>;
  delete: (id: number) => Promise<any>;
}

const useCrudPage = <
  TModel extends BaseDataModel,
  TDataTableResponse extends BaseResponseModel<TModel[]>,
  TFormViewModel
>(
  props: useCrudPageProps<TFormViewModel>
) => {
  const [responseDataTable, setResponseData] =
    useState<TDataTableResponse | null>(null);
  const { actionType, isLoading, commonFetch } = useCommonFetch();

  const [showModalForm, setShowModalForm] = useState(false);
  const [showModalConfirmDelete, setShowModalConfirmDelete] = useState(false);
  const [selectedRowId, setSelectedRow] = useState<number | null>(null);
  const [showModalError, setShowModalError] = useState(false);
  const { showErrorGlobal } = useErrorModal();
  const { setGlobalLoading } = useGlobalLoading();

  const selectedObjectRow = useMemo(
    () =>
      selectedRowId != null
        ? responseDataTable?.data?.find((i) => i.id == selectedRowId)
        : undefined,
    [selectedRowId, responseDataTable]
  );

  const handleCloseFormModal = () => setShowModalForm(false);
  const handleShowFormModal = () => setShowModalForm(true);
  const handleCloseDeleteModal = () => setShowModalConfirmDelete(false);
  const hideModalError = () => setShowModalError(false);

  const handleShowDeleteModal = (obj: TModel) => {
    setSelectedRow(obj.id);
    setShowModalConfirmDelete(true);
  };

  const handleShowUpdateFormModal = (obj: TModel) => {
    setSelectedRow(obj.id);
    setShowModalForm(true);
  };

  const handleSaveFormModal = async (formData: TFormViewModel) => {
    const isUpdate = selectedRowId != null;

    setGlobalLoading(
      true,
      isUpdate ? "Actualizando registro" : "Insertando registro..."
    );
    const response = await commonFetch(isUpdate ? "UPDATE" : "CREATE", () =>
      isUpdate ? props.update(selectedRowId, formData) : props.create(formData)
    );
    setGlobalLoading(false);
    setShowModalForm(false);

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

  const fetchAllData = async () => {
    const response = await commonFetch("READ", () => props.read());
    if (response) setResponseData(response);
  };

  const handleDelete = async () => {
    setGlobalLoading(true, "Actualizando...");
    const response = await commonFetch("DELETE", () =>
      props.delete(selectedRowId!)
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
    fetchAllData,
    handleDelete,
    actionType,
    isLoading,
  };
};

export default useCrudPage;
