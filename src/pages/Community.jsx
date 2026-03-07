import { FiSearch, FiPlus, FiSliders } from "react-icons/fi";
import CommunityCard from "../components/community/CommunityCard.jsx";
import CommunityInput from "../components/community/CommunityInput.jsx";
import CommunityButton from "../components/community/CommunityButton.jsx";

const discussions = [
  {
    id: 1,
    author: "James Wilson",
    role: "Builder",
    time: "2 hours ago",
    badge: "Builder",
    title: "Sustainable Materials in 2024 High-Rises?",
    body: "We're starting a new 40-story project in the financial district and aiming for LEED Platinum certification. I'm curious what suppliers everyone is using for recycled steel composites? We've had supply chain issues with our usual vendors.",
    image: null,
    location: null,
    replies: 24,
    likes: 156,
    views: "1.2k",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    author: "Sarah Jenkins",
    role: "Agent",
    time: "5 hours ago",
    badge: "Agent",
    title: "Just listed: The most stunning loft in Arts District",
    body: "Take a look at these industrial finishes! Exposed brick is back in a big way. What do you think is the best staging strategy for these open-concept spaces?",
    image:
      "https://images.unsplash.com/photo-1505691938895-1758d7feb511?q=80&w=1400&auto=format&fit=crop",
    location: null,
    replies: 42,
    likes: 312,
    views: "3.4k",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    author: "Raj Patel",
    role: "Sales Partner",
    time: "1 day ago",
    badge: "Sales Partner",
    title: "Best CRM for team of 50+ agents?",
    body: "We are outgrowing our current setup. Looking for something that handles automated follow-ups well but still feels personal. Has anyone tried the new Reparv Pro integration?",
    image: null,
    location: null,
    replies: 89,
    likes: 204,
    views: "—",
    avatar: "https://randomuser.me/api/portraits/men/65.jpg",
  },
];

export default function Community() {
  return (
    <div className="min-h-screen bg-white sm:bg-gradient-to-br sm:from-violet-50 sm:to-white">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-white border-b">
        <div className="mx-auto max-w-7xl px-4 py-4 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-semibold">Community</h1>

          {/* Mobile Icons */}
          <div className="flex sm:hidden gap-2">
            <button className="h-9 w-9 grid place-items-center rounded-xl bg-muted">
              <FiSearch />
            </button>
            <button className="h-9 w-9 grid place-items-center rounded-xl bg-muted">
              <FiSliders />
            </button>
          </div>

          {/* Desktop Search */}
          <div className="hidden sm:flex items-center gap-2 w-full max-w-xl ml-auto">
            <div className="relative w-full">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <CommunityInput
                placeholder="Search topics, members, or groups..."
                className="pl-9"
              />
            </div>

            <CommunityButton className="gap-2">
              <FiPlus /> Create Discussion
            </CommunityButton>
          </div>
        </div>

        {/* Mobile Tabs */}
        <div className="sm:hidden px-4 pb-3 flex gap-2 overflow-x-auto">
          {["All", "Events", "Updates", "Discussions"].map((t, i) => (
            <button
              key={t}
              className={`px-4 py-1.5 rounded-full text-sm whitespace-nowrap ${
                i === 0
                  ? "bg-violet-600 text-white"
                  : "bg-muted text-muted-foreground"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </header>

      {/* Layout */}
      <main className="mx-auto max-w-7xl px-4 py-4 grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6">
        {/* Feed */}
        <section className="space-y-6">
          {/* Highlights (Mobile) */}
          <div className="sm:hidden">
            <h2 className="font-semibold mb-3">Highlights</h2>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {[
                ["Partner Spotlight", "Top Agents Summit 2024"],
                ["Update", "New CRM Features Released"],
              ].map(([tag, title]) => (
                <div
                  key={title}
                  className="min-w-[240px] h-[140px] rounded-2xl bg-cover bg-center text-white p-3 flex flex-col justify-end shadow"
                  style={{
                    backgroundImage:
                      "url(https://images.unsplash.com/photo-1560518883-ce09059eeffa?q=80&w=1200&auto=format&fit=crop)",
                  }}
                >
                  <span className="text-xs bg-violet-600 w-fit px-2 py-0.5 rounded-md mb-1">
                    {tag.toUpperCase()}
                  </span>
                  <p className="font-medium text-sm">{title}</p>
                </div>
              ))}
            </div>

            {/* Tags */}
            <div className="flex gap-2 mt-3 flex-wrap">
              {["#CommercialRE", "#PropTech", "#MarketTrends"].map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full bg-muted text-sm"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Upcoming Events (Mobile) */}
          <div className="sm:hidden rounded-2xl border bg-white p-3 shadow-sm">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Upcoming Events</h3>
              <span className="text-violet-600 text-sm">View all</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-xl bg-violet-100 grid place-items-center text-xs font-semibold">
                12 OCT
              </div>

              <div className="flex-1">
                <p className="font-medium text-sm">Global Real Estate Expo</p>
                <p className="text-xs text-muted-foreground">
                  Convention Center • 09:00 AM
                </p>
                <div className="flex -space-x-2 mt-1">
                  <img
                    src="https://randomuser.me/api/portraits/men/32.jpg"
                    className="h-6 w-6 rounded-full border"
                  />
                  <img
                    src="https://randomuser.me/api/portraits/women/44.jpg"
                    className="h-6 w-6 rounded-full border"
                  />
                  <span className="text-xs ml-2 text-muted-foreground">
                    +42
                  </span>
                </div>
              </div>

              <CommunityButton size="sm">Join</CommunityButton>
            </div>
          </div>

          {/* Discussions */}
          {discussions.map((post) => (
            <CommunityCard key={post.id} post={post} />
          ))}
        </section>

        {/* Desktop Right Rail */}
        {/* Right Rail */}
        <aside className="hidden xl:block space-y-6">
          {/* Active Members */}
          <div className="rounded-2xl bg-white border p-4">
            <h3 className="font-semibold mb-3">Active Members</h3>
            <div className="grid grid-cols-5 gap-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <img
                  key={i}
                  src={`https://randomuser.me/api/portraits/men/${i + 10}.jpg`}
                  className="h-10 w-10 rounded-full object-cover"
                />
              ))}
              <div className="h-10 w-10 rounded-full bg-violet-100 text-violet-700 grid place-items-center text-xs font-semibold">
                +2k
              </div>
            </div>
          </div>

          {/* Suggested Groups */}
          <div className="rounded-2xl bg-white border p-4 space-y-3">
            <h3 className="font-semibold">Suggested Groups</h3>

            {[
              ["Commercial Real Estate", "12k Members"],
              ["PropTech Innovators", "8.5k Members"],
              ["Luxury Listings", "5k Members"],
            ].map(([name, count]) => (
              <div key={name} className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{name}</p>
                  <p className="text-xs text-muted-foreground">{count}</p>
                </div>
                <CommunityButton size="icon" variant="outline">
                  +
                </CommunityButton>
              </div>
            ))}
          </div>

          {/* Upcoming Events */}
          <div className="rounded-2xl bg-white border p-4 space-y-3">
            <h3 className="font-semibold">Upcoming Events</h3>

            {[
              ["15 OCT", "Global RE Summit", "Virtual • 10:00 AM"],
              ["22 OCT", "Agent Networking Mixer", "New York, NY • 6:00 PM"],
            ].map(([date, title, meta]) => (
              <div key={title} className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-violet-100 text-violet-700 grid place-items-center text-xs font-semibold">
                  {date}
                </div>
                <div>
                  <p className="font-medium">{title}</p>
                  <p className="text-xs text-muted-foreground">{meta}</p>
                </div>
              </div>
            ))}
          </div>
        </aside>
      </main>

      {/* Floating Action Button (Mobile) */}
      <button className="sm:hidden fixed bottom-6 right-6 h-14 w-14 rounded-full bg-violet-600 text-white shadow-xl grid place-items-center text-xl">
        <FiPlus />
      </button>
    </div>
  );
}
