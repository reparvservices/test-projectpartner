import { Crown } from "lucide-react";

const GRADIENT = "linear-gradient(110.73deg, #5E23DC 0%, #7C3AED 100%)";

const countStyle = {
  white:  "bg-white/20 text-white",
  dark:   "bg-gray-100 text-gray-600",
  blue:   "bg-blue-50 text-blue-600",
  red:    "bg-red-50 text-red-500",
  purple: "bg-violet-50 text-violet-600",
};

export default function CustomersTabs({ tabs, active, onChange }) {
  return (
    <div
      className="flex items-center gap-1.5 overflow-x-auto py-3"
      style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
    >
      {tabs.map(tab => {
        const isActive = active === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            className={`flex items-center gap-2 px-4 py-2 rounded-full text-[13px] font-semibold whitespace-nowrap transition-all shrink-0 ${
              isActive
                ? "text-white shadow-sm"
                : "bg-transparent border border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
            }`}
            style={isActive ? { background: GRADIENT } : {}}
          >
            {tab.label}
            {tab.count !== null ? (
              <span className={`text-[11.5px] font-bold px-2 py-0.5 rounded-full min-w-[22px] text-center ${
                isActive ? "bg-white/25 text-white" : countStyle[tab.countColor] || countStyle.dark
              }`}>
                {tab.count}
              </span>
            ) : (
              <Crown size={13} className={isActive ? "text-white" : "text-violet-500"} />
            )}
          </button>
        );
      })}
    </div>
  );
}