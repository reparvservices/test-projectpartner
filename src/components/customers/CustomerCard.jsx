import { User, Pencil, UserPlus, MessageCircle, Phone, FileText, Share2, Building2, Clock } from "lucide-react";

const GRADIENT = "linear-gradient(110.73deg, #5E23DC 0%, #7C3AED 100%)";

const badgeStyles = {
  red:    "bg-red-50 text-red-500 border-red-100",
  blue:   "bg-blue-50 text-blue-600 border-blue-100",
  green:  "bg-emerald-50 text-emerald-600 border-emerald-100",
  purple: "bg-violet-50 text-violet-600 border-violet-100",
  amber:  "bg-amber-50 text-amber-600 border-amber-100",
};

export default function CustomerCard({ customer: c }) {
  return (
    <div className="bg-white rounded-[16px] p-4 md:p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">

      {/* ══ MOBILE layout ══ */}
      <div className="block md:hidden">

        {/* Row 1: Avatar + Name/Company/Time + Badge top-right */}
        <div className="flex items-start gap-3 mb-4">
          <img
            src={c.avatar}
            alt={c.name}
            className="w-[56px] h-[56px] rounded-full object-cover shrink-0 ring-2 ring-gray-100"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-[17px] font-extrabold text-gray-900 leading-tight">{c.name}</h3>
            <p className="text-[12.5px] text-gray-500 mt-0.5">{c.company}</p>
            <p className="flex items-center gap-1 text-[12px] text-gray-400 mt-1">
              <Clock size={11} className="text-gray-400 shrink-0" />
              {c.lastActive.replace("Last active: ", "").replace("Added: ", "").replace("Contacted: ", "").replace("Follow-up scheduled: ", "")}
            </p>
          </div>
          {/* Badge — top right */}
          <span className={`inline-flex shrink-0 text-[11px] font-bold px-3 py-1 rounded-full border uppercase tracking-wide ${
            badgeStyles[c.badgeColor] || badgeStyles.blue
          }`}>
            {c.badge}
          </span>
        </div>

        {/* Row 2: 2×2 property info grid */}
        <div className="grid grid-cols-2 gap-x-6 gap-y-4 mb-5">
          <div>
            <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">Interested In</p>
            <p className="text-[14px] font-bold text-gray-900 leading-snug">{c.property}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">Budget</p>
            <p className="text-[14px] font-bold text-gray-900">{c.budget}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">Location</p>
            <p className="text-[14px] font-bold text-gray-900">{c.location}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">Prefers</p>
            <p className="text-[14px] font-bold text-gray-900">Modern, Gym</p>
          </div>
        </div>

        {/* Row 3: Gradient Message + 3 violet circle icon buttons */}
        <div className="flex items-center gap-3">
          <button
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-[12px] text-[14px] font-bold text-white hover:opacity-90 transition-opacity"
            style={{ background: GRADIENT }}
          >
            <MessageCircle size={16} />
            Message
          </button>
          {[Phone, FileText, Share2].map((Icon, i) => (
            <button
              key={i}
              className="w-12 h-12 flex items-center justify-center rounded-full bg-violet-50 hover:bg-violet-100 transition-colors shrink-0"
            >
              <Icon size={17} className="text-violet-600" />
            </button>
          ))}
        </div>

      </div>

      {/* ══ DESKTOP layout ══ */}
      <div className="hidden md:block">

        {/* Top Row: Avatar + Name + Actions + Timestamp */}
        <div className="flex items-start gap-3.5 mb-4">
          <img
            src={c.avatar}
            alt={c.name}
            className="w-14 h-14 rounded-full object-cover shrink-0 ring-2 ring-gray-100"
          />
          <div className="flex-1 min-w-0">
            <h3 className="text-[17px] font-extrabold text-gray-900 leading-tight">{c.name}</h3>
            <p className="flex items-center gap-1.5 text-[12.5px] text-gray-500 mt-0.5">
              <Building2 size={12} className="text-gray-400 shrink-0" />
              {c.company}
            </p>
            <span className={`inline-flex mt-2 text-[11.5px] font-semibold px-2.5 py-0.5 rounded-[5px] border ${
              badgeStyles[c.badgeColor] || badgeStyles.blue
            }`}>
              {c.badge}
            </span>
          </div>
          <div className="flex flex-col items-end gap-2 shrink-0">
            <div className="flex items-center gap-3">
              <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors"><User size={17} /></button>
              <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors"><Pencil size={17} /></button>
              <button className="p-1 text-gray-400 hover:text-gray-600 transition-colors"><UserPlus size={17} /></button>
            </div>
            <p className="text-[11.5px] text-gray-400 whitespace-nowrap">{c.lastActive}</p>
          </div>
        </div>

        {/* Property Details: 3-col */}
        <div className="grid grid-cols-3 gap-4 mb-5 pt-4 border-t border-gray-100">
          <div>
            <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">Interested Property</p>
            <p className="text-[13.5px] font-bold text-violet-600 leading-snug">{c.property}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">Budget Range</p>
            <p className="text-[13.5px] font-bold text-gray-900">{c.budget}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold text-gray-400 tracking-widest uppercase mb-1">Location Pref</p>
            <p className="text-[13.5px] font-bold text-gray-900">{c.location}</p>
          </div>
        </div>

        {/* Action Buttons: 4-col */}
        <div className="grid grid-cols-4 gap-2.5">
          <button
            className="flex items-center justify-center gap-2 py-2.5 rounded-[8px] text-[13px] font-bold text-white hover:opacity-90 transition-opacity"
            style={{ background: GRADIENT }}
          >
            <MessageCircle size={15} />
            Message
          </button>
          <button className="flex items-center justify-center gap-2 py-2.5 rounded-[8px] text-[13px] font-semibold text-gray-700 border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
            <Phone size={14} className="text-gray-500" />
            Call
          </button>
          <button className="flex items-center justify-center gap-2 py-2.5 rounded-[8px] text-[13px] font-semibold text-gray-700 border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
            <FileText size={14} className="text-gray-500" />
            Add Note
          </button>
          <button className="flex items-center justify-center gap-2 py-2.5 rounded-[8px] text-[13px] font-semibold text-gray-700 border border-gray-200 bg-white hover:bg-gray-50 transition-colors">
            <Share2 size={14} className="text-gray-500" />
            Share Update
          </button>
        </div>

      </div>
    </div>
  );
}