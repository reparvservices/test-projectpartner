import { FiCalendar } from "react-icons/fi";

const filters = [
  { label: "Approved", count: 12 },
  { label: "Pending", count: 5 },
  { label: "Rejected", count: 1 },
  { label: "Draft", count: 3 },
  { label: "Trending", count: "🔥" },
  { label: "Recently Updated", count: 8 },
];

export default function PropertyFilter({ active = "Approved", onChange }) {
  return (
    <div className="w-full bg-white md:bg-transparent">
      <div className="w-full px-4 py-3 flex items-center justify-between gap-4 overflow-x-auto">

        {/* Filter Pills */}
        <div className="flex gap-3">
          {filters.map((item) => {
            const isActive = active === item.label;

            return (
              <button
                key={item.label}
                onClick={() => onChange?.(item.label)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm whitespace-nowrap transition
                ${
                  isActive
                    ? "bg-[#5323DC] text-white shadow"
                    : "bg-white text-gray-600 border"
                }`}
              >
                {item.label}

                {item.count && (
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-white text-gray-700"
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Date Filter */}
        <button className="flex items-center gap-2 border px-4 py-2 rounded-xl text-sm whitespace-nowrap bg-white hover:bg-gray-50">
          <FiCalendar />
          This Month
        </button>

      </div>
    </div>
  );
}