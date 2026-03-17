import { FiEye, FiChevronRight } from "react-icons/fi";
import { FiCheck } from "react-icons/fi";
import { HiOutlineFire } from "react-icons/hi";

export default function PropertySidebar() {
  const activity = [
    {
      name: "Sarah M.",
      text: "updated the price for",
      property: "Green Valley",
      time: "2 hours ago",
      avatar:
        "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Marcus",
      text: "added 3 new photos to",
      property: "Lakeview Towers",
      time: "5 hours ago",
      avatar:
        "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
      name: "System",
      text: "approved",
      property: "Sunnyvale Heights",
      time: "1 day ago",
      system: true,
    },
  ];

  const trending = [
    {
      name: "Sunnyvale Heights",
      views: "12.5k views",
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400",
    },
    {
      name: "The Grand Arch",
      views: "8.2k views",
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=400",
    },
  ];

  return (
    <aside className="w-full xl:w-[340px] flex flex-col gap-6">

      {/* Activity Feed */}
      <div className="hidden bg-white rounded-lg border p-6 shadow-sm">
        <div className="flex justify-between items-center mb-5">
          <h3 className="text-xl font-semibold">Property Activity Feed</h3>
          <button className="text-violet-600 font-medium text-sm">
            View All
          </button>
        </div>

        <div className="space-y-5">
          {activity.map((item, i) => (
            <div key={i} className="flex gap-4">

              {/* Avatar */}
              {item.system ? (
                <div className="h-10 w-10 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 grid place-items-center text-white">
                  <FiCheck />
                </div>
              ) : (
                <img
                  src={item.avatar}
                  className="h-10 w-10 rounded-full object-cover"
                />
              )}

              {/* Text */}
              <div className="text-sm leading-relaxed">
                <p>
                  <span className="font-semibold">{item.name}</span>{" "}
                  {item.text}{" "}
                  <span className="text-violet-600">
                    {item.property}
                  </span>
                  .
                </p>

                <p className="text-gray-400 text-xs mt-1">
                  {item.time}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Trending */}
      <div className="bg-white rounded-lg border p-6 shadow-sm">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-xl font-semibold">
            Trending Properties
          </h3>
          <HiOutlineFire className="text-orange-500" />
        </div>

        <div className="space-y-4">
          {trending.map((item, i) => (
            <div key={i}>

              <div className="flex items-center justify-between">
                <div className="flex gap-3 items-center">

                  <img
                    src={item.image}
                    className="h-12 w-12 rounded-lg object-cover"
                  />

                  <div>
                    <p className="font-medium">
                      {item.name}
                    </p>

                    <p className="text-gray-400 text-sm flex items-center gap-1">
                      <FiEye size={14} />
                      {item.views}
                    </p>
                  </div>
                </div>

                <FiChevronRight className="text-gray-400" />
              </div>

              {i !== trending.length - 1 && (
                <div className="border-t mt-4"></div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="bg-white rounded-lg border p-6 shadow-sm">
        <h3 className="text-xl font-semibold mb-5">
          Quick Stats
        </h3>

        <div className="space-y-4 text-sm">

          <div className="flex justify-between items-center">
            <span className="text-gray-400">
              Total Properties
            </span>
            <span className="font-semibold text-lg">
              24
            </span>
          </div>

          <div className="border-t"></div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">
              Active Listings
            </span>
            <span className="font-semibold text-lg">
              18
            </span>
          </div>

          <div className="border-t"></div>

          <div className="flex justify-between items-center">
            <span className="text-gray-400">
              Pending Approvals
            </span>
            <span className="font-semibold text-lg text-orange-500">
              5
            </span>
          </div>

        </div>
      </div>
    </aside>
  );
}