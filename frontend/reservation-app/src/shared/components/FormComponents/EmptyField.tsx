import { Form } from "react-bootstrap";

const EmptyField = ({ someId, label }: { someId: string; label: string }) => {
  return (
    <Form.Group className="mb-3">
      <Form.Label>{label}</Form.Label>
      <Form.Control value={someId} disabled />
    </Form.Group>
  );
};

export default EmptyField;
