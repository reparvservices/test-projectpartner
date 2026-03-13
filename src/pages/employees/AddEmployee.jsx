import { useState } from "react";
import {
  ArrowLeft, Calendar, ChevronDown, CloudUpload
} from "lucide-react";

const GRADIENT = "linear-gradient(110.73deg, #5E23DC 0%, #7C3AED 100%)";

/* ── Toggle ── */
function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-all duration-200 focus:outline-none shrink-0 ${
        checked ? "bg-violet-600" : "bg-gray-200"
      }`}
    >
      <span className={`absolute top-[3px] w-[18px] h-[18px] bg-white rounded-full shadow transition-all duration-200 ${
        checked ? "left-[22px]" : "left-[3px]"
      }`} />
    </button>
  );
}

/* ── Section Header ── */
function SectionHeader({ title, subtitle }) {
  return (
    <div className="mb-6">
      <h2 className="text-[16px] font-extrabold text-gray-900">{title}</h2>
      {subtitle && <p className="text-[12.5px] text-gray-400 mt-0.5">{subtitle}</p>}
      <div className="mt-4 border-b border-gray-100" />
    </div>
  );
}

/* ── Label ── */
function Label({ children, required }) {
  return (
    <label className="block text-[13px] font-medium text-gray-700 mb-2">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

/* ── Input ── */
function Input({ label, required, prefix, suffix, ...props }) {
  return (
    <div>
      {label && <Label required={required}>{label}</Label>}
      <div className="relative flex items-center">
        {prefix && (
          <span className="absolute left-3.5 text-[13px] text-gray-400 select-none pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          className={`w-full border border-gray-200 rounded-[6px] py-[10px] text-[13.5px] text-gray-800 placeholder:text-gray-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-50 transition-all bg-white ${
            prefix ? "pl-10 pr-3.5" : suffix ? "pl-3.5 pr-10" : "px-3.5"
          }`}
          {...props}
        />
        {suffix && (
          <span className="absolute right-3.5 text-gray-400 pointer-events-none">{suffix}</span>
        )}
      </div>
    </div>
  );
}

/* ── Select ── */
function SelectField({ label, required, children }) {
  return (
    <div>
      {label && <Label required={required}>{label}</Label>}
      <div className="relative">
        <select className="w-full border border-gray-200 rounded-[6px] px-3.5 py-[10px] text-[13.5px] text-gray-800 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-50 transition-all appearance-none bg-white cursor-pointer pr-9">
          {children}
        </select>
        <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
      </div>
    </div>
  );
}

/* ── Textarea ── */
function Textarea({ label, required, rows = 3, ...props }) {
  return (
    <div>
      {label && <Label required={required}>{label}</Label>}
      <textarea
        rows={rows}
        className="w-full border border-gray-200 rounded-[6px] px-3.5 py-[10px] text-[13.5px] text-gray-800 placeholder:text-gray-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-50 transition-all resize-none bg-white"
        {...props}
      />
    </div>
  );
}

/* ── Section Card ── */
function SectionCard({ children }) {
  return (
    <div className="bg-white rounded-[10px] border border-gray-100 px-6 py-6 shadow-sm">
      {children}
    </div>
  );
}

/* ── Main Component ── */
export default function AddEmployee({ onBack }) {
  const [isActive, setIsActive] = useState(true);
  const [photoFile, setPhotoFile] = useState(null);

  return (
    <div className="min-h-screen flex flex-col">

      {/* ── Sticky Header ── */}
      <div className="sticky top-0 z-20 flex items-center gap-3 px-5 md:px-8 py-4 border-b border-gray-100 bg-white">
        <button
          onClick={onBack}
          className="p-1.5 rounded-[6px] hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={18} className="text-gray-800" strokeWidth={2.2} />
        </button>
        <h1 className="text-[17px] font-extrabold text-gray-900">Add Employee</h1>
      </div>

      {/* ── Scrollable Body ── */}
      <div className="flex-1 overflow-y-auto py-6 px-4 md:px-8">
        <div className="max-w-6xl space-y-5">

          {/* ── 1. Personal Information ── */}
          <SectionCard>
            <SectionHeader
              title="Personal Information"
              subtitle="Basic identification details as per official documents."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <Input
                label="Full Name (As per UID)"
                required
                placeholder="e.g. Rahul Sharma"
              />

              <Input
                label="Date of Birth"
                placeholder="DD/MM/YYYY"
                suffix={<Calendar size={15} className="text-gray-400" />}
              />

              <Input
                label="Contact Number"
                placeholder="98765 43210"
                prefix="+91"
              />

              <Input
                label="Email Address"
                placeholder="rahul@reparv.com"
                type="email"
              />

              <div className="md:col-span-2 md:w-1/2">
                <Input
                  label="Aadhaar Number"
                  placeholder="0000 0000 0000"
                />
              </div>

              <div className="md:col-span-2">
                <Textarea
                  label="Full Address"
                  rows={3}
                  placeholder="Enter permanent residential address"
                />
              </div>

              <SelectField label="State">
                <option value="">Select State</option>
                <option>Maharashtra</option>
                <option>Karnataka</option>
                <option>Delhi</option>
                <option>Tamil Nadu</option>
                <option>Telangana</option>
                <option>Gujarat</option>
              </SelectField>

              <SelectField label="City">
                <option value="">Select City</option>
                <option>Mumbai</option>
                <option>Bangalore</option>
                <option>Delhi</option>
                <option>Chennai</option>
                <option>Hyderabad</option>
                <option>Ahmedabad</option>
              </SelectField>

            </div>
          </SectionCard>

          {/* ── 2. Organization Details ── */}
          <SectionCard>
            <SectionHeader
              title="Organization Details"
              subtitle="Role, department, and compensation information."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <SelectField label="Department">
                <option value="">Select Department</option>
                <option>Sales</option>
                <option>Marketing</option>
                <option>Operations</option>
                <option>Finance</option>
                <option>Technology</option>
                <option>HR</option>
              </SelectField>

              <SelectField label="Role">
                <option value="">Select Role</option>
                <option>Manager</option>
                <option>Executive</option>
                <option>Senior Associate</option>
                <option>Associate</option>
                <option>Intern</option>
              </SelectField>

              <SelectField label="Project Assigned">
                <option value="">Select Project</option>
                <option>Skyline Towers</option>
                <option>Green Valley</option>
                <option>Prestige Heights</option>
                <option>Urban Lofts</option>
              </SelectField>

              <Input
                label="Annual Salary (CTC)"
                placeholder="0.00"
                prefix="₹"
                type="number"
              />

              <Input
                label="Date of Joining"
                placeholder="DD/MM/YYYY"
                suffix={<Calendar size={15} className="text-gray-400" />}
              />

              {/* Employee Status with toggle */}
              <div>
                <Label>Employee Status</Label>
                <div className="flex items-center gap-3 border border-gray-200 rounded-[6px] px-3.5 py-[10px]">
                  <Toggle checked={isActive} onChange={setIsActive} />
                  <span className="text-[13.5px] font-medium text-gray-700">
                    {isActive ? "Active Employee" : "Inactive Employee"}
                  </span>
                </div>
              </div>

            </div>
          </SectionCard>

          {/* ── 3. Optional Details ── */}
          <SectionCard>
            <SectionHeader
              title="Optional Details"
              subtitle="Additional information and file uploads."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

              <div>
                <Input
                  label="Emergency Contact"
                  placeholder="Name & Number"
                />
              </div>

              {/* Profile Photo Upload */}
              <div>
                <Label>Profile Photo</Label>
                <label className="block cursor-pointer">
                  <div className="border border-dashed border-gray-200 rounded-[6px] px-4 py-6 flex flex-col items-center justify-center gap-2 bg-gray-50 hover:border-violet-300 hover:bg-violet-50/20 transition-all">
                    <CloudUpload size={26} className="text-violet-500" />
                    <p className="text-[13px] text-gray-500 text-center">
                      <span className="text-violet-600 font-semibold">Click to upload</span>
                      {" "}or drag and drop
                    </p>
                    {photoFile && (
                      <p className="text-[12px] text-gray-500 truncate max-w-full px-2">{photoFile.name}</p>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => setPhotoFile(e.target.files?.[0] || null)}
                  />
                </label>
              </div>

              <div className="md:col-span-2">
                <Textarea
                  label="Additional Notes"
                  rows={3}
                  placeholder="Any specific remarks..."
                />
              </div>

            </div>
          </SectionCard>

          <div className="h-2" />
        </div>
      </div>

      {/* ── Sticky Footer ── */}
      <div className="md:sticky bottom-0 z-20 bg-white border-t border-gray-100 px-5 md:px-8 py-4 flex items-center justify-between gap-4">
        <button
          type="button"
          className="px-6 py-2.5 rounded-[8px] border border-gray-200 text-[13.5px] font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>
        <button
          type="button"
          className="px-7 py-2.5 rounded-[8px] text-[14px] font-bold text-white shadow-[0_4px_14px_rgba(94,35,220,0.3)] hover:opacity-90 transition-opacity"
          style={{ background: GRADIENT }}
        >
          Save Employee
        </button>
      </div>

    </div>
  );
}