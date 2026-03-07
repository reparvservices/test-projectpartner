import { FiMapPin } from "react-icons/fi";
import { MdOutlineVerified } from "react-icons/md";

export default function ProfileHeader() {
  return (
    <div className="w-full flex items-start justify-between gap-4 sm:gap-6">
      <div className="w-full flex flex-col items-center justify-center sm:flex-row sm:items-start sm:justify-start gap-5">
        <div className="w-[100px] h-[100px] p-1 rounded-full border-1 border-gray-300 shadow-[0px_0px_0px_2px_#00000014]">
          <img
            src="https://i.pravatar.cc/150?img=47"
            className="w-full h-full rounded-full object-cover"
          />
        </div>
 
        <div className="flex flex-col items-center justify-center sm:items-start sm:justify-start gap-2 sm:pr-5">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-semibold text-[#0F1724]">
              Amina Patel
            </h1>
            <MdOutlineVerified className="text-violet-600 w-6 h-6" />
          </div>

          <p className="text-center sm:text-start text-sm text-[#9CA3AF] flex items-center gap-2">
            Founder at Elevate SaaS · <FiMapPin /> San Francisco, CA
          </p>

          <p className="w-[80%] flex text-sm text-center sm:text-left text-[#0F1724] leading-relaxed">
            Helping B2B companies scale their revenue operations through
            data-driven strategies. Sharing daily insights on SaaS growth and
            automation 🚀
          </p>

          <div className="flex gap-6 sm:gap-10 mt-2 sm:mt-6">
            {[
              ["12.5k", "Followers"],
              ["842", "Following"],
              ["315", "Posts"],
            ].map(([value, label]) => (
              <div key={label} className="text-center sm:text-left">
                <p className="text-sm font-semibold text-[#0F1724]">{value}</p>
                <p className="text-xs text-[#9CA3AF] ">{label}</p>
              </div>
            ))}
          </div>

          <div className="w-full flex gap-3 justify-center sm:justify-between pt-2">
            <div className="flex gap-3">
              <button className="px-3 sm:px-5 py-2 rounded-md bg-violet-100 text-violet-600 text-sm">
                Edit Profile
              </button>
              <button className="px-3 sm:px-5 py-2 rounded-md bg-violet-100 text-violet-600 text-sm">
                Share Profile
              </button>
            </div>
            <button className="flex items-center justify-center gap-1 sm:gap-2 px-3 sm:px-5 rounded-md bg-gradient-to-r text-sm from-[#5323DC] to-violet-600 text-white font-medium shadow">
              <svg
                width="16"
                height="16"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.75 9H14.25M9 3.75V14.25"
                  stroke="white"
                  stroke-width="1.5"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              Create Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
