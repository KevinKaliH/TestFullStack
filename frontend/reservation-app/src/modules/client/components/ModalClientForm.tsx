import { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  initialClient,
  type ClientFormModel,
} from "../models/clientForm.model";
import type { ClientModel } from "@shared/models/dtos/client.model";
import { Button, Form, Modal } from "react-bootstrap";
import FormField from "@shared/components/FormComponents/FormField";
import EmptyField from "@shared/components/FormComponents/EmptyField";

export interface ModalFormProps {
  title: string;
  show: boolean;
  handleClose: () => void;
  modifiedId?: string;
  defaultValues?: ClientModel;
  handleSaveChange: (data: ClientFormModel) => void;
}

const ModalClientForm = ({
  defaultValues,
  handleClose,
  handleSaveChange,
  show,
  title,
  modifiedId,
}: ModalFormProps) => {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ClientFormModel>();

  useEffect(() => {
    if (defaultValues)
      reset({
        ...defaultValues,
      });
    reset();
  }, [defaultValues]);

  const onSubmit = (data: ClientFormModel) => {
    reset({ ...initialClient });
    handleSaveChange(data);
  };

  const onCloseEvent = () => {
    reset({ ...initialClient });
    handleClose();
  };

  return (
    <Modal show={show} onHide={onCloseEvent}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
          {modifiedId && (
            <EmptyField someId={modifiedId} label={"Id Cliente"} />
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
            name="email"
            label="Email"
            errors={errors}
            register={register}
            rules={{
              required: "Email es requerido",
              maxLength: {
                value: ConstValidationRules.emailMaxLength,
                message: `El email no puede exceder ${ConstValidationRules.emailMaxLength} caracteres`,
              },
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Email no válido",
              },
            }}
          />
          <FormField
            name="phone"
            label="Teléfono"
            errors={errors}
            register={register}
            numericOnly
            rules={{
              required: "Teléfono es requerido",
              maxLength: {
                value: ConstValidationRules.phoneMaxLength,
                message: `El teléfono no puede exceder ${ConstValidationRules.phoneMaxLength} caracteres`,
              },
              minLength: {
                value: ConstValidationRules.phoneMinLength,
                message: `El teléfono debe tener al menos ${ConstValidationRules.phoneMinLength} caracteres`,
              },
              pattern: {
                value: /^[0-9]*$/,
                message: "El teléfono solo puede contener números",
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

export default ModalClientForm;

const ConstValidationRules = {
  nameMaxLength: 50,
  emailMaxLength: 100,
  phoneMaxLength: 15,
  phoneMinLength: 8,
};
