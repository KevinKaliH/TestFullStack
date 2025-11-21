import { Button, Form, Modal } from "react-bootstrap";
import FormField from "@shared/components/FormComponents/FormField";
import type { EventTypeModel } from "@shared/models/dtos/eventType.model";
import {
  initialEventType,
  type EventTypeFormModel,
} from "@modules/eventType/models/eventTypeForm";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import EmptyField from "@shared/components/FormComponents/EmptyField";

const ConstValidationRules = {
  nameMaxLength: 30,
  descriptionLength: 150,
};

export interface ModalFormProps {
  title: string;
  show: boolean;
  modifiedId?: string;
  handleClose: () => void;
  defaultValues?: EventTypeModel;
  handleSaveChange: (data: EventTypeFormModel) => void;
}

const ModalEventTypeForm = (props: ModalFormProps) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<EventTypeFormModel>();

  useEffect(() => {
    if (props.defaultValues)
      reset({
        ...props.defaultValues,
      });
  }, [props.defaultValues]);

  const onSubmit = (data: EventTypeFormModel) => {
    reset({ ...initialEventType });
    props.handleSaveChange(data);
  };

  const onCloseEvent = () => {
    reset({ ...initialEventType });
    props.handleClose();
  };

  return (
    <Modal show={props.show} onHide={onCloseEvent}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          {props.modifiedId && (
            <EmptyField someId={props.modifiedId} label={"Id tipo de evento"} />
          )}
          <FormField
            name="name"
            label="Nombre"
            errors={errors}
            register={register}
            rules={{
              required: "Nombre es requerido",
              maxLength: {
                value: ConstValidationRules.nameMaxLength,
                message: `El nombre no puede exceder ${ConstValidationRules.nameMaxLength} caracteres`,
              },
            }}
          />
          <FormField
            name="description"
            label="Descripción"
            as="textarea"
            errors={errors}
            register={register}
            rules={{
              required: "Descripción es requerido",
              maxLength: {
                value: ConstValidationRules.descriptionLength,
                message: `La descripción no puede exceder ${ConstValidationRules.descriptionLength} caracteres`,
              },
            }}
          />
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

export default ModalEventTypeForm;
