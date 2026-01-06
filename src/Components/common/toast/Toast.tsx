import { useEffect, useRef } from "react";
import { type ToastItem } from "../../../types/toast.types";

const styleMap = {
  success: {
    bg: "bg-green-200",
    iconBg: "bg-emerald-50",
    text: "text-zinc-900",
    accent: "text-zinc-900",
    stroke: "#00c950",
    icon: "✓",
  },
  error: {
    bg: "bg-rose-200",
    iconBg: "bg-rose-50",
    text: "text-zinc-900",
    accent: "text-zinc-900",
    stroke: "#Ff2056", // muted red
    icon: "✕",
  },
  warning: {
    bg: "bg-amber-200",
    iconBg: "bg-amber-50",
    text: "text-zinc-900",
    accent: "text-zinc-900",
    stroke: "#Fe9a00", // soft amber
    icon: "!",
  },
  info: {
    bg: "bg-blue-200",
    iconBg: "bg-blue-50",
    text: "text-zinc-900",
    accent: "text-zinc-900",
    stroke: "#4299e1", // calm blue
    icon: "i",
  },
};

interface Props {
  toast: ToastItem;
  onClose: (id: string) => void;
}

export const Toast = ({ toast, onClose }: Props) => {
  const s = styleMap[toast.type];
  const duration = toast.duration ?? 3000;

  const rectRef = useRef<SVGRectElement>(null);

  useEffect(() => {
    const rect = rectRef.current;
    if (!rect) return;

    const length = rect.getTotalLength();

    // 🔥 full border visible initially
    rect.style.strokeDasharray = `${length}`;
    rect.style.strokeDashoffset = "0";
    rect.style.transition = "none";

    // force reflow
    rect.getBoundingClientRect();

    // 🔥 animate hiding the border
    rect.style.transition = `stroke-dashoffset ${duration}ms linear`;
    rect.style.strokeDashoffset = `${length}`;
  }, [duration]);

  return (
    <div className="relative w-90">
      {/* TOAST CONTENT (SOURCE OF TRUTH) */}
      <div
        className={`
          relative
          flex items-start gap-3
          rounded-2xl p-4
          shadow-lg backdrop-blur-md
          ${s.bg}
        `}
      >
        {/* SVG BORDER — perfectly synced */}
        <svg
          className="absolute inset-0 pointer-events-none"
          width="100%"
          height="100%"
        >
          <rect
            ref={rectRef}
            x="1"
            y="1"
            width="calc(100% - 2px)"
            height="calc(100% - 2px)"
            rx="16"
            ry="16"
            fill="none"
            stroke={s.stroke}
            strokeWidth="2"
          />
        </svg>

        <div
          className={`
            h-10 w-10 flex items-center justify-center
            rounded-full text-lg font-semibold
            ${s.iconBg} ${s.text}
          `}
        >
          {s.icon}
        </div>

        <div className="flex-1">
          <p className={`font-semibold ${s.text}`}>{toast.title}</p>
          {toast.message && (
            <p className={`text-sm opacity-80 ${s.text}`}>{toast.message}</p>
          )}
        </div>

        <button
          onClick={() => onClose(toast.id)}
          className={`text-sm opacity-60 hover:opacity-100 ${s.text}`}
        >
          ✕
        </button>
      </div>
    </div>
  );
};
