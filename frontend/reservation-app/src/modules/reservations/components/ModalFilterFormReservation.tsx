import { useForm } from "react-hook-form";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import FormField from "@shared/components/FormComponents/FormField";
import type { ReservationFilterFormModel } from "../models/reservationFilterForm.model";
import type { EventTypeModel } from "@shared/models/dtos/eventType.model";
import FormSelect from "@shared/components/FormComponents/FormSelect";
import FormDateTime from "@shared/components/FormComponents/FormDateTime";
import type { ClientModel } from "@shared/models/dtos/client.model";
import { validateDateRange } from "../utils/validationDate";

export interface ModalFormProps {
  title: string;
  show: boolean;
  clients: ClientModel[];
  events: EventTypeModel[];
  handleClose: () => void;
  handleConfirmFilter: (data: ReservationFilterFormModel | null) => void;
}

const ModalFilterFormReservation = ({
  title,
  show,
  clients,
  events,
  handleClose,
  handleConfirmFilter,
}: ModalFormProps) => {
  const {
    reset,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReservationFilterFormModel>();

  const onSubmit = (data: ReservationFilterFormModel) => {
    handleConfirmFilter(data);
  };

  const onCloseEvent = () => {
    handleClose();
  };

  const clearForm = () => {
    reset();
    handleConfirmFilter(null);
  };

  const clientOptions = clients.map((i) => ({ value: i.id, label: i.name }));
  const eventTypeOptions = events.map((i) => ({ value: i.id, label: i.name }));

  const initialDate = watch("initialDate");

  return (
    <Modal size="lg" show={show} onHide={onCloseEvent}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Row className="mb-3">
            <Col xs={12} md={6}>
              <FormField
                placeholder="Ingresar código de reservación"
                label="Código Reservación"
                name={"reservationCode"}
                register={register}
                errors={errors}
                rules={{
                  maxLength: {
                    value: ConstValidationRules.maxReservationLength,
                    message: `Código no puede exceder ${ConstValidationRules.maxReservationLength} caracteres`,
                  },
                }}
              />
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId="orderByReservationDesc">
                <Form.Check
                  type="checkbox"
                  label="Ordenar por fecha de reservación"
                  {...register("orderByReservationDesc")}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={12} md={6}>
              <FormSelect
                placeholder="Seleccionar cliente"
                label="Cliente"
                name={"clientId"}
                register={register}
                errors={errors}
                options={clientOptions}
              />
            </Col>
            <Col xs={12} md={6}>
              <FormSelect
                placeholder="Seleccionar evento"
                label="Evento"
                name={"eventTypeId"}
                register={register}
                errors={errors}
                options={eventTypeOptions}
              />
            </Col>
          </Row>
          <Row className="mb-3">
            <Col xs={12} md={12}>
              <Form.Label>Rango de fechas de reservación</Form.Label>
              <Row className="align-items-center g-2">
                <Col xs={12} md={6}>
                  <FormDateTime
                    name="initialDate"
                    label="Desde"
                    register={register}
                    errors={errors}
                  />
                </Col>

                <Col xs={12} md={6}>
                  <FormDateTime
                    name="endDate"
                    label="Hasta"
                    register={register}
                    errors={errors}
                    rules={{
                      validate: (value: Date) =>
                        validateDateRange(initialDate, value),
                    }}
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <div>
            <Button variant="info" onClick={clearForm}>
              🧹 Limpiar filtros
            </Button>
          </div>
          <div>
            <Button variant="secondary" onClick={handleClose} className="me-2">
              Cerrar
            </Button>
            <Button type="submit" variant="primary">
              ✅ Aplicar filtro
            </Button>
          </div>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalFilterFormReservation;

const ConstValidationRules = {
  maxReservationLength: 50,
};
