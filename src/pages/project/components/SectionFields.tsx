import { FaPlus, FaTrash } from "react-icons/fa";
import { type SectionForm } from "../types/types";
import { inputBase, sectionTypeMeta } from "../constants/constants";
import Card from "../ui/Card";

interface Props {
  section: SectionForm;
  sectionIndex: number;
  sections: SectionForm[];
  setSections: React.Dispatch<React.SetStateAction<SectionForm[]>>;
}

const SectionFields: React.FC<Props> = ({
  section,
  sectionIndex,
  sections,
  setSections,
}) => {
  const addField = () => {
    const copy = [...sections];
    copy[sectionIndex].fields.push({ fieldKey: "", fieldValue: "" });
    setSections(copy);
  };

  const updateField = (i: number, key: string, value: string) => {
    const copy = [...sections];
    (copy[sectionIndex].fields[i] as any)[key] = value;
    setSections(copy);
  };

  const removeField = (i: number) => {
    const copy = [...sections];
    copy[sectionIndex].fields = copy[sectionIndex].fields.filter(
      (_, idx) => idx !== i
    );
    setSections(copy);
  };

  return (
    <>
      <Card
        title={
          <div className="flex items-center gap-3">
            <div
              className={`h-9 w-9 rounded-xl bg-green-100 text-zinc-900 flex items-center justify-center`}
            >
              {sectionTypeMeta[section.type].icon}
            </div>
            <div>
              <h3 className="font-semibold">
                Section {sectionIndex + 1} Fields
              </h3>
              <p className="text-xs text-zinc-500">Add and manage fields for this section</p>
            </div>
          </div>
        }
      >
        <div className="mt-6 space-y-2">
          {section.fields.map((field, i) => (
            <div
              key={i}
              className="group flex items-center gap-3 rounded-xl bg-zinc-50 px-3 py-2"
            >
              <input
                placeholder="key"
                className={`${inputBase} h-9 flex-1 font-mono text-xs`}
                value={field.fieldKey}
                onChange={(e) => updateField(i, "fieldKey", e.target.value)}
              />
              <input
                placeholder="value"
                className={`${inputBase} h-9 flex-2`}
                value={field.fieldValue}
                onChange={(e) => updateField(i, "fieldValue", e.target.value)}
              />
              <button
                onClick={() => removeField(i)}
                className="opacity-0 group-hover:opacity-100"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addField}
          className="mt-4 inline-flex items-center gap-2 text-sm text-indigo-600"
        >
          <FaPlus /> Add Field
        </button>
      </Card>
    </>
  );
};

export default SectionFields;
