import { useRef, useState } from "react";
import { MapPin, Upload, X, FileText } from "lucide-react";

/**
 * LocationNotes
 * Props:
 *   data     : { location, description, attachments }
 *   onChange : fn(field, value)
 */
export default function LocationNotes({ data, onChange }) {
  const fileRef  = useRef(null);
  const [dragging, setDragging] = useState(false);

  const addFiles = (files) => {
    const newFiles = Array.from(files).filter(f =>
      !data.attachments.some(ex => ex.name === f.name && ex.size === f.size)
    );
    onChange("attachments", [...data.attachments, ...newFiles]);
  };

  const removeFile = (i) => {
    onChange("attachments", data.attachments.filter((_, idx) => idx !== i));
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    addFiles(e.dataTransfer.files);
  };

  const formatSize = (bytes) => {
    if (bytes < 1024)       return `${bytes} B`;
    if (bytes < 1048576)    return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / 1048576).toFixed(1)} MB`;
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden border">
      <div className="flex items-center gap-2.5 px-5 py-3.5 bg-gray-50 border-b border-gray-100">
        <MapPin className="w-4 h-4 text-[#5E23DC]" />
        <span className="text-sm font-semibold text-gray-900">Location & notes</span>
      </div>

      <div className="px-5 py-5 flex flex-col gap-5">

        {/* Location */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Location
          </label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={data.location}
              onChange={e => onChange("location", e.target.value)}
              placeholder="Enter address or meeting link"
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-[#5E23DC] focus:ring-2 focus:ring-[#5E23DC]/10 transition-all placeholder:text-gray-300"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Description
          </label>
          <textarea
            value={data.description}
            onChange={e => onChange("description", e.target.value)}
            placeholder="Add any relevant details about the event..."
            rows={4}
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-[#5E23DC] focus:ring-2 focus:ring-[#5E23DC]/10 transition-all placeholder:text-gray-300 resize-none"
          />
        </div>

        {/* Attachments */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Attachments
          </label>

          <div
            onDrop={handleDrop}
            onDragOver={e => { e.preventDefault(); setDragging(true); }}
            onDragLeave={() => setDragging(false)}
            onClick={() => fileRef.current?.click()}
            className={`border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center gap-2 cursor-pointer transition-all ${
              dragging
                ? "border-[#5E23DC] bg-[#5E23DC]/5"
                : "border-gray-200 hover:border-[#5E23DC]/50 hover:bg-gray-50"
            }`}
          >
            <Upload className={`w-8 h-8 transition-colors ${dragging ? "text-[#5E23DC]" : "text-gray-400"}`} />
            <p className="text-sm text-gray-500 font-medium">
              {dragging ? "Drop files here" : "Click to upload or drag and drop"}
            </p>
            <p className="text-xs text-gray-400">PDF, JPG, PNG up to 10MB</p>
            <input
              ref={fileRef}
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png"
              className="hidden"
              onChange={e => addFiles(e.target.files)}
            />
          </div>

          {/* File list */}
          {data.attachments.length > 0 && (
            <div className="mt-3 flex flex-col gap-2">
              {data.attachments.map((file, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 px-3 py-2.5 bg-[#5E23DC]/5 rounded-xl border border-[#5E23DC]/10"
                >
                  <FileText className="w-4 h-4 text-[#5E23DC] flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[#5E23DC] font-medium truncate">{file.name}</p>
                    <p className="text-xs text-[#5E23DC]/60">{formatSize(file.size)}</p>
                  </div>
                  <button
                    type="button"
                    onClick={e => { e.stopPropagation(); removeFile(i); }}
                    className="text-[#5E23DC]/50 hover:text-[#5E23DC] transition-colors cursor-pointer flex-shrink-0"
                  >
                    <X className="w-4 h-4" />
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