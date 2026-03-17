import { FiArrowLeft } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

/**
 * AddPropertyHeader
 * New design: ← back | title | Save Draft | Cancel | Publish Property
 */
export default function AddPropertyHeader({ onSaveDraft, onCancel, onPublish, canPublish }) {
  const navigate = useNavigate();

  return (
    <header className="sticky top-0 z-30 bg-white backdrop-blur border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-3">

        {/* Left: back + title */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            onClick={() => (navigate(-1))}
            className="h-9 w-9 grid place-items-center rounded-lg border border-gray-200 hover:border-violet-400 hover:text-violet-600 text-gray-600 transition-colors cursor-pointer flex-shrink-0"
          >
            <FiArrowLeft className="w-5 h-5" />
          </button>
          <h1 className="text-base sm:text-lg font-semibold text-gray-900 truncate">
            Add New Property
          </h1>
        </div>

        {/* Right: actions */}
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <button
            onClick={onSaveDraft}
            className="hidden m:block text-sm text-gray-500 hover:text-violet-600 font-medium transition-colors cursor-pointer px-2"
          >
            Save Draft
          </button>
          <button
            onClick={onCancel}
            className="h-9 px-4 rounded-md border border-gray-200 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={onPublish}
            className={`h-9 px-4 rounded-md text-white text-sm font-semibold shadow-md transition-all ${canPublish !== false ? "bg-[#5323DC] hover:bg-violet-700 active:scale-95 cursor-pointer shadow-violet-200" : "bg-gray-300 cursor-not-allowed"}`}
          >
            <span className="hidden sm:inline">Publish Property</span>
            <span className="sm:hidden">Publish</span>
          </button>
        </div>
      </div>
    </header>
  );
}