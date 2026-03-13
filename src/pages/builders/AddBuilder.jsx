import { useState } from "react";
import {
  ArrowLeft, UploadCloud, Plus, X, Check,
  Building2, Contact, FileText, Award, Settings,
  Globe, Calendar
} from "lucide-react";

const GRADIENT = "linear-gradient(110.73deg, #5E23DC 0%, #7C3AED 100%)";

/* ── Reusable Toggle ── */
function Toggle({ checked, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative w-11 h-6 rounded-full transition-all duration-200 focus:outline-none flex-shrink-0 ${
        checked ? "bg-violet-600" : "bg-gray-200"
      }`}
    >
      <span
        className={`absolute top-[3px] w-[18px] h-[18px] bg-white rounded-full shadow transition-all duration-200 ${
          checked ? "left-[22px]" : "left-[3px]"
        }`}
      />
    </button>
  );
}

/* ── Tag input row ── */
function TagInput({ placeholder, tags, onAdd, onRemove }) {
  const [val, setVal] = useState("");

  const add = () => {
    if (val.trim()) { onAdd(val.trim()); setVal(""); }
  };

  return (
    <div className="space-y-3">
      <div className="flex items-center border border-gray-200 rounded-[6px] overflow-hidden focus-within:border-violet-400 transition-colors">
        <input
          value={val}
          onChange={e => setVal(e.target.value)}
          onKeyDown={e => e.key === "Enter" && (e.preventDefault(), add())}
          placeholder={placeholder}
          className="flex-1 px-4 py-2.5 text-sm outline-none bg-transparent text-gray-700 placeholder:text-gray-400"
        />
        <button
          type="button"
          onClick={add}
          className="px-3 py-2.5 text-gray-400 hover:text-violet-600 transition-colors border-l border-gray-200"
        >
          <Plus size={16} />
        </button>
      </div>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="flex items-center gap-1.5 bg-violet-50 text-violet-700 text-xs font-medium px-3 py-1 rounded-[6px] border border-violet-100"
            >
              {tag}
              <button
                type="button"
                onClick={() => onRemove(i)}
                className="hover:text-violet-900 transition-colors"
              >
                <X size={11} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Section Header ── */
function SectionHeader({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-3 pb-4 border-b border-gray-100 mb-6">
      <div className="w-8 h-8 rounded-[6px] bg-violet-50 flex items-center justify-center flex-shrink-0">
        <Icon size={16} className="text-violet-600" />
      </div>
      <h2 className="text-base font-bold text-gray-900">{title}</h2>
    </div>
  );
}

/* ── Field Label ── */
function Label({ children, required }) {
  return (
    <label className="block text-sm font-medium text-gray-700 mb-2">
      {children}
      {required && <span className="text-red-500 ml-1">*</span>}
    </label>
  );
}

/* ── Input ── */
function Input({ className = "", ...props }) {
  return (
    <input
      className={`w-full border border-gray-200 rounded-[6px] px-4 py-2.5 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-50 transition-all ${className}`}
      {...props}
    />
  );
}

/* ── Textarea ── */
function Textarea({ className = "", ...props }) {
  return (
    <textarea
      rows={3}
      className={`w-full border border-gray-200 rounded-[6px] px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-50 transition-all resize-none ${className}`}
      {...props}
    />
  );
}

/* ── Main Component ── */
export default function AddBuilder({ onBack }) {
  const [expertise, setExpertise] = useState(["Residential", "Commercial"]);
  const [reasons, setReasons] = useState(["On-time Delivery"]);
  const [standards, setStandards] = useState(["ISO 9001", "Eco Friendly"]);
  const [visibility, setVisibility] = useState(true);
  const [allowPosts, setAllowPosts] = useState(false);
  const [logoFile, setLogoFile] = useState(null);

  const removeTag = (arr, setArr, i) => setArr(arr.filter((_, idx) => idx !== i));
  const addTag    = (arr, setArr, v) => setArr([...arr, v]);

  return (
    <div className="min-h-screen flex flex-col gap-4">

      {/* ── Header ── */}
      <div className="sticky top-0 z-10 flex items-center gap-3 px-5 md:px-8 py-4 border-b border-gray-100 bg-white">
        <button
          onClick={onBack}
          className="p-1.5 rounded-[6px] hover:bg-gray-100 transition-colors"
        >
          <ArrowLeft size={18} className="text-gray-700" />
        </button>
        <h1 className="text-[17px] font-bold text-gray-900">Add Builder</h1>
      </div>

      {/* ── Body ── */}
      <div className="flex-1 overflow-y-auto bg-white">
        <div className="max-w-6xl px-5 md:px-8 py-8 space-y-10">

          {/* ── Builder Identity ── */}
          <section>
            <SectionHeader icon={Building2} title="Builder Identity" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label required>Company Name</Label>
                <Input placeholder="e.g. Skyline Constructions Ltd." />
              </div>

              <div>
                <Label required>Registration Number</Label>
                <Input placeholder="e.g. REG-2024-88392" />
              </div>

              <div>
                <Label>Date of Registration</Label>
                <div className="relative">
                  <Input type="date" className="pr-10" />
                  <Calendar size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <Label>Experience (Years)</Label>
                <Input placeholder="e.g. 12" />
              </div>

              <div>
                <Label>Website URL</Label>
                <div className="relative">
                  <Input placeholder="https://" className="pr-10" />
                  <Globe size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                </div>
              </div>

              <div>
                <Label>Builder Logo</Label>
                <label className="block cursor-pointer">
                  <div className="border-2 border-dashed border-gray-200 rounded-[6px] h-[108px] px-6 py-5 flex flex-col items-center justify-center gap-1.5 text-gray-400 hover:border-violet-300 hover:bg-violet-50/40 transition-all">
                    {logoFile ? (
                      <p className="text-sm text-violet-600 font-medium">{logoFile.name}</p>
                    ) : (
                      <>
                        <UploadCloud size={22} className="text-gray-400" />
                        <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                        <p className="text-xs text-gray-400">SVG, PNG, JPG or GIF (max. 2MB)</p>
                      </>
                    )}
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={e => setLogoFile(e.target.files?.[0] || null)}
                  />
                </label>
              </div>
            </div>
          </section>

          {/* ── Contact Information ── */}
          <section>
            <SectionHeader icon={Contact} title="Contact Information" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
              <div>
                <Label required>Contact Person</Label>
                <Input placeholder="Full Name" />
              </div>
              <div>
                <Label required>Contact Number</Label>
                <Input placeholder="+1 (555) 000-0000" />
              </div>
              <div>
                <Label required>Email Address</Label>
                <Input placeholder="contact@company.com" />
              </div>
            </div>

            <div>
              <Label>Office Address</Label>
              <Textarea placeholder="Enter complete office address" rows={3} />
            </div>
          </section>

          {/* ── Profile Content ── */}
          <section>
            <SectionHeader icon={FileText} title="Profile Content" />

            <div className="mb-5">
              <Label>About Builder</Label>
              <Textarea placeholder="Write a brief description about the builder..." rows={4} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <Label>Vision</Label>
                <Textarea placeholder="Company vision statement..." />
              </div>
              <div>
                <Label>Mission</Label>
                <Textarea placeholder="Company mission statement..." />
              </div>
            </div>
          </section>

          {/* ── Expertise & Highlights ── */}
          <section>
            <SectionHeader icon={Award} title="Expertise & Highlights" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <Label>Areas of Expertise</Label>
                <TagInput
                  placeholder="Add tag..."
                  tags={expertise}
                  onAdd={v => addTag(expertise, setExpertise, v)}
                  onRemove={i => removeTag(expertise, setExpertise, i)}
                />
              </div>
              <div>
                <Label>Why Choose Us</Label>
                <TagInput
                  placeholder="Add reason..."
                  tags={reasons}
                  onAdd={v => addTag(reasons, setReasons, v)}
                  onRemove={i => removeTag(reasons, setReasons, i)}
                />
              </div>
              <div>
                <Label>Quality & Standards</Label>
                <TagInput
                  placeholder="Add standard..."
                  tags={standards}
                  onAdd={v => addTag(standards, setStandards, v)}
                  onRemove={i => removeTag(standards, setStandards, i)}
                />
              </div>
            </div>
          </section>

          {/* ── Network Settings ── */}
          <section>
            <SectionHeader icon={Settings} title="Network Settings" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-4">
              <div>
                <Label>Builder Status</Label>
                <div className="relative">
                  <select className="w-full border border-gray-200 rounded-[6px] px-4 py-2.5 text-sm text-gray-800 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-50 transition-all appearance-none bg-white cursor-pointer">
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-xs">▾</span>
                </div>
              </div>

              <div>
                <Label>Visibility</Label>
                <div className="flex items-center justify-between border border-gray-200 rounded-[6px] px-4 py-2.5">
                  <div>
                    <p className="text-sm font-medium text-gray-800">Visible in Network</p>
                  </div>
                  <Toggle checked={visibility} onChange={setVisibility} />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between border border-gray-200 rounded-[6px] px-4 py-3.5">
              <div>
                <p className="text-sm font-medium text-gray-800">Permissions</p>
                <p className="text-xs text-gray-400 mt-0.5">Allow Builder Posts</p>
              </div>
              <Toggle checked={allowPosts} onChange={setAllowPosts} />
            </div>
          </section>

          {/* bottom spacing for footer */}
          <div className="h-4" />
        </div>
      </div>

      {/* ── Footer ── */}
      <div className="sticky bottom-0 bg-white border-t border-gray-100 px-5 md:px-8 py-4 flex items-center justify-between gap-4">
        <button
          type="button"
          className="px-6 py-2.5 rounded-[6px] border border-gray-200 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
        >
          Cancel
        </button>

        <button
          type="button"
          className="flex items-center gap-2 px-6 py-2.5 rounded-[6px] text-sm font-bold text-white shadow-[0_4px_14px_rgba(94,35,220,0.3)] hover:opacity-90 transition-opacity"
          style={{ background: GRADIENT }}
        >
          <Check size={15} strokeWidth={2.5} />
          Save Builder
        </button>
      </div>
    </div>
  );
}