import { useAuth } from "../store/auth";
import {
  FiSearch,
  FiBell,
  FiChevronRight,
  FiPhone,
  FiMessageSquare,
  FiCalendar,
  FiCheckCircle,
  FiMenu,
  FiLogOut,
} from "react-icons/fi";
import { HiArrowTrendingUp } from "react-icons/hi2";
import { MdOutlineSpaceDashboard } from "react-icons/md";

export default function Dashboard() {
  const { moreOpen, setMoreOpen } = useAuth();

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* Top Navbar */}
      <div className="sticky top-0 z-30 bg-[#ffffff] -mx-4 md:-mx-6 px-4 md:px-6 py-3 border-b">
        <div className="flex items-center justify-between gap-3">
          {/* Left: Hamburger + Title */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMoreOpen(!moreOpen)}
              className="md:hidden flex items-center justify-center px-2"
            >
              <FiMenu className="w-6 h-6" />
            </button>

            <h1 className="hidden md:block text-lg md:text-2xl font-semibold">
              Dashboard
            </h1>
          </div>

          {/* Right: Search + Bell + Profile */}
          <div className="flex items-center gap-2 md:gap-3 flex-1 justify-end">
            <div className="relative hidden sm:block">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search anything..."
                className="w-44 md:w-64 pl-10 pr-4 py-2 rounded-xl border bg-white outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <FiSearch className="sm:hidden text-black w-6 h-6" />

            <button className="w-10 h-10 rounded-full bg-white sm:border flex items-center justify-center">
              <FiBell className="w-6 sm:w-auto h-6 sm:h-auto" />
            </button>

            <img
              src="https://i.pravatar.cc/100?img=12"
              className="hidden md:block w-9 h-9 md:w-10 md:h-10 rounded-full object-cover border"
            />
            <FiLogOut className="hidden md:block text-[#64748B] w-5 h-5" />
          </div>
        </div>
      </div>

      <div className="rounded-2xl py-4 md:hidden flex justify-between !mt-0">
        <div>
          <p className="text-xl font-bold">Hello, David 👋</p>
          <p className="text-sm text-gray-500">Here’s your daily update</p>
        </div>
        <div>
          <img
            src="https://i.pravatar.cc/100?img=12"
            className="w-12 h-12 md:w-10 md:h-10 rounded-full object-cover border"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="!mt-0 sm:!mt-6 ">
      <h2 className="font-semibold mb-3 md:mb-4 text-[#8B8798] sm:hidden">Key Matrics</h2>
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: "Total Deal Amount", value: "₹ 2.4 Cr", growth: "+12.5%" },
          { label: "Deals Done", value: "18", growth: "+4.2%" },
          { label: "Self Earnings", value: "₹ 4.5 L", growth: "+8.1%" },
          { label: "Deal in Sq Ft", value: "24,500", growth: "0.0%" },
        ].map((card) => (
          <div
            key={card.label}
            className="bg-white rounded-2xl p-4 md:p-5 shadow-sm"
          >
            <div className="flex items-center justify-between mb-3">
              <div className="w-9 h-9 md:w-10 md:h-10 rounded-xl bg-violet-100 flex items-center justify-center text-violet-600">
                <MdOutlineSpaceDashboard />
              </div>

              <span className="flex items-center gap-1 text-[11px] bg-green-100 text-green-600 px-2 py-1 rounded-full">
                <HiArrowTrendingUp /> {card.growth}
              </span>
            </div>

            <h3 className="text-lg md:text-2xl font-bold">{card.value}</h3>
            <p className="text-xs md:text-sm text-gray-500">{card.label}</p>
          </div>
        ))}
      </div>
      </div>

      {/* Business Overview */}
      <div>
        <h2 className="font-semibold mb-3 md:mb-4 text-[#8B8798]">Business Overview</h2>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            ["Properties", 142],
            ["Customers", 845],
            ["Enquirers", 1204],
            ["Builders", 56],
            ["Employees", 12],
            ["Sales Partners", 28],
            ["Territory Partners", 4],
            ["Total Tickets", 35],
          ].map(([label, value]) => (
            <div
              key={label}
              className="bg-white p-4 rounded-xl shadow-sm flex items-center justify-between"
            >
              <div>
                <p className="text-xs md:text-sm text-gray-500">{label}</p>
                <p className="text-lg md:text-xl font-semibold">{value}</p>
              </div>

              <FiChevronRight className="text-gray-400" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Recent Enquiries */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm overflow-hidden">
          <div className="flex flex-wrap items-center justify-between p-4 border-b gap-2">
            <h3 className="font-semibold">Recent Enquiries</h3>

            <div className="flex items-center gap-2 text-xs md:text-sm text-violet-600">
              <button>View All</button>
              <button className="bg-violet-50 px-3 py-1 rounded-full">
                Today
              </button>
              <button className="bg-violet-50 px-3 py-1 rounded-full">
                Status: All
              </button>
            </div>
          </div>

          <div className="divide-y">
            {[
              {
                name: "Sarah Jenkins",
                status: "New Lead",
                color: "bg-blue-100 text-blue-600",
              },
              {
                name: "David Kim",
                status: "Contacted",
                color: "bg-yellow-100 text-yellow-700",
              },
              {
                name: "Amara Okeke",
                status: "Site Visit",
                color: "bg-indigo-100 text-indigo-600",
              },
              {
                name: "Omar Farooq",
                status: "Negotiation",
                color: "bg-purple-100 text-purple-600",
              },
            ].map((item) => (
              <div
                key={item.name}
                className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3"
              >
                <div>
                  <p className="font-medium">{item.name}</p>
                  <p className="text-xs text-gray-500">Property enquiry</p>
                </div>

                <div className="flex items-center gap-3 flex-wrap">
                  <span
                    className={`text-xs px-3 py-1 rounded-full ${item.color}`}
                  >
                    {item.status}
                  </span>

                  <div className="flex items-center gap-4 text-lg md:text-base">
                    <FiPhone className="text-gray-400 hover:text-violet-600 cursor-pointer" />
                    <FiMessageSquare className="text-gray-400 hover:text-violet-600 cursor-pointer" />
                    <FiCalendar className="text-gray-400 hover:text-violet-600 cursor-pointer" />
                    <FiCheckCircle className="text-gray-400 hover:text-green-600 cursor-pointer" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Booked Properties */}
        <div className="bg-white rounded-2xl shadow-sm p-4">
          <div className="flex justify-between mb-3">
            <h3 className="font-semibold">Booked Properties</h3>
            <button className="text-[#7C3AED] text-xs md:text-sm">
              View All
            </button>
          </div>

          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
            className="rounded-xl mb-3 h-40 w-full object-cover"
          />

          <span className="inline-block text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full mb-2">
            RENTED
          </span>

          <p className="font-medium">City Center Apt 4B</p>
          <p className="text-sm text-gray-500">₹ 12,000 / mo</p>
        </div>
      </div>
    </div>
  );
}
