import { useErrorStore } from "@shared/hooks/useErrorStore";
import { Alert, Button } from "react-bootstrap";

const ErrorHttpTemplate = () => {
  const { errorTitle, errorMessage, clearError } = useErrorStore();

  const handleRetry = () => {
    clearError();
    window.location.reload();
  };

  return (
    <Alert
      variant="danger"
      style={{
        maxWidth: 600,
        width: "100%",
        textAlign: "center",
      }}
    >
      <Alert.Heading style={{ fontSize: "1.8rem", fontWeight: "bold" }}>
        {errorTitle ?? "¡Ocurrió un error!"}
      </Alert.Heading>
      <p style={{ marginTop: 10, fontSize: "1rem", lineHeight: 1.5 }}>
        {errorMessage ||
          "Revisa los logs de la consola para más detalles o intenta recargar la página. Revisa que el api este ejecutándose y que el URL sea igual al .env"}
      </p>
      <hr />
      <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
        <Button onClick={handleRetry}>Recargar pantalla</Button>
      </div>
      <small style={{ display: "block", marginTop: 15, color: "#721c24" }}>
        Si el error persiste, contacta al administrador del sistema.
      </small>
    </Alert>
  );
};

export default ErrorHttpTemplate;
