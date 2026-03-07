import {
  FiMoreHorizontal,
  FiImage,
  FiVideo,
  FiHome,
  FiSend,
  FiShare2,
  FiHeart,
  FiMenu,
  FiSearch,
  FiBell,
  FiLogOut,
} from "react-icons/fi";

export default function Feed() {
  return (
    <div className="w-full bg-[#F6F7FB] min-h-screen">
      {/* Top Navbar */}
      <div className="block sm:hidden sticky top-0 z-30 bg-[#ffffff] px-4 md:px-6 py-3 border-b">
        <div className="flex items-center justify-between gap-3">
          {/* Left: Hamburger + Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="md:hidden flex items-center justify-center px-2"
            >
              <FiMenu className="w-6 h-6" />
            </button>

          </div>

          {/* Right: Search + Bell + Profile */}
          <div className="flex items-center gap-2 md:gap-3 flex-1 justify-end">

            <FiSearch className="sm:hidden text-black w-6 h-6" />

            <button className="w-10 h-10 rounded-full bg-white sm:border flex items-center justify-center">
              <FiBell className="w-6 sm:w-auto h-6 sm:h-auto" />
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 pb-6 sm:py-6 grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6">
        {/* FEED */}
        <div className="space-y-5">
          <Stories />

          <Composer />

          <PostCard
            name="Sarah Mendez"
            role="Agent"
            location="Downtown, Austin, TX"
            time="2h ago"
            tag="Hot Lead Requirement"
            content="Urgently looking for a 3BHK unit for a client ready to close this week. Budget is flexible for the right amenities. Prefer high-rise with balcony."
            meta={[
              ["Type", "Residential Apartment (3BHK)"],
              ["Budget", "$450k - $520k"],
              ["Location Preference", "Downtown / Riverside"],
              ["Valid Till", "Oct 25"],
            ]}
          />

          <PostImage
            name="Apex Constructions"
            role="Builder"
            location="Skyline District"
            time="4h ago"
            img="https://images.unsplash.com/photo-1590644365607-1b9c6e8f1b0b"
            content="Phase 2 of The Zenith is officially open for bookings! Early bird offers available."
          />

          <PostVideo
            name="Priya Sharma"
            role="Sales Partner"
            location="Green Valley"
            time="6h ago"
            img="https://images.unsplash.com/photo-1560448204-e02f11c3d0e2"
            content="Walkthrough of the new Villa type C. The finishing is exquisite! ✨"
          />
        </div>

        {/* SIDEBAR */}
        <RightSidebar />
      </div>
    </div>
  );
}

/* ---------------- Components ---------------- */

function Stories() {
  const users = ["You", "Thomas", "Sofia", "Devansh", "Varun", "BuildCo"];
  return (
    <div className="flex gap-4 overflow-scroll scrollbar-hide bg-white sm:bg-transparent p-4">
      {users.map((u) => (
        <div key={u} className="flex flex-col items-center shrink-0">
          <img
            src={`https://i.pravatar.cc/100?u=${u}`}
            className="w-14 h-14 rounded-full border-2 border-violet-600"
          />
          <p className="text-xs mt-1 text-gray-600">{u}</p>
        </div>
      ))}
    </div>
  );
}

function Composer() {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm space-y-3">
      <div className="flex gap-3">
        <img
          src="https://i.pravatar.cc/100?img=32"
          className="w-10 h-10 rounded-full"
        />
        <input
          placeholder="Share update, lead requirement or project progress..."
          className="flex-1 bg-[#F3EEFF] rounded-xl px-4 py-2 text-sm outline-none"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex gap-6 text-sm text-gray-500">
          <button className="flex items-center gap-2">
            <FiImage className="w-5 h-5 text-[#5323DC]" /> Photo
          </button>
          <button className="flex items-center gap-2">
            <FiVideo className="w-5 h-5 text-[#5323DC]" /> Reel
          </button>
          <button className="hidden sm:flex items-center gap-2">
            <FiHome className="w-5 h-5 text-[#5323DC]" /> Property
          </button>
          <button className="flex items-center gap-2">
            <FiSend className="w-5 h-5 text-[#5323DC]" /> Lead
          </button>
        </div>

        <button className="bg-violet-600 text-white px-4 py-2 rounded-xl text-sm">
          Post
        </button>
      </div>
    </div>
  );
}

function PostCard({ name, role, location, time, tag, content, meta }) {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm space-y-3">
      <PostHeader {...{ name, role, location, time }} />

      <p className="text-sm text-gray-700">{content}</p>

      <div className="bg-[#F1EAFE] rounded-xl p-3 space-y-1 text-xs">
        <p className="font-semibold text-violet-700">{tag}</p>
        {meta.map(([k, v]) => (
          <div key={k} className="flex justify-between">
            <span className="text-gray-500">{k}</span>
            <span className="font-medium">{v}</span>
          </div>
        ))}
      </div>

      <PostActions />
    </div>
  );
}

function PostImage({ name, role, location, time, content, img }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="p-4 space-y-2">
        <PostHeader {...{ name, role, location, time }} />
        <p className="text-sm text-gray-700">{content}</p>
      </div>

      <img src={img} className="w-full h-64 object-cover" />

      <div className="p-4">
        <PostActions />
      </div>
    </div>
  );
}

function PostVideo({ name, role, location, time, content, img }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
      <div className="p-4 space-y-2">
        <PostHeader {...{ name, role, location, time }} />
        <p className="text-sm text-gray-700">{content}</p>
      </div>

      <div className="relative">
        <img src={img} className="w-full h-64 object-cover" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black/50 text-white px-4 py-2 rounded-full text-sm">
            ▶
          </div>
        </div>
      </div>

      <div className="p-4">
        <PostActions />
      </div>
    </div>
  );
}

function PostHeader({ name, role, location, time }) {
  return (
    <div className="flex justify-between items-start">
      <div className="flex gap-3">
        <img
          src={`https://i.pravatar.cc/100?u=${name}`}
          className="w-10 h-10 rounded-full"
        />
        <div>
          <p className="font-medium">{name}</p>
          <p className="text-xs text-gray-500">
            {role} • {location} • {time}
          </p>
        </div>
      </div>
      <FiMoreHorizontal />
    </div>
  );
}

function PostActions() {
  return (
    <div className="flex justify-between text-gray-500 text-sm pt-3">
      <div className="flex gap-4">
        <FiHeart />
        <FiSend />
        <FiShare2 />
      </div>
      <span className="text-xs">12</span>
    </div>
  );
}

function RightSidebar() {
  return (
    <div className="hidden lg:block space-y-5">

      <TrendingProjects />

      <SuggestedForYou />

      <UpcomingEvents />

    </div>
  );
}

/* ---------------- Trending Projects ---------------- */

function TrendingProjects() {
  const projects = [
    {
      title: "The Grand Arch",
      desc: "$1.2M • 24 Units Left",
      img: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb",
    },
    {
      title: "Blue Ridge Estate",
      desc: "$850k • Launching Soon",
      img: "https://images.unsplash.com/photo-1507089947368-19c1da9775ae",
    },
    {
      title: "Oasis Towers",
      desc: "$2.1M • Luxury Penthouses",
      img: "https://images.unsplash.com/photo-1523217582562-09d0def993a6",
    },
  ];

  return (
    <SidebarCard title="Trending Projects">
      {projects.map((p) => (
        <div key={p.title} className="flex items-center gap-3">
          <img
            src={p.img}
            className="w-10 h-10 rounded-lg object-cover"
          />
          <div className="flex-1">
            <p className="text-sm font-medium">{p.title}</p>
            <p className="text-xs text-gray-500">{p.desc}</p>
          </div>
        </div>
      ))}
    </SidebarCard>
  );
}

/* ---------------- Suggested For You ---------------- */

function SuggestedForYou() {
  const users = [
    {
      name: "David Chen",
      role: "Top Broker",
      img: "https://i.pravatar.cc/100?img=12",
    },
    {
      name: "Layla Hassan",
      role: "Interior Designer",
      img: "https://i.pravatar.cc/100?img=47",
    },
    {
      name: "Marcus Reid",
      role: "Investor",
      img: "https://i.pravatar.cc/100?img=33",
    },
  ];

  return (
    <SidebarCard title="Suggested For You">
      {users.map((u) => (
        <div key={u.name} className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={u.img}
              className="w-9 h-9 rounded-full object-cover"
            />
            <div>
              <p className="text-sm font-medium">{u.name}</p>
              <p className="text-xs text-gray-500">{u.role}</p>
            </div>
          </div>

          <button className="text-xs text-violet-600 font-medium hover:underline">
            Connect
          </button>
        </div>
      ))}
    </SidebarCard>
  );
}

/* ---------------- Upcoming Events ---------------- */

function UpcomingEvents() {
  const events = [
    {
      title: "Real Estate Expo",
      date: "12 Oct",
      location: "Austin Convention Ctr",
    },
    {
      title: "Builder’s Meetup",
      date: "18 Oct",
      location: "The Grand Hotel",
    },
  ];

  return (
    <SidebarCard title="Upcoming Events">
      {events.map((e) => (
        <div key={e.title} className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-violet-100 text-violet-600 flex items-center justify-center text-xs font-semibold">
            {e.date}
          </div>
          <div>
            <p className="text-sm font-medium">{e.title}</p>
            <p className="text-xs text-gray-500">{e.location}</p>
          </div>
        </div>
      ))}
    </SidebarCard>
  );
}

/* ---------------- Base Card ---------------- */

function SidebarCard({ title, children }) {
  return (
    <div className="bg-white rounded-2xl p-4 shadow-sm">
      <div className="flex justify-between mb-3">
        <h4 className="font-semibold">{title}</h4>
        <button className="text-violet-600 text-xs">View All</button>
      </div>

      <div className="space-y-4">
        {children}
      </div>
    </div>
  );
}