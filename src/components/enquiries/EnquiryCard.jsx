import { useState } from "react";
import {
  MapPin, Clock, Phone, Calendar, FileText,
  ArrowRight, MoreVertical, Instagram, Globe,
  UserPlus, X,
} from "lucide-react";
import propertyPicture from "../../assets/propertyPicture.svg";
import { getImageURI } from "../../utils/helper";

const GRADIENT = "linear-gradient(135deg, #6D28D9, #7C3AED)";

/* ── helpers ─────────────────────────────────────────────── */
function fmtBudget(val) {
  const n = Number(val);
  if (!n) return null;
  if (n >= 10000000) return (n / 10000000).toFixed(1).replace(/\.0$/, "") + "Cr";
  if (n >= 100000)   return (n / 100000).toFixed(1).replace(/\.0$/, "") + "L";
  if (n >= 1000)     return (n / 1000).toFixed(0) + "k";
  return n.toLocaleString("en-IN");
}

/* ── Status badge ─────────────────────────────────────────── */
const STATUS = {
  "New":             { bg: "#EEF2FF", color: "#6366F1", label: "New" },
  "Follow Up":       { bg: "#FEE2E2", color: "#EF4444", label: "Hot Lead" },
  "Visit Scheduled": { bg: "#DCFCE7", color: "#16A34A", label: "Assigned" },
  "Token":           { bg: "#FEF9C3", color: "#CA8A04", label: "Token" },
  "Cancelled":       { bg: "#F1F5F9", color: "#94A3B8", label: "Cancelled" },
};

function StatusBadge({ status }) {
  const s = STATUS[status] || { bg: "#F1F5F9", color: "#94A3B8", label: status || "—" };
  return (
    <span
      style={{ background: s.bg, color: s.color }}
      className="text-[11px] px-2.5 py-1 rounded-lg font-bold tracking-wide whitespace-nowrap"
    >
      {s.label.toUpperCase()}
    </span>
  );
}

/* ── Source icon ──────────────────────────────────────────── */
function SourceIcon({ source }) {
  if (!source) return null;
  const sl = source.toLowerCase();
  if (sl.includes("instagram")) return <Instagram size={15} style={{ color: "#E1306C" }} className="shrink-0" />;
  if (sl.includes("website") || sl.includes("direct") || sl.includes("web")) return <Globe size={15} style={{ color: "#6366F1" }} className="shrink-0" />;
  return null;
}

/* ── Shared action list content ───────────────────────────── */
function ActionList({ row, onClose, onAction }) {
  const actions = [
    { label: "View Details",    value: "view",            icon: "👁️" },
    { label: "Change Status",   value: "status",          icon: "🔄" },
    ...(row.source !== "Onsite" ? [{ label: "Update",          value: "update",          icon: "✏️" }] : []),
    ...(row.source !== "Onsite" ? [{ label: "Change Property",  value: "property",        icon: "🏠" }] : []),
    { label: "Assign Sales",    value: "assign",          icon: "👤" },
    { label: "Digital Broker",  value: "todigitalbroker", icon: "🤝" },
    { label: "Delete",          value: "delete",          icon: "🗑️", danger: true },
  ];

  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between gap-3 px-5 py-4 border-b border-slate-100">
        <div className="min-w-0">
          <p className="text-sm font-bold text-slate-900 truncate">{row.customer}</p>
          <p className="text-xs text-slate-400 mt-0.5">
            {row.category || "Enquiry"} · {row.city}{row.state ? `, ${row.state}` : ""}
          </p>
        </div>
        <button onClick={onClose} className="p-1.5 rounded-xl hover:bg-slate-100 shrink-0 transition-colors">
          <X size={18} className="text-slate-400" />
        </button>
      </div>

      {/* Actions grid */}
      <div className="p-4 grid grid-cols-2 gap-2 overflow-y-auto max-h-[55vh]">
        {actions.map((a) => (
          <button
            key={a.value}
            onClick={() => { onClose(); onAction(a.value, row.enquirersid, row); }}
            className={`flex items-center gap-2.5 px-4 py-3 rounded-2xl text-sm font-medium text-left transition-all active:scale-95
              ${a.danger
                ? "bg-red-50 text-red-500 hover:bg-red-100"
                : a.value === "view"
                ? "text-white hover:opacity-90 shadow-md"
                : "bg-slate-50 text-slate-700 hover:bg-[#F2F4FF] hover:text-[#6D28D9]"
              }`}
            style={a.value === "view" ? { background: GRADIENT } : {}}
          >
            <span className="text-base leading-none">{a.icon}</span>
            <span className="leading-tight">{a.label}</span>
          </button>
        ))}
      </div>
    </>
  );
}

/* ── Action menu — bottom-sheet mobile / centered popup desktop ── */
function ActionMenu({ row, onAction }) {
  const [open, setOpen] = useState(false);

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="p-1.5 rounded-xl hover:bg-slate-100 transition-colors"
      >
        <MoreVertical size={17} className="text-slate-300" />
      </button>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-sm" onClick={() => setOpen(false)} />

      {/* Mobile: bottom-sheet */}
      <div className="md:hidden fixed inset-x-0 bottom-0 z-[71] bg-white rounded-t-3xl shadow-2xl">
        <div className="flex justify-center pt-3 pb-1">
          <div className="w-10 h-1 rounded-full bg-slate-200" />
        </div>
        <ActionList row={row} onClose={() => setOpen(false)} onAction={onAction} />
        <div className="h-6" />
      </div>

      {/* Desktop: centered modal */}
      <div className="hidden md:flex fixed inset-0 z-[71] items-center justify-center px-4">
        <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md overflow-hidden">
          <ActionList row={row} onClose={() => setOpen(false)} onAction={onAction} />
        </div>
      </div>
    </>
  );
}

/* ── Main card ────────────────────────────────────────────── */
export default function EnquiryCard({ item, onAction, isActiveSubscription, enquiryFilter }) {
  let imageSrc = propertyPicture;
  try {
    const parsed = JSON.parse(item.frontView);
    if (Array.isArray(parsed) && parsed[0]) imageSrc = getImageURI(parsed[0]);
  } catch (e) {}

  const contact         = isActiveSubscription ? item.contact : "XXXXXXXXXX";
  const isAssigned      = item.assign && item.assign !== "No Assign";
  const isDigitalBroker = enquiryFilter === "Digital Broker";
  const canAct          = isActiveSubscription !== false && !isDigitalBroker;

  const minB   = fmtBudget(item.minbudget);
  const maxB   = fmtBudget(item.maxbudget);
  const budget = minB && maxB ? `₹${minB} – ₹${maxB}` : minB ? `₹${minB}+` : "—";

  const locationStr = [item.location, item.city, item.state].filter(Boolean).join(", ");
  const timeStr     = item.created_at?.split("|")[0]?.trim() || "—";

  return (
    <div className="bg-white rounded-md border border-slate-200 w-full min-w-[300px] overflow-hidden">

      {/* ── CARD BODY ── */}
      <div className="p-4 sm:p-5 md:p-6">

        {/* TOP ROW */}
        <div className="flex items-start gap-3 sm:gap-4">
          <div
            className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden shrink-0 border-2 border-slate-100 cursor-pointer"
            onClick={() => item.seoSlug && window.open("https://www.reparv.in/property-info/" + item.seoSlug, "_blank")}
          >
            <img src={imageSrc} alt={item.customer} className="w-full h-full object-cover" />
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 flex-wrap min-w-0">
                <h2 className="font-bold text-slate-900 text-[15px] sm:text-base md:text-lg leading-tight truncate">
                  {item.customer}
                </h2>
                <span className="md:hidden"><StatusBadge status={item.status} /></span>
              </div>
              <div className="hidden md:flex items-center gap-2 shrink-0">
                <StatusBadge status={item.status} />
                <ActionMenu row={item} onAction={onAction} />
              </div>
              <span className="md:hidden">
                <ActionMenu row={item} onAction={onAction} />
              </span>
            </div>

            <div className="flex items-center gap-1 sm:gap-2 text-[11px] sm:text-xs text-slate-400 mt-1 flex-wrap">
              <MapPin size={11} className="shrink-0" />
              <span className="truncate max-w-[160px] sm:max-w-none">{locationStr}</span>
              <span className="hidden sm:inline text-slate-300">|</span>
              <span className="sm:hidden text-slate-300">•</span>
              <Clock size={11} className="shrink-0" />
              <span>{timeStr}</span>
            </div>
          </div>
        </div>

        {/* INFO BLOCK */}
        <div className="bg-[#F2F4FF] rounded-lg sm:rounded-md p-3 sm:p-4 mt-4 grid grid-cols-3 gap-2 sm:gap-4">
          <div className="min-w-0">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-wide text-slate-400 font-semibold mb-1 hidden md:block">Interested In</p>
            <p className="text-[10px] sm:text-[11px] text-slate-400 mb-1 md:hidden">Interested In</p>
            <p className="font-bold text-slate-800 text-[13px] sm:text-sm md:text-base leading-tight truncate">{item.category || "—"}</p>
          </div>
          <div className="min-w-0">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-wide text-slate-400 font-semibold mb-1 hidden md:block">Budget Range</p>
            <p className="text-[10px] sm:text-[11px] text-slate-400 mb-1 md:hidden">Budget</p>
            <p className="font-bold text-slate-800 text-[13px] sm:text-sm md:text-base leading-tight">{budget}</p>
          </div>
          <div className="min-w-0">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-wide text-slate-400 font-semibold mb-1 hidden md:block">Source</p>
            <p className="text-[10px] sm:text-[11px] text-slate-400 mb-1 md:hidden">Source</p>
            <p className="font-bold text-slate-800 text-[13px] sm:text-sm md:text-base flex items-center gap-1 leading-tight">
              <SourceIcon source={item.source} />
              <span className="truncate">{item.source || "—"}</span>
            </p>
          </div>
        </div>

        {/* ASSIGNED ROW */}
        {isAssigned && (
          <div className="mt-3 bg-violet-50 rounded-xl sm:rounded-md px-3 sm:px-4 py-2.5 sm:py-3 flex items-center gap-2 sm:gap-3">
            <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-violet-200 flex items-center justify-center text-xs font-bold text-violet-700 shrink-0">
              {item.assign?.charAt(0)?.toUpperCase()}
            </div>
            <p className="text-xs sm:text-sm text-slate-500 truncate">
              Assigned to: <span className="font-bold text-slate-800">{item.assign}</span>
              {item.territoryName && <span className="text-slate-400"> ({item.territoryName})</span>}
            </p>
          </div>
        )}
      </div>

      {/* ── ACTION FOOTER ── */}
      {canAct && (
        <>
          {/* Mobile */}
          <div className="md:hidden px-4 pb-4">
            {!isAssigned ? (
              <button
                onClick={() => onAction("assign", item.enquirersid, item)}
                className="w-full py-3.5 rounded-xl text-white font-semibold text-sm"
                style={{ background: GRADIENT }}
              >
                Assign Partner
              </button>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => onAction("view", item.enquirersid, item)}
                  className="flex-1 py-3.5 rounded-xl text-white font-semibold text-sm"
                  style={{ background: GRADIENT }}
                >
                  Message
                </button>
                <a href={`tel:${contact}`} className="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 shrink-0">
                  <Phone size={17} className="text-slate-500" />
                </a>
                <button
                  onClick={() => onAction("status", item.enquirersid, item)}
                  className="w-12 h-12 rounded-xl border border-slate-200 flex items-center justify-center hover:bg-slate-50 shrink-0"
                >
                  <Calendar size={17} className="text-slate-500" />
                </button>
              </div>
            )}
          </div>

          {/* Desktop */}
          <div className="hidden md:flex items-center justify-between px-6 py-4 border-t border-slate-100">
            <div className="flex items-center gap-3">
              <button
                onClick={() => onAction("view", item.enquirersid, item)}
                className="text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 transition-opacity"
                style={{ background: GRADIENT }}
              >
                View Details
              </button>
              {!isAssigned ? (
                <button
                  onClick={() => onAction("assign", item.enquirersid, item)}
                  className="flex items-center gap-2 text-sm px-4 py-2.5 rounded-xl font-medium transition-colors"
                  style={{ background: "#EEF2FF", color: "#6366F1" }}
                >
                  <UserPlus size={15} /> Assign Partner
                </button>
              ) : (
                <>
                  <a href={`tel:${contact}`} className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 transition-colors">
                    <Phone size={14} /> Call
                  </a>
                  <button
                    onClick={() => onAction("status", item.enquirersid, item)}
                    className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 transition-colors"
                  >
                    <FileText size={14} /> Add Note
                  </button>
                </>
              )}
            </div>
            <button
              onClick={() => onAction("status", item.enquirersid, item)}
              className="flex items-center gap-1.5 text-sm text-slate-400 hover:text-slate-700 transition-colors"
            >
              {isAssigned ? "Schedule Visit" : "Quick View"} <ArrowRight size={14} />
            </button>
          </div>
        </>
      )}
    </div>
  );
}