import { useState } from "react";

// Shared components
import CalendarHeader    from "../../components/calendar/CalendarHeader";
import CalendarTabs      from "../../components/calendar/CalendarTabs";
import CalendarStats     from "../../components/calendar/CalendarStats";
import CalendarGrid      from "../../components/calendar/CalendarGrid";
import DayPanel          from "../../components/calendar/DayPanel";
import CalendarFAB       from "../../components/calendar/CalendarFAB";

// Mobile-only components
import MobileStats       from "../../components/calendar/MobileStats";
import MobileWeekStrip   from "../../components/calendar/MobileWeekStrip";
import MobileFilterChips from "../../components/calendar/MobileFilterChips";
import MobileEventCards  from "../../components/calendar/MobileEventCards";
import MobileBottomNav   from "../../components/calendar/MobileBottomNav";

/**
 * CalendarPage — root component
 * Renders a fully responsive calendar:
 *   • Mobile  (<md): Header (back+title+FAB) → Search → Tabs → Stats → Week strip → Filter chips → Event cards → Bottom nav
 *   • Desktop (≥md): Header → Tabs → Stats grid → Calendar grid + Day panel → FAB
 */
export default function Calendar() {
  const [activeTab,   setActiveTab]   = useState("Schedule");
  const [activeView,  setActiveView]  = useState("Month");
  const [calFilter,   setCalFilter]   = useState("All");
  const [selectedDay, setSelectedDay] = useState(11);
  const [activeNav,   setActiveNav]   = useState("calendar");

  const handleAddEvent = () => {
    alert("Open Add Event modal");
  };

  return (
    <div className="min-h-screen font-sans bg-gray-50">

      {/* ══════════════════════════════════════════════
          SHARED HEADER
          Mobile:  back arrow | Calendar title | + FAB  +  search row  +  tab row
          Desktop: brand | search | view switcher | filter | Add Event button
      ══════════════════════════════════════════════ */}
      <CalendarHeader
        activeView={activeView}
        onViewChange={setActiveView}
        onAddEvent={handleAddEvent}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* ══════════════════════════════════════════════
          MOBILE LAYOUT  (hidden on md+)
      ══════════════════════════════════════════════ */}
      <div className="md:hidden bg-white">

        {/* Stat row: Today's Meetings | Site Visits | Follow-ups */}
        <MobileStats />

        {/* Horizontal week strip: ← October 2023 → + Mon–Sun row */}
        <MobileWeekStrip
          selectedDay={selectedDay}
          onSelectDay={setSelectedDay}
          monthLabel="October 2023"
        />

        {/* Filter chips: All | Meetings | Site Visits | Follow-ups */}
        <MobileFilterChips
          active={calFilter}
          onChange={setCalFilter}
        />

        {/* Event cards list + Quick Add */}
        <MobileEventCards
          onQuickAdd={handleAddEvent}
        />
      </div>

      {/* ══════════════════════════════════════════════
          DESKTOP LAYOUT  (hidden below md)
      ══════════════════════════════════════════════ */}
      <div className="hidden md:block">

        {/* Schedule / Tasks / Notes tab strip */}
        <CalendarTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />

        {/* 4-card stat row */}
        <CalendarStats />

        {/* Calendar grid + day panel side by side */}
        <div className="px-7 pb-7 flex gap-4 items-start">
          <CalendarGrid
            selectedDay={selectedDay}
            onSelectDay={setSelectedDay}
            activeFilter={calFilter}
            onFilter={setCalFilter}
          />
          <DayPanel
            day={selectedDay}
            onQuickAdd={handleAddEvent}
          />
        </div>

        {/* Floating action button */}
        <CalendarFAB onClick={handleAddEvent} />
      </div>

      {/* ══════════════════════════════════════════════
          MOBILE BOTTOM NAV  (hidden on md+)
          Feed | Dashboard | [+FAB] | Calendar | Profile
      ══════════════════════════════════════════════ */}
      <MobileBottomNav
        active={activeNav}
        onChange={setActiveNav}
        onFAB={handleAddEvent}
      />
    </div>
  );
}