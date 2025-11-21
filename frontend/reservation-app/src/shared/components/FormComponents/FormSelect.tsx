import { Form } from "react-bootstrap";

interface FormSelectProps {
  name: string;
  label: string;
  register: any;
  errors: any;
  rules?: any;
  options: { value: string | number; label: string }[];
  placeholder?: string;
}

const FormSelect = ({
  name,
  label,
  register,
  errors,
  rules,
  options,
  placeholder,
}: FormSelectProps) => {
  const fieldError = errors[name];

  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Select
        {...register(name, rules)}
        isInvalid={!!fieldError}
        defaultValue=""
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </Form.Select>
      <Form.Control.Feedback type="invalid">
        {fieldError?.message?.toString()}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormSelect;
