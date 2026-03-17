import { useRef } from "react";
import { FiUploadCloud } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";

/**
 * MediaGallery
 * New design: matches original layout — upload zone + 2x4 grid with + button
 * Old logic: max 3 images, preview from File objects, remove
 */
export default function MediaGallery({ imageFiles, onAdd, onRemove }) {
  const inputRef = useRef(null);

  const handleChange = (e) => {
    onAdd("frontView", Array.from(e.target.files));
    e.target.value = "";
  };

  const previews = imageFiles?.frontView || [];

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-gray-900">Media Gallery</h3>
        <button
          type="button"
          className="text-sm text-violet-600 hover:text-violet-700 font-medium cursor-pointer transition-colors"
        >
          Manage Files
        </button>
      </div>

      {/* Upload zone */}
      <div
        onClick={() => inputRef.current?.click()}
        onDrop={e => { e.preventDefault(); onAdd("frontView", Array.from(e.dataTransfer.files)); }}
        onDragOver={e => e.preventDefault()}
        className="border-2 border-dashed border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center text-center text-sm text-gray-400 cursor-pointer hover:border-violet-400 hover:bg-violet-50/40 transition-all group mb-4"
      >
        <FiUploadCloud size={28} className="text-violet-600 mb-2 group-hover:scale-110 transition-transform" />
        <p className="font-medium text-gray-600 group-hover:text-violet-700 transition-colors">
          Click to upload or drag & drop
        </p>
        <p className="text-xs mt-1">PNG, JPG, GIF — max 3 images</p>
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleChange}
          className="hidden"
        />
      </div>

      {/* Image grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {previews.map((file, i) => (
          <div key={i} className="relative h-24 rounded-xl overflow-hidden group border border-gray-100">
            <img
              src={URL.createObjectURL(file)}
              alt={`property-${i}`}
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={() => onRemove("frontView", i)}
              className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-red-500 text-white hidden group-hover:flex items-center justify-center cursor-pointer hover:bg-red-600 transition-colors shadow-sm"
            >
              <RxCross2 size={10} />
            </button>
          </div>
        ))}

        {/* Add more button — only show if < 3 */}
        {previews.length < 3 && (
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="h-24 border border-gray-200 rounded-xl grid place-items-center text-violet-600 text-2xl font-light hover:bg-violet-50 hover:border-violet-300 transition-all cursor-pointer"
          >
            +
          </button>
        )}
      </div>
    </div>
  );
}