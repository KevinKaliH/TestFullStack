import { Form } from "react-bootstrap";

interface FormFieldProps {
  name: string;
  label: string;
  register: any;
  errors: any;
  rules?: any;
  type?: string;
  placeholder?: string;
  as?: string;
}

const FormField = ({
  name,
  label,
  register,
  errors,
  rules,
  type = "text",
  placeholder,
  as,
}: FormFieldProps) => {
  const fieldError = errors[name];

  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        type={type}
        as={as}
        placeholder={placeholder}
        {...register(name, rules)}
        isInvalid={!!fieldError}
      />
      <Form.Control.Feedback type="invalid">
        {fieldError?.message?.toString()}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormField;
