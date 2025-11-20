import { Modal, Button } from "react-bootstrap";

interface Props {
  show: boolean;
  hideModal: () => void;
  errors: string[] | string;
  title?: string;
}

const ModalErrorTemplate = ({ errors, hideModal, show, title }: Props) => {
  const errorList = Array.isArray(errors) ? errors : [errors];

  return (
    <Modal show={show} onHide={hideModal} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <ul className="mb-0">
          {errorList.map((err, idx) => (
            <li key={idx}>{err}</li>
          ))}
        </ul>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={hideModal}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalErrorTemplate;
