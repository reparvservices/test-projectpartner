import { useState } from "react";
import AddEventHeader  from "../../components/calendar/addEvent/AddEventHeader";
import EventBasicInfo  from "../../components/calendar/addEvent/EventBasicInfo";
import ScheduleDetails from "../../components/calendar/addEvent/ScheduleDetails";
import LocationNotes   from "../../components/calendar/addEvent/LocationNotes";
import AssignmentPanel from "../../components/calendar/addEvent/AssignmentPanel";
import AddEventFooter  from "../../components/calendar/addEvent/AddEventFooter";

const DEFAULT_FORM = {
  // Basic Info
  title:       "",
  eventType:   "Site Visit",
  priority:    "Medium",
  // Schedule
  date:        "Oct 24, 2023",
  startTime:   "10:00 AM",
  endTime:     "11:30 AM",
  allDay:      false,
  reminder:    "30 minutes before",
  // Location & Notes
  location:    "",
  description: "",
  attachments: [],
  // Assignment
  assignTo:      1,
  relatedLead:   "",
  relatedProperty: "",
};

/**
 * AddEvent — root page
 * Desktop: 2-column layout (left: BasicInfo + LocationNotes | right: ScheduleDetails + Assignment)
 * Mobile:  single column stacked
 *
 * Props:
 *   onBack   : fn()
 *   onSave   : fn(formData)
 *   onCancel : fn()
 */
export default function AddEvent({ onBack, onSave, onCancel }) {
  const [form,   setForm]   = useState(DEFAULT_FORM);
  const [saving, setSaving] = useState(false);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setSaving(true);
    await new Promise(r => setTimeout(r, 800)); // simulate API call
    onSave?.(form);
    setSaving(false);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans">

      {/* ── Header: ← Add Event ── */}
      <AddEventHeader onBack={onBack} />

      {/* ── Scrollable form body ── */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl px-4 md:px-6 py-4 md:py-6">

          {/*
            Layout:
              Mobile  → 1 column: BasicInfo → Schedule → Location → Assignment
              Desktop → 2 columns: left(BasicInfo + Location) | right(Schedule + Assignment)
          */}
          <div className="flex flex-col lg:grid lg:grid-cols-[1fr_360px] gap-5">

            {/* ── LEFT COLUMN ── */}
            <div className="flex flex-col gap-5 order-1 md:order-1">
              <EventBasicInfo data={form} onChange={handleChange} />
              <LocationNotes  data={form} onChange={handleChange} />
            </div>

            {/* ── RIGHT COLUMN ── */}
            <div className="flex flex-col gap-5 order-2 md:order-2">
              <ScheduleDetails data={form} onChange={handleChange} />
              <AssignmentPanel data={form} onChange={handleChange} />
            </div>

          </div>
        </div>
      </div>

      {/* ── Footer: Cancel | Save Event ── */}
      <AddEventFooter
        onCancel={onCancel}
        onSave={handleSave}
        saving={saving}
      />
    </div>
  );
}