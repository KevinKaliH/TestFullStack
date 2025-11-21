import { Form } from "react-bootstrap";

interface FormDateTimeProps {
  name: string;
  label: string;
  register: any;
  errors: any;
  rules?: any;
}

const FormDateTime = ({
  name,
  label,
  register,
  errors,
  rules,
}: FormDateTimeProps) => {
  const fieldError = errors[name];

  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>

      <Form.Control
        type="datetime-local"
        {...register(name, rules)}
        isInvalid={!!fieldError}
      />

      <Form.Control.Feedback type="invalid">
        {fieldError?.message?.toString()}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormDateTime;
