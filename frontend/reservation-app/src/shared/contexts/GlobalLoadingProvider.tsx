import GlobalLoadingTemplate from "@shared/components/GlobalLoadingTemplate";
import { createContext, useContext, useState } from "react";

interface LoadingContextProps {
  setGlobalLoading: (loading: boolean, message?: string) => void;
}

const LoadingContext = createContext<LoadingContextProps | undefined>(
  undefined
);

export const useGlobalLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) throw new Error("useGlobalLoading esta fuera de alcance");
  return context;
};

export const GlobalLoadingProvider = ({ children }: any) => {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("Cargando...");

  const setGlobalLoading = (loading: boolean, msg?: string) => {
    setMessage(msg || "Cargando...");
    setIsLoading(loading);
  };

  return (
    <LoadingContext.Provider value={{ setGlobalLoading }}>
      {children}
      <GlobalLoadingTemplate isLoading={isLoading} message={message} />
    </LoadingContext.Provider>
  );
};
