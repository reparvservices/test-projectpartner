import { useState } from "react";
import { SearchIcon, FilterIcon, PlusIcon } from "./CalendarIcons";
import { VIEW_OPTIONS } from "./calendarData";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const NAV_TABS = ["Schedule", "Tasks", "Notes"];

/**
 * CalendarHeader
 * Props:
 *   activeView   : string
 *   onViewChange : fn(view)
 *   onAddEvent   : fn()
 *   activeTab    : string         — mobile tabs (passed from parent)
 *   onTabChange  : fn(tab)        — mobile tabs
 */
export default function CalendarHeader({
  activeView,
  onViewChange,
  onAddEvent,
  activeTab,
  onTabChange,
}) {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  return (
    <>
      {/* ════════════════════════════════════════════
          MOBILE  (hidden on md+)
      ════════════════════════════════════════════ */}
      <div className="md:hidden flex flex-col">

        {/* Row 1: Back ← | Calendar | + FAB */}
        <div className="flex items-center justify-between px-4 h-14">
          <button onClick={()=>{navigate(-1)}} className="p-1.5 rounded-full hover:bg-slate-100 transition-colors">
            <ArrowLeft size={20} className="text-slate-900" strokeWidth={2.2} />
          </button>
          <span className="text-[15px] font-semibold tracking-wide">
            Calendar
          </span>

          <button
            onClick={onAddEvent}
            className="w-10 h-10 rounded-full bg-violet-600 hover:bg-violet-700 active:scale-90 flex items-center justify-center text-white shadow-lg shadow-violet-500/40 transition-all cursor-pointer"
          >
            <PlusIcon size={18} />
          </button>
        </div>

        {/* Row 2: Search bar */}
        <div className="px-4 pt-3 pb-2">
          <div className="relative flex items-center">
            <span className="absolute left-3.5  text-gray-400 pointer-events-none">
              <SearchIcon />
            </span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search events, properties..."
              className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-lg text-sm text-gray-600 outline-none focus:border-violet-400 focus:bg-white transition-all placeholder:text-gray-400"
            />
          </div>
        </div>
      </div>

      {/* ════════════════════════════════════════════
          DESKTOP  (hidden below md)
      ════════════════════════════════════════════ */}
      <div className="hidden w-full md:flex flex-col">

        {/* Top bar */}
        <div className="border-b px-7 py-4 md:py-5 flex flex-wrap items-center gap-5">

          {/* Brand */}
          <div className="min-w-[170px]">
            <p className="text-lg font-bold text-gray-900 leading-tight">Calendar</p>
            <p className="text-xs text-violet-600 mt-0.5">Meetings • Tasks • Site Visits</p>
          </div>

          {/* Search */}
          <div className="flex-1 max-w-sm relative flex flex-wrap items-center">
            <span className="absolute left-3 text-gray-400 pointer-events-none">
              <SearchIcon />
            </span>
            <input
              value={search}
              onChange={e => setSearch(e.target.value)}
              placeholder="Search events, properties..."
              className="w-full min-w-[300px] pl-9 pr-3 py-2 border rounded-md text-sm text-gray-700 bg-white outline-none focus:border-violet-500 transition-colors placeholder:text-gray-400"
            />
          </div>

          <div className="flex-1" />

          {/* View Switcher */}
          <div className="flex items-center bg-white border border-gray-200 rounded-md overflow-hidden divide-x divide-gray-200">
            {VIEW_OPTIONS.map(v => (
              <button
                key={v}
                onClick={() => onViewChange?.(v)}
                className={`px-4 py-2 text-sm cursor-pointer transition-colors
                  ${v === activeView
                    ? "font-bold text-gray-900"
                    : "font-normal text-gray-400 hover:text-gray-600"
                  }`}
              >
                {v}
              </button>
            ))}
          </div>

          {/* Filter */}
          <button className="w-9 h-9 rounded-md border border-gray-200 bg-white flex items-center justify-center text-gray-400 cursor-pointer hover:border-violet-500 hover:text-violet-600 transition-colors">
            <FilterIcon />
          </button>

          {/* Add Event */}
          <button
            onClick={onAddEvent}
            className="flex items-center gap-1.5 px-5 py-2 bg-[#5323DC] hover:bg-[#5323DC] active:scale-95 text-white rounded-md text-sm font-semibold cursor-pointer shadow-md shadow-violet-200 transition-all"
          >
            <PlusIcon size={15} />
            Add Event
          </button>
        </div>
      </div>
    </>
  );
}