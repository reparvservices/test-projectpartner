import { ChevronLeftIcon, ChevronRightIcon } from "./CalendarIcons";

const WEEK_DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
// Week of Oct 9–15 shown in image
const WEEK_DATES = [9, 10, 11, 12, 13, 14, 15];
const TODAY = 11;

/**
 * MobileWeekStrip
 * Horizontal scrollable week row with today highlighted as violet pill.
 * Props:
 *   selectedDay  : number
 *   onSelectDay  : fn(day)
 *   monthLabel   : string
 *   onPrev       : fn()
 *   onNext       : fn()
 */
export default function MobileWeekStrip({
  selectedDay,
  onSelectDay,
  monthLabel = "October 2023",
  onPrev,
  onNext,
}) {
  return (
    <div className="bg-white px-4 pt-4 pb-3 border-b border-gray-100">

      {/* Month + Nav */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={onPrev}
          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <ChevronLeftIcon />
        </button>
        <h2 className="text-lg font-bold text-gray-900">{monthLabel}</h2>
        <button
          onClick={onNext}
          className="w-8 h-8 flex items-center justify-center text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <ChevronRightIcon />
        </button>
      </div>

      {/* Week days */}
      <div className="grid grid-cols-7 gap-1">
        {WEEK_DAYS.map((day, i) => {
          const date    = WEEK_DATES[i];
          const isToday = date === TODAY;
          const isSel   = date === selectedDay && !isToday;

          return (
            <button
              key={day}
              onClick={() => onSelectDay?.(date)}
              className="flex flex-col items-center gap-1 cursor-pointer"
            >
              {/* Day label */}
              <span className={`text-[13px] font-medium ${isToday ? "text-white" : "text-gray-500"}`}>
                {day}
              </span>

              {/* Date circle */}
              <span className={`w-10 h-10 rounded-2xl flex items-center justify-center text-[17px] font-bold transition-all
                ${isToday
                  ? "bg-violet-600 text-white shadow-md shadow-violet-300"
                  : isSel
                  ? "bg-violet-100 text-violet-700"
                  : "text-gray-900 hover:bg-gray-100"
                }`}
              >
                {date}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}