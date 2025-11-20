import { Button, Form, Modal } from "react-bootstrap";
import type { ModalFormProps } from "./useModalEventTypeForm";
import useModalEventTypeForm from "./useModalEventTypeForm";
import FormField from "@shared/components/FormComponents/FormField";

const ConstValidationRules = {
  nameMaxLength: 30,
  descriptionLength: 150,
};

const ModalEventTypeForm = (props: ModalFormProps) => {
  const { register, handleSubmit, onSubmit, errors } =
    useModalEventTypeForm(props);

  return (
    <Modal show={props.show} onHide={props.handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Modal.Body>
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
          <Button variant="secondary" onClick={props.handleClose}>
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
