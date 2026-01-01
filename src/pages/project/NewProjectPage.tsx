import React, { useState } from "react";
import {
  FaArrowLeft,
  FaLayerGroup,
  FaNetworkWired,
  FaServer,
  FaCogs,
  FaTag,
  FaLink,
  FaFlag,
  FaPlus,
  FaTrash,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";

/* =======================
   TYPES
======================= */

type SectionType = "ENV" | "VPN" | "SERVER" | "CUSTOM";

interface FieldForm {
  fieldKey: string;
  fieldValue: string;
}

interface SectionForm {
  type: SectionType;
  title: string;
  orderIndex: number;
  fields: FieldForm[];
}

/* =======================
   CONSTANTS
======================= */

const sectionTypeMeta: Record<
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

const inputBase =
  "w-full rounded-xl bg-zinc-50 border border-zinc-300 px-4 py-3 text-sm text-zinc-900 shadow-sm transition-all focus:bg-white focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";

/* =======================
   PAGE
======================= */

const NewProjectPage: React.FC = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState("ACTIVE");

  const [sections, setSections] = useState<SectionForm[]>([]);
  const [saving, setSaving] = useState(false);

  /* =======================
     HELPERS
  ======================= */

  const generateSlug = (v: string) =>
    v
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-");

  const addSection = () => {
    setSections((prev) => [
      ...prev,
      {
        type: "CUSTOM",
        title: "",
        orderIndex: prev.length + 1,
        fields: [{ fieldKey: "", fieldValue: "" }],
      },
    ]);
  };

  const updateSection = <K extends keyof SectionForm>(
    index: number,
    key: K,
    value: SectionForm[K]
  ) => {
    const copy = [...sections];
    copy[index] = { ...copy[index], [key]: value };
    setSections(copy);
  };

  const removeSection = (index: number) => {
    setSections((prev) => prev.filter((_, i) => i !== index));
  };

  const addField = (sectionIndex: number) => {
    const copy = [...sections];
    copy[sectionIndex].fields.push({ fieldKey: "", fieldValue: "" });
    setSections(copy);
  };

  const updateField = (
    sectionIndex: number,
    fieldIndex: number,
    key: keyof FieldForm,
    value: string
  ) => {
    const copy = [...sections];
    copy[sectionIndex].fields[fieldIndex][key] = value;
    setSections(copy);
  };

  const removeField = (sectionIndex: number, fieldIndex: number) => {
    const copy = [...sections];
    copy[sectionIndex].fields = copy[sectionIndex].fields.filter(
      (_, i) => i !== fieldIndex
    );
    setSections(copy);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      slug: generateSlug(slug || name),
      name,
      status,
      sections: sections.map((s, i) => ({
        ...s,
        orderIndex: i + 1,
        fields: s.fields.filter(
          (f) => f.fieldKey.trim() && f.fieldValue.trim()
        ),
      })),
    };

    alert(JSON.stringify(payload, null, 2));
    setSaving(false);
    navigate("/projects");
  };

  /* =======================
     UI
  ======================= */

  return (
    <div className="min-h-screen">
      {/* HEADER */}
      <section
        className=" right-3.5 z-30 rounded-tl-[75px] bg-linear-to-br from-gray-900 to-gray-800 px-8 shadow-xl overflow-hidden"
        style={{ height: 80 }}
      >
        {" "}
        <div className="h-full flex items-center justify-between gap-6 text-white">
          {" "}
          <div>
            {" "}
            <h1 className="text-2xl ml-4 font-semibold tracking-tight">
              {" "}
              New Project{" "}
            </h1>{" "}
            <p className="mt-1 text-xs text-gray-400">
              {" "}
              All VPN, repository, environments & server details in one place.{" "}
            </p>{" "}
          </div>{" "}
          <div
            onClick={() => navigate(-1)}
            className="text-xs px-4 py-2 rounded-full border border-gray-300 hover:border-2 hover:border-green-400 cursor-pointer flex items-center justify-center"
          >
            {" "}
            <FaArrowLeft size={24} />{" "}
          </div>{" "}
        </div>{" "}
      </section>

      {/* CONTENT */}
      <main className="max-w-6xl mx-auto px-8 py-10 space-y-10">
        {/* PROJECT INFO */}
        <Card
          title={
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow">
                P
              </div>
              <div>
                <h3 className="text-lg font-semibold">Project Information</h3>
                <p className="text-sm text-zinc-500">
                  Core identity of the project
                </p>
              </div>
            </div>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <IconField label="Project Name" icon={<FaTag />}>
              <input
                className={inputBase}
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (!slug) setSlug(generateSlug(e.target.value));
                }}
                placeholder="CMS Platform"
              />
            </IconField>

            <IconField label="Slug" icon={<FaLink />}>
              <input
                className={`${inputBase} font-mono text-xs`}
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="cms-platform"
              />
            </IconField>

            <IconField label="Status" icon={<FaFlag />}>
              <input
                className={inputBase}
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </IconField>
          </div>
        </Card>

        {/* SECTIONS */}
        {sections.map((section, si) => (
          <Card
            key={si}
            title={
              <div className="flex items-center gap-3">
                <div
                  className={`h-9 w-9 rounded-xl bg-gradient-to-br ${
                    sectionTypeMeta[section.type].accent
                  } text-white flex items-center justify-center`}
                >
                  {sectionTypeMeta[section.type].icon}
                </div>
                <div>
                  <h3 className="font-semibold">
                    Section {si + 1} – {sectionTypeMeta[section.type].label}
                  </h3>
                  <p className="text-xs text-zinc-500">Configuration block</p>
                </div>
              </div>
            }
            right={
              <button
                onClick={() => removeSection(si)}
                className="text-red-500 hover:text-red-600"
              >
                <FaTrash />
              </button>
            }
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <IconField label="Type" icon={<FaCogs />}>
                <TypeDropdown
                  value={section.type}
                  onChange={(v) => updateSection(si, "type", v)}
                />
              </IconField>

              <IconField label="Title" icon={<FaTag />}>
                <input
                  className={inputBase}
                  value={section.title}
                  onChange={(e) => updateSection(si, "title", e.target.value)}
                  placeholder="Development Environment"
                />
              </IconField>
            </div>

            {/* FIELDS */}
            <div className="mt-6 space-y-4">
              {section.fields.map((field, fi) => (
                <div
                  key={fi}
                  className="grid grid-cols-[1fr,2fr,auto] gap-4 items-center bg-zinc-50 border border-zinc-200 rounded-2xl px-4 py-3"
                >
                  <input
                    className={`${inputBase} font-mono`}
                    placeholder="key"
                    value={field.fieldKey}
                    onChange={(e) =>
                      updateField(si, fi, "fieldKey", e.target.value)
                    }
                  />
                  <input
                    className={inputBase}
                    placeholder="value"
                    value={field.fieldValue}
                    onChange={(e) =>
                      updateField(si, fi, "fieldValue", e.target.value)
                    }
                  />
                  <button
                    onClick={() => removeField(si, fi)}
                    className="text-red-500"
                  >
                    <FaTrash />
                  </button>
                </div>
              ))}
            </div>

            <button
              onClick={() => addField(si)}
              className="mt-4 inline-flex items-center gap-2 text-sm text-indigo-600"
            >
              <FaPlus /> Add Field
            </button>
          </Card>
        ))}

        <button
          onClick={addSection}
          className="w-full py-4 rounded-3xl border border-dashed border-zinc-300 text-sm hover:bg-indigo-50"
        >
          + Add New Section
        </button>

        {/* ACTION */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-8 py-3 rounded-full bg-zinc-900 text-white hover:bg-zinc-800"
          >
            {saving ? "Saving..." : "Save Project"}
          </button>
        </div>
      </main>
    </div>
  );
};

/* =======================
   UI COMPONENTS
======================= */

const Card: React.FC<{
  title: React.ReactNode;
  right?: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, right, children }) => (
  <section className="rounded-3xl bg-white border border-zinc-200 p-8 space-y-6 shadow-sm">
    <div className="flex justify-between items-start">
      {title}
      {right}
    </div>
    {children}
  </section>
);

const IconField: React.FC<{
  label: string;
  icon: React.ReactNode;
  children: React.ReactNode;
}> = ({ label, icon, children }) => (
  <div className="space-y-1">
    <p className="text-xs font-semibold text-zinc-500 uppercase">{label}</p>
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
        {icon}
      </div>
      <div className="pl-10">{children}</div>
    </div>
  </div>
);

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

export default NewProjectPage;
