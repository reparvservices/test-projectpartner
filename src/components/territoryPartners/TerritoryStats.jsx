import { TrendingUp, MapPin, Users, Clock } from "lucide-react";

const stats = [
  { label: "Total Territory Partners", value: "342",   sub: "+8% vs last month", icon: TrendingUp, color: "text-emerald-500" },
  { label: "Active Territories",        value: "56",    sub: "+3 new zones",      icon: MapPin,     color: "text-emerald-500" },
  { label: "Covered Cities",            value: "18",    sub: "Across 4 states",   icon: null,       color: "text-gray-400"    },
  { label: "Leads Assigned",            value: "1,250", sub: "+15% growth",       icon: Users,      color: "text-emerald-500" },
  { label: "Pending Followups",         value: "85",    sub: "Requires action",   icon: Clock,      color: "text-amber-500"   },
];

function StatCard({ s }) {
  return (
    <div className="bg-white rounded-[12px] border border-gray-100 px-5 py-5 shadow-sm hover:shadow-md transition-shadow shrink-0">
      <p className="text-[12.5px] text-gray-400 font-medium mb-3 whitespace-nowrap">{s.label}</p>
      <p className="text-[28px] font-extrabold text-gray-900 leading-none tracking-tight mb-3">{s.value}</p>
      <p className={`text-[12.5px] font-semibold flex items-center gap-1.5 ${s.color}`}>
        {s.icon && <s.icon size={13} />}
        {s.sub}
      </p>
    </div>
  );
}

export default function TerritoryStats() {
  return (
    <>
      {/* Mobile: scroll */}
      <div className="flex md:hidden gap-3 overflow-x-auto pb-1 scrollbar-none snap-x snap-mandatory">
        {stats.map((s, i) => (
          <div key={i} className="snap-start w-[52vw] min-w-[175px] max-w-[210px]">
            <StatCard s={s} />
          </div>
        ))}
      </div>
      {/* Desktop: grid */}
      <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((s, i) => <StatCard key={i} s={s} />)}
      </div>
    </>
  );
}