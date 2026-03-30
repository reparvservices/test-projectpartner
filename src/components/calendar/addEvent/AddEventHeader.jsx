import { useNavigate } from "react-router-dom";

export default function AddEventHeader({ onBack }) {
  return (
    <div className="sticky top-0 z-10 bg-white border-b px-4 md:px-8 h-[70px] flex items-center gap-3">
      <button
        onClick={onBack}
        className="w-9 h-9 flex items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 active:scale-95 transition-all cursor-pointer"
        aria-label="Go back"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.2" viewBox="0 0 24 24">
          <path d="M19 12H5M12 5l-7 7 7 7"/>
        </svg>
      </button>
      <h1 className="text-[17px] font-semibold text-gray-900">Add Event</h1>
    </div>
  );
}