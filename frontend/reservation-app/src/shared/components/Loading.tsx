import { Spinner } from "react-bootstrap";

const Loading = () => {
  return (
    <div
      className="d-flex flex-column justify-content-center align-items-center"
      style={{ height: "200px", textAlign: "center" }}
    >
      <Spinner animation="border" variant="primary" className="mb-2" />
      <span>Cargando datos, por favor espere...</span>
    </div>
  );
};

export default Loading;
