import { FiSearch, FiBell, FiLogOut, FiMenu } from "react-icons/fi";

export default function DashboardHeader({ onMenuClick }) {
  return (
    <header className="w-full flex items-center justify-between py-3 md:py-4 bg-white md:bg-transparent px-4">

      {/* LEFT */}
      <div className="flex items-center gap-3">

        {/* Mobile Hamburger */}
        <button
          onClick={onMenuClick}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg"
        >
          <FiMenu className="text-2xl text-gray-700" />
        </button>

        {/* Desktop Title */}
        <h1 className="hidden md:block text-2xl font-semibold">
          Dashboard
        </h1>
      </div>

      {/* RIGHT */}
      <div className="flex items-center gap-3 md:gap-4">

        {/* Desktop Search */}
        <div className="relative hidden md:block">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

          <input
            className="pl-10 pr-4 py-2 w-72 rounded-xl border bg-white focus:outline-none"
            placeholder="Search anything..."
          />
        </div>

        {/* Mobile Search Icon */}
        <button className="md:hidden w-10 h-10 flex items-center justify-center">
          <FiSearch className="text-2xl text-gray-700" />
        </button>

        {/* Notification */}
        <button className="relative w-10 h-10 flex items-center justify-center rounded-full">

          <FiBell className="text-2xl text-gray-700" />

          {/* Notification Dot */}
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full"></span>
        </button>

        {/* Avatar Desktop */}
        <img
          src="https://i.pravatar.cc/100?img=12"
          className="hidden md:block w-10 h-10 rounded-full object-cover"
        />

        {/* Logout Desktop */}
        <FiLogOut className="hidden md:block w-6 h-6 text-gray-500 cursor-pointer" />

      </div>

    </header>
  );
}