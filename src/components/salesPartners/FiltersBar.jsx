import { ChevronDown } from "lucide-react";

const filters = [
  { label: "Payment Status" },
  { label: "Followup Status" },
  { label: "State: All" },
  { label: "City: All" },
  { label: "Partner Type" },
];

export default function FiltersBar({ onClear }) {
  return (
    <>
      {/* Mobile: horizontal scroll, pill chips, no chevron */}
      <div className="flex md:hidden items-center gap-2.5 overflow-x-auto scrollbar-none pb-1 snap-x">
        {filters.map((f, i) => (
          <button
            key={i}
            className="shrink-0 snap-start border border-gray-200 rounded-full px-4 py-2 text-[13px] text-gray-500 font-medium bg-white whitespace-nowrap hover:border-gray-300 transition-colors"
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Desktop: flex wrap with chevrons + Clear All */}
      <div className="hidden md:flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          {filters.map((f, i) => (
            <button
              key={i}
              className="flex items-center gap-1.5 border border-gray-200 rounded-[8px] px-3.5 py-2 text-[13px] text-gray-700 font-medium bg-white hover:border-gray-300 transition-colors whitespace-nowrap"
            >
              {f.label}
              <ChevronDown size={13} className="text-gray-400" />
            </button>
          ))}
        </div>
        <button
          onClick={onClear}
          className="text-[13px] font-semibold text-violet-600 hover:text-violet-800 transition-colors whitespace-nowrap"
        >
          Clear All Filters
        </button>
      </div>
    </>
  );
}