import { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "../../store/auth";
import {
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  isWithinInterval,
  startOfDay,
  endOfDay,
} from "date-fns";
import { formatInTimeZone, toZonedTime } from "date-fns-tz";

import CalendarHeader    from "../../components/calendar/CalendarHeader";
import CalendarStats     from "../../components/calendar/CalendarStats";
import CalendarGrid      from "../../components/calendar/CalendarGrid";
import DayPanel          from "../../components/calendar/DayPanel";
import CalendarFAB       from "../../components/calendar/CalendarFAB";
import MobileStats       from "../../components/calendar/MobileStats";
import MobileWeekStrip   from "../../components/calendar/MobileWeekStrip";
import MobileFilterChips from "../../components/calendar/MobileFilterChips";
import MobileEventCards  from "../../components/calendar/MobileEventCards";
import NoteModal         from "../../components/calendar/NoteModal";

const IST = "Asia/Kolkata";

// ── IST helpers (stable, defined outside component so no re-creation) ────────
const toIST = (date) => {
  if (!date) return null;
  try {
    const d = new Date(date);
    if (isNaN(d.getTime())) return null;
    return toZonedTime(d, IST);
  } catch {
    return null;
  }
};

const formatIST = (date, fmt) => {
  if (!date) return "";
  try {
    return formatInTimeZone(date, IST, fmt);
  } catch {
    return "";
  }
};

// Returns "yyyy-MM-dd" in IST or null
const toISTDateStr = (date) => {
  if (!date) return null;
  const d = toIST(date);
  return d ? formatIST(d, "yyyy-MM-dd") : null;
};

export default function Calendar() {
  const { URI, showNotePopup, setShowNotePopup } = useAuth();

  // ── UI state ─────────────────────────────────────────────────────────────────
  const [activeTab,    setActiveTab]    = useState("Schedule");
  const [activeView,   setActiveView]   = useState("Month");
  const [calFilter,    setCalFilter]    = useState("All");
  const [search,       setSearch]       = useState("");

  // currentDate  = month shown in the desktop grid
  // selectedDate = the day the user clicked (IST-zoned Date object)
  const [currentDate,  setCurrentDate]  = useState(() => toIST(new Date()));
  const [selectedDate, setSelectedDate] = useState(() => toIST(new Date()));

  // Mobile panel mode: Day | Week | Month | Custom
  const [mobileFilter,      setMobileFilter]      = useState("Day");
  const [customFrom,        setCustomFrom]        = useState(toISTDateStr(new Date()));
  const [customTo,          setCustomTo]          = useState(toISTDateStr(new Date()));

  // ── Data ─────────────────────────────────────────────────────────────────────
  const [meetings,   setMeetings]   = useState([]);
  const [notes,      setNotes]      = useState([]);
  const [newNote,    setNewNote]    = useState("");
  const [noteTime,   setNoteTime]   = useState("09:00");
  const [noteSaving, setNoteSaving] = useState(false);

  // ── API: Fetch meetings ───────────────────────────────────────────────────────
  const fetchMeetings = useCallback(async () => {
    try {
      const res  = await fetch(`${URI}/project-partner/calender/meetings`, {
        credentials: "include",
      });
      const data = await res.json();
      setMeetings(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("fetchMeetings:", err);
    }
  }, [URI]);

  // ── API: Fetch notes (with optional IST date filter) ─────────────────────────
  const fetchNotes = useCallback(async (date = null) => {
    try {
      let url = `${URI}/project-partner/calender/notes`;
      const d = toISTDateStr(date);
      if (d) url += `?date=${d}`;
      const res  = await fetch(url, { credentials: "include" });
      const data = await res.json();
      setNotes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("fetchNotes:", err);
    }
  }, [URI]);

  useEffect(() => {
    fetchMeetings();
    fetchNotes(); // load all notes on mount (for dot coverage)
  }, [fetchMeetings, fetchNotes]);

  useEffect(() => {
    fetchNotes(selectedDate); // reload when selected day changes
  }, [selectedDate, fetchNotes]);

  // ── API: Add note ─────────────────────────────────────────────────────────────
  const addNote = async (e) => {
    e?.preventDefault();
    if (!newNote.trim()) return;
    setNoteSaving(true);
    try {
      await fetch(`${URI}/project-partner/calender/note/add`, {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({
          date: toISTDateStr(selectedDate),
          time: noteTime,
          note: newNote,
        }),
      });
      setNewNote("");
      setNoteTime("09:00");
      setShowNotePopup(false);
      fetchNotes(selectedDate);
    } catch (err) {
      console.error("addNote:", err);
    } finally {
      setNoteSaving(false);
    }
  };

  // ── API: Delete note ──────────────────────────────────────────────────────────
  const deleteNote = async (id) => {
    if (!window.confirm("Delete this note?")) return;
    try {
      const res  = await fetch(
        `${URI}/project-partner/calender/note/delete/${id}`,
        { method: "DELETE", credentials: "include" }
      );
      const data = await res.json();
      if (res.ok) {
        setNotes(prev => prev.filter(n => n.id !== id));
      } else {
        alert(data.message || "Failed to delete note");
      }
    } catch (err) {
      console.error("deleteNote:", err);
    }
  };

  // ── Filtered sets (search + calFilter) ───────────────────────────────────────
  const filteredMeetings = useMemo(() => meetings.filter(m => {
    const text = `${m.customer || ""} ${m.remark || ""}`.toLowerCase();
    if (!text.includes(search.toLowerCase())) return false;
    if (calFilter === "Meetings")    return m.type !== "site_visit";
    if (calFilter === "Site Visits") return m.type === "site_visit";
    if (calFilter === "Notes")       return false; // meetings hidden when Notes-only
    return true; // "All"
  }), [meetings, search, calFilter]);

  const filteredNotes = useMemo(() => notes.filter(n => {
    const text = (n.note || "").toLowerCase();
    if (!text.includes(search.toLowerCase())) return false;
    if (calFilter === "Meetings" || calFilter === "Site Visits") return false;
    return true; // "All" or "Notes"
  }), [notes, search, calFilter]);

  // ── Build lookup maps (IST date string → items[]) ────────────────────────────
  const meetingMap = useMemo(() => {
    const map = new Map();
    filteredMeetings.forEach(m => {
      const ds = toISTDateStr(m.visitdate);
      if (!ds) return;
      if (!map.has(ds)) map.set(ds, []);
      map.get(ds).push(m);
    });
    return map;
  }, [filteredMeetings]);

  const noteMap = useMemo(() => {
    const map = new Map();
    filteredNotes.forEach(n => {
      const ds = toISTDateStr(n.date) || n.date; // fallback to raw string
      if (!ds) return;
      if (!map.has(ds)) map.set(ds, []);
      map.get(ds).push(n);
    });
    return map;
  }, [filteredNotes]);

  // ── Selected day derived data ─────────────────────────────────────────────────
  const selectedDateStr = toISTDateStr(selectedDate);
  const todayStr        = toISTDateStr(new Date());

  const dailyMeetings   = meetingMap.get(selectedDateStr) || [];
  const dailyNotes      = noteMap.get(selectedDateStr)    || [];
  const todayMeetings   = meetingMap.get(todayStr)        || [];

  // ── Live stats ────────────────────────────────────────────────────────────────
  const liveStats = useMemo(() => {
    let siteVisits = 0, followUps = 0;
    meetings.forEach(m => {
      if (m.type === "site_visit")   siteVisits++;
      if (m.status === "scheduled")  followUps++;
    });
    return [
      { label: "Today's Meetings", value: String(todayMeetings.length), iconKey: "users", iconBg: "bg-violet-100"  },
      { label: "Site Visits",      value: String(siteVisits),           iconKey: "map",   iconBg: "bg-emerald-100" },
      { label: "Follow-ups",       value: String(followUps),            iconKey: "phone", iconBg: "bg-orange-100"  },
      { label: "Notes",            value: String(filteredNotes.length), iconKey: "check", iconBg: "bg-blue-100"    },
    ];
  }, [meetings, todayMeetings, filteredNotes]);

  // ── Mobile range filter ───────────────────────────────────────────────────────
  const mobileRange = useMemo(() => {
    const sel = toIST(selectedDate);
    if (!sel) return null;
    if (mobileFilter === "Day")
      return { from: startOfDay(sel), to: endOfDay(sel) };
    if (mobileFilter === "Week")
      return { from: startOfDay(startOfWeek(sel, { weekStartsOn: 1 })), to: endOfDay(endOfWeek(sel, { weekStartsOn: 1 })) };
    if (mobileFilter === "Month")
      return { from: startOfDay(startOfMonth(sel)), to: endOfDay(endOfMonth(sel)) };
    if (mobileFilter === "Custom" && customFrom && customTo) {
      const f = toIST(customFrom), t = toIST(customTo);
      if (f && t && f <= t) return { from: startOfDay(f), to: endOfDay(t) };
    }
    return { from: startOfDay(sel), to: endOfDay(sel) };
  }, [mobileFilter, selectedDate, customFrom, customTo]);

  const mobileEvents = useMemo(() => {
    if (!mobileRange) return [];
    return filteredMeetings
      .filter(m => {
        const d = toIST(m.visitdate);
        return d && isWithinInterval(d, mobileRange);
      })
      .map(m => {
        const d = toIST(m.visitdate);
        return {
          id:     m.followupid,
          date:   toISTDateStr(d),
          time:   m.visittime || (d ? formatIST(d, "hh:mm a") : ""),
          title:  m.customer || "Visit",
          sub:    m.remark || "",
          accent: m.status === "completed" ? "bg-emerald-500" : "bg-violet-600",
          type:   m.type === "site_visit" ? "site_visit" : "meeting",
        };
      });
  }, [filteredMeetings, mobileRange]);

  const mobileNotes = useMemo(() => {
    if (!mobileRange) return [];
    return filteredNotes.filter(n => {
      const d = toIST(n.date);
      return d && isWithinInterval(d, mobileRange);
    });
  }, [filteredNotes, mobileRange]);

  // ── DayPanel transformed data for "Day" tab ───────────────────────────────────
  const dayPanelData = useMemo(() => ({
    meetings: dailyMeetings
      .filter(m => m.type !== "site_visit")
      .map(m => {
        const d = toIST(m.visitdate);
        return {
          time:    d ? formatIST(d, "hh:mm") : "",
          period:  d ? formatIST(d, "a")     : "",
          title:   m.customer || "Meeting",
          sub:     m.remark   || "",
          subIcon: "location",
          accent:  "#5E23DC",
        };
      }),
    siteVisits: dailyMeetings
      .filter(m => m.type === "site_visit")
      .map(m => {
        const d = toIST(m.visitdate);
        return {
          time:    d ? formatIST(d, "hh:mm") : "",
          period:  d ? formatIST(d, "a")     : "",
          title:   m.customer || "Site Visit",
          sub:     m.remark   || "",
          subIcon: "building",
          accent:  "#059669",
        };
      }),
    tasks: [],
  }), [dailyMeetings]);

  // ── Month navigation ──────────────────────────────────────────────────────────
  const handlePrevMonth = () => setCurrentDate(prev => toIST(subMonths(prev, 1)));
  const handleNextMonth = () => setCurrentDate(prev => toIST(addMonths(prev, 1)));

  const handleDaySelect = (day) => {
    const d = toIST(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
    setSelectedDate(d);
  };

  const openModal = () => setShowNotePopup(true);

  return (
    <div className="min-h-screen font-sans">

      <CalendarHeader
        activeView={activeView}
        onViewChange={setActiveView}
        onAddEvent={openModal}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        onSearch={setSearch}
        activeFilter={calFilter}
        onFilterChange={setCalFilter}
      />

      {/* ── Mobile ── */}
      <div className="md:hidden bg-white">
        <MobileStats stats={liveStats.slice(0, 3)} />

        <MobileWeekStrip
          selectedDate={selectedDate}
          onSelectDate={(d) => {
            const ist = toIST(d);
            setSelectedDate(ist);
            setCurrentDate(ist);
          }}
          meetings={filteredMeetings}
          notes={filteredNotes}
          activeFilter={mobileFilter}
          onFilterChange={setMobileFilter}
          customFrom={customFrom}
          customTo={customTo}
          onCustomFromChange={setCustomFrom}
          onCustomToChange={setCustomTo}
        />

        <MobileFilterChips active={calFilter} onChange={setCalFilter} />

        <MobileEventCards
          events={mobileEvents}
          dailyNotes={mobileNotes}
          activeFilter={calFilter}
          onQuickAdd={openModal}
          onDeleteNote={deleteNote}
        />
      </div>

      {/* ── Desktop ── */}
      <div className="hidden md:block">
        <CalendarStats stats={liveStats} />

        <div className="px-7 pb-7 flex gap-4">
          <CalendarGrid
            currentDate={currentDate}
            selectedDay={selectedDate.getDate()}
            onSelectDay={handleDaySelect}
            onPrev={handlePrevMonth}
            onNext={handleNextMonth}
            activeFilter={calFilter}
            onFilter={setCalFilter}
            meetings={filteredMeetings}
            notes={filteredNotes}
          />

          <DayPanel
            selectedDate={selectedDate}
            currentDate={currentDate}
            data={dayPanelData}
            dailyNotes={dailyNotes}
            allMeetings={filteredMeetings}
            allNotes={filteredNotes}
            onQuickAdd={openModal}
            onDeleteNote={deleteNote}
            activeFilter={calFilter}
          />
        </div>

        <CalendarFAB onClick={openModal} />
      </div>

      <NoteModal
        show={showNotePopup}
        selectedDate={selectedDate}
        newNote={newNote}
        noteTime={noteTime}
        saving={noteSaving}
        onNoteChange={setNewNote}
        onTimeChange={setNoteTime}
        onSubmit={addNote}
        onClose={() => {
          setShowNotePopup(false);
          setNewNote("");
          setNoteTime("09:00");
        }}
      />
    </div>
  );
}