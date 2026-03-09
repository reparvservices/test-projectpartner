import { useState } from "react";

import EnquiryHeader from "../../components/enquiries/EnquiryHeader";
import EnquiryTabs from "../../components/enquiries/EnquiryTabs";
import EnquiryCard from "../../components/enquiries/EnquiryCard";
import QuickStats from "../../components/enquiries/QuickStats";
import LiveActivity from "../../components/enquiries/LiveActivity";

const enquiriesData = [
  {
    id: 1,
    name: "Sarah Jenkins",
    location: "Austin, TX",
    time: "2h ago",
    interested: "Luxury Apartment",
    budget: "₹600k - ₹850k",
    source: "Instagram Ad",
    status: "Hot Lead",
  },
  {
    id: 2,
    name: "Michael Chen",
    location: "Seattle, WA",
    time: "5h ago",
    interested: "Villa Renovation",
    budget: "₹1.2.xr - ₹1.5M",
    source: "Direct Website",
    status: "New",
  },
  {
    id: 3,
    name: "Elara Okonio",
    location: "Chicago, IL",
    time: "1d ago",
    interested: "Downtown Condo",
    budget: "₹450k",
    source: "Facebook Lead",
    status: "Assigned",
  },
];

const tabs = [
  { label: "All", count: 42 },
  { label: "New", count: 8 },
  { label: "Interested", count: 12 },
  { label: "Followup", count: 14 },
  { label: "Closed", count: 14 },
];

export default function Enquiries() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  const filtered = enquiriesData.filter((e) =>
    e.name.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <EnquiryHeader search={search} setSearch={setSearch} />

        <EnquiryTabs
          tabs={tabs}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
        />

        <div className="grid p-4 sm:p-6 xl:grid-cols-3 gap-4 sm:gap-6">
          <div className="xl:col-span-2 space-y-4 sm:space-y-6">
            {filtered.map((item) => (
              <EnquiryCard key={item.id} item={item} />
            ))}
          </div>

          <div className="space-y-6 hidden xl:block">
            <QuickStats />
            <LiveActivity />
          </div>
        </div>
      </div>
    </div>
  );
}
