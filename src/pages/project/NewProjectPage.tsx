import React, { useState } from "react";
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
    v.toLowerCase().trim().replace(/[^a-z0-9]+/g, "-");

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
    <div className="min-h-screen bg-zinc-50">
      {/* HEADER */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b border-zinc-200">
        <div className="max-w-6xl mx-auto px-8 h-16 flex items-center justify-between">
          <div>
            <h1 className="text-lg font-semibold text-zinc-900">
              New Project
            </h1>
            <p className="text-xs text-zinc-500">
              Organize access, environments & infrastructure
            </p>
          </div>

          <button
            onClick={() => navigate("/projects")}
            className="text-xs px-4 py-2 rounded-full border border-zinc-300 hover:bg-zinc-100"
          >
            Cancel
          </button>
        </div>
      </header>

      {/* CONTENT */}
      <main className="max-w-6xl mx-auto px-8 py-10 space-y-10">
        {/* PROJECT INFO */}
        <Card title="Project Information" subtitle="Core identity of the project">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Field label="Project Name">
              <input
                className="input"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (!slug) setSlug(generateSlug(e.target.value));
                }}
                placeholder="CMS Platform"
              />
            </Field>

            <Field label="Slug">
              <input
                className="input font-mono text-xs"
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="cms-platform"
              />
            </Field>

            <Field label="Status">
              <input
                className="input"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
              />
            </Field>
          </div>
        </Card>

        {/* SECTIONS */}
        <div className="space-y-8">
          {sections.map((section, si) => (
            <Card
              key={si}
              title={`Section ${si + 1}`}
              subtitle="Define access or environment block"
              right={
                <button
                  onClick={() => removeSection(si)}
                  className="text-xs text-red-500 hover:underline"
                >
                  Remove
                </button>
              }
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Field label="Type">
                  <select
                    className="input"
                    value={section.type}
                    onChange={(e) =>
                      updateSection(si, "type", e.target.value as SectionType)
                    }
                  >
                    <option>ENV</option>
                    <option>VPN</option>
                    <option>SERVER</option>
                    <option>CUSTOM</option>
                  </select>
                </Field>

                <Field label="Title">
                  <input
                    className="input"
                    value={section.title}
                    onChange={(e) =>
                      updateSection(si, "title", e.target.value)
                    }
                    placeholder="Development Environment"
                  />
                </Field>
              </div>

              {/* Fields */}
              <div className="mt-6 space-y-3">
                {section.fields.map((field, fi) => (
                  <div
                    key={fi}
                    className="grid grid-cols-[1fr,2fr,auto] gap-3 items-center"
                  >
                    <input
                      className="input"
                      placeholder="key"
                      value={field.fieldKey}
                      onChange={(e) =>
                        updateField(si, fi, "fieldKey", e.target.value)
                      }
                    />
                    <input
                      className="input"
                      placeholder="value"
                      value={field.fieldValue}
                      onChange={(e) =>
                        updateField(si, fi, "fieldValue", e.target.value)
                      }
                    />
                    <button
                      onClick={() => removeField(si, fi)}
                      className="text-xs px-3 py-2 rounded-full border hover:bg-zinc-100"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() => addField(si)}
                className="mt-4 text-xs px-4 py-2 rounded-full border border-dashed hover:bg-zinc-50"
              >
                + Add Field
              </button>
            </Card>
          ))}
        </div>

        <button
          onClick={addSection}
          className="w-full py-4 rounded-2xl border border-dashed text-sm text-zinc-600 hover:bg-zinc-100"
        >
          + Add New Section
        </button>

        {/* ACTIONS */}
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={saving}
            className="px-8 py-3 rounded-full bg-zinc-900 text-white text-sm hover:bg-zinc-800"
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
  title: string;
  subtitle?: string;
  right?: React.ReactNode;
  children: React.ReactNode;
}> = ({ title, subtitle, right, children }) => (
  <section className="bg-white rounded-3xl border border-zinc-200 p-6 space-y-6 shadow-sm">
    <div className="flex justify-between items-start">
      <div>
        <h2 className="text-sm font-semibold text-zinc-900">{title}</h2>
        {subtitle && (
          <p className="text-xs text-zinc-500 mt-1">{subtitle}</p>
        )}
      </div>
      {right}
    </div>
    {children}
  </section>
);

const Field: React.FC<{
  label: string;
  children: React.ReactNode;
}> = ({ label, children }) => (
  <div className="space-y-1.5">
    <p className="text-[11px] font-medium text-zinc-500">{label}</p>
    {children}
  </div>
);

export default NewProjectPage;
