import { useState } from "react";
import { sectionTypeMeta, inputBase } from "../constants/constants";
import { type SectionType } from "../types/types";

const TypeDropdown: React.FC<{
  value: SectionType;
  onChange: (v: SectionType) => void;
}> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`${inputBase} flex items-center justify-between`}
      >
        <span className="flex items-center gap-2">
          {sectionTypeMeta[value].icon}
          {sectionTypeMeta[value].label}
        </span>
        ▼
      </button>

      {open && (
        <div className="absolute z-20 mt-2 w-full rounded-xl bg-white border border-zinc-200 shadow-xl">
          {(Object.keys(sectionTypeMeta) as SectionType[]).map((k) => (
            <button
              key={k}
              onClick={() => {
                onChange(k);
                setOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 text-left"
            >
              {sectionTypeMeta[k].icon}
              {sectionTypeMeta[k].label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default TypeDropdown;
