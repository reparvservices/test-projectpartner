import { PlusIcon, LocationPinIcon, BuildingIcon } from "./CalendarIcons";

const DotsHIcon = () => (
  <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
    <circle cx="5" cy="12" r="2" /><circle cx="12" cy="12" r="2" /><circle cx="19" cy="12" r="2" />
  </svg>
);

const EVENTS = [
  {
    id: 1,
    time: "10:00 AM",
    title: "Client Meeting: Mr. Verma",
    sub: "Office HQ, Conf Room 1",
    subIcon: "location",
    accent: "bg-violet-600",
    avatar: "https://i.pravatar.cc/40?img=12",
    type: "meeting",
  },
  {
    id: 2,
    time: "02:30 PM",
    title: "Progress Inspection",
    sub: "Skyline Towers – Block B",
    subIcon: "building",
    accent: "bg-emerald-500",
    assignedTo: "Rajesh K.",
    assignedAvatar: "https://i.pravatar.cc/40?img=8",
    type: "visit",
  },
];

function SubIcon({ type }) {
  if (type === "location") return <LocationPinIcon />;
  return <BuildingIcon />;
}

function EventCard({ time, title, sub, subIcon, accent, avatar, assignedTo, assignedAvatar }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      {/* Left accent bar */}
      <div className="flex">
        <div className={`w-1.5 flex-shrink-0 ${accent}`} />
        <div className="flex-1 px-4 py-4">

          {/* Time + dots */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-[13px] font-medium text-gray-400">{time}</span>
            <button className="text-gray-400 hover:text-gray-600 cursor-pointer transition-colors">
              <DotsHIcon />
            </button>
          </div>

          {/* Title */}
          <h3 className="text-[17px] font-bold text-gray-900 mb-2 leading-snug">{title}</h3>

          {/* Subtitle */}
          {sub && (
            <div className="flex items-center gap-1.5 text-gray-400 text-sm mb-3">
              <SubIcon type={subIcon} />
              <span>{sub}</span>
            </div>
          )}

          {/* Avatar or Assigned to */}
          {avatar && !assignedTo && (
            <div className="flex justify-end">
              <img src={avatar} alt="avatar" className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm" />
            </div>
          )}
          {assignedTo && (
            <div className="flex items-center justify-end gap-2 mt-1">
              <span className="text-[13px] text-gray-400">Assigned to:</span>
              <span className="text-[13px] font-semibold text-gray-700">{assignedTo}</span>
              {assignedAvatar && (
                <img src={assignedAvatar} alt={assignedTo} className="w-9 h-9 rounded-full object-cover border-2 border-white shadow-sm" />
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/**
 * MobileEventCards
 * Full-width event cards list for mobile schedule view.
 * Props:
 *   events     : array   — optional override
 *   onQuickAdd : fn()
 */
export default function MobileEventCards({ events = EVENTS, onQuickAdd }) {
  return (
    <div className="px-4 py-4 flex flex-col gap-3 pb-32">
      {events.map(e => (
        <EventCard key={e.id} {...e} />
      ))}

      {/* Quick Add */}
      <button
        onClick={onQuickAdd}
        className="w-full mt-2 border-2 border-dashed border-gray-200 rounded-2xl py-4 flex items-center justify-center gap-2 text-sm text-gray-400 cursor-pointer hover:border-violet-400 hover:text-violet-500 transition-colors bg-white"
      >
        <PlusIcon size={15} />
        Quick Add Event
      </button>
    </div>
  );
}