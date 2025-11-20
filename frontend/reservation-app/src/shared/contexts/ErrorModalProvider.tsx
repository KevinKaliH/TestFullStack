import ModalDisplayError from "@shared/components/ModalErrorTemplate";
import { createContext, useContext, useState } from "react";

interface ErrorContextProps {
  showErrorGlobal: (errors: string[] | string, title?: string) => void;
}
const ErrorContext = createContext<ErrorContextProps | undefined>(undefined);

export const useErrorModal = () => {
  const context = useContext(ErrorContext);
  if (!context) throw new Error("useErrorModal fuera de alcance");
  return context;
};

const ErrorModalProvider = ({ children }: any) => {
  const [errors, setErrors] = useState<string[] | string>([]);
  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("Se encontraron errores");

  const showErrorGlobal = (errs: string[] | string, titleModal?: string) => {
    setErrors(errs);
    setTitle(titleModal || "Se encontraron errores");
    setShow(true);
  };

  return (
    <ErrorContext.Provider value={{ showErrorGlobal }}>
      {children}
      <ModalDisplayError
        show={show}
        errors={errors}
        title={title}
        hideModal={() => setShow(false)}
      />
    </ErrorContext.Provider>
  );
};

export default ErrorModalProvider;
