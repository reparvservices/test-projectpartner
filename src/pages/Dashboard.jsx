import { useState, useEffect } from "react";
import { parse } from "date-fns";
import { useAuth } from "../store/auth";
import { useNavigate } from "react-router-dom";
import DashboardHeader    from "../components/dashboard/DashboardHeader";
import StatCards          from "../components/dashboard/StatCards";
import BusinessOverview   from "../components/dashboard/BusinessOverview";
import RecentEnquiries    from "../components/dashboard/RecentEnquiries";
import BookedProperty     from "../components/dashboard/BookedProperty";
import PropertyTable      from "../components/dashboard/PropertyTable";

export default function Dashboard() {
  const { URI, dashboardFilter } = useAuth();
  const navigate = useNavigate();

  // ── State ────────────────────────────────────────────────────────────────
  const [counts,      setCounts]      = useState({});
  const [properties,  setProperties]  = useState([]);
  const [searchTerm,  setSearchTerm]  = useState("");
  const [range,       setRange]       = useState([{ startDate: null, endDate: null, key: "selection" }]);
  const [loading,     setLoading]     = useState(true);

  // ── Derived counts (Enquired / Booked) ───────────────────────────────────
  const propertyCounts = properties.reduce(
    (acc, item) => {
      if (item.enquiryStatus === "Enquired") acc.Enquired++;
      if (item.enquiryStatus === "Booked")   acc.Booked++;
      return acc;
    },
    { Enquired: 0, Booked: 0 },
  );

  // ── Filtered data (search + date range + dashboard filter) ───────────────
  const filteredData = properties.filter((item) => {
    const term = searchTerm.toLowerCase();

    const matchesSearch =
      item.propertyName?.toLowerCase().includes(term)     ||
      item.company_name?.toLowerCase().includes(term)     ||
      item.propertyCategory?.toLowerCase().includes(term) ||
      item.city?.toLowerCase().includes(term);

    let startDate = range[0].startDate;
    let endDate   = range[0].endDate;
    if (startDate) startDate = new Date(startDate.setHours(0, 0, 0, 0));
    if (endDate)   endDate   = new Date(endDate.setHours(23, 59, 59, 999));

    const itemDate = item.created_at
      ? parse(item.created_at, "dd MMM yyyy | hh:mm a", new Date())
      : null;

    const matchesDate =
      (!startDate && !endDate) ||
      (startDate && endDate && itemDate && itemDate >= startDate && itemDate <= endDate);

    const getStatus = () => {
      if (item.enquiryStatus === "Booked")   return "Booked";
      if (item.enquiryStatus === "Enquired") return "Enquired";
      return "";
    };
    const matchesFilter = !dashboardFilter || getStatus() === dashboardFilter;

    return matchesSearch && matchesDate && matchesFilter;
  });

  // ── API: fetch dashboard counts ──────────────────────────────────────────
  const fetchCounts = async () => {
    try {
      const res = await fetch(`${URI}/project-partner/dashboard/count`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to fetch counts");
      setCounts(await res.json());
    } catch (err) {
      console.error("fetchCounts error:", err);
    }
  };

  // ── API: fetch properties list ───────────────────────────────────────────
  const fetchProperties = async () => {
    try {
      const res = await fetch(`${URI}/project-partner/dashboard/properties`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!res.ok) throw new Error("Failed to fetch properties");
      setProperties(await res.json());
    } catch (err) {
      console.error("fetchProperties error:", err);
    }
  };

  useEffect(() => {
    const init = async () => {
      setLoading(true);
      await Promise.all([fetchCounts(), fetchProperties()]);
      setLoading(false);
    };
    init();
  }, []);

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen sm:px-2 sm:py-6 space-y-4 sm:space-y-6 bg-[#EEEAFF] md:bg-transparent pb-10 sm:pb-20">

      {/* Header: hamburger / title / search / notifications / avatar */}
      <DashboardHeader />

      {/* Mobile greeting */}
      <div className="flex items-center justify-between mb-6 md:hidden mx-4">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900 flex items-center gap-2">
            Hello, David <span>👋</span>
          </h1>
          <p className="text-gray-500 text-sm mt-1">Here's your daily update</p>
        </div>
        <div
          onClick={() => navigate("/profile")}
          className="w-12 h-12 rounded-full overflow-hidden border-2 border-gray-200 cursor-pointer"
        >
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* 4 financial stat cards */}
      <StatCards counts={counts} loading={loading} />

      {/* Business overview grid (Properties, Customers, Enquiries …) */}
      <BusinessOverview counts={counts} />

      {/* Enquiries + Booked property */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mx-4">
        <RecentEnquiries enquiries={properties} />
        <BookedProperty  properties={properties} />
      </div>

      {/* Full property table with search + date filter + pagination */}
      <PropertyTable
        data={filteredData}
        searchTerm={searchTerm}
        onSearch={setSearchTerm}
        range={range}
        onRangeChange={setRange}
        propertyCounts={propertyCounts}
        URI={URI}
        loading={loading}
      />
    </div>
  );
}