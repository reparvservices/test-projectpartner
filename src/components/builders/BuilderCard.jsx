import { MapPin, MessageCircle, BarChart2, User, Info, CheckCircle, Clock } from "lucide-react";

/* ── Score Badge ── */
function ScoreBadge({ value, label }) {
  const num = parseInt(value);
  if (num >= 95) return (
    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 whitespace-nowrap">
      ↗ {value}{label}
    </span>
  );
  if (num >= 90) return (
    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-teal-50 text-teal-700 whitespace-nowrap">
      ↗ {value}{label}
    </span>
  );
  if (num >= 85) return (
    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-violet-50 text-violet-700 whitespace-nowrap">
      {value}{label}
    </span>
  );
  return (
    <span className="text-xs font-bold px-2.5 py-1 rounded-lg bg-amber-50 text-amber-700 whitespace-nowrap">
      — {value}{label}
    </span>
  );
}

/* ── Update Icon ── */
function UpdateIcon({ text }) {
  const t = text?.toLowerCase() || "";
  if (t.includes("certif") || t.includes("rera"))
    return <CheckCircle size={15} className="text-violet-500 shrink-0" />;
  if (t.includes("hour") || t.includes("ago") || t.includes("today"))
    return <Clock size={15} className="text-violet-500 shrink-0" />;
  return <Info size={15} className="text-violet-500 shrink-0" />;
}

/* ── Desktop / Tablet Card ── */
function BuilderCardDesktop({ builder }) {
  return (
    <div className="bg-white rounded-[10px] border p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow duration-200">

      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex gap-3 items-center">
          <img
            src={builder.image}
            alt={builder.name}
            className="w-[52px] h-[52px] rounded-[14px] object-cover shrink-0"
          />
          <div>
            <h3 className="text-[15.5px] font-extrabold text-gray-900 tracking-tight leading-tight">
              {builder.name}
            </h3>
            <div className="flex items-center gap-1 text-[12.5px] text-gray-400 mt-1">
              <MapPin size={11} />
              {builder.location}
            </div>
          </div>
        </div>
        <ScoreBadge value={builder.score} label="%" />
      </div>

      {/* Contact */}
      <div className="flex items-center gap-3 bg-[#F8FAFC] rounded-xl px-3.5 py-3 border border-gray-100">
        <img
          src={`https://i.pravatar.cc/48?u=${builder.contact}`}
          alt={builder.contact}
          className="w-9 h-9 rounded-full object-cover shrink-0"
        />
        <div>
          <p className="text-[13.5px] font-bold text-gray-800 leading-tight">{builder.contact}</p>
          <p className="text-xs text-[#7B6E9A] mt-0.5">
            {builder.phone}
            {builder.rera && (
              <><span className="mx-1.5 text-[#7B6E9A]">•</span>{builder.rera}</>
            )}
          </p>
        </div>
      </div>

      {/* Stats 2×2 */}
      <div className="grid grid-cols-2 gap-x-6 gap-y-3">
        {[
          { label: "REVENUE",      value: builder.revenue  },
          { label: "TOTAL DEALS",  value: builder.deals    },
          { label: "ACTIVE PROJ.", value: builder.projects },
          { label: "PARTNERS",     value: builder.partners },
        ].map(s => (
          <div key={s.label}>
            <p className="text-[10px] font-bold text-[#7B6E9A] tracking-widest uppercase">{s.label}</p>
            <p className="text-base font-extrabold text-gray-900 mt-0.5">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Update */}
      {builder.update && (
        <div className="flex items-center gap-2.5 border border-gray-100 rounded-xl p-3 bg-[#F8FAFC]">
          <img
            src={builder.image}
            alt="update"
            className="w-10 h-10 rounded-[10px] object-cover shrink-0"
          />
          <p className="text-[12.5px] text-gray-500 leading-relaxed">{builder.update}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2 pt-1 border-t border-gray-100">
        <button
          className="flex-1 bg-[#5E23DC] text-white text-sm font-bold py-3 rounded-xl hover:opacity-90 transition-opacity shadow-[0_4px_14px_rgba(94,35,220,0.25)]"
        >
          View Profile
        </button>
        <button className="border border-gray-200 rounded-xl p-2.5 hover:bg-gray-50 transition-colors">
          <MessageCircle size={17} className="text-gray-500" />
        </button>
        <button className="border border-gray-200 rounded-xl p-2.5 hover:bg-gray-50 transition-colors">
          <BarChart2 size={17} className="text-gray-500" />
        </button>
      </div>
    </div>
  );
}

/* ── Mobile Card ── */
function BuilderCardMobile({ builder }) {
  return (
    <div className="bg-white rounded-[20px] p-[18px] flex flex-col gap-3.5 shadow-[0_2px_12px_rgba(0,0,0,0.07)]">

      {/* Header */}
      <div className="flex justify-between items-start">
        <div className="flex gap-3 items-center">
          <img
            src={builder.image}
            alt={builder.name}
            className="w-[58px] h-[58px] rounded-[16px] object-cover shrink-0"
          />
          <div>
            <h3 className="text-[17px] font-extrabold text-gray-900 tracking-tight leading-tight">
              {builder.name}
            </h3>
            <p className="text-[12.5px] text-gray-400 mt-1">
              {builder.city} • {builder.type || "Premium"}
            </p>
          </div>
        </div>
        <ScoreBadge value={builder.score} label="% Perf" />
      </div>

      {/* Contact - simple row */}
      <div className="flex items-center gap-2 pb-3.5 border-b border-gray-100">
        <User size={14} className="text-gray-400 shrink-0" />
        <span className="text-[13.5px] text-gray-700 font-medium">{builder.contact}</span>
        <span className="text-gray-300 mx-0.5">•</span>
        <span className="text-[13px] text-gray-500">{builder.phone}</span>
      </div>

      {/* Stats 4-col */}
      <div className="grid grid-cols-4 gap-2">
        {[
          { label: "Revenue",  value: builder.revenue      },
          { label: "Deals",    value: builder.dealCount    },
          { label: "Projects", value: builder.projectCount },
          { label: "Partners", value: builder.partnerCount },
        ].map(s => (
          <div key={s.label}>
            <p className="text-[11px] text-gray-400 font-medium">{s.label}</p>
            <p className="text-[15px] font-extrabold text-gray-900 mt-0.5">{s.value}</p>
          </div>
        ))}
      </div>

      {/* Update pill */}
      {builder.update && (
        <div className="flex items-center gap-2.5 bg-violet-50 rounded-xl px-3.5 py-3">
          <UpdateIcon text={builder.update} />
          <p className="text-[13px] text-gray-600 leading-[1.45]">{builder.update}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex gap-2">
        <button
          className="flex-1 bg-[#5E23DC] text-white text-[14.5px] font-bold py-2.5 rounded-[8px] hover:opacity-90 transition-opacity"
        >
          View Profile
        </button>
        <button className="border-[1.5px] border-gray-200 rounded-[14px] px-3.5 py-2 bg-white hover:bg-gray-50 transition-colors flex items-center justify-center">
          <MessageCircle size={18} className="text-gray-500" />
        </button>
        <button className="border-[1.5px] border-gray-200 rounded-[14px] px-3.5 py-2 bg-white hover:bg-gray-50 transition-colors flex items-center justify-center">
          <BarChart2 size={18} className="text-gray-500" />
        </button>
      </div>
    </div>
  );
}

/* ── Export: auto-switches at sm breakpoint ── */
export default function BuilderCard({ builder }) {
  return (
    <>
      <div className="hidden sm:block">
        <BuilderCardDesktop builder={builder} />
      </div>
      <div className="block sm:hidden">
        <BuilderCardMobile builder={builder} />
      </div>
    </>
  );
}