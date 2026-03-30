import { Loader2, Check } from "lucide-react";

/**
 * AddEventFooter
 * Props:
 *   onCancel : fn()
 *   onSave   : fn()
 *   saving   : boolean
 */
export default function AddEventFooter({ onCancel, onSave, saving = false }) {
  return (
    <div className="w-full fixed md:sticky bottom-0 z-50 bg-white border-t px-4 md:px-8 py-3 flex items-center justify-between gap-3 h-18">
      <button
        type="button"
        onClick={onCancel}
        className="px-6 py-2.5 border border-gray-200 rounded-md text-sm font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 active:scale-95 transition-all cursor-pointer"
      >
        Cancel
      </button>

      <button
        type="button"
        onClick={onSave}
        disabled={saving}
        className="flex items-center gap-2 px-6 py-2.5 bg-[#5E23DC] hover:bg-[#4c1bb5] active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed text-white rounded-md text-sm font-semibold transition-all cursor-pointer"
      >
        {saving ? (
          <>
            <Loader2 className="w-4 h-4 animate-spin" />
            Saving...
          </>
        ) : (
          <>
            <Check className="w-4 h-4" strokeWidth={2.5} />
            Save Event
          </>
        )}
      </button>
    </div>
  );
}