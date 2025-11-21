import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button, Col, Form, Modal, Row } from "react-bootstrap";
import {
  initialReservation,
  type ReservationFormModel,
} from "../models/reservationForm.model";
import type { EventTypeModel } from "@shared/models/dtos/eventType.model";
import type { ClientModel } from "@shared/models/dtos/client.model";
import FormSelect from "@shared/components/FormComponents/FormSelect";
import type { ReservationModel } from "@shared/models/dtos/reservation.model";
import FormDateTime from "@shared/components/FormComponents/FormDateTime";
import FormField from "@shared/components/FormComponents/FormField";
import { greaterThanOrEqualsTo } from "../utils/validationDate";
import EmptyField from "@shared/components/FormComponents/EmptyField";

export interface ModalFormProps {
  title: string;
  show: boolean;
  modifiedId?: string;
  clients: ClientModel[];
  events: EventTypeModel[];
  handleClose: () => void;
  defaultValues?: ReservationModel;
  handleSaveChange: (data: ReservationFormModel) => void;
}

const ModalReservationForm = ({
  defaultValues,
  handleClose,
  handleSaveChange,
  clients,
  events,
  show,
  modifiedId,
  title,
}: ModalFormProps) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ReservationFormModel>();

  useEffect(() => {
    reset();

    if (defaultValues)
      reset({
        clientId: defaultValues.clientId ?? "",
        eventTypeId: defaultValues.eventTypeId ?? "",
        notes: defaultValues.notes ?? "",
        reservationDate: defaultValues.reservationDate ?? "",
      });
  }, [defaultValues]);

  const clientOptions = clients.map((i) => ({ value: i.id, label: i.name }));
  const eventTypeOptions = events.map((i) => ({ value: i.id, label: i.name }));

  const onSubmit = (data: ReservationFormModel) => {
    reset({ ...initialReservation });
    handleSaveChange(data);
  };

  const onCloseEvent = () => {
    reset({ ...initialReservation });
    handleClose();
  };

  return (
    <Modal show={show} onHide={onCloseEvent} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          <Row className="mb-3">
            <Col xs={12} md={6}>
              <FormDateTime
                name="reservationDate"
                label="Fecha de reservación"
                register={register}
                errors={errors}
                rules={{
                  required: "Fecha de reservación es requerido",
                  validate: greaterThanOrEqualsTo,
                }}
              />
            </Col>
            <Col>
              {modifiedId && (
                <EmptyField someId={modifiedId} label={"Código reservación"} />
              )}
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
                rules={{
                  required: "Cliente es requerido",
                }}
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
                rules={{
                  required: "Evento es requerido",
                }}
                options={eventTypeOptions}
              />
            </Col>
          </Row>
          <Row>
            <FormField
              name="notes"
              label="Nota informativa"
              as="textarea"
              errors={errors}
              register={register}
              rules={{
                maxLength: {
                  value: ConstValidationRules.MaxLengthNotes,
                  message: `La nota no puede exceder ${ConstValidationRules.MaxLengthNotes} caracteres`,
                },
              }}
            />
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onCloseEvent}>
            Cerrar
          </Button>
          <Button type="submit" variant="primary">
            Guardar
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default ModalReservationForm;

const ConstValidationRules = {
  MaxLengthNotes: 250,
};
