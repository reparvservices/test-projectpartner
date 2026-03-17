import { useRef } from "react";
import { PinIcon, LocationSmIcon, UploadIcon } from "./AddEventIcons";

/**
 * LocationNotes
 * Props:
 *   data     : { location, description, attachments }
 *   onChange : fn(field, value)
 */
export default function LocationNotes({ data, onChange }) {
  const fileRef = useRef(null);

  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    onChange("attachments", [...(data.attachments || []), ...files]);
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    onChange("attachments", [...(data.attachments || []), ...files]);
  };

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      {/* Section header */}
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-100 bg-gray-50/60">
        <PinIcon className="w-5 h-5 flex-shrink-0" />
        <span className="text-[15px] font-bold text-gray-900">Location & Notes</span>
      </div>

      <div className="px-5 py-5 flex flex-col gap-5">

        {/* Location */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <LocationSmIcon className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={data.location}
              onChange={e => onChange("location", e.target.value)}
              placeholder="Enter address or meeting link"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
          <textarea
            value={data.description}
            onChange={e => onChange("description", e.target.value)}
            placeholder="Add any relevant details about the event..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all placeholder:text-gray-400 resize-none"
          />
        </div>

        {/* Attachments */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Attachments</label>
          <div
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
            onClick={() => fileRef.current?.click()}
            className="border-2 border-dashed border-gray-200 rounded-xl p-8 flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-violet-400 hover:bg-violet-50/30 transition-all group"
          >
            <UploadIcon className="w-10 h-10 text-gray-400 group-hover:text-violet-500 transition-colors" />
            <p className="text-sm text-gray-500 group-hover:text-gray-700 transition-colors">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-gray-400">PDF, JPG, PNG up to 10MB</p>
            <input
              ref={fileRef}
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={handleFileChange}
            />
          </div>

          {/* Attached file list */}
          {data.attachments?.length > 0 && (
            <div className="mt-3 flex flex-col gap-2">
              {data.attachments.map((f, i) => (
                <div key={i} className="flex items-center justify-between px-3 py-2 bg-violet-50 rounded-lg text-sm text-violet-700">
                  <span className="truncate max-w-[80%]">{f.name}</span>
                  <button
                    type="button"
                    onClick={e => { e.stopPropagation(); onChange("attachments", data.attachments.filter((_, j) => j !== i)); }}
                    className="text-violet-400 hover:text-violet-700 cursor-pointer ml-2 flex-shrink-0"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}