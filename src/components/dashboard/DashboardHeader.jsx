import { FiSearch, FiBell, FiLogOut, FiMenu } from "react-icons/fi";
import { useAuth } from "../../store/auth";
import { useNavigate } from "react-router-dom";

/**
 * DashboardHeader
 * Real logic: reads user from useAuth, hamburger opens sidebar via setMoreOpen
 */
export default function DashboardHeader() {
  const { user, setMoreOpen } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="w-full flex items-center justify-between py-3 md:py-4 bg-white md:bg-transparent px-4">
      {/* ── LEFT ── */}
      <div className="flex items-center gap-3">
        {/* Mobile hamburger → opens sidebar */}
        <button
          onClick={() => setMoreOpen(true)}
          className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
        >
          <FiMenu className="text-2xl text-gray-700" />
        </button>

        {/* Desktop title */}
        <h1 className="hidden md:block text-2xl font-semibold text-gray-900">
          Dashboard
        </h1>
      </div>

      {/* ── RIGHT ── */}
      <div className="flex items-center gap-3 md:gap-4">
        {/* Desktop search */}
        <div className="relative hidden md:block">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            className="pl-10 pr-4 py-2 w-72 rounded-xl border border-gray-200 bg-white focus:outline-none focus:border-violet-400 transition-colors text-sm"
            placeholder="Search anything..."
          />
        </div>

        {/* Mobile search icon */}
        <button className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-gray-100 cursor-pointer">
          <FiSearch className="text-2xl text-gray-700" />
        </button>

        {/* Notifications */}
        <button className="relative w-10 h-10 flex items-center justify-center rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
          <FiBell className="text-2xl text-gray-700" />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full" />
        </button>

        {/* Desktop avatar → profile */}
        <img
          onClick={() => navigate("/app/profile")}
          src={user?.avatar || "https://i.pravatar.cc/100?img=12"}
          alt="avatar"
          className="hidden md:block w-10 h-10 rounded-full object-cover cursor-pointer border-2 border-gray-100 hover:border-violet-400 transition-colors"
        />

        {/* Desktop logout */}
        {user?.id && (
          <FiLogOut className="hidden md:block w-6 h-6 text-gray-500 cursor-pointer hover:text-red-500 transition-colors" />
        )}
      </div>
    </header>
  );
}
