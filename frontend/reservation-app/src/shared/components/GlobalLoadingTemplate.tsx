import { Spinner } from "react-bootstrap";

interface Props {
  isLoading: boolean;
  message: string;
}

const GlobalLoadingTemplate = ({ isLoading, message }: Props) => {
  if (!isLoading) return <></>;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.4)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99999,
        flexDirection: "column",
      }}
    >
      <Spinner animation="border" variant="light" />
      <span style={{ color: "#fff", marginTop: "10px", fontSize: "1.2rem" }}>
        {message}
      </span>
    </div>
  );
};

export default GlobalLoadingTemplate;
