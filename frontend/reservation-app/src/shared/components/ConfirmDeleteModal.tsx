import { Button, Modal } from "react-bootstrap";

interface ConfirmDeleteModalProps {
  show: boolean;
  title: string;
  message: string;
  onHide: () => void;
  onConfirm: () => void;
}

const ConfirmDeleteModal = ({
  show,
  title,
  onHide,
  message,
  onConfirm,
}: ConfirmDeleteModalProps) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDeleteModal;
