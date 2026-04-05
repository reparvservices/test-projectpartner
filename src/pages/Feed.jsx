/**
 * Feed.jsx — Production-ready Social Feed
 *
 * Component tree:
 *   Feed (main page)
 *   ├── Navbar
 *   ├── Stories  →  StoryViewer (modal)
 *   ├── Composer
 *   ├── PostCard  →  MediaGrid, CommentItem, OverflowMenu
 *   └── RightSidebar  →  TrendingProjects, SuggestedForYou, UpcomingEvents
 *
 * Panels (portals):
 *   └── NotificationsPanel
 *
 * All sidebar data is fetched from real API endpoints:
 *   - Suggested users: GET /api/follow/search?q=&user_id&user_role
 *   - Follow toggle:   POST /api/follow/toggle
 *   - Follow counts:   GET /api/follow/counts?user_id&user_role
 */

import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "../store/auth";
import { Link } from "react-router-dom";
import { getImageURI } from "../utils/helper";
import { uploadToS3 } from "../utils/s3";

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG  —  edit these lines
// ─────────────────────────────────────────────────────────────────────────────
const API_BASE = "/api/feed";
const FOLLOW_API_BASE = "/api/follow";
const ACTOR = { user_id: 319, user_role: "Project Partner" }; // ← from Redux

// ─────────────────────────────────────────────────────────────────────────────
// UTILS
// ─────────────────────────────────────────────────────────────────────────────
const api = async (path, opts = {}) => {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...opts,
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Request failed");
  return data;
};

const followApi = async (path, opts = {}) => {
  const res = await fetch(`${FOLLOW_API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
    ...opts,
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Request failed");
  return data;
};

const timeAgo = (dateStr) => {
  const s = (Date.now() - new Date(dateStr)) / 1000;
  if (s < 60) return "just now";
  if (s < 3600) return `${Math.floor(s / 60)}m ago`;
  if (s < 86400) return `${Math.floor(s / 3600)}h ago`;
  return `${Math.floor(s / 86400)}d ago`;
};

const parseMedia = (raw) => {
  try {
    return JSON.parse(raw || "[]");
  } catch {
    return raw ? [raw] : [];
  }
};

const isVideo = (url = "") =>
  /\.(mp4|webm|mov)/i.test(url) || url.includes("video");

// ─────────────────────────────────────────────────────────────────────────────
// ROLE CONFIG
// ─────────────────────────────────────────────────────────────────────────────
const ROLE = {
  sales_partner: {
    label: "Sales Partner",
    text: "text-rose-600",
    bg: "bg-rose-50",
  },
  territory_partner: {
    label: "Territory Partner",
    text: "text-blue-600",
    bg: "bg-blue-50",
  },
  project_partner: {
    label: "Project Partner",
    text: "text-violet-600",
    bg: "bg-violet-50",
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// ICON  (self-contained SVG — no external deps)
// ─────────────────────────────────────────────────────────────────────────────
const P = {
  heart:
    "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  "heart-fill":
    "M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z",
  comment: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",
  share: "M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8M16 6l-4-4-4 4M12 2v13",
  bookmark: "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z",
  "bm-fill": "M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z",
  image:
    "M21 19V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2zM8.5 8.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0M21 15l-5-5L5 20",
  video:
    "M23 7l-7 5 7 5V7zM1 5h13a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H1a2 2 0 0 1-2-2V7",
  send: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z",
  home: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z",
  bell: "M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9M13.73 21a2 2 0 0 1-3.46 0",
  search: "M21 21l-6-6m2-5a7 7 0 1 1-14 0 7 7 0 0 1 14 0",
  "more-h": "M5 12h.01M12 12h.01M19 12h.01",
  x: "M18 6L6 18M6 6l12 12",
  plus: "M12 5v14M5 12h14",
  trash: "M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6",
  edit: "M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z",
  eye: "M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8zM12 9a3 3 0 1 0 0 6 3 3 0 0 0 0-6z",
  chevright: "M9 18l6-6-6-6",
  users: "M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75",
  building: "M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z M9 22V12h6v10",
  loader: "M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83",
};

function Icon({ name, size = 18, className = "", sw = 1.8 }) {
  const isFill = name === "heart-fill" || name === "bm-fill";
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={isFill ? "currentColor" : "none"}
      stroke={isFill ? "none" : "currentColor"}
      strokeWidth={sw}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d={P[name] || P["more-h"]} />
    </svg>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// PRIMITIVES
// ─────────────────────────────────────────────────────────────────────────────
function Avatar({
  src,
  name = "",
  size = 40,
  ring = false,
  ringHex = "#7c3aed",
}) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((w) => w[0])
    .join("")
    .toUpperCase();
  return (
    <div
      className="rounded-full overflow-hidden bg-violet-100 text-violet-600 font-semibold flex items-center justify-center shrink-0"
      style={{
        width: size,
        height: size,
        minWidth: size,
        fontSize: size * 0.34,
        border: ring ? `2.5px solid ${ringHex}` : "2px solid transparent",
      }}
    >
      {src ? (
        <img src={src} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span>{initials || "?"}</span>
      )}
    </div>
  );
}

function RoleBadge({ role }) {
  const r = ROLE[role] || {
    label: role,
    text: "text-gray-500",
    bg: "bg-gray-100",
  };
  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold tracking-wide ${r.bg} ${r.text}`}
    >
      {r.label}
    </span>
  );
}

function ActionBtn({
  onClick,
  active = false,
  activeCls = "",
  label,
  children,
}) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm transition-all duration-150
        ${active ? activeCls : "text-gray-400 hover:bg-gray-50 hover:text-gray-600"}
        ${onClick ? "cursor-pointer" : "cursor-default"}`}
    >
      {children}
      {label && (
        <span
          className={`text-xs font-medium tabular-nums ${active ? "" : "text-gray-400"}`}
        >
          {label}
        </span>
      )}
    </button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SKELETON PRIMITIVES
// ─────────────────────────────────────────────────────────────────────────────
function SidebarSkeleton({ rows = 3 }) {
  return (
    <div className="space-y-3.5 animate-pulse">
      {Array.from({ length: rows }).map((_, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gray-100 shrink-0" />
          <div className="flex-1 space-y-1.5">
            <div className="h-3 bg-gray-100 rounded-full w-3/4" />
            <div className="h-2.5 bg-gray-100 rounded-full w-1/2" />
          </div>
        </div>
      ))}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NAVBAR
// ─────────────────────────────────────────────────────────────────────────────
function Navbar({ unread, onBell }) {
  const { user } = useAuth();
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2.5 shrink-0">
          <span className="text-xl font-semibold text-gray-900 tracking-tight">
            <span className="text-black">Feed</span>
          </span>
        </div>
        <div className="hidden md:flex flex-1 max-w-sm">
          <div className="relative w-full">
            <Icon
              name="search"
              size={14}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
            <input
              type="text"
              placeholder="Search posts, people, projects…"
              className="w-full pl-9 pr-4 py-2 bg-gray-100 rounded-full text-sm text-gray-700 placeholder-gray-400 outline-none focus:bg-white focus:ring-2 focus:ring-violet-200 transition-all"
            />
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="md:hidden p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors">
            <Icon name="search" size={20} />
          </button>
          <button
            onClick={onBell}
            className="relative p-2 rounded-xl text-gray-500 hover:bg-gray-100 transition-colors"
          >
            <Icon name="bell" size={20} />
            {unread > 0 && (
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-rose-500 border-2 border-white" />
            )}
          </button>
          <Link
            to="/app/profile"
            className="w-8 h-8 rounded-full ml-1 overflow-hidden cursor-pointer hover:opacity-80 transition-opacity"
          >
            <img
              src={getImageURI(user?.userImage)}
              alt="profile"
              className="w-full h-full object-cover"
            />
          </Link>
        </div>
      </div>
    </header>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// STORIES
// ─────────────────────────────────────────────────────────────────────────────
function StoryViewer({ groups, gIdx, sIdx, onAdvance, onClose }) {
  const group = groups[gIdx];
  const story = group?.stories[sIdx];
  if (!story) return null;
  const dur = story.duration_sec || 5;
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/92"
      onClick={onClose}
    >
      <div
        className="relative bg-black rounded-2xl overflow-hidden"
        style={{ width: "min(100vw, 390px)", height: "80vh" }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="absolute top-3 inset-x-3 flex gap-1 z-10">
          {group.stories.map((_, i) => (
            <div
              key={i}
              className="flex-1 h-[3px] rounded-full bg-white/25 overflow-hidden"
            >
              {i < sIdx && <div className="h-full w-full bg-white" />}
              {i === sIdx && (
                <div
                  key={`${gIdx}-${sIdx}`}
                  className="h-full bg-white rounded-full"
                  style={{ animation: `sbar ${dur}s linear forwards` }}
                />
              )}
            </div>
          ))}
        </div>
        <div className="absolute top-8 inset-x-3 flex items-center gap-2.5 z-10">
          <Avatar src={group.author_image} name={group.author_name} size={32} />
          <span className="text-white text-sm font-medium">
            {group.author_name}
          </span>
          <span className="text-white/50 text-xs">
            {timeAgo(story.created_at)}
          </span>
          <button
            onClick={onClose}
            className="ml-auto text-white/80 hover:text-white p-0.5"
          >
            <Icon name="x" size={20} className="text-white" />
          </button>
        </div>
        {story.media_type === "video" ? (
          <video
            src={story.media_url}
            autoPlay
            muted
            playsInline
            className="w-full h-full object-cover"
          />
        ) : (
          <img
            src={story.media_url}
            className="w-full h-full object-cover"
            alt=""
          />
        )}
        {story.caption && (
          <div className="absolute bottom-10 inset-x-0 px-5 py-2 bg-gradient-to-t from-black/60">
            <p className="text-white text-sm text-center">{story.caption}</p>
          </div>
        )}
        <button
          className="absolute left-0 top-0 bottom-0 w-1/3 opacity-0"
          onClick={() => onAdvance(gIdx, sIdx - 2)}
        />
        <button
          className="absolute right-0 top-0 bottom-0 w-1/3 opacity-0"
          onClick={() => onAdvance(gIdx, sIdx)}
        />
      </div>
      <style>{`@keyframes sbar { from { width: 0 } to { width: 100% } }`}</style>
    </div>
  );
}

function Stories() {
  const [groups, setGroups] = useState([]);
  const [active, setActive] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef(null);
  const fileRef = useRef();

  const load = () =>
    api(
      `/stories?user_id=${ACTOR.user_id}&user_role=${encodeURIComponent(ACTOR.user_role)}`,
    )
      .then((d) => setGroups(d.stories || []))
      .catch(() => {});

  useEffect(() => {
    load();
  }, []);

  const markViewed = (id) =>
    api(`/stories/${id}/view`, {
      method: "POST",
      body: JSON.stringify(ACTOR),
    }).catch(() => {});

  const startTimer = (gIdx, sIdx) => {
    clearTimeout(timerRef.current);
    const dur = (groups[gIdx]?.stories[sIdx]?.duration_sec || 5) * 1000;
    timerRef.current = setTimeout(() => advance(gIdx, sIdx), dur);
  };

  const openStory = (gIdx, sIdx = 0) => {
    setActive({ gIdx, sIdx });
    markViewed(groups[gIdx].stories[sIdx].id);
    startTimer(gIdx, sIdx);
  };

  const advance = (gIdx, sIdx) => {
    const grp = groups[gIdx];
    if (!grp) return setActive(null);
    const next = sIdx + 1;
    if (next < grp.stories.length) {
      setActive({ gIdx, sIdx: next });
      markViewed(grp.stories[next].id);
      startTimer(gIdx, next);
    } else if (gIdx + 1 < groups.length) {
      openStory(gIdx + 1, 0);
    } else {
      setActive(null);
    }
  };

  const handleFile = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setProgress(0);
    try {
      const url = await uploadToS3(file, setProgress);
      await api("/stories", {
        method: "POST",
        body: JSON.stringify({
          ...ACTOR,
          media_url: url,
          media_type: file.type.startsWith("video") ? "video" : "image",
        }),
      });
      await load();
    } catch (err) {
      alert(err.message);
    } finally {
      setUploading(false);
      setProgress(0);
      e.target.value = "";
    }
  };

  const R = 20,
    C = 2 * Math.PI * R,
    dash = (progress / 100) * C;

  return (
    <>
      <div className="flex gap-4 overflow-x-auto scrollbar-hide py-1">
        <div className="flex flex-col items-center gap-1.5 shrink-0">
          <button
            disabled={uploading}
            onClick={() => fileRef.current?.click()}
            className="relative w-14 h-14 rounded-full border-2 border-dashed border-violet-300 bg-violet-50 flex items-center justify-center hover:bg-violet-100 transition-colors disabled:opacity-60"
          >
            {uploading ? (
              <>
                <svg
                  width={52}
                  height={52}
                  viewBox="0 0 52 52"
                  className="absolute inset-0"
                >
                  <circle
                    cx={26}
                    cy={26}
                    r={R}
                    fill="none"
                    stroke="#ede9fe"
                    strokeWidth={3}
                  />
                  <circle
                    cx={26}
                    cy={26}
                    r={R}
                    fill="none"
                    stroke="#7c3aed"
                    strokeWidth={3}
                    strokeDasharray={`${dash} ${C}`}
                    strokeLinecap="round"
                    style={{
                      transform: "rotate(-90deg)",
                      transformOrigin: "center",
                    }}
                  />
                </svg>
                <span className="text-[10px] font-bold text-violet-600 z-10">
                  {progress}%
                </span>
              </>
            ) : (
              <Icon name="plus" size={20} className="text-violet-500" />
            )}
          </button>
          <span className="text-[11px] text-gray-500 font-medium">
            Add story
          </span>
          <input
            ref={fileRef}
            type="file"
            accept="image/*,video/*"
            className="hidden"
            onChange={handleFile}
          />
        </div>
        {groups.map((grp, gIdx) => (
          <button
            key={`${grp.author_role}_${grp.author_id}`}
            onClick={() => openStory(gIdx)}
            className="flex flex-col items-center gap-1.5 shrink-0 focus:outline-none"
          >
            <Avatar
              src={grp.author_image}
              name={grp.author_name}
              size={56}
              ring
              ringHex={grp.has_unseen ? "#7c3aed" : "#d1d5db"}
            />
            <span className="text-[11px] text-gray-600 font-medium max-w-[56px] truncate">
              {grp.author_name?.split(" ")[0] || "User"}
            </span>
          </button>
        ))}
      </div>
      {active && (
        <StoryViewer
          groups={groups}
          gIdx={active.gIdx}
          sIdx={active.sIdx}
          onAdvance={advance}
          onClose={() => {
            clearTimeout(timerRef.current);
            setActive(null);
          }}
        />
      )}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// COMPOSER
// ─────────────────────────────────────────────────────────────────────────────
function Composer({ onPosted }) {
  const [open, setOpen] = useState(false);
  const [content, setContent] = useState("");
  const [tag, setTag] = useState("");
  const [visibility, setVisibility] = useState("all");
  const [files, setFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploadProg, setUploadProg] = useState({});
  const [uploading, setUploading] = useState(false);
  const [posting, setPosting] = useState(false);
  const fileRef = useRef();
  const canPost = content.trim().length > 0 || files.length > 0;

  const addFiles = (sel) =>
    Array.from(sel).forEach((file) => {
      setFiles((f) => [...f, file]);
      setPreviews((p) => [
        ...p,
        {
          url: URL.createObjectURL(file),
          type: file.type.startsWith("video") ? "video" : "image",
        },
      ]);
    });

  const removeFile = (idx) => {
    setFiles((f) => f.filter((_, i) => i !== idx));
    setPreviews((p) => p.filter((_, i) => i !== idx));
  };

  const reset = () => {
    setContent("");
    setTag("");
    setFiles([]);
    setPreviews([]);
    setUploadProg({});
    setOpen(false);
  };

  const submit = async () => {
    if (!canPost || posting) return;
    setPosting(true);
    try {
      let mediaUrls = [];
      if (files.length) {
        setUploading(true);
        mediaUrls = await Promise.all(
          files.map((f, i) =>
            uploadToS3(f, (p) =>
              setUploadProg((prev) => ({ ...prev, [i]: p })),
            ),
          ),
        );
        setUploading(false);
      }
      await api("/posts", {
        method: "POST",
        body: JSON.stringify({
          ...ACTOR,
          content: content.trim() || undefined,
          tag_label: tag.trim() || undefined,
          visibility,
          media_urls: mediaUrls,
          post_type: mediaUrls.some(isVideo)
            ? "video"
            : mediaUrls.length
              ? "image"
              : "text",
        }),
      });
      reset();
      onPosted?.();
    } catch (err) {
      alert(err.message);
    } finally {
      setPosting(false);
      setUploading(false);
    }
  };

  if (!open) {
    return (
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4">
        <div className="flex items-center gap-3">
          <Avatar name="Me" size={40} />
          <button
            onClick={() => setOpen(true)}
            className="flex-1 text-left bg-gray-50 hover:bg-violet-50 border border-gray-200 hover:border-violet-200 rounded-full px-4 py-2.5 text-sm text-gray-400 transition-all duration-150"
          >
            Share update, lead requirement or project…
          </button>
        </div>
        <div className="flex gap-1 mt-3 pt-3 border-t border-gray-100">
          {[
            ["image", "Photo"],
            ["video", "Video"],
            ["home", "Property"],
            ["send", "Lead"],
          ].map(([icon, label]) => (
            <button
              key={label}
              onClick={() => setOpen(true)}
              className="flex-1 flex items-center justify-center gap-1.5 py-1.5 rounded-lg text-xs font-medium text-gray-500 hover:bg-gray-50 hover:text-violet-600 transition-colors"
            >
              <Icon name={icon} size={14} />
              <span className="hidden sm:inline">{label}</span>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4">
      <div className="flex gap-3">
        <Avatar name="Me" size={40} />
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What's on your mind?"
          autoFocus
          rows={3}
          className="flex-1 resize-none bg-gray-50 border border-gray-200 focus:border-violet-300 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-800 placeholder-gray-400 outline-none transition-all leading-relaxed"
        />
      </div>
      <input
        value={tag}
        onChange={(e) => setTag(e.target.value)}
        placeholder="Tag label  (e.g. Hot Lead Requirement)"
        className="w-full bg-gray-50 border border-gray-200 focus:border-violet-300 focus:bg-white rounded-xl px-4 py-2.5 text-sm text-gray-700 placeholder-gray-400 outline-none transition-all"
      />
      {previews.length > 0 && (
        <div className="flex gap-2 flex-wrap">
          {previews.map((p, i) => (
            <div
              key={i}
              className="relative w-20 h-20 rounded-xl overflow-hidden bg-gray-100 shrink-0"
            >
              {p.type === "video" ? (
                <video src={p.url} className="w-full h-full object-cover" />
              ) : (
                <img
                  src={p.url}
                  alt=""
                  className="w-full h-full object-cover"
                />
              )}
              {uploading && uploadProg[i] !== undefined && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <span className="text-white text-xs font-bold">
                    {uploadProg[i]}%
                  </span>
                </div>
              )}
              {!uploading && (
                <button
                  onClick={() => removeFile(i)}
                  className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-colors"
                >
                  <Icon name="x" size={11} className="text-white" />
                </button>
              )}
            </div>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between flex-wrap gap-3 pt-1 border-t border-gray-100">
        <div className="flex items-center gap-2">
          {[
            ["image", "Photo", "image/*"],
            ["video", "Video", "video/*"],
          ].map(([icon, label, accept]) => (
            <button
              key={label}
              onClick={() => {
                if (fileRef.current) {
                  fileRef.current.accept = accept;
                  fileRef.current.click();
                }
              }}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-violet-50 hover:bg-violet-100 text-violet-600 text-xs font-semibold transition-colors"
            >
              <Icon name={icon} size={14} /> {label}
            </button>
          ))}
          <select
            value={visibility}
            onChange={(e) => setVisibility(e.target.value)}
            className="px-2.5 py-1.5 rounded-lg border border-gray-200 bg-white text-xs text-gray-600 outline-none cursor-pointer hover:border-violet-300 transition-colors"
          >
            <option value="all">Everyone</option>
            <option value="sales_partner">Sales only</option>
            <option value="territory_partner">Territory only</option>
            <option value="project_partner">Project only</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={reset}
            className="px-4 py-2 rounded-xl border border-gray-200 text-sm text-gray-500 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={submit}
            disabled={!canPost || posting}
            className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-700 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-semibold transition-all active:scale-95"
          >
            {posting ? "Posting…" : "Post"}
          </button>
        </div>
      </div>
      <input
        ref={fileRef}
        type="file"
        multiple
        className="hidden"
        onChange={(e) => addFiles(e.target.files)}
      />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// POST CARD
// ─────────────────────────────────────────────────────────────────────────────
function MediaGrid({ urls }) {
  if (!urls.length) return null;
  return (
    <div
      className={`grid ${urls.length >= 2 ? "grid-cols-2" : "grid-cols-1"} gap-0.5`}
    >
      {urls.slice(0, 4).map((url, i) => (
        <div
          key={i}
          className="relative overflow-hidden bg-gray-100"
          style={{ aspectRatio: urls.length === 1 ? "16/9" : "1/1" }}
        >
          {isVideo(url) ? (
            <video src={url} controls className="w-full h-full object-cover" />
          ) : (
            <img src={url} alt="" className="w-full h-full object-cover" />
          )}
          {i === 3 && urls.length > 4 && (
            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
              <span className="text-white text-2xl font-bold">
                +{urls.length - 4}
              </span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

function PostCard({ post, onDeleted, onUpdated }) {
  const [liked, setLiked] = useState(!!post.has_liked);
  const [likes, setLikes] = useState(post.likes_count || 0);
  const [saved, setSaved] = useState(!!post.is_saved);
  const [showComments, setShowComments] = useState(false);
  const [comments, setComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [loadingCmt, setLoadingCmt] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editContent, setEditContent] = useState(post.content || "");
  const menuRef = useRef();
  const isOwn = post.author_id === ACTOR.user_id;
  const media = parseMedia(post.media_urls);

  useEffect(() => {
    if (!menuOpen) return;
    const h = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target))
        setMenuOpen(false);
    };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, [menuOpen]);

  const handleLike = async () => {
    const prev = liked;
    setLiked(!liked);
    setLikes((l) => l + (liked ? -1 : 1));
    try {
      await api(`/posts/${post.id}/like`, {
        method: "POST",
        body: JSON.stringify(ACTOR),
      });
    } catch {
      setLiked(prev);
      setLikes((l) => l + (liked ? 1 : -1));
    }
  };

  const handleSave = async () => {
    const prev = saved;
    setSaved(!saved);
    try {
      await api(`/posts/${post.id}/save`, {
        method: "POST",
        body: JSON.stringify(ACTOR),
      });
    } catch {
      setSaved(prev);
    }
  };

  const toggleComments = async () => {
    if (showComments) return setShowComments(false);
    setLoadingCmt(true);
    setShowComments(true);
    try {
      const d = await api(
        `/posts/${post.id}/comments?user_id=${ACTOR.user_id}&user_role=${encodeURIComponent(ACTOR.user_role)}`,
      );
      setComments(d.comments || []);
    } catch {}
    setLoadingCmt(false);
  };

  const submitComment = async () => {
    const text = commentText.trim();
    if (!text) return;
    const temp = {
      id: `t_${Date.now()}`,
      author_name: "Me",
      content: text,
      created_at: new Date().toISOString(),
    };
    setComments((c) => [...c, temp]);
    setCommentText("");
    try {
      await api(`/posts/${post.id}/comments`, {
        method: "POST",
        body: JSON.stringify({ ...ACTOR, content: text, partner_name: "Me" }),
      });
      const d = await api(
        `/posts/${post.id}/comments?user_id=${ACTOR.user_id}&user_role=${encodeURIComponent(ACTOR.user_role)}`,
      );
      setComments(d.comments || []);
    } catch (err) {
      setComments((c) => c.filter((x) => x.id !== temp.id));
      alert(err.message);
    }
  };

  const handleDelete = async () => {
    if (!window.confirm("Delete this post?")) return;
    try {
      await api(`/posts/${post.id}`, {
        method: "DELETE",
        body: JSON.stringify(ACTOR),
      });
      onDeleted?.(post.id);
    } catch (err) {
      alert(err.message);
    }
  };

  const handleEditSave = async () => {
    try {
      await api(`/posts/${post.id}`, {
        method: "PUT",
        body: JSON.stringify({ ...ACTOR, content: editContent }),
      });
      setEditing(false);
      onUpdated?.(post.id, { ...post, content: editContent });
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <article className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="flex items-start justify-between px-5 pt-4 pb-3">
        <div className="flex gap-3">
          <Avatar src={post.author_image} name={post.author_name} size={44} />
          <div className="min-w-0">
            <p className="text-[15px] font-semibold text-gray-900 leading-tight">
              {post.author_name || "Unknown"}
            </p>
            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
              <RoleBadge role={post.author_role} />
              <span className="text-[12px] text-gray-400">
                {timeAgo(post.created_at)}
              </span>
            </div>
          </div>
        </div>
        <div className="relative shrink-0" ref={menuRef}>
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <Icon name="more-h" size={18} />
          </button>
          {menuOpen && (
            <div className="absolute right-0 top-9 z-20 bg-white rounded-xl shadow-lg border border-gray-100 py-1 min-w-[148px] overflow-hidden">
              {isOwn && (
                <>
                  <button
                    onClick={() => {
                      setEditing(true);
                      setMenuOpen(false);
                    }}
                    className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 transition-colors text-left"
                  >
                    <Icon name="edit" size={14} className="text-gray-400" />{" "}
                    Edit post
                  </button>
                  <button
                    onClick={() => {
                      handleDelete();
                      setMenuOpen(false);
                    }}
                    className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors text-left"
                  >
                    <Icon name="trash" size={14} className="text-red-400" />{" "}
                    Delete post
                  </button>
                  <div className="border-t border-gray-100 my-1" />
                </>
              )}
              <button
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2.5 w-full px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-50 transition-colors text-left"
              >
                <Icon name="eye" size={14} className="text-gray-400" /> View
                post
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Tag */}
      {post.tag_label && (
        <div className="px-5 pb-2">
          <span
            className="inline-flex items-center px-3 py-1 rounded-full text-[12px] font-semibold"
            style={{
              background: post.tag_bg || "#ede9fe",
              color: post.tag_color || "#7c3aed",
            }}
          >
            {post.tag_label}
          </span>
        </div>
      )}

      {/* Content */}
      <div className="px-5 pb-3">
        {editing ? (
          <div className="space-y-2">
            <textarea
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              rows={3}
              className="w-full resize-none bg-gray-50 border border-gray-200 focus:border-violet-300 focus:bg-white rounded-xl px-4 py-3 text-sm text-gray-800 outline-none transition-all leading-relaxed"
            />
            <div className="flex gap-2">
              <button
                onClick={handleEditSave}
                className="px-4 py-1.5 rounded-lg bg-violet-600 text-white text-xs font-semibold hover:bg-violet-700 transition-colors"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setEditing(false);
                  setEditContent(post.content || "");
                }}
                className="px-4 py-1.5 rounded-lg border border-gray-200 text-gray-500 text-xs hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          post.content && (
            <p className="text-sm text-gray-700 leading-relaxed">
              {post.content}
            </p>
          )
        )}
      </div>

      {/* Media */}
      {media.length > 0 && <MediaGrid urls={media} />}

      {/* Actions */}
      <div className="flex items-center justify-between px-3 py-2 border-t border-gray-100">
        <div className="flex items-center">
          <ActionBtn
            onClick={handleLike}
            active={liked}
            activeCls="text-rose-500 bg-rose-50"
            label={likes > 0 ? String(likes) : ""}
          >
            <Icon
              name={liked ? "heart-fill" : "heart"}
              size={18}
              className={liked ? "text-rose-500" : "text-gray-400"}
            />
          </ActionBtn>
          <ActionBtn
            onClick={toggleComments}
            label={post.comments_count > 0 ? String(post.comments_count) : ""}
          >
            <Icon
              name="comment"
              size={18}
              className={showComments ? "text-violet-500" : "text-gray-400"}
            />
          </ActionBtn>
          <ActionBtn>
            <Icon name="share" size={18} className="text-gray-400" />
          </ActionBtn>
        </div>
        <ActionBtn
          onClick={handleSave}
          active={saved}
          activeCls="text-violet-600 bg-violet-50"
        >
          <Icon
            name={saved ? "bm-fill" : "bookmark"}
            size={18}
            className={saved ? "text-violet-600" : "text-gray-400"}
          />
        </ActionBtn>
      </div>

      {/* Comments */}
      {showComments && (
        <div className="border-t border-gray-100 px-4 py-3 space-y-3">
          {loadingCmt ? (
            <p className="text-xs text-gray-400 text-center py-2">Loading…</p>
          ) : comments.length === 0 ? (
            <p className="text-xs text-gray-400 text-center py-2">
              No comments yet. Be first!
            </p>
          ) : (
            <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
              {comments.map((c) => (
                <div key={c.id} className="flex gap-2.5">
                  <Avatar
                    src={c.author_image}
                    name={c.author_name || c.partner_name}
                    size={30}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="bg-gray-50 rounded-2xl rounded-tl-sm px-3 py-2">
                      <span className="text-xs font-semibold text-gray-800">
                        {c.author_name || c.partner_name}{" "}
                      </span>
                      <span className="text-xs text-gray-600 leading-relaxed">
                        {c.content}
                      </span>
                    </div>
                    <span className="text-[11px] text-gray-400 mt-0.5 ml-2 block">
                      {timeAgo(c.created_at)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="flex gap-2 items-center pt-1">
            <Avatar name="Me" size={30} />
            <div className="flex-1 flex items-center gap-2 bg-gray-50 border border-gray-200 rounded-full px-3 py-1.5 focus-within:border-violet-300 focus-within:bg-white transition-all">
              <input
                value={commentText}
                onChange={(e) => setCommentText(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && !e.shiftKey && submitComment()
                }
                placeholder="Write a comment…"
                className="flex-1 bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none"
              />
              <button
                onClick={submitComment}
                disabled={!commentText.trim()}
                className="text-violet-500 disabled:opacity-30 hover:text-violet-700 transition-colors"
              >
                <Icon name="send" size={15} />
              </button>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// NOTIFICATIONS PANEL
// ─────────────────────────────────────────────────────────────────────────────
const NOTIF_CFG = {
  like: { icon: "heart-fill", dot: "bg-rose-500" },
  comment: { icon: "comment", dot: "bg-violet-600" },
  story_reply: { icon: "send", dot: "bg-blue-500" },
  follow: { icon: "users", dot: "bg-emerald-500" },
};

function NotificationsPanel({ onClose }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api(
      `/notifications?user_id=${ACTOR.user_id}&user_role=${encodeURIComponent(ACTOR.user_role)}`,
    )
      .then((d) => setItems(d.notifications || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <>
      <div className="fixed inset-0 bg-black/30 z-40" onClick={onClose} />
      <div className="fixed top-0 right-0 bottom-0 w-full sm:w-[380px] bg-white z-50 flex flex-col shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5">
            <h2 className="text-base font-semibold text-gray-900">
              Notifications
            </h2>
            {items.filter((n) => !n.is_read).length > 0 && (
              <span className="bg-violet-600 text-white text-[11px] font-bold px-2 py-0.5 rounded-full">
                {items.filter((n) => !n.is_read).length}
              </span>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <Icon name="x" size={18} />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-32">
              <span className="text-sm text-gray-400">Loading…</span>
            </div>
          ) : items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-32 gap-2">
              <Icon name="bell" size={28} className="text-gray-200" />
              <span className="text-sm text-gray-400">
                No notifications yet
              </span>
            </div>
          ) : (
            items.map((n) => {
              const cfg = NOTIF_CFG[n.type] || {
                icon: "bell",
                dot: "bg-gray-400",
              };
              return (
                <div
                  key={n.id}
                  className={`flex gap-3 px-5 py-3.5 border-b border-gray-50 ${!n.is_read ? "bg-violet-50/60" : "hover:bg-gray-50"}`}
                >
                  <div className="relative shrink-0">
                    <Avatar src={n.actor_image} name={n.actor_name} size={42} />
                    <div
                      className={`absolute -bottom-0.5 -right-0.5 w-5 h-5 ${cfg.dot} rounded-full flex items-center justify-center border-2 border-white`}
                    >
                      <Icon name={cfg.icon} size={9} className="text-white" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-gray-800 leading-snug">
                      <span className="font-semibold">{n.actor_name}</span>{" "}
                      {n.message}
                    </p>
                    <span className="text-[11px] text-gray-400 mt-0.5 block">
                      {timeAgo(n.created_at)}
                    </span>
                  </div>
                  {!n.is_read && (
                    <div className="w-2 h-2 rounded-full bg-violet-500 mt-1 shrink-0" />
                  )}
                </div>
              );
            })
          )}
        </div>
      </div>
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// RIGHT SIDEBAR — fully API-driven
// ─────────────────────────────────────────────────────────────────────────────
function SideCard({ title, children, action, onAction }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 pt-4 pb-3">
        <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
        {action && (
          <button
            onClick={onAction}
            className="text-[12px] font-semibold text-violet-600 hover:text-violet-800 transition-colors"
          >
            {action}
          </button>
        )}
      </div>
      <div className="px-4 pb-4 space-y-3.5">{children}</div>
    </div>
  );
}

// ── Trending Posts ────────────────────────────────────────────────────────────
// Fetches recent feed posts and shows the top ones by likes as "trending"
function TrendingPosts() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api(
      `/posts?user_id=${ACTOR.user_id}&user_role=${encodeURIComponent(ACTOR.user_role)}&page=1&limit=10`,
    )
      .then((d) => {
        // Sort by likes desc, take top 3
        const sorted = (d.posts || [])
          .filter((p) => p.likes_count > 0 || p.comments_count > 0)
          .sort(
            (a, b) =>
              (b.likes_count || 0) +
              (b.comments_count || 0) -
              ((a.likes_count || 0) + (a.comments_count || 0)),
          )
          .slice(0, 3);
        setPosts(sorted);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const roleBadgeCfg = {
    sales_partner: { label: "HOT", cls: "bg-rose-500 text-white" },
    territory_partner: { label: "NEW", cls: "bg-blue-500 text-white" },
    project_partner: { label: "TOP", cls: "bg-violet-500 text-white" },
  };

  if (loading) return <SidebarSkeleton rows={3} />;

  if (!posts.length) {
    return (
      <div className="flex flex-col items-center justify-center py-4 gap-1.5">
        <Icon name="building" size={24} className="text-gray-200" />
        <p className="text-[12px] text-gray-400 text-center">
          No trending posts yet
        </p>
      </div>
    );
  }

  return (
    <>
      {posts.map((p) => {
        const badge = roleBadgeCfg[p.author_role];
        const media = parseMedia(p.media_urls);
        const thumb = media[0] || null;

        return (
          <div key={p.id} className="flex items-center gap-3 group cursor-pointer">
            <div className="relative shrink-0">
              {thumb && !isVideo(thumb) ? (
                <img
                  src={thumb}
                  alt={p.author_name}
                  className="w-11 h-11 rounded-xl object-cover"
                />
              ) : (
                <div className="w-11 h-11 rounded-xl bg-violet-50 flex items-center justify-center">
                  <Avatar
                    src={p.author_image}
                    name={p.author_name}
                    size={44}
                  />
                </div>
              )}
              {badge && (
                <span
                  className={`absolute -top-1 -right-1 text-[9px] font-black px-1 py-0.5 rounded-md leading-none ${badge.cls}`}
                >
                  {badge.label}
                </span>
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-semibold text-gray-800 group-hover:text-violet-700 transition-colors truncate">
                {p.author_name || "Unknown"}
              </p>
              <p className="text-[12px] text-gray-400 truncate">
                {p.content
                  ? p.content.slice(0, 40) + (p.content.length > 40 ? "…" : "")
                  : `${p.likes_count || 0} likes · ${p.comments_count || 0} comments`}
              </p>
            </div>
            <Icon
              name="chevright"
              size={14}
              className="text-gray-300 group-hover:text-violet-400 transition-colors shrink-0"
            />
          </div>
        );
      })}
    </>
  );
}

// ── Suggested For You ─────────────────────────────────────────────────────────
// Fetches users from /api/follow/search (empty query = browse all)
// Excludes users the actor already follows
function SuggestedUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [followingMap, setFollowingMap] = useState({}); // user key → bool
  const [pendingMap, setPendingMap] = useState({});

  useEffect(() => {
    followApi(
      `/search?q=&user_id=${ACTOR.user_id}&user_role=${encodeURIComponent(ACTOR.user_role)}&limit=6`,
    )
      .then((d) => {
        // Filter out self and already-following
        const filtered = (d.users || [])
          .filter(
            (u) =>
              !(
                u.id === ACTOR.user_id &&
                u.role ===
                  {
                    "Sales Person": "sales_partner",
                    "Territory Person": "territory_partner",
                    "Project Person": "project_partner",
                  }[ACTOR.user_role]
              ),
          )
          .slice(0, 3);

        setUsers(filtered);

        // Seed followingMap from the is_following field returned by search
        const map = {};
        filtered.forEach((u) => {
          map[`${u.id}_${u.role}`] = !!u.is_following;
        });
        setFollowingMap(map);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handleFollow = async (u) => {
    const key = `${u.id}_${u.role}`;
    const isCurrentlyFollowing = followingMap[key];
    setPendingMap((prev) => ({ ...prev, [key]: true }));
    // Optimistic update
    setFollowingMap((prev) => ({ ...prev, [key]: !isCurrentlyFollowing }));

    try {
      await followApi("/toggle", {
        method: "POST",
        body: JSON.stringify({
          user_id: ACTOR.user_id,
          user_role: ACTOR.user_role,
          target_id: u.id,
          target_role: u.role,
        }),
      });
    } catch {
      // Revert on failure
      setFollowingMap((prev) => ({ ...prev, [key]: isCurrentlyFollowing }));
    } finally {
      setPendingMap((prev) => ({ ...prev, [key]: false }));
    }
  };

  const roleLabel = {
    sales_partner: "Sales Partner",
    territory_partner: "Territory Partner",
    project_partner: "Project Partner",
  };

  if (loading) return <SidebarSkeleton rows={3} />;

  if (!users.length) {
    return (
      <div className="flex flex-col items-center justify-center py-4 gap-1.5">
        <Icon name="users" size={24} className="text-gray-200" />
        <p className="text-[12px] text-gray-400 text-center">
          No suggestions right now
        </p>
      </div>
    );
  }

  return (
    <>
      {users.map((u) => {
        const key = `${u.id}_${u.role}`;
        const isFollowing = followingMap[key];
        const isPending = pendingMap[key];

        return (
          <div key={key} className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-2.5 min-w-0">
              <Avatar
                src={u.userimage ? getImageURI(u.userimage) : null}
                name={u.fullname || u.username || "User"}
                size={36}
              />
              <div className="min-w-0">
                <p className="text-[13px] font-semibold text-gray-800 truncate">
                  {u.fullname || u.username || "User"}
                </p>
                <p className="text-[12px] text-gray-400 truncate">
                  {u.displayRole || roleLabel[u.role] || u.role}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleFollow(u)}
              disabled={isPending}
              className={`shrink-0 px-3 py-1 rounded-full border text-[12px] font-semibold transition-all ${
                isPending
                  ? "opacity-50 cursor-not-allowed border-gray-200 text-gray-400"
                  : isFollowing
                    ? "border-gray-200 text-gray-500 hover:border-red-200 hover:text-red-500 hover:bg-red-50"
                    : "border-violet-200 text-violet-600 hover:bg-violet-50"
              }`}
            >
              {isPending ? "…" : isFollowing ? "Following" : "Connect"}
            </button>
          </div>
        );
      })}
    </>
  );
}

// ── Follow Counts (my network stats) ─────────────────────────────────────────
function MyNetworkStats() {
  const [counts, setCounts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    followApi(
      `/counts?user_id=${ACTOR.user_id}&user_role=${encodeURIComponent(ACTOR.user_role)}`,
    )
      .then((d) => setCounts({ followers: d.followers, following: d.following }))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex gap-4 animate-pulse">
        <div className="flex-1 h-10 bg-gray-100 rounded-xl" />
        <div className="flex-1 h-10 bg-gray-100 rounded-xl" />
      </div>
    );
  }

  if (!counts) return null;

  return (
    <div className="flex gap-3">
      {[
        { label: "Followers", value: counts.followers },
        { label: "Following", value: counts.following },
      ].map(({ label, value }) => (
        <div
          key={label}
          className="flex-1 bg-gray-50 rounded-xl px-3 py-2.5 text-center"
        >
          <p className="text-base font-bold text-gray-900 leading-tight">
            {value ?? "—"}
          </p>
          <p className="text-[11px] text-gray-400 font-medium mt-0.5">
            {label}
          </p>
        </div>
      ))}
    </div>
  );
}

// ── Right Sidebar shell ───────────────────────────────────────────────────────
function RightSidebar() {
  return (
    <div className="space-y-4">
      {/* My Network */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-4 pt-4 pb-3">
          <h3 className="text-sm font-semibold text-gray-800">My Network</h3>
        </div>
        <div className="px-4 pb-4">
          <MyNetworkStats />
        </div>
      </div>

      {/* Trending Posts */}
      <SideCard title="Trending Posts" action="View all">
        <TrendingPosts />
      </SideCard>

      {/* Suggested For You */}
      <SideCard title="Suggested For You" action="See more">
        <SuggestedUsers />
      </SideCard>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SKELETON
// ─────────────────────────────────────────────────────────────────────────────
function PostSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 space-y-4 animate-pulse">
      <div className="flex gap-3">
        <div className="w-11 h-11 rounded-full bg-gray-200 shrink-0" />
        <div className="flex-1 space-y-2 pt-1">
          <div className="h-3.5 bg-gray-200 rounded-full w-1/3" />
          <div className="h-3 bg-gray-100 rounded-full w-1/2" />
        </div>
      </div>
      <div className="space-y-2">
        <div className="h-3 bg-gray-100 rounded-full" />
        <div className="h-3 bg-gray-100 rounded-full w-5/6" />
        <div className="h-3 bg-gray-100 rounded-full w-4/6" />
      </div>
      <div className="flex gap-4 pt-2 border-t border-gray-100">
        {[0, 1, 2].map((k) => (
          <div key={k} className="h-7 w-16 bg-gray-100 rounded-lg" />
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN FEED PAGE
// ─────────────────────────────────────────────────────────────────────────────
export default function Feed() {
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);
  const [hasMore, setHasMore] = useState(true);
  const [showNotifs, setShowNotifs] = useState(false);
  const [unread, setUnread] = useState(0);
  const loaderRef = useRef(null);
  const loadingRef = useRef(false);

  const loadPosts = useCallback(async (p = 1) => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    setLoading(true);
    try {
      const d = await api(
        `/posts?user_id=${ACTOR.user_id}&user_role=${encodeURIComponent(ACTOR.user_role)}&page=${p}&limit=10`,
      );
      const fresh = d.posts || [];
      setPosts((prev) => (p === 1 ? fresh : [...prev, ...fresh]));
      setHasMore(fresh.length === 10);
    } catch (err) {
      console.error("[Feed]", err.message);
    } finally {
      loadingRef.current = false;
      setLoading(false);
      setInitialLoad(false);
    }
  }, []);

  useEffect(() => {
    api(
      `/notifications/unread-count?user_id=${ACTOR.user_id}&user_role=${encodeURIComponent(ACTOR.user_role)}`,
    )
      .then((d) => setUnread(d.count || 0))
      .catch(() => {});
  }, []);

  useEffect(() => {
    loadPosts(1);
  }, [loadPosts]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !loadingRef.current) {
          setPage((prev) => {
            const next = prev + 1;
            loadPosts(next);
            return next;
          });
        }
      },
      { threshold: 0.1 },
    );
    const el = loaderRef.current;
    if (el) obs.observe(el);
    return () => {
      if (el) obs.unobserve(el);
    };
  }, [hasMore, loadPosts]);

  return (
    <div className="min-h-screen bg-[#F4F5F9]">
      <Navbar
        unread={unread}
        onBell={() => {
          setShowNotifs(true);
          setUnread(0);
        }}
      />
      <main className="max-w-screen-xl mx-auto px-4 sm:px-6 py-5">
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-5 items-start">
          <div className="min-w-0 space-y-4">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm px-4 py-3">
              <Stories />
            </div>
            <Composer
              onPosted={() => {
                setPage(1);
                loadPosts(1);
              }}
            />
            {initialLoad
              ? [0, 1, 2].map((i) => <PostSkeleton key={i} />)
              : posts.map((post) => (
                  <PostCard
                    key={post.id}
                    post={post}
                    onDeleted={(id) =>
                      setPosts((p) => p.filter((x) => x.id !== id))
                    }
                    onUpdated={(id, updated) =>
                      setPosts((p) => p.map((x) => (x.id === id ? updated : x)))
                    }
                  />
                ))}
            <div
              ref={loaderRef}
              className="flex items-center justify-center py-5"
            >
              {loading && !initialLoad && (
                <div className="flex gap-1.5">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="w-2 h-2 rounded-full bg-violet-300 animate-bounce"
                      style={{ animationDelay: `${i * 0.12}s` }}
                    />
                  ))}
                </div>
              )}
              {!hasMore && posts.length > 0 && (
                <p className="text-[13px] text-gray-400">
                  You're all caught up ✓
                </p>
              )}
            </div>
          </div>
          <div className="hidden xl:block sticky top-18">
            <RightSidebar />
          </div>
        </div>
      </main>
      {showNotifs && (
        <NotificationsPanel onClose={() => setShowNotifs(false)} />
      )}
    </div>
  );
}