import { PlusIcon } from "./CalendarIcons";

/**
 * CalendarFAB — floating action button pinned bottom-right
 * Props:
 *   onClick : fn()
 */
export default function CalendarFAB({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="fixed bottom-7 right-7 w-13 h-13 rounded-full bg-violet-600 hover:bg-violet-700 active:scale-90 text-white flex items-center justify-center shadow-xl shadow-violet-300 hover:shadow-violet-400 transition-all cursor-pointer z-50"
      style={{ width: 52, height: 52 }}
    >
      <PlusIcon size={22} />
    </button>
  );
}