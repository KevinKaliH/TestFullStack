import { Button, Col, Row } from "react-bootstrap";
import useEventType from "./hooks/useEventType";
import Loading from "@components/Loading";
import columnsEventType from "./utils/columnsEventType";
import TableContainer from "@shared/components/TableLayout/TableContainer";
import ModalEventTypeForm from "./components/ModalEventTypeForm/ModalEventTypeForm";
import ConfirmDeleteModal from "@shared/components/ConfirmDeleteModal";

const EventType = () => {
  const {
    isLoading,
    actionType,
    handleDelete,
    showModalForm,
    responseDataTable,
    selectedObjectRow,
    handleSaveFormModal,
    handleShowFormModal,
    handleCloseFormModal,
    handleShowDeleteModal,
    showModalConfirmDelete,
    handleCloseDeleteModal,
    handleShowUpdateFormModal,
  } = useEventType();

  return (
    <div>
      <h1>Events</h1>

      <div>
        <Row className="align-items-center mb-3 flex-column flex-md-row">
          <Col xs="auto">
            <Button variant="primary" onClick={handleShowFormModal}>
              Add Events
            </Button>
          </Col>
        </Row>

        {isLoading && actionType == "READ" && <Loading />}
        {responseDataTable && (
          <TableContainer
            columns={columnsEventType}
            data={responseDataTable.data}
            deleteAction={handleShowDeleteModal}
            updateAction={handleShowUpdateFormModal}
          />
        )}
      </div>

      <ModalEventTypeForm
        defaultValues={selectedObjectRow}
        title="Nuevo tipo de evento"
        show={showModalForm}
        handleClose={handleCloseFormModal}
        handleSaveChange={handleSaveFormModal}
      />
      <ConfirmDeleteModal
        message="¿Estás seguro de eliminar este tipo de evento? Esta acción afectará los filtros de búsqueda en las reservaciones asociadas a este evento"
        onConfirm={handleDelete}
        show={showModalConfirmDelete}
        onHide={handleCloseDeleteModal}
        title="Eliminar Tipo de Evento"
      />
    </div>
  );
};

export default EventType;
