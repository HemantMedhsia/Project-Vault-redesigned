import { type SectionForm } from "../types/types";
import SectionCard from "./SectionCard";

interface Props {
  sections: SectionForm[];
  setSections: React.Dispatch<React.SetStateAction<SectionForm[]>>;
}

const SectionsBuilder: React.FC<Props> = ({ sections, setSections }) => {
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

  return (
    <>
      {sections.map((section, index) => (
        <SectionCard
          key={index}
          index={index}
          section={section}
          sections={sections}
          setSections={setSections}
        />
      ))}

      <button
        onClick={addSection}
        className="w-full py-4 rounded-3xl border border-dashed border-zinc-300 text-sm hover:bg-indigo-50"
      >
        + Add New Section
      </button>
    </>
  );
};

export default SectionsBuilder;
