import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import { getImageURI } from "../../utils/helper";
import Loader from "../../components/Loader";
import {
  ArrowLeft, Camera, Check, Eye, EyeOff,
  ChevronRight, Image, User, Share2,
  Briefcase, SlidersHorizontal, Globe,
  MapPin, Plus, X, Instagram, Linkedin,
  Youtube, Phone,
} from "lucide-react";

const GRADIENT = "linear-gradient(110.73deg, #5323DC 0%, #8E61FF 97.17%)";
const PURPLE   = "#5323DC";

const inputCls = "w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 placeholder:text-gray-400 outline-none focus:border-[#5323DC] focus:ring-2 focus:ring-violet-50 transition-all bg-white";

/* ── Shared primitives ──────────────────────────────────── */
function Label({ children }) {
  return <p className="text-sm font-semibold text-gray-900 mb-2">{children}</p>;
}
function SectionLabel({ children }) {
  return <p className="text-[11px] font-bold text-gray-400 tracking-widest uppercase mb-4">{children}</p>;
}

function Toggle({ checked, onChange }) {
  return (
    <button type="button" onClick={() => onChange(!checked)}
      className={`relative w-12 h-6 rounded-full transition-all duration-200 focus:outline-none flex-shrink-0 ${checked ? "bg-[#5323DC]" : "bg-gray-200"}`}>
      <span className={`absolute top-[3px] w-[18px] h-[18px] bg-white rounded-full shadow transition-all duration-200 ${checked ? "left-[26px]" : "left-[3px]"}`} />
    </button>
  );
}

/* ── Tag input ─────────────────────────────────────────── */
function TagPill({ label, onRemove }) {
  return (
    <span className="inline-flex items-center gap-1 bg-violet-50 text-[#5323DC] text-sm font-medium px-3 py-1.5 rounded-full border border-violet-200">
      {label}
      <button onClick={() => onRemove(label)} type="button" className="hover:text-violet-900">
        <X size={12} />
      </button>
    </span>
  );
}
function TagInputRow({ tags, onAdd, onRemove, placeholder = "Add..." }) {
  const [val, setVal] = useState("");
  const add = () => { if (val.trim() && !tags.includes(val.trim())) { onAdd(val.trim()); setVal(""); } };
  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {tags.map(t => <TagPill key={t} label={t} onRemove={onRemove} />)}
        <button type="button" onClick={() => document.getElementById("tag-input")?.focus()}
          className="inline-flex items-center gap-1 border border-gray-200 text-gray-500 text-sm px-3 py-1.5 rounded-full hover:border-[#5323DC] hover:text-[#5323DC] transition-colors">
          <Plus size={13} /> Add
        </button>
      </div>
      <input id="tag-input" value={val} onChange={e => setVal(e.target.value)}
        onKeyDown={e => e.key === "Enter" && (e.preventDefault(), add())}
        placeholder={placeholder}
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder:text-gray-400 outline-none focus:border-[#5323DC] focus:ring-2 focus:ring-violet-50" />
    </div>
  );
}

/* ── Input with left icon ──────────────────────────────── */
function IconInput({ icon: Icon, iconColor, placeholder, value, onChange, type = "text" }) {
  return (
    <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden focus-within:border-[#5323DC] focus-within:ring-2 focus-within:ring-violet-50 transition-all">
      <div className="pl-4 pr-2 flex items-center shrink-0">
        <Icon size={18} style={{ color: iconColor || "#9ca3af" }} />
      </div>
      <input type={type} value={value} onChange={onChange} placeholder={placeholder}
        className="flex-1 py-3 pr-4 text-sm text-gray-800 placeholder:text-gray-400 outline-none bg-transparent" />
    </div>
  );
}

/* ── Business category pill ────────────────────────────── */
const CATEGORIES = ["Builder", "Sales Partner", "Channel Partner", "Agency", "Territory Partner", "Consultant", "Developer"];

function CategoryPill({ label, selected, onClick }) {
  return (
    <button type="button" onClick={onClick}
      className={`flex items-center gap-2 px-5 py-3.5 rounded-2xl text-[15px] font-semibold border-2 transition-all active:scale-95
        ${selected ? "border-[#5323DC] bg-[#5323DC] text-white" : "border-gray-200 bg-white text-gray-800 hover:border-gray-300"}`}>
      {label}
      {selected && <Check size={16} strokeWidth={2.5} />}
    </button>
  );
}

/* ── Checkerboard cover placeholder ────────────────────── */
function CoverPlaceholder({ coverFile, onCoverChange, hasExisting }) {
  return (
    <div className="relative w-full h-36 rounded-2xl overflow-hidden"
      style={{ background: "repeating-conic-gradient(#d8b4fe 0% 25%, #ede9fe 0% 50%) 0 0 / 24px 24px" }}>
      {coverFile && (
        <img src={URL.createObjectURL(coverFile)} className="absolute inset-0 w-full h-full object-cover" alt="cover" />
      )}
      <label htmlFor="cover-upload"
        className="absolute inset-0 flex items-center justify-center cursor-pointer group">
        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-semibold text-gray-700 shadow group-hover:shadow-md transition-shadow">
          <Camera size={15} /> Edit Cover
        </div>
      </label>
      <input id="cover-upload" type="file" accept="image/*" className="hidden"
        onChange={e => onCoverChange(e.target.files?.[0] || null)} />
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   STEP COMPONENTS (mobile steps + desktop sections)
════════════════════════════════════════════════════════════ */

/* Step 1 — Profile Header (images 2 & 3) */
function StepProfileHeader({ user, avatarSrc, avatarFile, setAvatarFile, coverFile, setCoverFile, prefs, setPrefs }) {
  return (
    <div className="space-y-5">
      {/* Cover + avatar */}
      <CoverPlaceholder coverFile={coverFile} onCoverChange={setCoverFile} />

      {/* Avatar centered below cover */}
      <div className="flex flex-col items-center -mt-16 relative z-10">
        <div className="relative">
          <img
            src={avatarFile ? URL.createObjectURL(avatarFile) : avatarSrc}
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg" />
          <label htmlFor="avatar-upload"
            className="absolute bottom-0 right-0 w-9 h-9 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
            style={{ background: GRADIENT }}>
            <Camera size={15} className="text-white" />
          </label>
          <input id="avatar-upload" type="file" accept="image/*" className="hidden"
            onChange={e => setAvatarFile(e.target.files?.[0] || null)} />
        </div>
        <h2 className="text-xl font-bold text-gray-900 mt-3">{user?.fullname || "Your Name"}</h2>
        <span className="mt-1 px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600 font-medium">{user?.role || "Partner"}</span>
      </div>

      {/* Display Info */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
        <SectionLabel>Display Info</SectionLabel>
        <div>
          <Label>Display Name</Label>
          <input value={user?.fullname || ""} readOnly className={inputCls} placeholder="Your display name" />
        </div>
        <div>
          <Label>Role / Headline</Label>
          <input value={user?.role || ""} readOnly className={inputCls} placeholder="e.g. Senior Reparv Partner" />
        </div>
        <div>
          <Label>Bio</Label>
          <textarea rows={3} className={`${inputCls} resize-none`} placeholder="Experienced technician specializing in..." />
        </div>
      </div>

      {/* Visibility toggles */}
      <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-100">
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-gray-900">Profile Visibility</p>
            <p className="text-xs text-gray-400 mt-0.5">Visible to all customers on Reparv</p>
          </div>
          <Toggle checked={prefs.visibility} onChange={v => setPrefs(p => ({ ...p, visibility: v }))} />
        </div>
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <p className="text-sm font-semibold text-gray-900">Show "Open for Work" Badge</p>
            <p className="text-xs text-gray-400 mt-0.5">Adds a purple ring to your avatar</p>
          </div>
          <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center cursor-pointer transition-colors ${prefs.openForWork ? "border-[#5323DC] bg-[#5323DC]" : "border-gray-300"}`}
            onClick={() => setPrefs(p => ({ ...p, openForWork: !p.openForWork }))}>
            {prefs.openForWork && <Check size={13} className="text-white" strokeWidth={3} />}
          </div>
        </div>
      </div>
    </div>
  );
}

/* Step 2 — Basic Info (image 4) */
function StepBasicInfo({ form, setForm }) {
  const tags = form.territories || [];
  const addTag = t => setForm(p => ({ ...p, territories: [...(p.territories || []), t] }));
  const removeTag = t => setForm(p => ({ ...p, territories: (p.territories || []).filter(x => x !== t) }));

  return (
    <div className="space-y-5">
      {/* Identity */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
        <SectionLabel>Identity</SectionLabel>
        <div>
          <Label>Full Name</Label>
          <input value={form.fullname || ""} onChange={e => setForm(p => ({ ...p, fullname: e.target.value }))}
            className={inputCls} placeholder="Elena Rodriguez" />
        </div>
        <div>
          <Label>Company Name</Label>
          <IconInput icon={Briefcase} iconColor="#9ca3af" placeholder="Rodriguez Repairs LLC"
            value={form.company || ""} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} />
        </div>
        <div>
          <Label>Role / Title</Label>
          <input value={form.role || ""} onChange={e => setForm(p => ({ ...p, role: e.target.value }))}
            className={inputCls} placeholder="Mobile Repair Specialist" />
        </div>
      </div>

      {/* Location & Bio */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
        <SectionLabel>Location & Bio</SectionLabel>
        <div>
          <Label>Location</Label>
          <IconInput icon={MapPin} iconColor="#9ca3af" placeholder="Mumbai · Navi Mumbai Cluster"
            value={form.location || ""} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} />
        </div>
        <div>
          <Label>Bio</Label>
          <div className="relative">
            <textarea rows={4} maxLength={150}
              value={form.bio || ""} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))}
              className={`${inputCls} resize-none pb-6`}
              placeholder="Helping builders and brokers close premium inventory…" />
            <span className="absolute bottom-3 right-3 text-xs text-gray-400">
              {(form.bio || "").length}/150
            </span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
        <SectionLabel>Details</SectionLabel>
        <div>
          <Label>Service Territory</Label>
          <TagInputRow tags={tags} onAdd={addTag} onRemove={removeTag} placeholder="Add territory…" />
        </div>
        <div>
          <Label>Website</Label>
          <IconInput icon={Globe} iconColor="#9ca3af" placeholder="https://aarohiestates.in"
            value={form.website || ""} onChange={e => setForm(p => ({ ...p, website: e.target.value }))} />
        </div>
      </div>
    </div>
  );
}

/* Step 3 — Social Media (image 5) */
function StepSocialMedia({ social, setSocial }) {
  const set = (field, val) => setSocial(p => ({ ...p, [field]: val }));
  return (
    <div className="space-y-5">
      {/* Public profiles */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
        <SectionLabel>Public Profiles</SectionLabel>
        <div>
          <Label>Instagram</Label>
          <IconInput icon={Instagram} iconColor="#e1306c" placeholder="@username"
            value={social.instagram || ""} onChange={e => set("instagram", e.target.value)} />
        </div>
        <div>
          <Label>LinkedIn</Label>
          <IconInput icon={Linkedin} iconColor="#0077b5" placeholder="https://linkedin.com/in/..."
            value={social.linkedin || ""} onChange={e => set("linkedin", e.target.value)} />
        </div>
        <div>
          <Label>YouTube Channel</Label>
          <IconInput icon={Youtube} iconColor="#ff0000" placeholder="https://youtube.com/c/..."
            value={social.youtube || ""} onChange={e => set("youtube", e.target.value)} />
        </div>
      </div>

      {/* Direct contact */}
      <div className="bg-white rounded-2xl border border-gray-100 p-5 space-y-4">
        <SectionLabel>Direct Contact</SectionLabel>
        <div>
          <Label>WhatsApp Business</Label>
          <IconInput icon={Phone} iconColor="#25d366" placeholder="+1 (555) 000-0000"
            value={social.whatsapp || ""} onChange={e => set("whatsapp", e.target.value)} type="tel" />
          <p className="text-xs text-gray-400 mt-1.5">Used for direct client messaging links.</p>
        </div>
      </div>
    </div>
  );
}

/* Step 4 — Business Category (images 6 & 7) */
function StepBusinessCategory({ selected, setSelected }) {
  const toggle = cat => setSelected(p => p.includes(cat) ? p.filter(c => c !== cat) : [...p, cat]);
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[22px] font-extrabold text-gray-900 leading-snug">What describes your business best?</h2>
        <p className="text-[15px] text-gray-400 mt-2 leading-relaxed">
          Select all categories that apply to your real estate business. This helps us match you with the right opportunities.
        </p>
      </div>
      <div className="flex flex-wrap gap-3">
        {CATEGORIES.map(cat => (
          <CategoryPill key={cat} label={cat} selected={selected.includes(cat)} onClick={() => toggle(cat)} />
        ))}
      </div>
    </div>
  );
}

/* Step 5 — Content Preferences (image 1 bottom section) */
function StepContentPreferences({ prefs, setPrefs }) {
  const toggles = [
    { key: "showPublicly",   label: "Show posts publicly",      sub: "Let anyone on Reparv view your posts grid." },
    { key: "allowTagging",   label: "Allow tagging",             sub: "Builders and partners can tag you in their updates." },
    { key: "allowReposts",   label: "Allow reposts",             sub: "Let partners repost your content with attribution." },
    { key: "storyFeature",   label: "Enable story feature",      sub: "Share quick, time-limited launch updates." },
    { key: "autoCommunity",  label: "Auto publish to community feed", sub: "New posts automatically appear in relevant communities." },
  ];
  return (
    <div className="space-y-3">
      <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-100">
        {toggles.map(t => (
          <div key={t.key} className="flex items-center justify-between px-5 py-4">
            <div className="pr-4">
              <p className="text-sm font-semibold text-gray-900">{t.label}</p>
              <p className="text-xs text-gray-400 mt-0.5">{t.sub}</p>
            </div>
            <Toggle checked={!!prefs[t.key]} onChange={v => setPrefs(p => ({ ...p, [t.key]: v }))} />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   MAIN COMPONENT
════════════════════════════════════════════════════════════ */
export default function EditProfile() {
  const navigate = useNavigate();
  const { URI, setLoading } = useAuth();

  /* ── shared state ── */
  const [user, setUser]           = useState({ fullname:"", username:"", email:"", contact:"", role:"", referral:"", userimage:"", id:"", status:"" });
  const [form, setForm]           = useState({ fullname:"", username:"", email:"", contact:"", company:"", role:"", location:"", bio:"", website:"", territories:[] });
  const [social, setSocial]       = useState({ instagram:"", linkedin:"", youtube:"", whatsapp:"" });
  const [categories, setCategories] = useState([]);
  const [prefs, setPrefs]         = useState({ visibility:true, openForWork:false, showPublicly:true, allowTagging:true, allowReposts:true, storyFeature:true, autoCommunity:false });
  const [avatarFile, setAvatarFile] = useState(null);
  const [coverFile, setCoverFile]   = useState(null);
  const [mobileStep, setMobileStep] = useState(0);  // 0=menu, 1–5=steps
  const [showPw, setShowPw]         = useState({ cur: false, new: false });
  const [passwords, setPasswords]   = useState({ current:"", newPw:"" });
  const [pwError, setPwError]       = useState("");

  const avatarSrc = user?.userimage
    ? getImageURI(user.userimage)
    : `https://ui-avatars.com/api/?name=${encodeURIComponent(user?.fullname||"U")}&background=5323DC&color=fff&size=150`;

  /* ── profile strength ── */
  const strengthFields = [form.fullname, form.bio, form.location, form.website, social.instagram, categories.length > 0, avatarFile];
  const strengthPct    = Math.round((strengthFields.filter(Boolean).length / strengthFields.length) * 100);

  /* ── fetch profile ── */
  const fetchProfile = async () => {
    try {
      const r = await fetch(`${URI}/project-partner/profile`, { method:"GET", credentials:"include", headers:{"Content-Type":"application/json"} });
      if (!r.ok) throw new Error();
      const d = await r.json();
      setUser(d);
      setForm(p => ({ ...p, fullname: d.fullname||"", username: d.username||"", email: d.email||"", contact: d.contact||"", role: d.role||"" }));
    } catch(e) { console.error(e); }
  };
  useEffect(() => { fetchProfile(); }, []);

  /* ── save profile (editProfile from old code) ── */
  const saveProfile = async () => {
    const fd = new FormData();
    fd.append("fullname", form.fullname);
    fd.append("username", form.username);
    fd.append("email",    form.email);
    fd.append("contact",  form.contact);
    if (avatarFile) fd.append("image", avatarFile);
    try {
      setLoading(true);
      const r = await fetch(`${URI}/project-partner/profile/edit`, { method:"PUT", credentials:"include", body: fd });
      if (r.ok) { alert("Profile updated!"); await fetchProfile(); }
      else       { alert("Failed to update profile"); }
    } catch(e) { console.error(e); }
    finally { setLoading(false); }
  };

  /* ── change password (from old code) ── */
  const changePassword = async (e) => {
    e.preventDefault();
    if (!passwords.current || !passwords.newPw) { setPwError("Both fields required."); return; }
    try {
      setLoading(true);
      const r = await fetch(`${URI}/project-partner/profile/changepassword`, {
        method:"PUT", credentials:"include",
        headers:{"Content-Type":"application/json"},
        body: JSON.stringify({ currentPassword: passwords.current, newPassword: passwords.newPw }),
      });
      if (!r.ok) { const d = await r.json(); throw new Error(d.message); }
      alert("Password changed!"); setPasswords({ current:"", newPw:"" }); setPwError(""); setMobileStep(0);
    } catch(e) { setPwError(e.message || "Failed."); }
    finally { setLoading(false); }
  };

  /* ── mobile steps config ── */
  const MOBILE_STEPS = [
    { key:"header",   title:"Edit Profile Header",  Icon: Image,          sub:"Update profile photo and cover banner",    component: <StepProfileHeader user={user} avatarSrc={avatarSrc} avatarFile={avatarFile} setAvatarFile={setAvatarFile} coverFile={coverFile} setCoverFile={setCoverFile} prefs={prefs} setPrefs={setPrefs} /> },
    { key:"basic",    title:"Basic Information",    Icon: User,           sub:"Name, bio, location, and role",             component: <StepBasicInfo form={form} setForm={setForm} /> },
    { key:"social",   title:"Social Media",         Icon: Share2,         sub:"Linked accounts and website",               component: <StepSocialMedia social={social} setSocial={setSocial} /> },
    { key:"category", title:"Business Category",    Icon: Briefcase,      sub:"Required to complete profile",  required:true, component: <StepBusinessCategory selected={categories} setSelected={setCategories} /> },
    { key:"prefs",    title:"Content Preferences",  Icon: SlidersHorizontal, sub:"Manage feed topics and tags",            component: <StepContentPreferences prefs={prefs} setPrefs={setPrefs} /> },
  ];

  /* ════════════════════════════════════════════════════
     MOBILE VIEW
  ════════════════════════════════════════════════════ */
  const MobileView = () => {
    const currentStep = MOBILE_STEPS[mobileStep - 1];
    const isCategoryStep = currentStep?.key === "category";

    return (
      <div className="md:hidden min-h-screen bg-[#F6F7FB]">
        {/* Sticky header */}
        <div className="sticky top-0 z-50 bg-white border-b border-gray-100 flex items-center justify-between px-4 py-3.5">
          <button onClick={() => mobileStep === 0 ? navigate(-1) : setMobileStep(0)}
            className="p-1.5 rounded-lg hover:bg-gray-100 active:scale-95">
            <ArrowLeft size={20} className="text-gray-800" strokeWidth={2.2} />
          </button>
          <h1 className="text-[16px] font-bold text-gray-900 absolute left-1/2 -translate-x-1/2">
            {mobileStep === 0 ? "Edit Profile" : currentStep?.title}
          </h1>
          {mobileStep === 0 && (
            <button onClick={saveProfile} style={{ color: PURPLE }}
              className="text-sm font-bold active:scale-95">
              Save
            </button>
          )}
          {mobileStep > 0 && <div className="w-[40px]" />}
        </div>

        {/* Step 0 — Menu (image 2) */}
        {mobileStep === 0 && (
          <div className="p-4 space-y-4">
            {/* Profile card */}
            <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100">
              {/* Cover */}
              <div className="h-28 relative" style={{ background: "repeating-conic-gradient(#d8b4fe 0% 25%, #ede9fe 0% 50%) 0 0 / 20px 20px" }}>
                {coverFile && <img src={URL.createObjectURL(coverFile)} className="absolute inset-0 w-full h-full object-cover" alt="" />}
              </div>
              {/* Avatar + name */}
              <div className="flex flex-col items-center pb-5 -mt-12 px-5">
                <div className="relative">
                  <img src={avatarFile ? URL.createObjectURL(avatarFile) : avatarSrc}
                    alt="avatar" className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-md" />
                  <div className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center shadow"
                    style={{ background: GRADIENT }}>
                    <Camera size={14} className="text-white" />
                  </div>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mt-3">{user?.fullname || "Your Name"}</h2>
                <span className="mt-1 px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600 font-medium">{user?.role || "Partner"}</span>

                {/* Profile strength */}
                <div className="w-full mt-4 bg-gray-50 rounded-2xl p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-bold" style={{ color: PURPLE }}>Profile Strength</span>
                    <span className="text-sm font-bold text-gray-900">{strengthPct}%</span>
                  </div>
                  <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full rounded-full transition-all duration-500" style={{ width: `${strengthPct}%`, background: GRADIENT }} />
                  </div>
                  {strengthPct < 100 && (
                    <p className="text-xs text-gray-400 mt-2">Add your business category to reach 100%</p>
                  )}
                </div>
              </div>
            </div>

            {/* Menu items */}
            <div className="space-y-3">
              {MOBILE_STEPS.map((step, i) => (
                <button key={step.key} onClick={() => setMobileStep(i + 1)}
                  className="w-full flex items-center gap-4 bg-white rounded-2xl px-4 py-4 shadow-sm border border-gray-100 active:scale-[0.98] transition-transform text-left">
                  <div className={`w-11 h-11 rounded-2xl flex items-center justify-center ${step.required ? "bg-red-50" : "bg-violet-50"}`}>
                    <step.Icon size={20} className={step.required ? "text-red-500" : "text-[#5323DC]"} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-bold text-gray-900">{step.title}</p>
                    <p className={`text-xs mt-0.5 ${step.required ? "text-red-500 font-semibold" : "text-gray-400"}`}>{step.sub}</p>
                  </div>
                  <ChevronRight size={18} className="text-gray-300 shrink-0" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step content */}
        {mobileStep > 0 && (
          <>
            {/* Progress bar for category step */}
            {isCategoryStep && (
              <div className="w-full h-1 bg-gray-100">
                <div className="h-full bg-[#5323DC]" style={{ width: "50%" }} />
              </div>
            )}
            <div className="p-4 pb-28">{currentStep?.component}</div>

            {/* Sticky footer */}
            <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-100 z-50">
              <button onClick={saveProfile}
                className="w-full py-4 rounded-lg text-white bg-[#5323DC] text-[15px] font-semibold hover:opacity-90 transition-opacity active:scale-95"
                >
                {isCategoryStep ? "Save Categories" : "Save Changes"}
              </button>
            </div>
          </>
        )}
      </div>
    );
  };

  /* ════════════════════════════════════════════════════
     DESKTOP VIEW (image 1)
  ════════════════════════════════════════════════════ */
  const DesktopView = () => (
    <div className="hidden md:flex min-h-screen flex-col">
      {/* Top bar */}
      <div className="flex items-start justify-between px-8 py-6">
        <div>
          <h1 className="text-[22px] font-bold text-black">Edit Partner Profile</h1>
          <p className="text-sm text-gray-400 mt-1">Tune your creator identity for Reparv social feed and partner discovery.</p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <button onClick={() => navigate(-1)}
            className="px-5 py-2.5 rounded-md text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-800 transition-colors">
            Discard
          </button>
          <button onClick={saveProfile}
            className="flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-bold bg-[#5323DC] text-white hover:opacity-90 transition-opacity"
            >
            <Check size={15} /> Save changes
          </button>
        </div>
      </div>

      {/* Scrollable content */}
      <div className="flex-1 overflow-y-auto px-8 pb-32 space-y-6 max-w-2xl">

        {/* ── Profile Header card ── */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-[15px] font-bold text-gray-900">Profile header</h3>
              <p className="text-xs text-gray-400 mt-0.5">Photo, banner and creator handle for your Reparv profile.</p>
            </div>
            <span className="text-xs font-semibold text-[#5323DC] bg-violet-50 px-3 py-1.5 rounded-lg">Visible on public profile</span>
          </div>

          {/* Cover */}
          <div className="relative w-full h-24 rounded-xl overflow-hidden border border-dashed border-gray-200 flex items-center gap-4 px-4 mb-4"
            style={{ background: "repeating-conic-gradient(#f3f4f6 0% 25%, #ffffff 0% 50%) 0 0 / 16px 16px" }}>
            {coverFile && <img src={URL.createObjectURL(coverFile)} className="absolute inset-0 w-full h-full object-cover" alt="" />}
            <div className="absolute inset-0 flex items-center justify-start px-5 gap-4 bg-white/80">
              <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center">
                <Image size={20} className="text-gray-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-gray-800">Add a cover banner</p>
                <p className="text-xs text-gray-400 mt-0.5">Recommended 1600 × 400px. Show your projects, skyline or team.</p>
              </div>
              <label htmlFor="d-cover" className="ml-auto border border-gray-200 bg-white rounded-lg px-4 py-2 text-sm font-semibold text-gray-700 cursor-pointer hover:bg-gray-50 transition-colors">
                Upload
              </label>
              <input id="d-cover" type="file" accept="image/*" className="hidden" onChange={e => setCoverFile(e.target.files?.[0] || null)} />
            </div>
          </div>

          {/* Avatar + name row */}
          <div className="flex items-center gap-4">
            <div className="relative shrink-0">
              <img src={avatarFile ? URL.createObjectURL(avatarFile) : avatarSrc}
                className="w-16 h-16 rounded-full object-cover border-2 border-white shadow" alt="avatar" />
              <label htmlFor="d-avatar" className="absolute bottom-0 right-0 w-6 h-6 rounded-full flex items-center justify-center cursor-pointer shadow"
                style={{ background: GRADIENT }}>
                <Camera size={11} className="text-white" />
              </label>
              <input id="d-avatar" type="file" accept="image/*" className="hidden" onChange={e => setAvatarFile(e.target.files?.[0] || null)} />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-[17px] font-bold text-gray-900">{user?.fullname || "Your Name"}</h2>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                {categories.map(c => (
                  <span key={c} className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-violet-50 text-[#5323DC]">{c}</span>
                ))}
                {user?.username && <span className="text-xs text-gray-400">@{user.username}</span>}
              </div>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-xs text-gray-400 mb-1">Profile completeness</p>
              <div className="flex items-center gap-2">
                <div className="w-28 h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: `${strengthPct}%`, background: GRADIENT }} />
                </div>
                <span className="text-xs font-bold text-gray-700">{strengthPct}%</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Basic Information card ── */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="text-[15px] font-bold text-gray-900">Basic information</h3>
              <p className="text-xs text-gray-400 mt-0.5">Tell partners who you are and where you operate.</p>
            </div>
            <span className="text-xs font-semibold text-amber-600 bg-amber-50 px-3 py-1.5 rounded-lg">Required</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Full name</Label>
              <input value={form.fullname} onChange={e => setForm(p => ({ ...p, fullname: e.target.value }))} className={inputCls} placeholder="Aarohi Mehta" />
            </div>
            <div>
              <Label>Company name</Label>
              <input value={form.company || ""} onChange={e => setForm(p => ({ ...p, company: e.target.value }))} className={inputCls} placeholder="Aarohi Estates Collective" />
            </div>
            <div>
              <Label>Role / title</Label>
              <input value={form.role} onChange={e => setForm(p => ({ ...p, role: e.target.value }))} className={inputCls} placeholder="Founder · Lead Sales Partner" />
            </div>
            <div>
              <Label>Location</Label>
              <input value={form.location || ""} onChange={e => setForm(p => ({ ...p, location: e.target.value }))} className={inputCls} placeholder="Mumbai · Navi Mumbai Cluster" />
            </div>
            <div className="col-span-2">
              <Label>Bio</Label>
              <div className="relative">
                <textarea rows={3} maxLength={150}
                  value={form.bio || ""} onChange={e => setForm(p => ({ ...p, bio: e.target.value }))}
                  className={`${inputCls} resize-none pb-6`}
                  placeholder="Helping builders and brokers close premium inventory…" />
                <span className="absolute bottom-3 right-3 text-xs text-gray-400">{(form.bio||"").length}/150</span>
              </div>
            </div>
            <div>
              <Label>Territory tags</Label>
              <TagInputRow tags={form.territories || []}
                onAdd={t => setForm(p => ({ ...p, territories: [...(p.territories||[]), t] }))}
                onRemove={t => setForm(p => ({ ...p, territories: (p.territories||[]).filter(x => x !== t) }))}
                placeholder="Add territories…" />
            </div>
            <div>
              <Label>Website link</Label>
              <input value={form.website || ""} onChange={e => setForm(p => ({ ...p, website: e.target.value }))} className={inputCls} placeholder="https://aarohiestates.in" />
            </div>
          </div>
        </div>

        {/* ── Social media card ── */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="flex items-start justify-between mb-5">
            <div>
              <h3 className="text-[15px] font-bold text-gray-900">Social media</h3>
              <p className="text-xs text-gray-400 mt-0.5">Connect your creator profiles so partners can follow your content.</p>
            </div>
            <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg">Social-first</span>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Instagram</Label>
              <IconInput icon={Instagram} iconColor="#e1306c" placeholder="https://instagram.com/aarohi.reparv"
                value={social.instagram || ""} onChange={e => setSocial(p => ({ ...p, instagram: e.target.value }))} />
            </div>
            <div>
              <Label>WhatsApp Business</Label>
              <IconInput icon={Phone} iconColor="#25d366" placeholder="wa.me/919876543210"
                value={social.whatsapp || ""} onChange={e => setSocial(p => ({ ...p, whatsapp: e.target.value }))} />
            </div>
            <div>
              <Label>LinkedIn</Label>
              <IconInput icon={Linkedin} iconColor="#0077b5" placeholder="linkedin.com/in/aarohi-mehta"
                value={social.linkedin || ""} onChange={e => setSocial(p => ({ ...p, linkedin: e.target.value }))} />
            </div>
            <div>
              <Label>YouTube channel</Label>
              <IconInput icon={Youtube} iconColor="#ff0000" placeholder="youtube.com/@aarohiestates"
                value={social.youtube || ""} onChange={e => setSocial(p => ({ ...p, youtube: e.target.value }))} />
            </div>
          </div>
        </div>

        {/* ── Business category card ── */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <div className="mb-5">
            <h3 className="text-[15px] font-bold text-gray-900">Business category</h3>
            <p className="text-xs text-gray-400 mt-0.5">Choose how other partners discover you on Reparv.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map(cat => {
              const sel = categories.includes(cat);
              return (
                <button key={cat} type="button"
                  onClick={() => setCategories(p => p.includes(cat) ? p.filter(c => c !== cat) : [...p, cat])}
                  className={`px-4 py-2 rounded-full text-sm font-semibold border-2 transition-all active:scale-95
                    ${sel ? "border-[#5323DC] bg-[#5323DC] text-white" : "border-gray-200 bg-white text-gray-700 hover:border-gray-300"}`}>
                  {cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Content preferences card ── */}
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 pt-6 pb-4">
            <h3 className="text-[15px] font-bold text-gray-900">Content preferences</h3>
            <p className="text-xs text-gray-400 mt-0.5">Control how your posts, reels and stories show up across Reparv.</p>
          </div>
          <StepContentPreferences prefs={prefs} setPrefs={setPrefs} />
        </div>

        {/* ── Change password card ── */}
        <div className="bg-white rounded-2xl p-6 shadow-sm">
          <h3 className="text-[15px] font-bold text-gray-900 mb-5">Change Password</h3>
          <form onSubmit={changePassword} className="grid grid-cols-2 gap-4">
            <div>
              <Label>Current Password</Label>
              <div className="relative">
                <input type={showPw.cur ? "text" : "password"} required placeholder="Enter current password"
                  value={passwords.current} onChange={e => setPasswords(p => ({ ...p, current: e.target.value }))}
                  className={`${inputCls} pr-11`} />
                <button type="button" onClick={() => setShowPw(p => ({ ...p, cur: !p.cur }))}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw.cur ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <div>
              <Label>New Password</Label>
              <div className="relative">
                <input type={showPw.new ? "text" : "password"} required placeholder="Enter new password"
                  value={passwords.newPw} onChange={e => setPasswords(p => ({ ...p, newPw: e.target.value }))}
                  className={`${inputCls} pr-11`} />
                <button type="button" onClick={() => setShowPw(p => ({ ...p, new: !p.new }))}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  {showPw.new ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            {pwError && <p className="col-span-2 text-red-500 text-sm">{pwError}</p>}
            <div className="col-span-2 flex justify-end gap-3 pt-2 border-t border-gray-100">
              <button type="submit"
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white hover:opacity-90"
                style={{ background: GRADIENT }}>
                <Check size={15} /> Change Password
              </button>
              <Loader />
            </div>
          </form>
        </div>
      </div>

      {/* Sticky bottom bar */}
      <div className="sticky bottom-0 border-t bg-white px-8 py-4 flex items-center justify-between gap-4">
        <p className="text-xs text-gray-400">Your creator profile preview updates as you edit. Don't forget to publish.</p>
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="px-5 py-2.5 rounded-xl text-sm font-semibold text-gray-300 hover:text-white hover:bg-gray-800">
            Cancel
          </button>
          <button onClick={saveProfile}
            className="flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-bold text-white hover:opacity-90"
            style={{ background: GRADIENT }}>
            <Check size={15} /> Save changes
          </button>
          <Loader />
        </div>
      </div>
    </div>
  );

  return (
    <>
      <DesktopView />
      <MobileView />
    </>
  );
}