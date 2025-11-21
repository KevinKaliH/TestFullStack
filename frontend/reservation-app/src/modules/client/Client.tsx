import { Button, Col, Row } from "react-bootstrap";
import Loading from "@components/Loading";
import TableContainer from "@shared/components/TableLayout/TableContainer";
import globalApiProvider from "@shared/providers/globalApi.provider";
import useCrudPage from "@shared/hooks/useCrudPage";
import type {
  ClientDataTableResponse,
  ClientModel,
} from "@shared/models/dtos/client.model";
import { useEffect } from "react";
import columnClient from "./utils/columnClient";
import ConfirmDeleteModal from "@shared/components/ConfirmDeleteModal";
import ModalClientForm from "./components/ModalClientForm";
import { BaseCrudProvider } from "@shared/providers/baseCrud.provider";
import ConstApiUrls from "@shared/const/applicationApi.const";
import ErrorHttpTemplate from "@shared/components/ErrorHttpTemplate";
import { useErrorStore } from "@shared/hooks/useErrorStore";

const clientProvider = new BaseCrudProvider(ConstApiUrls.baseClient);

const Home = () => {
  const {
    isLoading,
    actionType,
    fetchAllData,
    handleDelete,
    showModalForm,
    selectedObjectRow,
    responseDataTable,
    handleShowFormModal,
    handleCloseFormModal,
    handleSaveFormModal,
    handleShowDeleteModal,
    showModalConfirmDelete,
    handleCloseDeleteModal,
    handleShowUpdateFormModal,
  } = useCrudPage<ClientModel, ClientDataTableResponse, any>({
    read: globalApiProvider.getAllClients,
    create: clientProvider.create,
    delete: clientProvider.delete,
    update: clientProvider.update,
  });
  const { showError } = useErrorStore();

  useEffect(() => {
    fetchAllData();
  }, []);

  if (isLoading && actionType == "READ") return <Loading />;
  if (showError) return <ErrorHttpTemplate />;

  return (
    <div>
      <h1>Clientes</h1>

      <div>
        <Row className="align-items-center mb-3 flex-column flex-md-row">
          <Col xs="auto">
            <Button variant="primary" onClick={handleShowFormModal}>
              Agregar Cliente
            </Button>
          </Col>
        </Row>

        {responseDataTable?.data && (
          <TableContainer
            columns={columnClient}
            data={responseDataTable.data}
            deleteAction={handleShowDeleteModal}
            updateAction={handleShowUpdateFormModal}
          />
        )}
      </div>

      <ModalClientForm
        modifiedId={selectedObjectRow?.id.toString()}
        defaultValues={selectedObjectRow}
        title={selectedObjectRow ? "Editar cliente" : "Nuevo cliente"}
        show={showModalForm}
        handleClose={handleCloseFormModal}
        handleSaveChange={handleSaveFormModal}
      />

      <ConfirmDeleteModal
        message={`¿Estás seguro de eliminar al cliente ${selectedObjectRow?.name}? Esta acción afectará los filtros de búsqueda en las reservaciones asociadas a este evento`}
        onConfirm={handleDelete}
        show={showModalConfirmDelete}
        onHide={handleCloseDeleteModal}
        title="Eliminar Cliente"
      />
    </div>
  );
};

export default Home;
