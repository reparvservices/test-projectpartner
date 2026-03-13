import { Users, UserCheck, HardHat, IndianRupee, TrendingUp } from "lucide-react";

const stats = [
  {
    label: "Total Employees",
    value: "124",
    sub: "+12% this month",
    subColor: "text-emerald-500",
    subIcon: TrendingUp,
    iconBg: "bg-blue-50",
    iconColor: "text-blue-500",
    Icon: Users,
  },
  {
    label: "Active Employees",
    value: "112",
    sub: "Currently working",
    subColor: "text-gray-400",
    subIcon: null,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    Icon: UserCheck,
  },
  {
    label: "Site Engineers",
    value: "45",
    sub: "Across 12 sites",
    subColor: "text-gray-400",
    subIcon: null,
    iconBg: "bg-orange-50",
    iconColor: "text-orange-500",
    Icon: HardHat,
  },
  {
    label: "Monthly Salary",
    value: "₹ 48.5 L",
    sub: "Last processed Oct 01",
    subColor: "text-gray-400",
    subIcon: null,
    iconBg: "bg-violet-50",
    iconColor: "text-violet-500",
    Icon: IndianRupee,
  },
];

function StatCard({ s }) {
  return (
    <div className="bg-white rounded-[14px] border border-gray-100 px-5 py-5 shadow-sm hover:shadow-md transition-shadow shrink-0">
      <div className="flex items-start justify-between mb-4">
        <p className="text-[13px] text-gray-400 font-medium">{s.label}</p>
        <div className={`w-10 h-10 rounded-[10px] flex items-center justify-center ${s.iconBg}`}>
          <s.Icon size={18} className={s.iconColor} />
        </div>
      </div>
      <p className="text-[28px] font-extrabold text-gray-900 leading-none tracking-tight mb-2">{s.value}</p>
      <p className={`text-[12.5px] font-semibold flex items-center gap-1.5 ${s.subColor}`}>
        {s.subIcon && <s.subIcon size={13} />}
        {s.sub}
      </p>
    </div>
  );
}

export default function EmployeeStats() {
  return (
    <>
      {/* Mobile: horizontal scroll */}
      <div className="flex md:hidden gap-3 overflow-x-auto pb-1 scrollbar-none snap-x snap-mandatory">
        {stats.map((s, i) => (
          <div key={i} className="snap-start w-[52vw] min-w-[180px] max-w-[220px] shrink-0">
            <StatCard s={s} />
          </div>
        ))}
      </div>
      {/* Desktop: 4-col grid */}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((s, i) => <StatCard key={i} s={s} />)}
      </div>
    </>
  );
}