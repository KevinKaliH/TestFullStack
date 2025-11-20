import { Button, Col, Row } from "react-bootstrap";
import Loading from "@components/Loading";
import TableContainer from "@shared/components/TableLayout/TableContainer";
import eventTypeProvider from "@modules/eventType/providers/eventType.provider";
import globalApiProvider from "@shared/providers/globalApi.provider";
import useCrudPage from "@shared/hooks/useCrudPage";
import type {
  ClientDataTableResponse,
  ClientModel,
} from "@shared/models/dtos/client.model";
import { useEffect } from "react";
import columnClient from "./utils/columnClient";
import ConfirmDeleteModal from "@shared/components/ConfirmDeleteModal";

const Home = () => {
  const {
    isLoading,
    actionType,
    fetchAllData,
    handleDelete,
    selectedObjectRow,
    responseDataTable,
    handleShowFormModal,
    handleShowDeleteModal,
    showModalConfirmDelete,
    handleCloseDeleteModal,
    handleShowUpdateFormModal,
  } = useCrudPage<ClientModel, ClientDataTableResponse, any>({
    read: globalApiProvider.getAllEventTypes,
    create: eventTypeProvider.createEvent,
    delete: eventTypeProvider.deleteEvent,
    update: eventTypeProvider.updateEvent,
  });

  useEffect(() => {
    fetchAllData();
  }, []);

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

        {isLoading && actionType == "READ" && <Loading />}
        {responseDataTable?.data && (
          <TableContainer
            columns={columnClient}
            data={responseDataTable.data}
            deleteAction={handleShowDeleteModal}
            updateAction={handleShowUpdateFormModal}
          />
        )}
      </div>
      {/* 
      <ModalEventTypeForm
        defaultValues={selectedObjectRow}
        title="Nuevo tipo de evento"
        show={showModalForm}
        handleClose={handleCloseFormModal}
        handleSaveChange={handleSaveFormModal}
      />
       */}
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
