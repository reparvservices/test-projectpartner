import { BackIcon } from "./AddEventIcons";

/**
 * AddEventHeader
 * Props:
 *   onBack : fn()
 */
export default function AddEventHeader({ onBack }) {
  return (
    <div className="sticky top-0 bg-white border-b border-gray-100 px-4 md:px-8 h-[70px] flex items-center gap-3">
      <button
        onClick={onBack}
        className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer"
      >
        <BackIcon className="w-5 h-5" />
      </button>
      <span className="text-[17px] font-bold text-gray-900">Add Event</span>
    </div>
  );
}