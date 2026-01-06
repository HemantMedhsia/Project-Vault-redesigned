import { type ReactNode, useCallback, useState } from "react";
import { ToastContext } from "../../../context/ToastContext";
import type { ToastItem, ToastType } from "../../../types/toast.types";
import { Toast } from "./Toast";

export const ToastProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  const showToast = useCallback(
    (
      title: string,
      message: string,
      type: ToastType = "info",
      duration = 3500
    ) => {
      const id = crypto.randomUUID();

      const toast: ToastItem = {
        id,
        title,
        message,
        type,
        duration,
      };

      setToasts((prev) => [...prev, toast]);

      setTimeout(() => removeToast(id), duration);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      <div className="fixed top-6 left-1/2 -translate-x-1/2 flex flex-col gap-3 z-50 pointer-events-none">
        {toasts.map((toast) => (
          <Toast key={toast.id} toast={toast} onClose={removeToast} />
        ))}
      </div>
    </ToastContext.Provider>
  );
};
