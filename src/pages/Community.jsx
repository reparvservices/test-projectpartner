import { useState } from "react";
import {
  Search, Plus, MessageCircle, ThumbsUp, BarChart2,
  MoreHorizontal, PlusCircle,
} from "lucide-react";

const GRADIENT = "linear-gradient(110.73deg, #5E23DC 0%, #7C3AED 100%)";

// ── DATA ──────────────────────────────────────────────────────────────────────
const TABS = [
  { key: "all",      label: "All Discussions" },
  { key: "groups",   label: "My Groups" },
  { key: "trending", label: "Trending Topics" },
  { key: "questions",label: "Questions" },
  { key: "events",   label: "Events & Meetups" },
];

const POSTS = [
  {
    id: 1,
    avatar: "https://i.pravatar.cc/40?img=5",
    name: "James Wilson",
    badge: "Builder",
    badgeColor: "bg-amber-100 text-amber-700",
    time: "2 hours ago",
    group: "Commercial Development Group",
    title: "Sustainable Materials in 2024 High-Rises?",
    body: "We're starting a new 40-story project in the financial district and aiming for LEED Platinum certification. I'm curious what suppliers everyone is using for recycled steel composites? We've had supply chain issues with our usual vendors.",
    image: null,
    replies: 24,
    likes: 156,
    views: "1.2k",
    hasHeart: false,
  },
  {
    id: 2,
    avatar: "https://i.pravatar.cc/40?img=9",
    name: "Sarah Jenkins",
    badge: "Agent",
    badgeColor: "bg-violet-100 text-violet-700",
    time: "5 hours ago",
    group: "Modern Living & Interiors",
    title: "Just listed: The most stunning loft in Arts District",
    body: "Take a look at these industrial finishes! Exposed brick is back in a big way. What do you think is the best staging strategy for these open-concept spaces?",
    image: "https://images.unsplash.com/photo-1556912173-3bb406ef7e8f?w=700&h=340&fit=crop",
    replies: 42,
    likes: 312,
    views: "3.4k",
    hasHeart: true,
  },
  {
    id: 3,
    avatar: "https://i.pravatar.cc/40?img=18",
    name: "Raj Patel",
    badge: "Sales Partner",
    badgeColor: "bg-blue-100 text-blue-700",
    time: "1 day ago",
    group: "Tech Tools & CRM",
    title: "Best CRM for team of 50+ agents?",
    body: "We are outgrowing our current setup. Looking for something that handles automated follow-ups well but still feels personal. Has anyone tried the new Reparv Pro integration?",
    image: null,
    replies: 89,
    likes: 204,
    views: null,
    hasHeart: false,
  },
];

const MEMBERS = [
  "https://i.pravatar.cc/56?img=1",
  "https://i.pravatar.cc/56?img=7",
  null,
  "https://i.pravatar.cc/56?img=11",
  "https://i.pravatar.cc/56?img=13",
  "https://i.pravatar.cc/56?img=16",
  "https://i.pravatar.cc/56?img=27",
  "https://i.pravatar.cc/56?img=31",
  "https://i.pravatar.cc/56?img=35",
];

const GROUPS = [
  { name: "Commercial Real Estate", members: "12k Members", image: "https://images.unsplash.com/photo-1486325212027-8081e485255e?w=60&h=60&fit=crop" },
  { name: "PropTech Innovators",    members: "8.5k Members", image: null },
  { name: "Luxury Listings",        members: "5k Members",   image: null },
];

const EVENTS = [
  { day: "15", month: "OCT", title: "Global RE Summit",        sub: "Virtual • 10:00 AM" },
  { day: "22", month: "OCT", title: "Agent Networking Mixer",  sub: "New York, NY • 6:00 PM" },
];

// ── Post Card ─────────────────────────────────────────────────────────────────
function PostCard({ post }) {
  return (
    <div className="bg-white rounded-[8px] border border-gray-100 shadow-sm p-5 flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-center gap-2.5">
          <img src={post.avatar} alt={post.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-[14px] font-bold text-gray-900">{post.name}</span>
              <span className={`text-[11px] font-semibold px-2.5 py-0.5 rounded-full ${post.badgeColor}`}>
                {post.badge}
              </span>
            </div>
            <p className="text-[12px] text-gray-400 mt-0.5">
              {post.time} <span className="mx-1">•</span> {post.group}
            </p>
          </div>
        </div>
        <button className="p-1.5 text-gray-400 hover:text-gray-600 rounded-full hover:bg-gray-100 transition-colors shrink-0">
          <MoreHorizontal size={16} />
        </button>
      </div>

      {/* Content */}
      <div>
        <h3 className="text-[15px] font-extrabold text-gray-900 mb-2 leading-snug">{post.title}</h3>
        <p className="text-[13.5px] text-gray-500 leading-relaxed">{post.body}</p>
      </div>

      {/* Image */}
      {post.image && (
        <img
          src={post.image}
          alt="post"
          className="w-full rounded-[10px] object-cover max-h-[260px]"
        />
      )}

      {/* Footer */}
      <div className="flex items-center justify-between gap-2 pt-1 flex-wrap">
        <div className="flex items-center gap-4 text-[12.5px] text-gray-400 font-medium flex-wrap">
          <span className="flex items-center gap-1.5">
            <MessageCircle size={14} /> {post.replies} Replies
          </span>
          <span className="flex items-center gap-1.5">
            {post.hasHeart
              ? <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-gray-400"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              : <ThumbsUp size={14} />
            }
            {post.likes} Likes
          </span>
          {post.views && (
            <span className="flex items-center gap-1.5">
              <BarChart2 size={14} /> {post.views} Views
            </span>
          )}
        </div>
        <button
          className="text-[13px] font-semibold text-violet-600 bg-violet-50 px-4 py-1.5 rounded-full hover:bg-violet-100 transition-colors whitespace-nowrap"
        >
          Join Discussion
        </button>
      </div>
    </div>
  );
}

// ── Active Members Widget ─────────────────────────────────────────────────────
function ActiveMembers() {
  return (
    <div className="bg-white rounded-[8px] border border-gray-100 shadow-sm p-5">
      <h3 className="text-[15px] font-extrabold text-gray-900 mb-4">Active Members</h3>
      <div className="grid grid-cols-5 gap-2.5">
        {MEMBERS.map((src, i) => (
          src
            ? <img key={i} src={src} alt="" className="w-full aspect-square rounded-full object-cover ring-2 ring-white" />
            : <div key={i} className="w-full aspect-square rounded-full border-2 border-gray-200 bg-gray-50" />
        ))}
        <div className="w-full aspect-square rounded-full bg-violet-50 flex items-center justify-center">
          <span className="text-[11.5px] font-bold text-violet-600">+2k</span>
        </div>
      </div>
    </div>
  );
}

// ── Suggested Groups Widget ───────────────────────────────────────────────────
function SuggestedGroups() {
  return (
    <div className="bg-white rounded-[8px] border border-gray-100 shadow-sm p-5">
      <h3 className="text-[15px] font-extrabold text-gray-900 mb-4">Suggested Groups</h3>
      <div className="flex flex-col divide-y divide-gray-50">
        {GROUPS.map((g, i) => (
          <div key={i} className="flex items-center gap-3 py-3 first:pt-0 last:pb-0">
            {g.image
              ? <img src={g.image} alt={g.name} className="w-11 h-11 rounded-[8px] object-cover shrink-0" />
              : <div className="w-11 h-11 rounded-[8px] bg-gray-100 shrink-0" />
            }
            <div className="flex-1 min-w-0">
              <p className="text-[13.5px] font-bold text-gray-900 leading-tight">{g.name}</p>
              <p className="text-[12px] text-gray-400 mt-0.5">{g.members}</p>
            </div>
            <button className="text-violet-600 hover:text-violet-700 transition-colors shrink-0">
              <PlusCircle size={22} strokeWidth={1.5} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Upcoming Events Widget ────────────────────────────────────────────────────
function UpcomingEvents() {
  return (
    <div className="bg-white rounded-[8px] border border-gray-100 shadow-sm p-5">
      <h3 className="text-[15px] font-extrabold text-gray-900 mb-4">Upcoming Events</h3>
      <div className="flex flex-col divide-y divide-gray-50">
        {EVENTS.map((e, i) => (
          <div key={i} className="flex items-center gap-3.5 py-3.5 first:pt-0 last:pb-0">
            <div className="w-14 h-14 rounded-[12px] bg-violet-50 flex flex-col items-center justify-center shrink-0">
              <span className="text-[18px] font-extrabold text-violet-700 leading-none">{e.day}</span>
              <span className="text-[10px] font-bold text-violet-500 tracking-wider mt-0.5">{e.month}</span>
            </div>
            <div>
              <p className="text-[13.5px] font-bold text-gray-900 leading-tight">{e.title}</p>
              <p className="text-[12px] text-gray-400 mt-1">{e.sub}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ── Main Page ─────────────────────────────────────────────────────────────────
export default function Community() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  return (
    <div className="min-h-screen">

      {/* ── Header ── */}
      <div className="px-4 md:px-8 pt-5 pb-0 bg-white md:bg-transparent border-b">
        {/* Top row */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <h1 className="text-[22px] font-bold tracking-tight shrink-0">Community</h1>
          <div className="hidden md:flex flex-wrap items-center gap-4 flex-1 justify-end">
            <div className="flex items-center gap-2 bg-white border rounded-[6px] px-3.5 py-[8px] min-w-[300px] max-w-[420px] flex-1">
              <Search size={15} className="text-gray-400 shrink-0" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search topics, members, or groups..."
                className="outline-none text-[13px] text-white placeholder:text-gray-400 bg-transparent w-full"
              />
            </div>
            <button
              className="flex items-center gap-2 px-5 py-[8px] text-white text-[13.5px] font-bold rounded-[6px] whitespace-nowrap hover:opacity-90 transition-opacity shadow-[0_4px_14px_rgba(94,35,220,0.4)]"
              style={{ background: GRADIENT }}
            >
              <Plus size={15} strokeWidth={2.5} /> Create Discussion
            </button>
          </div>
          {/* Mobile: FAB only */}
          <button
            className="flex md:hidden items-center gap-1.5 px-4 py-2.5 text-white text-[13px] font-bold rounded-[10px] whitespace-nowrap"
            style={{ background: GRADIENT }}
          >
            <Plus size={14} strokeWidth={2.5} /> Create
          </button>
        </div>

        {/* Mobile search */}
        <div className="flex md:hidden items-center gap-2 bg-white border rounded-[8px] px-3.5 py-[10px] mb-4">
          <Search size={15} className="text-gray-400 shrink-0" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search topics, members, or groups..."
            className="outline-none text-[13px] text-white placeholder:text-gray-400 bg-transparent w-full"
          />
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-0 overflow-x-auto scrollbar-none border-b border-white/10">
          {TABS.map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              className={`relative px-4 py-3 text-[13.5px] font-semibold whitespace-nowrap transition-colors ${
                activeTab === tab.key
                  ? "text-[#6B3CE6]"
                  : "text-gray-500 hover:text-gray-300"
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-violet-500 rounded-t-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* ── Body ── */}
      <div className="px-4 md:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-5 max-w-[1200px] mx-auto">

          {/* ── Posts Feed ── */}
          <div className="flex-1 flex flex-col gap-4 min-w-0">
            {POSTS.map(post => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>

          {/* ── Sidebar ── */}
          <div className="lg:w-[300px] xl:w-[320px] shrink-0 flex flex-col gap-4">
            <ActiveMembers />
            <SuggestedGroups />
            <UpcomingEvents />
          </div>

        </div>
      </div>
    </div>
  );
}