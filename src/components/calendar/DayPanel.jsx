import { DotsIcon, LocationPinIcon, BuildingIcon, PhoneSmIcon, PlusIcon } from "./CalendarIcons";
import { DAY_PANEL_DATA } from "./calendarData.js";

/** SubIcon selector */
function SubIcon({ type }) {
  if (type === "location") return <LocationPinIcon />;
  if (type === "building") return <BuildingIcon />;
  return <PhoneSmIcon />;
}

/** Single event row */
function EventRow({ time, period, title, sub, subIcon, accent, avatar, attendee }) {
  return (
    <div className="flex gap-3 items-start">
      {/* Time */}
      <div className="text-right min-w-[38px]">
        <p className="text-[15px] font-bold text-gray-900 leading-tight">{time}</p>
        <p className="text-[11px] text-gray-400">{period}</p>
      </div>

      {/* Accent bar */}
      <div className={`w-[3px] rounded-sm self-stretch min-h-[52px] flex-shrink-0 border-l-4 ${accent}`} />

      {/* Content */}
      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-semibold text-gray-900 leading-snug">{title}</p>
        {sub && (
          <div className="flex items-center gap-1 mt-1 text-gray-500 text-xs">
            <SubIcon type={subIcon} />
            <span>{sub}</span>
          </div>
        )}
        {avatar && (
          <div className="mt-2">
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-200 to-blue-200 inline-flex items-center justify-center text-[10px] font-bold text-violet-700">
              {avatar}
            </div>
          </div>
        )}
        {attendee && (
          <p className="mt-1.5 text-xs text-gray-500">{attendee}</p>
        )}
      </div>
    </div>
  );
}

/** Labeled section */
function SectionBlock({ title, children }) {
  return (
    <div>
      <p className="text-[11px] font-bold text-gray-400 tracking-widest mb-3">{title}</p>
      <div className="flex flex-col gap-3">{children}</div>
    </div>
  );
}

/**
 * DayPanel
 * Props:
 *   day        : number
 *   data       : object  — optional override (defaults to DAY_PANEL_DATA)
 *   onQuickAdd : fn()
 */
export default function DayPanel({ day, data = DAY_PANEL_DATA, onQuickAdd }) {
  return (
    <div className="bg-white border rounded-xl p-6 w-[300px] flex-shrink-0 flex flex-col gap-0">

      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <span className="text-xl font-bold text-gray-900">Wed, Oct {day}</span>
        <button className="p-1 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer">
          <DotsIcon />
        </button>
      </div>

      {/* Upcoming Meetings */}
      <SectionBlock title="UPCOMING MEETINGS">
        {data.meetings.map((m, i) => <EventRow key={i} {...m} />)}
      </SectionBlock>

      <hr className="my-4 border-gray-100" />

      {/* Site Visits */}
      <SectionBlock title="SITE VISITS">
        {data.siteVisits.map((v, i) => <EventRow key={i} {...v} />)}
      </SectionBlock>

      <hr className="my-4 border-gray-100" />

      {/* Tasks & Reminders */}
      <SectionBlock title="TASKS & REMINDERS">
        {data.tasks.map((t, i) => <EventRow key={i} {...t} />)}
      </SectionBlock>

      {/* Quick Add */}
      <button
        onClick={onQuickAdd}
        className="mt-5 border-2 border-dashed border-gray-200 rounded-xl py-3 flex items-center justify-center gap-1.5 text-sm text-gray-400 cursor-pointer hover:border-violet-400 hover:text-violet-500 transition-colors"
      >
        <PlusIcon size={14} />
        Quick Add Event
      </button>
    </div>
  );
}