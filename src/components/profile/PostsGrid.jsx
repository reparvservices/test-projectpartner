import { useState, useEffect } from "react";
import { FiGrid, FiVideo, FiBookmark, FiTag, FiFolder, FiPlay } from "react-icons/fi";

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG — must match your Feed.jsx
// ─────────────────────────────────────────────────────────────────────────────
const API_BASE = "http://localhost:3000/api/feed";
const ACTOR = { user_id: 319, user_role: "Project Partner" }; // ← from Redux

// ─────────────────────────────────────────────────────────────────────────────
// UTILS
// ─────────────────────────────────────────────────────────────────────────────
const api = async (path) => {
  const res = await fetch(`${API_BASE}${path}`, {
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  if (!data.success) throw new Error(data.message || "Request failed");
  return data;
};

const parseMedia = (raw) => {
  try {
    return JSON.parse(raw || "[]");
  } catch {
    return raw ? [raw] : [];
  }
};

const isVideoUrl = (url = "") =>
  /\.(mp4|webm|mov)/i.test(url) || url.includes("video");

// ─────────────────────────────────────────────────────────────────────────────
// TABS
// ─────────────────────────────────────────────────────────────────────────────
const TABS = [
  { key: "posts",    label: "Posts",    Icon: FiGrid     },
  { key: "reels",    label: "Reels",    Icon: FiVideo    },
  { key: "projects", label: "Projects", Icon: FiFolder   },
  { key: "saved",    label: "Saved",    Icon: FiBookmark },
  { key: "tagged",   label: "Tagged",   Icon: FiTag      },
];

// ─────────────────────────────────────────────────────────────────────────────
// EMPTY STATE
// ─────────────────────────────────────────────────────────────────────────────
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

// ─────────────────────────────────────────────────────────────────────────────
// SKELETON
// ─────────────────────────────────────────────────────────────────────────────
function GridSkeleton({ aspect = "aspect-square", count = 6 }) {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className={`${aspect} rounded-xl bg-gray-100 animate-pulse`}
        />
      ))}
    </>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// POSTS TAB  — own image/text posts, first media as thumbnail
// ─────────────────────────────────────────────────────────────────────────────
function PostsTab() {
  const [posts, setPosts]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api(
      `/posts/my?user_id=${ACTOR.user_id}&user_role=${encodeURIComponent(ACTOR.user_role)}&page=1&limit=30`,
    )
      .then((d) => {
        // Keep only image/text posts (exclude pure video posts)
        const imagePosts = (d.posts || []).filter((p) => {
          const media = parseMedia(p.media_urls);
          if (!media.length) return true; // text-only post — show
          return media.some((url) => !isVideoUrl(url));
        });
        setPosts(imagePosts);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6 sm:pr-8">
      {loading ? (
        <GridSkeleton aspect="aspect-square" count={6} />
      ) : !posts.length ? (
        <EmptyState label="posts" />
      ) : (
        posts.map((post, i) => {
          const media = parseMedia(post.media_urls);
          const thumb = media.find((url) => !isVideoUrl(url)) || null;

          return (
            <div
              key={post.id}
              className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer bg-gray-100"
            >
              {i === 0 && (
                <span className="absolute top-2 left-2 z-10 bg-violet-600 text-white text-[10px] font-semibold px-2 py-0.5 rounded-full">
                  NEW
                </span>
              )}
              {thumb ? (
                <img
                  src={thumb}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  alt=""
                />
              ) : (
                /* text-only post — show content as card */
                <div className="w-full h-full flex items-center justify-center p-3 bg-gradient-to-br from-violet-50 to-violet-100 group-hover:from-violet-100 group-hover:to-violet-200 transition-colors duration-300">
                  <p className="text-[11px] text-violet-700 font-medium text-center line-clamp-4 leading-relaxed">
                    {post.content || "Post"}
                  </p>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// REELS TAB  — own video posts
// ─────────────────────────────────────────────────────────────────────────────
function ReelsTab() {
  const [reels, setReels]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api(
      `/posts/my?user_id=${ACTOR.user_id}&user_role=${encodeURIComponent(ACTOR.user_role)}&page=1&limit=30`,
    )
      .then((d) => {
        // Keep posts that have at least one video URL
        const videoPosts = (d.posts || []).filter((p) => {
          const media = parseMedia(p.media_urls);
          return media.some((url) => isVideoUrl(url));
        });
        setReels(videoPosts);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6 sm:pr-8">
      {loading ? (
        <GridSkeleton aspect="aspect-[9/16]" count={3} />
      ) : !reels.length ? (
        <EmptyState label="reels" />
      ) : (
        reels.map((post) => {
          const media = parseMedia(post.media_urls);
          const videoUrl = media.find((url) => isVideoUrl(url));
          // Try to use thumbnail_url or a non-video media as poster
          const poster =
            post.thumbnail_url ||
            media.find((url) => !isVideoUrl(url)) ||
            null;

          return (
            <div
              key={post.id}
              className="relative aspect-[9/16] rounded-xl overflow-hidden group cursor-pointer bg-gray-900"
            >
              {poster ? (
                <img
                  src={poster}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-300"
                  alt=""
                />
              ) : (
                <video
                  src={videoUrl}
                  muted
                  playsInline
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white/30 backdrop-blur-sm flex items-center justify-center">
                  <FiPlay size={18} className="text-white ml-0.5" />
                </div>
              </div>
              <div className="absolute bottom-2 left-2 text-white text-xs font-medium flex items-center gap-1">
                <FiPlay size={11} />
                {post.views_count
                  ? `${post.views_count >= 1000
                      ? `${(post.views_count / 1000).toFixed(1)}K`
                      : post.views_count} views`
                  : `${post.likes_count || 0} likes`}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SAVED TAB  — posts saved by the actor
// ─────────────────────────────────────────────────────────────────────────────
function SavedTab() {
  const [saved, setSaved]   = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api(
      `/saved?user_id=${ACTOR.user_id}&user_role=${encodeURIComponent(ACTOR.user_role)}&page=1&limit=30`,
    )
      .then((d) => setSaved(d.posts || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6 sm:pr-8">
      {loading ? (
        <GridSkeleton aspect="aspect-square" count={6} />
      ) : !saved.length ? (
        <EmptyState label="saved posts" />
      ) : (
        saved.map((post) => {
          const media = parseMedia(post.media_urls);
          const thumb =
            post.thumbnail_url ||
            media.find((url) => !isVideoUrl(url)) ||
            null;
          const hasVideo = media.some((url) => isVideoUrl(url));

          return (
            <div
              key={post.id}
              className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer bg-gray-100"
            >
              {thumb ? (
                <img
                  src={thumb}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  alt=""
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center p-3 bg-gradient-to-br from-violet-50 to-violet-100 group-hover:from-violet-100 group-hover:to-violet-200 transition-colors duration-300">
                  <p className="text-[11px] text-violet-700 font-medium text-center line-clamp-4 leading-relaxed">
                    {post.content || "Saved post"}
                  </p>
                </div>
              )}
              {/* video indicator */}
              {hasVideo && (
                <div className="absolute top-2 right-2">
                  <div className="w-6 h-6 rounded-full bg-black/50 flex items-center justify-center">
                    <FiPlay size={10} className="text-white ml-0.5" />
                  </div>
                </div>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN EXPORT
// ─────────────────────────────────────────────────────────────────────────────
export default function PostsGrid() {
  const [activeTab, setActiveTab] = useState("posts");

  return (
    <div>
      {/* Tab bar — unchanged */}
      <div className="flex gap-2 sm:gap-6 mt-4 sm:mt-6 border-y overflow-x-auto scrollbar-hide sm:px-4">
        {TABS.map(({ key, label, Icon }) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`flex items-center gap-2 px-3 py-3 text-sm font-medium whitespace-nowrap transition-colors
              ${activeTab === key
                ? "border-b-2 border-[#5323DC] text-[#5323DC]"
                : "text-[#9CA3AF] hover:text-gray-600"}`}
          >
            <Icon size={15} /> {label}
          </button>
        ))}
      </div>

      {activeTab === "posts"    && <PostsTab />}
      {activeTab === "reels"    && <ReelsTab />}
      {activeTab === "saved"    && <SavedTab />}
      {activeTab === "projects" && (
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6 sm:pr-8">
          <EmptyState label="projects" />
        </div>
      )}
      {activeTab === "tagged" && (
        <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6 sm:pr-8">
          <EmptyState label="tagged posts" />
        </div>
      )}
    </div>
  );
}