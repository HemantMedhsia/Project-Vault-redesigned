import React from "react";
import { FaExclamationTriangle } from "react-icons/fa";

interface ConfirmModalProps {
  open: boolean;
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  danger?: boolean;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
  open,
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  danger = true,
  loading = false,
  onConfirm,
  onCancel,
}) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-gray-900/70 backdrop-blur-sm"
        onClick={onCancel}
      />

      {/* Modal */}
      <div className="relative z-10 w-full max-w-md rounded-3xl bg-white shadow-2xl animate-scaleIn">
        <div className="p-6 space-y-4">
          {/* Icon */}
          <div
            className={`mx-auto flex h-14 w-14 items-center justify-center rounded-full ${
              danger
                ? "bg-red-100 text-red-600"
                : "bg-indigo-100 text-indigo-600"
            }`}
          >
            <FaExclamationTriangle size={22} />
          </div>

          {/* Title */}
          <h3 className="text-center text-lg font-semibold text-zinc-800">
            {title}
          </h3>

          {/* Description */}
          <p className="text-center text-sm text-zinc-500">{description}</p>
        </div>

        {/* Actions */}
        <div className="flex gap-3 border-t border-zinc-200 px-6 py-4">
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-100 transition hover:bg-gray-700 bg-gray-900"
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            disabled={loading}
            className={`flex-1 rounded-full px-4 py-2 text-sm font-medium text-white transition ${
              danger
                ? "bg-red-600 hover:bg-red-700"
                : "bg-indigo-600 hover:bg-indigo-700"
            } disabled:opacity-60`}
          >
            {loading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>

      {/* Animation */}
      <style>{`
        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
        .animate-scaleIn {
          animation: scaleIn 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default ConfirmModal;
