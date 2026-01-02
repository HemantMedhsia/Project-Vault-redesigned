// import React, { useState } from "react";
// import {
//   FaArrowLeft,
//   FaLayerGroup,
//   FaNetworkWired,
//   FaServer,
//   FaCogs,
//   FaTag,
//   FaLink,
//   FaFlag,
//   FaPlus,
//   FaTrash,
// } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import { ProjectPageHeader } from "../../Components/common/ProjectPageHeader";

// type SectionType = "ENV" | "VPN" | "SERVER" | "CUSTOM";

// interface FieldForm {
//   fieldKey: string;
//   fieldValue: string;
// }

// interface SectionForm {
//   type: SectionType;
//   title: string;
//   orderIndex: number;
//   fields: FieldForm[];
// }

// const sectionTypeMeta: Record<
//   SectionType,
//   { label: string; icon: React.ReactNode; accent: string }
// > = {
//   ENV: {
//     label: "Environment",
//     icon: <FaLayerGroup />,
//     accent: "from-emerald-500 to-emerald-700",
//   },
//   VPN: {
//     label: "VPN Access",
//     icon: <FaNetworkWired />,
//     accent: "from-indigo-500 to-indigo-700",
//   },
//   SERVER: {
//     label: "Server",
//     icon: <FaServer />,
//     accent: "from-orange-500 to-orange-700",
//   },
//   CUSTOM: {
//     label: "Custom",
//     icon: <FaCogs />,
//     accent: "from-zinc-500 to-zinc-700",
//   },
// };

// const inputBase =
//   "w-full rounded-xl bg-white border border-zinc-400 px-4 py-2.5 text-sm text-zinc-900 shadow-sm transition-all duration-200 placeholder:text-zinc-400 focus:border-zinc-900 focus:ring-2 focus:ring-zinc-900/15 focus:outline-none";

// const NewProjectPage: React.FC = () => {
//   const navigate = useNavigate();

//   const [name, setName] = useState("");
//   const [slug, setSlug] = useState("");
//   const [status, setStatus] = useState("ACTIVE");

//   const [sections, setSections] = useState<SectionForm[]>([]);
//   const [saving, setSaving] = useState(false);

//   const [images, setImages] = useState<File[]>([]);
//   const [documents, setDocuments] = useState<File[]>([]);

//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;
//     setImages((prev) => [...prev, ...Array.from(e.target.files!)]);
//   };

//   const removeImage = (index: number) => {
//     setImages((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!e.target.files) return;
//     setDocuments((prev) => [...prev, ...Array.from(e.target.files!)]);
//   };

//   const removeDocument = (index: number) => {
//     setDocuments((prev) => prev.filter((_, i) => i !== index));
//   };

//   const generateSlug = (v: string) =>
//     v
//       .toLowerCase()
//       .trim()
//       .replace(/[^a-z0-9]+/g, "-");

//   const addSection = () => {
//     setSections((prev) => [
//       ...prev,
//       {
//         type: "CUSTOM",
//         title: "",
//         orderIndex: prev.length + 1,
//         fields: [{ fieldKey: "", fieldValue: "" }],
//       },
//     ]);
//   };

//   const updateSection = <K extends keyof SectionForm>(
//     index: number,
//     key: K,
//     value: SectionForm[K]
//   ) => {
//     const copy = [...sections];
//     copy[index] = { ...copy[index], [key]: value };
//     setSections(copy);
//   };

//   const removeSection = (index: number) => {
//     setSections((prev) => prev.filter((_, i) => i !== index));
//   };

//   const addField = (sectionIndex: number) => {
//     const copy = [...sections];
//     copy[sectionIndex].fields.push({ fieldKey: "", fieldValue: "" });
//     setSections(copy);
//   };

//   const updateField = (
//     sectionIndex: number,
//     fieldIndex: number,
//     key: keyof FieldForm,
//     value: string
//   ) => {
//     const copy = [...sections];
//     copy[sectionIndex].fields[fieldIndex][key] = value;
//     setSections(copy);
//   };

//   const removeField = (sectionIndex: number, fieldIndex: number) => {
//     const copy = [...sections];
//     copy[sectionIndex].fields = copy[sectionIndex].fields.filter(
//       (_, i) => i !== fieldIndex
//     );
//     setSections(copy);
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const payload = {
//       slug: generateSlug(slug || name),
//       name,
//       status,
//       sections: sections.map((s, i) => ({
//         ...s,
//         orderIndex: i + 1,
//         fields: s.fields.filter(
//           (f) => f.fieldKey.trim() && f.fieldValue.trim()
//         ),
//       })),
//       images,
//       documents,
//     };
//     console.log("Submitting payload:", payload);
//     alert(JSON.stringify(payload, null, 2));
//     setSaving(false);
//     navigate("/projects");
//   };

//   /* =======================
//      UI
//   ======================= */

//   return (
//     <div className="min-h-screen">
//       <ProjectPageHeader
//         title="New Project"
//         smallDescription="All VPN, repository, environments & server details in one place."
//       />

//       <div className="flex justify-between text-zinc-700 tracking-wide">
//         <main className="max-w-6xl mx-auto px-8 py-10 space-y-10">
//           <Card
//             title={
//               <div className="flex items-center gap-3">
//                 <div className="h-10 w-10 rounded-xl bg-linear-to-br from-emerald-500 to-emerald-700 flex items-center justify-center text-white shadow">
//                   P
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold text-zinc-700 tracking-wide">
//                     Project Information
//                   </h3>
//                   <p className="text-sm text-zinc-500">
//                     Core identity of the project
//                   </p>
//                 </div>
//               </div>
//             }
//           >
//             <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//               <IconField label="Project Name" icon={<FaTag />}>
//                 <input
//                   className={inputBase}
//                   value={name}
//                   onChange={(e) => {
//                     setName(e.target.value);
//                     if (!slug) setSlug(generateSlug(e.target.value));
//                   }}
//                   placeholder="CMS Platform"
//                 />
//               </IconField>

//               <IconField label="Slug" icon={<FaLink />}>
//                 <input
//                   className={`${inputBase} font-mono text-xs`}
//                   value={slug}
//                   onChange={(e) => setSlug(e.target.value)}
//                   placeholder="cms-platform"
//                 />
//               </IconField>

//               <IconField label="Status" icon={<FaFlag />}>
//                 <input
//                   className={inputBase}
//                   value={status}
//                   onChange={(e) => setStatus(e.target.value)}
//                 />
//               </IconField>
//             </div>
//           </Card>

//           {/* SECTIONS */}
//           {sections.map((section, si) => (
//             <Card
//               key={si}
//               title={
//                 <div className="flex items-center gap-3">
//                   <div
//                     className={`h-9 w-9 rounded-xl bg-linear-to-br ${
//                       sectionTypeMeta[section.type].accent
//                     } text-white flex items-center justify-center`}
//                   >
//                     {sectionTypeMeta[section.type].icon}
//                   </div>
//                   <div>
//                     <h3 className="font-semibold">
//                       Section {si + 1} – {sectionTypeMeta[section.type].label}
//                     </h3>
//                     <p className="text-xs text-zinc-500">Configuration block</p>
//                   </div>
//                 </div>
//               }
//               right={
//                 <button
//                   onClick={() => removeSection(si)}
//                   className="text-red-500 hover:text-red-600"
//                 >
//                   <FaTrash />
//                 </button>
//               }
//             >
//               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//                 <IconField label="Type" icon={<FaCogs />}>
//                   <TypeDropdown
//                     value={section.type}
//                     onChange={(v) => updateSection(si, "type", v)}
//                   />
//                 </IconField>

//                 <IconField label="Title" icon={<FaTag />}>
//                   <input
//                     className={inputBase}
//                     value={section.title}
//                     onChange={(e) => updateSection(si, "title", e.target.value)}
//                     placeholder="Development Environment"
//                   />
//                 </IconField>
//               </div>

//               {/* FIELDS */}
//               <div className="mt-6 space-y-2">
//                 {section.fields.map((field, fi) => (
//                   <div
//                     key={fi}
//                     className="group flex items-center gap-3 rounded-xl border border-zinc-300 bg-zinc-50 hover:bg-white px-3 py-2 transition hover:border-zinc-300"
//                   >
//                     {/* KEY */}
//                     <input
//                       className={`${inputBase} h-9 flex-1 font-mono text-xs`}
//                       placeholder="KEY"
//                       value={field.fieldKey}
//                       onChange={(e) =>
//                         updateField(si, fi, "fieldKey", e.target.value)
//                       }
//                     />

//                     {/* VALUE */}
//                     <input
//                       className={`${inputBase} h-9 flex-2 text-sm`}
//                       placeholder="Value"
//                       value={field.fieldValue}
//                       onChange={(e) =>
//                         updateField(si, fi, "fieldValue", e.target.value)
//                       }
//                     />

//                     {/* DELETE */}
//                     <button
//                       onClick={() => removeField(si, fi)}
//                       className="opacity-0 group-hover:opacity-100 rounded-lg p-2 text-zinc-500 transition hover:bg-red-100 hover:text-red-600"
//                       title="Remove field"
//                     >
//                       <FaTrash size={14} />
//                     </button>
//                   </div>
//                 ))}
//               </div>

//               <button
//                 onClick={() => addField(si)}
//                 className="mt-4 inline-flex items-center gap-2 text-sm text-indigo-600"
//               >
//                 <FaPlus /> Add Field
//               </button>
//             </Card>
//           ))}

//           <button
//             onClick={addSection}
//             className="w-full py-4 rounded-3xl border border-dashed border-zinc-300 text-sm hover:bg-indigo-50"
//           >
//             + Add New Section
//           </button>

//           {/* ACTION */}
//           <div className="flex justify-end">
//             <button
//               onClick={handleSubmit}
//               disabled={saving}
//               className="px-8 py-3 rounded-full bg-gray-900 text-white hover:bg-zinc-800"
//             >
//               {saving ? "Saving..." : "Save Project"}
//             </button>
//           </div>
//         </main>

//         <div className="w-96 my-10 mx-auto space-y-10 h-s px-8 py-10 mr-16 border-l border-zinc-800 bg-gray-900 rounded-3xl">
//           {/* ===== IMAGE UPLOAD ===== */}
//           <div>
//             <p className="mb-2 text-sm font-semibold tracking-wide text-emerald-400">
//               Preview Images
//             </p>

//             <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-zinc-900 p-8 text-center transition border-emerald-500 hover:bg-zinc-800/50 hover:border-emerald-200">
//               <div className="mb-3 rounded-full bg-gray-800 p-4 transition group-hover:bg-zinc-700">
//                 <svg
//                   className="h-6 w-6 text-emerald-400"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="1.8"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M7 16V12M12 16V8M17 16v-4M3 20h18"
//                   />
//                 </svg>
//               </div>

//               <p className="text-sm font-medium text-zinc-100">
//                 Upload project images
//               </p>
//               <p className="mt-1 text-xs text-zinc-400">
//                 PNG, JPG, WEBP • Multiple allowed • max 5MB each
//               </p>

//               <input
//                 type="file"
//                 className="hidden"
//                 multiple
//                 accept="image/*"
//                 onChange={handleImageUpload}
//               />
//             </label>

//             {/* Image Preview Grid */}
//             <div className="mt-4 grid grid-cols-2 gap-3">
//               {images.map((file, i) => (
//                 <div
//                   key={i}
//                   className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-gray-800 shadow"
//                 >
//                   <img
//                     src={URL.createObjectURL(file)}
//                     alt={file.name}
//                     className="h-32 w-full object-cover"
//                   />

//                   <button
//                     onClick={() => removeImage(i)}
//                     className="absolute top-2 right-2 rounded-full bg-zinc-900/80 p-1 text-xs text-red-500 opacity-0 shadow transition group-hover:opacity-100 hover:bg-red-500 hover:text-white"
//                   >
//                     ✕
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* ===== DOCUMENT UPLOAD ===== */}
//           <div>
//             <p className="my-4 text-sm font-semibold tracking-wide text-emerald-400">
//               Supporting Documents
//             </p>

//             <label className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-zinc-700 bg-zinc-900 p-4 transition hover:border-emerald-500 hover:bg-zinc-900/70">
//               <div className="rounded-xl bg-zinc-800 p-3 transition group-hover:bg-zinc-700">
//                 <svg
//                   className="h-5 w-5 text-emerald-400"
//                   fill="none"
//                   stroke="currentColor"
//                   strokeWidth="1.8"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     d="M12 4v16m8-8H4"
//                   />
//                 </svg>
//               </div>

//               <div className="flex-1">
//                 <p className="text-sm font-medium text-zinc-100">
//                   Upload documents
//                 </p>
//                 <p className="text-xs text-zinc-400">
//                   PDF, DOCX, XLSX • Multiple allowed • max 10MB
//                 </p>
//               </div>

//               <input
//                 type="file"
//                 className="hidden"
//                 multiple
//                 onChange={handleDocumentUpload}
//               />
//             </label>

//             {/* Document List */}
//             <div className="mt-4 space-y-2">
//               {documents.map((file, i) => (
//                 <div
//                   key={i}
//                   className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 shadow"
//                 >
//                   <div className="flex items-center gap-3">
//                     <div className="rounded-lg bg-zinc-800 p-2">
//                       <svg
//                         className="h-4 w-4 text-emerald-400"
//                         fill="none"
//                         stroke="currentColor"
//                         strokeWidth="1.8"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
//                         />
//                       </svg>
//                     </div>

//                     <div>
//                       <p className="text-sm font-medium text-zinc-100">
//                         {file.name}
//                       </p>
//                       <p className="text-xs text-zinc-400">
//                         {(file.size / 1024).toFixed(1)} KB
//                       </p>
//                     </div>
//                   </div>

//                   <button
//                     onClick={() => removeDocument(i)}
//                     className="text-xs font-medium text-zinc-400 transition hover:text-red-500"
//                   >
//                     Remove
//                   </button>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// /* =======================
//    UI COMPONENTS
// ======================= */

// const Card: React.FC<{
//   title: React.ReactNode;
//   right?: React.ReactNode;
//   children: React.ReactNode;
// }> = ({ title, right, children }) => (
//   <section className="rounded-3xl bg-zinc-50 border border-zinc-300 p-8 space-y-6 shadow-sm">
//     <div className="flex justify-between items-start">
//       {title}
//       {right}
//     </div>
//     {children}
//   </section>
// );

// const IconField: React.FC<{
//   label: string;
//   icon: React.ReactNode;
//   children: React.ReactNode;
// }> = ({ label, icon, children }) => (
//   <div className="space-y-1">
//     <p className="text-xs font-semibold text-zinc-700 tracking-wide uppercase">
//       {label}
//     </p>
//     <div className="relative">
//       <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
//         {icon}
//       </div>
//       <div className="pl-10">{children}</div>
//     </div>
//   </div>
// );

// const TypeDropdown: React.FC<{
//   value: SectionType;
//   onChange: (v: SectionType) => void;
// }> = ({ value, onChange }) => {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="relative">
//       <button
//         type="button"
//         onClick={() => setOpen((v) => !v)}
//         className={`${inputBase} flex items-center justify-between`}
//       >
//         <span className="flex items-center gap-2">
//           {sectionTypeMeta[value].icon}
//           {sectionTypeMeta[value].label}
//         </span>
//         ▼
//       </button>

//       {open && (
//         <div className="absolute z-20 mt-2 w-full rounded-xl bg-white border border-zinc-200 shadow-xl">
//           {(Object.keys(sectionTypeMeta) as SectionType[]).map((k) => (
//             <button
//               key={k}
//               onClick={() => {
//                 onChange(k);
//                 setOpen(false);
//               }}
//               className="w-full flex items-center gap-3 px-4 py-3 hover:bg-indigo-50 text-left"
//             >
//               {sectionTypeMeta[k].icon}
//               {sectionTypeMeta[k].label}
//             </button>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default NewProjectPage;

import React, { useState } from "react";
import { ProjectPageHeader } from "../../Components/common/ProjectPageHeader";
import { type SectionForm } from "./types/types";
import ProjectInfoCard from "./components/ProjectInfoCard";
import SectionsBuilder from "./components/SectionsBuilder";
import AssetsSidebar from "./components/AssetsSidebar";
import { useConfirm } from "../../context/ConfirmContext";

const NewProjectPage: React.FC = () => {
  const confirm = useConfirm();
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  const [status, setStatus] = useState("ACTIVE");
  const [sections, setSections] = useState<SectionForm[]>([]);
  const [images, setImages] = useState<File[]>([]);
  const [documents, setDocuments] = useState<File[]>([]);

  const generateSlug = (v: string) =>
    v
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9]+/g, "-");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const ok = await confirm({
      title: "Delete this section?",
      description: "All fields inside will be lost.",
      confirmText: "Delete",
    });

    if (!ok) return;

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
    console.log("Submitting payload:", payload);
    alert(JSON.stringify(payload, null, 2));
  };

  return (
    <div className="min-h-screen">
      <ProjectPageHeader
        title="New Project"
        smallDescription="All VPN, repository, environments & server details in one place."
      />

      <div className="flex">
        <main className="max-w-6xl mx-auto px-8 py-10 space-y-10">
          <ProjectInfoCard
            name={name}
            slug={slug}
            status={status}
            setName={setName}
            setSlug={setSlug}
            setStatus={setStatus}
            generateSlug={generateSlug}
          />

          <SectionsBuilder sections={sections} setSections={setSections} />

          <div className="flex justify-end">
            <button
              onClick={handleSubmit}
              className="px-8 py-3 rounded-full bg-gray-900 text-white"
            >
              Save Project
            </button>
          </div>
        </main>

        <AssetsSidebar
          images={images}
          documents={documents}
          onImageUpload={(e) =>
            setImages((p) => [...p, ...Array.from(e.target.files || [])])
          }
          onRemoveImage={(i) =>
            setImages((p) => p.filter((_, idx) => idx !== i))
          }
          onDocumentUpload={(e) =>
            setDocuments((p) => [...p, ...Array.from(e.target.files || [])])
          }
          onRemoveDocument={(i) =>
            setDocuments((p) => p.filter((_, idx) => idx !== i))
          }
        />
      </div>
    </div>
  );
};

export default NewProjectPage;
