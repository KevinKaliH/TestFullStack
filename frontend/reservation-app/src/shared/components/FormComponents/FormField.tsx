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
  numericOnly?: boolean;
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
  numericOnly,
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
        onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
          if (!numericOnly) return;
          if (
            ["Backspace", "Tab", "ArrowLeft", "ArrowRight", "Delete"].includes(
              e.key
            )
          )
            return;
          if (!/^\d$/.test(e.key)) e.preventDefault();
        }}
        onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => {
          if (!numericOnly) return;
          const pasteData = e.clipboardData.getData("Text");
          if (!/^\d*$/.test(pasteData)) e.preventDefault();
        }}
      />
      <Form.Control.Feedback type="invalid">
        {fieldError?.message?.toString()}
      </Form.Control.Feedback>
    </Form.Group>
  );
};

export default FormField;
