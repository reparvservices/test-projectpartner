import { useState } from "react";
import { FiGrid, FiVideo, FiBookmark, FiTag, FiFolder, FiPlay } from "react-icons/fi";

/* ── static placeholder posts ── */
const POSTS = [
  "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7",
  "https://images.unsplash.com/photo-1545235617-9465d2a55698",
  "https://images.unsplash.com/photo-1568992687947-868a62a9f521",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  "https://images.unsplash.com/photo-1556155092-8707de31f9c4",
];

/* ── reel thumbnails (same images, just styled differently) ── */
const REELS = [
  "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  "https://images.unsplash.com/photo-1507089947367-19c1da9775ae",
];

const TABS = [
  { key: "posts",    label: "Posts",    Icon: FiGrid     },
  { key: "reels",    label: "Reels",    Icon: FiVideo    },
  { key: "projects", label: "Projects", Icon: FiFolder   },
  { key: "saved",    label: "Saved",    Icon: FiBookmark },
  { key: "tagged",   label: "Tagged",   Icon: FiTag      },
];

function EmptyState({ label }) {
  return (
    <div className="col-span-3 py-20 flex flex-col items-center gap-3 text-gray-400">
      <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
        <FiGrid size={24} className="text-gray-300" />
      </div>
      <p className="text-sm font-medium">No {label} yet</p>
    </div>
  );
}

export default function PostsGrid() {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div>
      {/* Tab bar */}
      <div className="flex gap-2 sm:gap-6 mt-4 sm:mt-6 border-y overflow-x-auto scrollbar-hide sm:px-4">
        {TABS.map(({ key, label, Icon }) => (
          <button key={key} onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-3 py-3 text-sm font-medium whitespace-nowrap transition-colors
              ${activeTab === key
                ? "border-b-2 border-[#5323DC] text-[#5323DC]"
                : "text-[#9CA3AF] hover:text-gray-600"}`}>
            <Icon size={15} /> {label}
          </button>
        ))}
      </div>

      {/* ── POSTS ── */}
      {activeTab === "posts" && (
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6 sm:pr-8">
          {POSTS.map((img, i) => (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer">
              {i === 0 && (
                <span className="absolute top-2 left-2 z-10 bg-violet-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  NEW
                </span>
              )}
              <img src={img} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" alt="" />
            </div>
          ))}
        </div>
      )}

      {/* ── REELS ── */}
      {activeTab === "reels" && (
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6 sm:pr-8">
          {REELS.map((img, i) => (
            <div key={i} className="relative aspect-[9/16] rounded-xl overflow-hidden group cursor-pointer bg-gray-900">
              <img src={img} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300" alt="" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                  <FiPlay size={18} className="text-white ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-2 left-2 text-white text-xs font-medium flex items-center gap-1">
                <FiPlay size={11} /> {(Math.random() * 50 | 0) + 1}K views
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── PROJECTS ── */}
      {activeTab === "projects" && (
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6 sm:pr-8">
          <EmptyState label="projects" />
        </div>
      )}

      {/* ── SAVED ── */}
      {activeTab === "saved" && (
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6 sm:pr-8">
          <EmptyState label="saved posts" />
        </div>
      )}

      {/* ── TAGGED ── */}
      {activeTab === "tagged" && (
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6 sm:pr-8">
          <EmptyState label="tagged posts" />
        </div>
      )}
    </div>
  );
}