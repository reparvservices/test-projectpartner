import { useEffect, useState } from "react";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import StatCards from "../components/dashboard/StatCards";
import BusinessOverview from "../components/dashboard/BusinessOverview";
import RecentEnquiries from "../components/dashboard/RecentEnquiries";
import BookedProperty from "../components/dashboard/BookedProperty";

export default function Dashboard() {
  const [counts, setCounts] = useState({});
  const [properties, setProperties] = useState([]);

  useEffect(() => {
    // Dummy counts
    const dummyCounts = {
      totalDealAmount: 24000000,
      totalCustomer: 18,
      selfEarning: 450000,
      totalDealInSquareFeet: 24500,
      totalProperty: 142,
      totalEnquirer: 1204,
      totalBuilder: 56,
      totalEmployee: 12,
      totalSalesPartner: 28,
      totalTerritoryPartner: 4,
      totalTicket: 35,
    };

    // Dummy enquiries / properties
    const dummyProperties = [
      {
        id: 1,
        customerName: "Sarah Jenkins",
        propertyName: "Sunnyvale Villa Estate",
        enquiryStatus: "New Lead",
        totalOfferPrice: "₹1.2 Cr",
      },
      {
        id: 2,
        customerName: "David Kim",
        propertyName: "Downtown Loft 402",
        enquiryStatus: "Contacted",
        totalOfferPrice: "₹85 L",
      },
      {
        id: 3,
        customerName: "Amara Okeke",
        propertyName: "Seaside Commercial Plot",
        enquiryStatus: "Site Visit",
        totalOfferPrice: "₹2.5 Cr",
      },
      {
        id: 4,
        customerName: "Omar Farooq",
        propertyName: "Tech Hub Office A",
        enquiryStatus: "Negotiation",
        totalOfferPrice: "₹3 Cr",
      },
      {
        id: 5,
        customerName: "James Carter",
        propertyName: "City Center Apartment 4B",
        enquiryStatus: "Booked",
        totalOfferPrice: "₹95 L",
      },
    ];

    setCounts(dummyCounts);
    setProperties(dummyProperties);
  }, []);

  return (
    <div className="sm:px-2 sm:py-6 space-y-4 sm:space-y-6 bg-[#EEEAFF] md:bg-transparent pb-10 sm:pb-20">
      <DashboardHeader />
      <div className="flex items-center justify-between mb-6 md:hidden mx-4">
        {/* Left Content */}
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 flex items-center gap-2">
            Hello, David <span>👋</span>
          </h1>

          <p className="text-gray-500 text-sm md:text-base mt-1">
            Here's your daily update
          </p>
        </div>

        {/* Profile Image */}
        <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 border-gray-200">
          <img
            src="https://randomuser.me/api/portraits/women/44.jpg"
            alt="profile"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      <StatCards counts={counts} />

      <BusinessOverview counts={counts} />

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mx-4">
        <RecentEnquiries enquiries={properties} />
        <BookedProperty properties={properties} />
      </div>
    </div>
  );
}
