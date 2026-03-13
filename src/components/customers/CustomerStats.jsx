const stats = [
  { label: "Total Customers", value: "342",   color: "text-gray-900" },
  { label: "Active Leads",    value: "128",   color: "text-gray-900" },
  { label: "Hot Prospects",   value: "9",     color: "text-red-500"  },
  { label: "Conversion Rate", value: "12.4%", color: "text-emerald-500" },
];

export default function CustomerStats() {
  return (
    <div className="bg-white rounded-[8px] p-5 border shadow-sm">
      <h3 className="text-[15px] font-extrabold text-gray-900 mb-4">Customer Stats</h3>

      <div className="flex flex-col divide-y divide-gray-200">
        {stats.map((s, i) => (
          <div key={i} className="flex items-center justify-between py-3 first:pt-0 last:pb-0">
            <p className="text-[13px] text-gray-400 font-medium">{s.label}</p>
            <p className={`text-[15px] font-extrabold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}