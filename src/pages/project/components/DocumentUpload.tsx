import React from "react";

interface Props {
  documents: File[];
  onDocumentUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveDocument: (index: number) => void;
}

const DocumentUpload: React.FC<Props> = ({
  documents,
  onDocumentUpload,
  onRemoveDocument,
}) => {
  return (
    <div>
      <p className="my-4 text-sm font-semibold tracking-wide text-emerald-400">
        Supporting Documents
      </p>

      <label className="group flex cursor-pointer items-center gap-4 rounded-2xl border border-zinc-700 bg-zinc-900 p-4 transition hover:border-emerald-500 hover:bg-zinc-900/70">
        <div className="rounded-xl bg-zinc-800 p-3 transition group-hover:bg-zinc-700">
          <svg
            className="h-5 w-5 text-emerald-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </div>

        <div className="flex-1">
          <p className="text-sm font-medium text-zinc-100">
            Upload documents
          </p>
          <p className="text-xs text-zinc-400">
            PDF, DOCX, XLSX • Multiple allowed • max 10MB
          </p>
        </div>

        <input
          type="file"
          className="hidden"
          multiple
          onChange={onDocumentUpload}
        />
      </label>

      {/* Document List */}
      <div className="mt-4 space-y-2">
        {documents.map((file, i) => (
          <div
            key={i}
            className="flex items-center justify-between rounded-xl border border-zinc-800 bg-zinc-900 px-4 py-3 shadow"
          >
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-zinc-800 p-2">
                <svg
                  className="h-4 w-4 text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
                  />
                </svg>
              </div>

              <div>
                <p className="text-sm font-medium text-zinc-100">
                  {file.name}
                </p>
                <p className="text-xs text-zinc-400">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </div>
            </div>

            <button
              onClick={() => onRemoveDocument(i)}
              className="text-xs font-medium text-zinc-400 transition hover:text-red-500"
            >
              Remove
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DocumentUpload;
