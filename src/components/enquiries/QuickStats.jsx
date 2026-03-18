const GRADIENT = "linear-gradient(110.73deg, #5323DC 0%, #8E61FF 100%)";

export default function QuickStats({ counts = {}, total = 0 }) {
  const stats = [
    { label: "Total",          value: total,                  bg: "bg-slate-100",   text: "text-slate-700" },
    { label: "New",            value: counts.New || 0,        bg: "bg-green-50",    text: "text-green-600" },
    { label: "Alloted",        value: counts.Alloted || 0,    bg: "bg-yellow-50",   text: "text-yellow-600" },
    { label: "Assigned",       value: counts.Assign || 0,     bg: "bg-blue-50",     text: "text-blue-600" },
    { label: "Digital Broker", value: counts.DigitalBroker || 0, bg: "bg-violet-50", text: "text-violet-600" },
  ];

  return (
    <div className="bg-white rounded-md border border-slate-200 p-5">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-slate-900">Quick Stats</p>
        <span className="text-xs text-slate-400">Live</span>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {stats.map((s) => (
          <div key={s.label} className={`${s.bg} rounded-xl p-3.5`}>
            <p className={`text-2xl font-bold ${s.text}`}>{s.value}</p>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">{s.label}</p>
          </div>
        ))}
      </div>
    </div>
  );
}