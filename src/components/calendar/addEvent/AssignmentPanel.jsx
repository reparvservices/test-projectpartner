import { useState } from "react";
import { Users, Search, Home, ChevronDown } from "lucide-react";

const ASSIGNEES = [
  { id: 1, name: "Sarah Jenkins (You)", initials: "SJ", color: "bg-violet-100 text-[#5E23DC]" },
  { id: 2, name: "Rajesh Kumar",        initials: "RK", color: "bg-emerald-100 text-emerald-700" },
  { id: 3, name: "Priya Mehta",         initials: "PM", color: "bg-orange-100 text-orange-700"   },
  { id: 4, name: "David Singh",         initials: "DS", color: "bg-blue-100 text-blue-700"       },
];

/**
 * AssignmentPanel
 * Props:
 *   data     : { assignTo, relatedLead, relatedProperty }
 *   onChange : fn(field, value)
 */
export default function AssignmentPanel({ data, onChange }) {
  const [open, setOpen] = useState(false);
  const selected = ASSIGNEES.find(a => a.id === data.assignTo) || ASSIGNEES[0];

  return (
    <div className="bg-white rounded-lg overflow-hidden border">
      <div className="flex items-center gap-2.5 px-5 py-3.5 bg-gray-50 border-b border-gray-100">
        <Users className="w-4 h-4 text-[#5E23DC]" />
        <span className="text-sm font-semibold text-gray-900">Assignment</span>
      </div>

      <div className="px-5 py-5 flex flex-col gap-5">

        {/* Assign To */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Assign to
          </label>
          <div className="relative">
            <button
              type="button"
              onClick={() => setOpen(o => !o)}
              className="w-full flex items-center justify-between gap-2 px-3 py-2.5 border border-gray-200 rounded-xl bg-white hover:border-[#5E23DC]/50 transition-colors cursor-pointer"
            >
              <div className="flex items-center gap-2.5">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold flex-shrink-0 ${selected.color}`}>
                  {selected.initials}
                </div>
                <span className="text-sm text-gray-700 font-medium">{selected.name}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform flex-shrink-0 ${open ? "rotate-180" : ""}`} />
            </button>

            {open && (
              <div className="absolute z-20 top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden">
                {ASSIGNEES.map(a => (
                  <button
                    key={a.id}
                    type="button"
                    onClick={() => { onChange("assignTo", a.id); setOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-3 py-2.5 transition-colors cursor-pointer ${
                      data.assignTo === a.id
                        ? "bg-[#5E23DC]/5"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-semibold flex-shrink-0 ${a.color}`}>
                      {a.initials}
                    </div>
                    <span className={`text-sm ${data.assignTo === a.id ? "text-[#5E23DC] font-medium" : "text-gray-700"}`}>
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
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Related lead{" "}
            <span className="text-gray-400 normal-case tracking-normal font-normal">(optional)</span>
          </label>
          <div className="relative">
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={data.relatedLead}
              onChange={e => onChange("relatedLead", e.target.value)}
              placeholder="Search lead..."
              className="w-full px-4 pr-10 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-[#5E23DC] focus:ring-2 focus:ring-[#5E23DC]/10 transition-all placeholder:text-gray-300"
            />
          </div>
        </div>

        {/* Related Property */}
        <div>
          <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
            Related property{" "}
            <span className="text-gray-400 normal-case tracking-normal font-normal">(optional)</span>
          </label>
          <div className="relative">
            <Home className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={data.relatedProperty}
              onChange={e => onChange("relatedProperty", e.target.value)}
              placeholder="Search property..."
              className="w-full px-4 pr-10 py-3 border border-gray-200 rounded-xl text-sm text-gray-700 outline-none focus:border-[#5E23DC] focus:ring-2 focus:ring-[#5E23DC]/10 transition-all placeholder:text-gray-300"
            />
          </div>
        </div>
      </div>
    </div>
  );
}