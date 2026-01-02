import {
  FaLayerGroup,
  FaNetworkWired,
  FaServer,
  FaCogs,
} from "react-icons/fa";
import { type SectionType } from "../types/types";

export const sectionTypeMeta: Record<
  SectionType,
  { label: string; icon: React.ReactNode; accent: string }
> = {
  ENV: {
    label: "Environment",
    icon: <FaLayerGroup />,
    accent: "from-emerald-500 to-emerald-700",
  },
  VPN: {
    label: "VPN Access",
    icon: <FaNetworkWired />,
    accent: "from-indigo-500 to-indigo-700",
  },
  SERVER: {
    label: "Server",
    icon: <FaServer />,
    accent: "from-orange-500 to-orange-700",
  },
  CUSTOM: {
    label: "Custom",
    icon: <FaCogs />,
    accent: "from-zinc-500 to-zinc-700",
  },
};

export const inputBase =
  "w-full rounded-xl bg-white border border-zinc-400 px-4 py-2.5 text-sm text-zinc-900 shadow-sm transition-all duration-200 placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/15 focus:outline-none";
