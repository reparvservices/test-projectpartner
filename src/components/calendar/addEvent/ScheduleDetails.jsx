import { useState } from "react";
import { ClockIcon, CalendarIcon, TimeIcon, BellIcon, ChevronDownIcon } from "./AddEventIcons";

const REMINDERS = [
  "5 minutes before", "10 minutes before", "15 minutes before",
  "30 minutes before", "1 hour before", "1 day before",
];

/**
 * Toggle switch component
 */
function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex items-center w-11 h-6 rounded-full transition-colors cursor-pointer flex-shrink-0
        ${checked ? "bg-violet-600" : "bg-gray-200"}`}
    >
      <span
        className={`inline-block w-4 h-4 bg-white rounded-full shadow transition-transform
          ${checked ? "translate-x-6" : "translate-x-1"}`}
      />
    </button>
  );
}

/**
 * ScheduleDetails
 * Props:
 *   data     : { date, startTime, endTime, allDay, reminder }
 *   onChange : fn(field, value)
 */
export default function ScheduleDetails({ data, onChange }) {
  const [reminderOpen, setReminderOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      {/* Section header */}
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-100 bg-gray-50/60">
        <ClockIcon className="w-5 h-5 flex-shrink-0" />
        <span className="text-[15px] font-bold text-gray-900">Schedule Details</span>
      </div>

      <div className="px-5 py-5 flex flex-col gap-5">

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Date</label>
          <div className="relative">
            <input
              type="text"
              value={data.date}
              onChange={e => onChange("date", e.target.value)}
              placeholder="Oct 24, 2023"
              className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <CalendarIcon className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Start Time + End Time */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Start Time</label>
            <div className="relative">
              <input
                type="text"
                value={data.startTime}
                onChange={e => onChange("startTime", e.target.value)}
                placeholder="10:00 AM"
                className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <TimeIcon className="w-4 h-4" />
              </span>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">End Time</label>
            <div className="relative">
              <input
                type="text"
                value={data.endTime}
                onChange={e => onChange("endTime", e.target.value)}
                placeholder="11:30 AM"
                className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
                <TimeIcon className="w-4 h-4" />
              </span>
            </div>
          </div>
        </div>

        {/* All Day Event */}
        <div className="flex items-center justify-between py-1">
          <span className="text-sm font-medium text-gray-700">All Day Event</span>
          <Toggle checked={data.allDay} onChange={v => onChange("allDay", v)} />
        </div>

        {/* Divider */}
        <div className="h-px bg-gray-100" />

        {/* Reminder */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Reminder</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setReminderOpen(o => !o)}
              className="w-full flex items-center justify-between pl-4 pr-3 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white hover:border-violet-400 transition-colors cursor-pointer"
            >
              <span>{data.reminder || "Select reminder..."}</span>
              <BellIcon className="w-4 h-4 text-gray-400" />
            </button>
            {reminderOpen && (
              <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                {REMINDERS.map(r => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => { onChange("reminder", r); setReminderOpen(false); }}
                    className={`w-full text-left px-4 py-2.5 text-sm hover:bg-violet-50 hover:text-violet-700 transition-colors cursor-pointer
                      ${data.reminder === r ? "bg-violet-50 text-violet-700 font-medium" : "text-gray-700"}`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}