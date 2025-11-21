const ErrorFallback = ({ error }: any) => {
  return (
    <div
      role="alert"
      style={{
        padding: 20,
        background: "#f8d7da",
        color: "#721c24",
        borderRadius: 5,
      }}
    >
      <p>Algo ha ido mal:</p>
      <pre>{error.message}</pre>
    </div>
  );
};

export default ErrorFallback;
