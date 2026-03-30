import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { format } from "date-fns";

import AddEventHeader from "../../components/calendar/addEvent/AddEventHeader";
import EventBasicInfo   from "../../components/calendar/addEvent/EventBasicInfo";
import ScheduleDetails  from "../../components/calendar/addEvent/ScheduleDetails";
import LocationNotes    from "../../components/calendar/addEvent/LocationNotes";
import AssignmentPanel  from "../../components/calendar/addEvent/AssignmentPanel";
import AddEventFooter from "../../components/calendar/addEvent/AddEventFooter";


const DEFAULT_FORM = {
  title:           "",
  eventType:       "Site Visit",
  priority:        "Medium",
  date:            format(new Date(), "yyyy-MM-dd"),
  startTime:       "10:00",
  endTime:         "11:30",
  allDay:          false,
  reminder:        "30 minutes before",
  location:        "",
  description:     "",
  attachments:     [],
  assignTo:        1,
  relatedLead:     "",
  relatedProperty: "",
};

/**
 * AddEvent — root page
 *
 * API:  POST /project-partner/calender/event/add
 * Body: { title, eventType, priority, date, startTime, endTime,
 *          allDay, reminder, location, description, assignTo,
 *          relatedLead, relatedProperty }
 *
 * Props:
 *   onBack   : fn()  — optional, falls back to navigate(-1)
 *   onSave   : fn(savedData)  — called after successful save
 *   onCancel : fn()  — optional, falls back to navigate(-1)
 */
export default function AddEvent({ onBack, onSave, onCancel }) {
  const { URI } = useAuth();
  const navigate = useNavigate();

  const [form,    setForm]    = useState(DEFAULT_FORM);
  const [saving,  setSaving]  = useState(false);
  const [error,   setError]   = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
    setError("");
  };

  const validate = () => {
    if (!form.title.trim())     return "Event title is required.";
    if (!form.date)             return "Date is required.";
    if (!form.startTime)        return "Start time is required.";
    return "";
  };

  const handleSave = async () => {
    const err = validate();
    if (err) { setError(err); return; }

    setSaving(true);
    setError("");

    try {
      // Build FormData to support file attachments
      const formData = new FormData();
      Object.entries(form).forEach(([key, val]) => {
        if (key === "attachments") {
          val.forEach(f => formData.append("attachments", f));
        } else {
          formData.append(key, val);
        }
      });

      const res = await fetch(`${URI}/project-partner/calender/event/add`, {
        method:      "POST",
        credentials: "include",
        body:        formData,
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message || "Failed to save event.");

      setSuccess(true);
      onSave?.(data);

      // Reset after 1.5s
      setTimeout(() => {
        setForm(DEFAULT_FORM);
        setSuccess(false);
      }, 1500);

    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleBack   = () => { onBack?.()   || navigate(-1); };
  const handleCancel = () => { onCancel?.() || navigate(-1); };

  return (
    <div className="min-h-screen flex flex-col font-sans">

      {/* Sticky header */}
      <AddEventHeader onBack={handleBack} />

      {/* Scrollable form body */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-6xl px-4 md:px-6 py-4 md:py-6">

          {/* Success banner */}
          {success && (
            <div className="mb-4 flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-xl text-green-700 text-sm font-medium">
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
              Event saved successfully!
            </div>
          )}

          {/* Error banner */}
          {error && (
            <div className="mb-4 flex items-center gap-2 px-4 py-3 bg-red-50 border border-red-200 rounded-xl text-red-600 text-sm font-medium">
              <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
              </svg>
              {error}
            </div>
          )}

          {/* Layout: 1 col mobile, 2 col desktop */}
          <div className="flex flex-col lg:grid lg:grid-cols-[1fr_360px] gap-5">

            {/* Left column */}
            <div className="flex flex-col gap-5 order-1">
              <EventBasicInfo data={form} onChange={handleChange} />
              <LocationNotes  data={form} onChange={handleChange} />
            </div>

            {/* Right column */}
            <div className="flex flex-col gap-5 order-2">
              <ScheduleDetails data={form} onChange={handleChange} />
              <AssignmentPanel data={form} onChange={handleChange} />
            </div>
          </div>
        </div>
      </div>

      {/* Sticky footer */}
      <AddEventFooter
        onCancel={handleCancel}
        onSave={handleSave}
        saving={saving}
      />
    </div>
  );
}