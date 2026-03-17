import { CheckIcon } from "./AddEventIcons";

/**
 * AddEventFooter
 * Props:
 *   onCancel : fn()
 *   onSave   : fn()
 *   saving   : boolean
 */
export default function AddEventFooter({ onCancel, onSave, saving = false }) {
  return (
    <div className="md:sticky bottom-0 bg-white border-t border-gray-100 px-4 md:px-8 py-4 flex items-center justify-between gap-3">
      {/* Cancel */}
      <button
        type="button"
        onClick={onCancel}
        className="px-6 py-2.5 border border-gray-200 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 active:scale-95 transition-all cursor-pointer"
      >
        Cancel
      </button>

      {/* Save Event */}
      <button
        type="button"
        onClick={onSave}
        disabled={saving}
        className="flex items-center gap-2 px-6 py-2.5 bg-[#5323DC] hover:bg-[#5323DC] active:scale-95 disabled:opacity-60 text-white rounded-md text-sm font-semibold shadow-md shadow-violet-200 transition-all cursor-pointer"
      >
        <CheckIcon className="w-4 h-4" />
        {saving ? "Saving..." : "Save Event"}
      </button>
    </div>
  );
}