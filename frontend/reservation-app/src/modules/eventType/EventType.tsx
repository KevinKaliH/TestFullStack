import { Button, Col, Row } from "react-bootstrap";
import Loading from "@components/Loading";
import columnsEventType from "./utils/columnsEventType";
import TableContainer from "@shared/components/TableLayout/TableContainer";
import ModalEventTypeForm from "./components/ModalEventTypeForm";
import ConfirmDeleteModal from "@shared/components/ConfirmDeleteModal";
import useCrudPage from "@shared/hooks/useCrudPage";
import globalApiProvider from "@shared/providers/globalApi.provider";
import type {
  EventTypeModel,
  EventTypeResponse,
} from "@shared/models/dtos/eventType.model";
import type { EventTypeFormModel } from "./models/eventTypeForm";
import { useEffect } from "react";
import ConstApiUrls from "@shared/const/applicationApi.const";
import { BaseCrudProvider } from "@shared/providers/baseCrud.provider";
import { useErrorStore } from "@shared/hooks/useErrorStore";
import ErrorHttpTemplate from "@shared/components/ErrorHttpTemplate";

const eventTypeProvider = new BaseCrudProvider(ConstApiUrls.baseEvent);

const EventType = () => {
  const {
    isLoading,
    actionType,
    fetchAllData,
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
  } = useCrudPage<EventTypeModel, EventTypeResponse, EventTypeFormModel>({
    read: globalApiProvider.getAllEventTypes,
    create: eventTypeProvider.create,
    delete: eventTypeProvider.delete,
    update: eventTypeProvider.update,
  });

  useEffect(() => {
    fetchAllData();
  }, []);

  const { showError } = useErrorStore();

  if (isLoading && actionType == "READ") return <Loading />;
  if (showError) return <ErrorHttpTemplate />;

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
        {responseDataTable?.data && (
          <TableContainer
            columns={columnsEventType}
            data={responseDataTable.data}
            deleteAction={handleShowDeleteModal}
            updateAction={handleShowUpdateFormModal}
          />
        )}
      </div>

      <ModalEventTypeForm
        modifiedId={selectedObjectRow?.id.toString()}
        defaultValues={selectedObjectRow}
        title={
          selectedObjectRow ? "Editar tipo de evento" : "Nuevo tipo de evento"
        }
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
