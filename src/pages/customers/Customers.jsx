import { useState } from "react";
import CustomersHeader from "../../components/customers/CustomersHeader";
import CustomersTabs from "../../components/customers/CustomersTabs";
import CustomerCard from "../../components/customers/CustomerCard";
import RecentActivity from "../../components/customers/RecentActivity";
import SuggestedMatches from "../../components/customers/SuggestedMatches";
import CustomerStats from "../../components/customers/CustomerStats";


const customersData = [
  {
    id: 1,
    name: "Sarah Jenkins",
    company: "TechFlow Systems",
    avatar: "https://i.pravatar.cc/80?img=47",
    badge: "High Interest",
    badgeColor: "red",
    lastActive: "Last active: 2 hours ago",
    property: "Sunnyvale Heights - 3BHK",
    budget: "₹850k – ₹950k",
    location: "Whitefield",
  },
  {
    id: 2,
    name: "David Okafor",
    company: "Okafor Holdings",
    avatar: "https://i.pravatar.cc/80?img=14",
    badge: "New Lead",
    badgeColor: "blue",
    lastActive: "Added: Yesterday",
    property: "Green Valley Residency",
    budget: "₹450k – ₹600k",
    location: "Austin, TX",
  },
  {
    id: 3,
    name: "Maria Gonzalez",
    company: "Personal Investor",
    avatar: "https://i.pravatar.cc/80?img=44",
    badge: "Active",
    badgeColor: "green",
    lastActive: "Follow-up scheduled: Tomorrow",
    property: "The Grand Arch",
    budget: "₹1.5M – ₹2M",
    location: "Downtown",
  },
  {
    id: 4,
    name: "Arjun Patel",
    company: "Patel Ventures",
    avatar: "https://i.pravatar.cc/80?img=15",
    badge: "High Interest",
    badgeColor: "red",
    lastActive: "Last active: 1 day ago",
    property: "Skyline Towers - 2BHK",
    budget: "₹600k – ₹750k",
    location: "Bandra, MH",
  },
  {
    id: 5,
    name: "Priya Nair",
    company: "Freelance Consultant",
    avatar: "https://i.pravatar.cc/80?img=32",
    badge: "Recently Contacted",
    badgeColor: "purple",
    lastActive: "Contacted: 3 hours ago",
    property: "Prestige Heights - 3BHK",
    budget: "₹900k – ₹1.1M",
    location: "Koramangala, KA",
  },
];

const TABS = [
  { key: "all",      label: "All Customers",     count: 342,  countColor: "white"  },
  { key: "active",   label: "Active",             count: 128,  countColor: "dark"   },
  { key: "new",      label: "New Leads",          count: 14,   countColor: "blue"   },
  { key: "high",     label: "High Interest",      count: 9,    countColor: "red"    },
  { key: "recent",   label: "Recently Contacted", count: 24,   countColor: "dark"   },
  { key: "vip",      label: "VIP",                count: null, countColor: "crown"  },
];

export default function Customers() {
  const [activeTab, setActiveTab] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = customersData.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase()) ||
    c.company.toLowerCase().includes(search.toLowerCase()) ||
    c.property.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex flex-col">
      <CustomersHeader search={search} onSearch={setSearch} />

      <div className="bg-white border-b border-gray-100 px-5 md:px-8 py-0">
        <CustomersTabs tabs={TABS} active={activeTab} onChange={setActiveTab} />
      </div>

      <div className="flex-1 px-4 sm:p-6 md:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6 max-w-[1400px] mx-auto">

          {/* ── Left: Customer Cards ── */}
          <div className="flex-1 flex flex-col gap-4">
            {filtered.map(c => <CustomerCard key={c.id} customer={c} />)}
            {filtered.length === 0 && (
              <div className="bg-white rounded-[14px] px-8 py-16 text-center text-gray-400 text-[14px]">
                No customers match your search.
              </div>
            )}
          </div>

          {/* ── Right: Sidebar ── */}
          <div className="w-full lg:w-[300px] xl:w-[320px] flex flex-col gap-4 shrink-0">
            <RecentActivity />
            <SuggestedMatches />
            <CustomerStats />
          </div>

        </div>
      </div>
    </div>
  );
}