import React, { createContext, useContext, useRef, useState } from "react";
import ConfirmModal from "../pages/project/ui/ConfirmModal";

type ConfirmOptions = {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
};

type ConfirmFn = (options: ConfirmOptions) => Promise<boolean>;

const ConfirmContext = createContext<ConfirmFn | null>(null);

export const ConfirmProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const resolverRef = useRef<(value: boolean) => void>(undefined);
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState<ConfirmOptions>({});

  const confirm: ConfirmFn = (opts) => {
    setOptions(opts);
    setOpen(true);

    return new Promise<boolean>((resolve) => {
      resolverRef.current = resolve;
    });
  };

  const handleConfirm = () => {
    setOpen(false);
    resolverRef.current?.(true);
  };

  const handleCancel = () => {
    setOpen(false);
    resolverRef.current?.(false);
  };

  return (
    <ConfirmContext.Provider value={confirm}>
      {children}

      <ConfirmModal
        open={open}
        title={options.title ?? "Are you sure?"}
        description={options.description ?? "This action cannot be undone."}
        confirmText={options.confirmText ?? "Confirm"}
        cancelText={options.cancelText ?? "Cancel"}
        danger={options.danger ?? true}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </ConfirmContext.Provider>
  );
};

export const useConfirm = () => {
  const ctx = useContext(ConfirmContext);
  if (!ctx) throw new Error("useConfirm must be used inside ConfirmProvider");
  return ctx;
};
