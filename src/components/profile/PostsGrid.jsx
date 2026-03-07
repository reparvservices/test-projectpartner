import { FiGrid, FiVideo, FiBookmark, FiTag } from "react-icons/fi";
const posts = [
  "https://images.unsplash.com/photo-1515879218367-8466d910aaa4",
  "https://images.unsplash.com/photo-1556761175-5973dc0f32e7",
  "https://images.unsplash.com/photo-1545235617-9465d2a55698",
  "https://images.unsplash.com/photo-1568992687947-868a62a9f521",
  "https://images.unsplash.com/photo-1521737604893-d14cc237f11d",
  "https://images.unsplash.com/photo-1556155092-8707de31f9c4",
];

export default function PostsGrid() {
  return (
    <div >
      <div className="flex gap-4 sm:gap-8 mt-4 sm:mt-6 border-y overflow-scroll scrollbar-hide sm:px-4">
        {[
          { label: "Posts", icon: FiGrid, active: true },
          { label: "Reels", icon: FiVideo },
          { label: "Projects", icon: FiGrid },
          { label: "Saved", icon: FiBookmark },
          { label: "Tagged", icon: FiTag },
        ].map((tab) => (
          <button
            key={tab.label}
            className={`flex items-center gap-2 p-3 text-sm font-medium ${
              tab.active
                ? "border-b-2 border-[#5E23DC] text-[#5E23DC]"
                : "text-[#9CA3AF]"
            }`}
          >
            <tab.icon /> {tab.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6 sm:pr-8">
        {posts.map((img, i) => (
          <div
            key={i}
            className="relative aspect-square rounded-xl overflow-hidden"
          >
            {i === 0 && (
              <span className="absolute top-3 left-3 z-10 bg-violet-600 text-white text-xs px-2 py-1 rounded-full">
                NEW POST
              </span>
            )}
            <img
              src={img}
              className="w-full h-full object-cover hover:scale-105 transition"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
