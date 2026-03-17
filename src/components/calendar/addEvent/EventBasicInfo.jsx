import { useState } from "react";
import { InfoIcon, ChevronDownIcon } from "./AddEventIcons";

const EVENT_TYPES = [
  "Site Visit", "Meeting", "Follow-up", "Inspection", "Task", "Other",
];

const PRIORITIES = ["Low", "Medium", "High"];

/**
 * EventBasicInfo
 * Props:
 *   data     : { title, eventType, priority }
 *   onChange : fn(field, value)
 */
export default function EventBasicInfo({ data, onChange }) {
  const [typeOpen, setTypeOpen] = useState(false);

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      {/* Section header */}
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-100 bg-gray-50/60">
        <InfoIcon className="w-5 h-5 flex-shrink-0" />
        <span className="text-[15px] font-bold text-gray-900">Event Basic Info</span>
      </div>

      <div className="px-5 py-5 flex flex-col gap-5">

        {/* Event Title */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Event Title</label>
          <input
            type="text"
            value={data.title}
            onChange={e => onChange("title", e.target.value)}
            placeholder="e.g. Site Visit with Mr. Johnson"
            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all placeholder:text-gray-400"
          />
        </div>

        {/* Event Type + Priority */}
        <div className="flex flex-col xl:flex-row gap-5">

          {/* Event Type */}
          <div className="flex-1 min-w-0">
            <label className="block text-sm font-medium text-gray-700 mb-2">Event Type</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setTypeOpen(o => !o)}
                className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 bg-white outline-none hover:border-violet-400 transition-colors cursor-pointer"
              >
                <span>{data.eventType || "Select type..."}</span>
                <ChevronDownIcon className={`w-4 h-4 text-gray-400 transition-transform ${typeOpen ? "rotate-180" : ""}`} />
              </button>
              {typeOpen && (
                <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                  {EVENT_TYPES.map(t => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => { onChange("eventType", t); setTypeOpen(false); }}
                      className={`w-full text-left px-4 py-2.5 text-sm hover:bg-violet-50 hover:text-violet-700 transition-colors cursor-pointer
                        ${data.eventType === t ? "bg-violet-50 text-violet-700 font-medium" : "text-gray-700"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Priority */}
          <div className="flex-1 min-w-0">
            <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
            <div className="flex gap-2">
              {PRIORITIES.map(p => {
                const isActive = data.priority === p;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => onChange("priority", p)}
                    className={`flex-1 py-3 rounded-xl text-sm font-medium border transition-all cursor-pointer
                      ${isActive
                        ? "bg-violet-100 border-violet-400 text-violet-700 font-semibold"
                        : "bg-white border-gray-200 text-gray-400 hover:border-violet-300 hover:text-violet-600"
                      }`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}