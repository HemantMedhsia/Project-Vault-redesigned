import { createContext, useContext } from "react";
import type { ToastItem, ToastType } from "../types/toast.types";

interface ToastContextType {
  showToast: (
    title: string,
    message: string,
    type?: ToastType,
    duration?: number
  ) => void;
}

export const ToastContext = createContext<ToastContextType | null>(null);

export const useToast = () => {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used inside ToastProvider");
  return ctx;
};
