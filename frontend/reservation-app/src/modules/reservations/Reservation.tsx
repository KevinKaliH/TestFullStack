import TableContainer from "@shared/components/TableLayout/TableContainer";
import columnsReservation from "./utils/columnsReservation";
import useReservations from "./hooks/useReservations";
import Loading from "@shared/components/Loading";
import PaginationTemplate from "./components/PaginationTemplate";
import { Button } from "react-bootstrap";
import ModalFilterFormReservation from "./components/ModalFilterFormReservation";
import ModalReservationForm from "./components/ModalReservationForm";
import ConfirmDeleteModal from "@shared/components/ConfirmDeleteModal";
import { useErrorStore } from "@shared/hooks/useErrorStore";
import ErrorHttpTemplate from "@shared/components/ErrorHttpTemplate";

const Reservation = () => {
  const {
    responseDataTable,
    actionType,
    isLoading,
    clients,
    eventTypes,
    numberPages,
    showFilterForm,
    activePageNumber,
    handleChangePage,
    selectedObjectRow,
    handleCloseDeleteModal,
    handleDelete,
    handleShowDeleteModal,
    handleShowUpdateFormModal,
    isLoadingFormData,
    showModalConfirmDelete,
    handleConfirmFilter,
    handleShowFormModal,
    handleCloseFormModal,
    handleToggleFilterForm,
    showReservationFormModal,
    handleSaveReservationForm,
  } = useReservations();

  const { showError } = useErrorStore();

  if ((isLoading && actionType == "READ") || isLoadingFormData)
    return <Loading />;

  if (showError) return <ErrorHttpTemplate />;

  return (
    <div>
      <h1>Reservaciones</h1>

      <div>
        <div
          className="d-flex flex-wrap justify-content-between align-items-center mb-3"
          style={{ gap: "0.5rem" }}
        >
          <Button variant="primary" onClick={handleShowFormModal}>
            Agregar Reservación
          </Button>

          <Button variant="warning" onClick={handleToggleFilterForm}>
            🔍 Filters
          </Button>
        </div>

        <ModalFilterFormReservation
          clients={clients}
          events={eventTypes}
          title={"Filtrar registros por:"}
          show={showFilterForm}
          handleClose={handleToggleFilterForm}
          handleConfirmFilter={handleConfirmFilter}
        />
        <ModalReservationForm
          show={showReservationFormModal}
          modifiedId={selectedObjectRow?.reservationCode}
          title={selectedObjectRow ? "Editar reservación" : "Nueva Reservación"}
          clients={clients}
          events={eventTypes}
          defaultValues={selectedObjectRow}
          handleClose={handleCloseFormModal}
          handleSaveChange={handleSaveReservationForm}
        />

        {responseDataTable?.data && (
          <>
            <TableContainer
              columns={columnsReservation}
              data={responseDataTable?.data ?? []}
              deleteAction={handleShowDeleteModal}
              updateAction={handleShowUpdateFormModal}
            />
            <PaginationTemplate
              activePage={activePageNumber}
              pagesNumber={numberPages}
              handlePageChange={handleChangePage}
            />
          </>
        )}
      </div>
      <ConfirmDeleteModal
        message={`Al eliminar esta reservación, no se podrá deshacer desde la aplicación. Solo podrá recuperarse mediante la base de datos. ¿Deseas continuar?`}
        onConfirm={handleDelete}
        show={showModalConfirmDelete}
        onHide={handleCloseDeleteModal}
        title="Eliminar reservación"
      />
    </div>
  );
};

export default Reservation;
