import { UsersIcon, MapPinIcon, PhoneCallIcon } from "./CalendarIcons";

const MOBILE_STATS = [
  { label: "Today's\nMeetings", value: "5",  icon: <UsersIcon />,     iconBg: "bg-violet-100" },
  { label: "Site Visits",       value: "12", icon: <MapPinIcon />,    iconBg: "bg-emerald-100" },
  { label: "Follow-ups",        value: "8",  icon: <PhoneCallIcon />, iconBg: "bg-orange-100" },
];

/**
 * MobileStats
 * Horizontal 3-column stat strip shown on mobile schedule view.
 * Props:
 *   stats : array — optional override
 */
export default function MobileStats({ stats = MOBILE_STATS }) {
  return (
    <div className="flex items-start justify-between px-4 py-4 bg-white border-b border-gray-100">
      {stats.map((s, i) => (
        <div key={i} className="flex items-center gap-3 flex-1">
          {/* Icon */}
          <div className={`w-8 h-8 md:w-11 md:h-11 rounded-lg ${s.iconBg} flex items-center justify-center flex-shrink-0`}>
            {s.icon}
          </div>
          {/* Value + Label */}
          <div>
            <p className="text-2xl font-bold text-gray-900 leading-tight">{s.value}</p>
            <p className="text-[12px] text-gray-400 leading-snug whitespace-pre-line">{s.label}</p>
          </div>
          {/* Divider except last */}
          {i < stats.length - 1 && (
            <div className="w-px h-10 bg-gray-100 ml-auto mr-1 flex-shrink-0" />
          )}
        </div>
      ))}
    </div>
  );
}