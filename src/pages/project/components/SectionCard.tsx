import { FaTrash, FaTag, FaCogs } from "react-icons/fa";
import Card from "../ui/Card";
import IconField from "../ui/IconField";
import TypeDropdown from "../ui/TypeDropdown";
import { sectionTypeMeta, inputBase } from "../constants/constants";
import { type SectionForm } from "../types/types";
import SectionFields from "./SectionFields";

interface Props {
  index: number;
  section: SectionForm;
  sections: SectionForm[];
  setSections: React.Dispatch<React.SetStateAction<SectionForm[]>>;
}

const SectionCard: React.FC<Props> = ({
  index,
  section,
  sections,
  setSections,
}) => {
  const updateSection = (key: keyof SectionForm, value: any) => {
    const copy = [...sections];
    copy[index] = { ...copy[index], [key]: value };
    setSections(copy);
  };

  const removeSection = () => {
    setSections(sections.filter((_, i) => i !== index));
  };

  return (
    <Card
      title={
        <div className="flex items-center gap-3">
          <div
            className={`h-9 w-9 rounded-xl bg-linear-to-br ${
              sectionTypeMeta[section.type].accent
            } text-white flex items-center justify-center`}
          >
            {sectionTypeMeta[section.type].icon}
          </div>
          <div>
            <h3 className="font-semibold">
              Section {index + 1} – {sectionTypeMeta[section.type].label}
            </h3>
            <p className="text-xs text-zinc-500">Configuration block</p>
          </div>
        </div>
      }
      right={
        <button onClick={removeSection} className="text-red-500">
          <FaTrash />
        </button>
      }
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <IconField label="Type" icon={<FaCogs />}>
          <TypeDropdown
            value={section.type}
            onChange={(v) => updateSection("type", v)}
          />
        </IconField>

        <IconField label="Title" icon={<FaTag />}>
          <input
            className={inputBase}
            value={section.title}
            onChange={(e) => updateSection("title", e.target.value)}
          />
        </IconField>
      </div>

      <SectionFields
        section={section}
        sectionIndex={index}
        sections={sections}
        setSections={setSections}
      />
    </Card>
  );
};

export default SectionCard;
