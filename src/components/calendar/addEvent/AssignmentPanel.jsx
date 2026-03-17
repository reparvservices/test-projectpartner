import { useState } from "react";
import { UserPlusIcon, SearchSmIcon, HomeIcon, ChevronDownIcon } from "./AddEventIcons";

const ASSIGNEES = [
  { id: 1, name: "Sarah Jenkins (You)", avatar: "https://i.pravatar.cc/32?img=47" },
  { id: 2, name: "Rajesh Kumar",        avatar: "https://i.pravatar.cc/32?img=8"  },
  { id: 3, name: "Priya Mehta",         avatar: "https://i.pravatar.cc/32?img=23" },
  { id: 4, name: "David Singh",         avatar: "https://i.pravatar.cc/32?img=11" },
];

/**
 * AssignmentPanel
 * Props:
 *   data     : { assignTo, relatedLead, relatedProperty }
 *   onChange : fn(field, value)
 */
export default function AssignmentPanel({ data, onChange }) {
  const [assignOpen, setAssignOpen] = useState(false);
  const selected = ASSIGNEES.find(a => a.id === data.assignTo) || ASSIGNEES[0];

  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100">
      {/* Section header */}
      <div className="flex items-center gap-2.5 px-5 py-4 border-b border-gray-100 bg-gray-50/60">
        <UserPlusIcon className="w-5 h-5 flex-shrink-0" />
        <span className="text-[15px] font-bold text-gray-900">Assignment</span>
      </div>

      <div className="px-5 py-5 flex flex-col gap-5">

        {/* Assign To */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Assign To</label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setAssignOpen(o => !o)}
              className="w-full flex items-center justify-between pl-3 pr-4 py-3 border border-gray-200 rounded-xl bg-white hover:border-violet-400 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <img src={selected.avatar} alt={selected.name} className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
                <span className="text-sm text-gray-700 font-medium">{selected.name}</span>
              </div>
              <ChevronDownIcon className={`w-4 h-4 text-gray-400 transition-transform ${assignOpen ? "rotate-180" : ""}`} />
            </button>
            {assignOpen && (
              <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                {ASSIGNEES.map(a => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => { onChange("assignTo", a.id); setAssignOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 hover:bg-violet-50 transition-colors cursor-pointer
                      ${data.assignTo === a.id ? "bg-violet-50" : ""}`}
                  >
                    <img src={a.avatar} alt={a.name} className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
                    <span className={`text-sm ${data.assignTo === a.id ? "text-violet-700 font-medium" : "text-gray-700"}`}>
                      {a.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Related Lead */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Related Lead <span className="text-gray-400 font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={data.relatedLead}
              onChange={e => onChange("relatedLead", e.target.value)}
              placeholder="Select lead..."
              className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all placeholder:text-gray-400"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <SearchSmIcon className="w-4 h-4" />
            </span>
          </div>
        </div>

        {/* Related Property */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Related Property <span className="text-gray-400 font-normal">(Optional)</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={data.relatedProperty}
              onChange={e => onChange("relatedProperty", e.target.value)}
              placeholder="Select property..."
              className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all placeholder:text-gray-400"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none">
              <HomeIcon className="w-4 h-4" />
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}