import { create } from "zustand";

interface ErrorState {
  showError: boolean;
  errorTitle: string;
  errorMessage: string;
  setError: (msg: string, title?: string) => void;
  clearError: () => void;
}

export const useErrorStore = create<ErrorState>((set) => ({
  errorTitle: "",
  errorMessage: "",
  showError: false,
  setError: (msg: string, errorTitle?: string) =>
    set({ errorMessage: msg, showError: true, errorTitle: errorTitle }),
  clearError: () => set({ errorMessage: "", showError: false, errorTitle: "" }),
}));
