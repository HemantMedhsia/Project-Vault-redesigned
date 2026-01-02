import React from "react";

interface Props {
  images: File[];
  onImageUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onRemoveImage: (index: number) => void;
}

const ImageUpload: React.FC<Props> = ({
  images,
  onImageUpload,
  onRemoveImage,
}) => {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold tracking-wide text-emerald-400">
        Preview Images
      </p>

      <label className="group flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed bg-zinc-900 p-8 text-center transition border-emerald-500 hover:bg-zinc-800/50 hover:border-emerald-200">
        <div className="mb-3 rounded-full bg-gray-800 p-4 transition group-hover:bg-zinc-700">
          <svg
            className="h-6 w-6 text-emerald-400"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 16V12M12 16V8M17 16v-4M3 20h18"
            />
          </svg>
        </div>

        <p className="text-sm font-medium text-zinc-100">
          Upload project images
        </p>
        <p className="mt-1 text-xs text-zinc-400">
          PNG, JPG, WEBP • Multiple allowed • max 5MB each
        </p>

        <input
          type="file"
          className="hidden"
          multiple
          accept="image/*"
          onChange={onImageUpload}
        />
      </label>

      {/* Image Preview Grid */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        {images.map((file, i) => (
          <div
            key={i}
            className="group relative overflow-hidden rounded-xl border border-zinc-800 bg-gray-800 shadow"
          >
            <img
              src={URL.createObjectURL(file)}
              alt={file.name}
              className="h-32 w-full object-cover"
            />

            <button
              onClick={() => onRemoveImage(i)}
              className="absolute top-2 right-2 rounded-full bg-zinc-900/80 p-1 text-xs text-red-500 opacity-0 shadow transition group-hover:opacity-100 hover:bg-red-500 hover:text-white"
            >
              ✕
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageUpload;
