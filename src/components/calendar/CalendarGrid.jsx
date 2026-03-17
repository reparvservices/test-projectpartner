import { ChevronLeftIcon, ChevronRightIcon } from "./CalendarIcons";
import {
  CALENDAR_DAYS, CAL_FILTERS, FILTER_TYPE_MAP,
  MONTH_LABEL, DAYS_IN_MONTH, FIRST_DAY_OFFSET,
  TODAY_DATE, EVENTS,
} from "./calendarData";

/** EventChip — colored event pill */
function EventChip({ label, color, bg }) {
  return (
    <div
      className="text-[11px] font-medium px-1.5 py-0.5 rounded truncate border-l-2"
      style={{ background: bg, color, borderColor: color }}
    >
      {label}
    </div>
  );
}

/**
 * CalendarGrid
 * Props:
 *   selectedDay  : number
 *   onSelectDay  : fn(day)
 *   activeFilter : string  — one of CAL_FILTERS
 *   onFilter     : fn(filter)
 *   onPrev       : fn()
 *   onNext       : fn()
 */
export default function CalendarGrid({
  selectedDay,
  onSelectDay,
  activeFilter = "All",
  onFilter,
  onPrev,
  onNext,
}) {
  // Build cells
  const cells = [];
  for (let i = 0; i < FIRST_DAY_OFFSET; i++) cells.push({ day: 25 + i, current: false });
  for (let d = 1; d <= DAYS_IN_MONTH; d++)    cells.push({ day: d, current: true });
  while (cells.length % 7 !== 0)              cells.push({ day: cells.length - DAYS_IN_MONTH - FIRST_DAY_OFFSET + 1, current: false });

  const rows = [];
  for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));

  const filterType = FILTER_TYPE_MAP[activeFilter];

  return (
    <div className="bg-white border rounded-xl overflow-hidden flex-1 min-w-0">

      {/* Header */}
      <div className="px-6 py-5 flex items-center justify-between border-b border-gray-100">

        {/* Month Nav */}
        <div className="flex items-center gap-2">
          <button
            onClick={onPrev}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <ChevronLeftIcon />
          </button>
          <span className="text-xl font-bold text-gray-900 min-w-[150px] text-center">
            {MONTH_LABEL}
          </span>
          <button
            onClick={onNext}
            className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <ChevronRightIcon />
          </button>
        </div>

        {/* Filter Chips */}
        <div className="flex gap-2">
          {CAL_FILTERS.map(f => (
            <button
              key={f}
              onClick={() => onFilter?.(f)}
              className={`px-4 py-1.5 rounded-full text-[13px] border transition-all cursor-pointer
                ${f === activeFilter
                  ? "bg-violet-600 border-violet-600 text-white font-semibold"
                  : "bg-white border-gray-200 text-gray-700 font-normal hover:border-violet-300"
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Day Labels */}
      <div className="grid grid-cols-7 border-b border-gray-200">
        {CALENDAR_DAYS.map(d => (
          <div key={d} className="py-2.5 text-center text-[12px] font-semibold text-gray-400 tracking-widest">
            {d}
          </div>
        ))}
      </div>

      {/* Rows */}
      {rows.map((row, ri) => (
        <div key={ri} className="grid grid-cols-7 border-b border-gray-200">
          {row.map((cell, ci) => {
            const isToday    = cell.current && cell.day === TODAY_DATE;
            const isSelected = cell.current && cell.day === selectedDay && !isToday;
            const evts       = (cell.current && EVENTS[cell.day]) || [];
            const visible    = filterType === "all" ? evts : evts.filter(e => e.type === filterType);

            return (
              <div
                key={ci}
                onClick={() => cell.current && onSelectDay?.(cell.day)}
                className={`min-h-[90px] p-1.5 flex flex-col gap-1 transition-colors
                  ${ci < 6 ? "border-r border-gray-200" : ""}
                  ${cell.current ? "cursor-pointer" : "cursor-default"}
                  ${isSelected ? "bg-violet-50" : "hover:bg-gray-50"}
                `}
              >
                {/* Day number */}
                <div className="mb-0.5">
                  {isToday ? (
                    <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-violet-600 text-white text-[13px] font-bold">
                      {cell.day}
                    </span>
                  ) : (
                    <span className={`text-[13px] ${cell.current ? "font-medium text-gray-700" : "font-normal text-gray-300"}`}>
                      {cell.day}
                    </span>
                  )}
                </div>

                {/* Event Chips */}
                {visible.slice(0, 2).map(e => (
                  <EventChip key={e.id} {...e} />
                ))}
                {visible.length > 2 && (
                  <span className="text-[10px] text-gray-400 pl-1">+{visible.length - 2} more</span>
                )}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}