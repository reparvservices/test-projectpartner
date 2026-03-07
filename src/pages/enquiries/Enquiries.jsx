import { useState } from "react";
import {
  Search,
  Phone,
  Plus,
  Calendar,
  SlidersHorizontal,
  Upload,
  ChevronDown,
  MapPin,
  Clock,
  FileText,
  ArrowRight,
  Instagram,
} from "lucide-react";

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
    e.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-slate-50 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-6">
              <h1 className="text-2xl font-semibold text-slate-900">
                Enquiries
              </h1>

              <button className="flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-lg text-sm text-slate-700 hover:bg-slate-200 transition">
                All Sources <ChevronDown size={16} />
              </button>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              {/* Search */}
              <div className="relative w-64">
                <Search
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                />
                <input
                  type="text"
                  placeholder="Search anything..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-slate-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                />
              </div>

              <button className="flex items-center gap-2 border px-4 py-2 rounded-lg bg-white text-sm">
                <Calendar size={16} /> Oct 12 - Nov 11
              </button>

              <button className="border p-2 rounded-lg bg-white">
                <SlidersHorizontal size={16} />
              </button>

              <button className="flex items-center gap-2 border px-4 py-2 rounded-lg bg-white text-sm">
                <Upload size={16} /> Import CSV
              </button>

              <button className="flex items-center gap-2 bg-purple-600 text-white px-5 py-2 rounded-lg text-sm shadow hover:bg-purple-700 transition">
                <Plus size={16} /> Add Enquiry
              </button>
            </div>
          </div>

          {/* STATUS TABS */}
          <div className="flex flex-wrap gap-3">
            {tabs.map((tab) => (
              <button
                key={tab.label}
                onClick={() => setActiveTab(tab.label)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                  activeTab === tab.label
                    ? "bg-purple-600 text-white"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                {tab.label}
                <span className="ml-2 text-xs opacity-70">
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT - CARDS */}
          <div className="lg:col-span-2 space-y-6">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl border border-slate-200 p-6 hover:shadow-md transition"
              >
                {/* TOP */}
                <div className="flex justify-between items-start">
                  <div className="flex gap-4">
                    <div className="h-12 w-12 rounded-full bg-slate-200"></div>

                    <div>
                      <h2 className="font-semibold text-slate-900">
                        {item.name}
                      </h2>
                      <div className="flex items-center gap-4 text-sm text-slate-500 mt-1">
                        <span className="flex items-center gap-1">
                          <MapPin size={14} /> {item.location}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock size={14} /> {item.time}
                        </span>
                      </div>
                    </div>
                  </div>

                  <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full font-medium">
                    {item.status}
                  </span>
                </div>

                {/* INFO */}
                <div className="grid md:grid-cols-3 gap-6 bg-slate-50 p-4 rounded-lg mt-6">
                  <div>
                    <p className="text-xs uppercase text-slate-400">
                      Interested In
                    </p>
                    <p className="font-medium text-slate-800 mt-1">
                      {item.interested}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase text-slate-400">
                      Budget Range
                    </p>
                    <p className="font-medium text-slate-800 mt-1">
                      {item.budget}
                    </p>
                  </div>

                  <div>
                    <p className="text-xs uppercase text-slate-400">
                      Source
                    </p>
                    <p className="flex items-center gap-2 font-medium text-slate-800 mt-1">
                      <Instagram size={16} className="text-pink-500" />
                      {item.source}
                    </p>
                  </div>
                </div>

                {/* ACTIONS */}
                <div className="flex justify-between items-center mt-6 pt-4 border-t border-slate-200">
                  <div className="flex gap-4">
                    <button className="bg-purple-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-purple-700 transition">
                      View Details
                    </button>

                    <button className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900">
                      <Phone size={14} /> Call
                    </button>

                    <button className="flex items-center gap-1 text-sm text-slate-600 hover:text-slate-900">
                      <FileText size={14} /> Add Note
                    </button>
                  </div>

                  <button className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900">
                    Schedule Visit <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">
            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4">
                Quick Stats
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between bg-slate-50 p-3 rounded-lg">
                  <span>Today's Leads</span>
                  <span className="font-semibold">12</span>
                </div>
                <div className="flex justify-between bg-slate-50 p-3 rounded-lg">
                  <span>Pending Follow-up</span>
                  <span className="font-semibold text-red-500">4</span>
                </div>
                <div className="flex justify-between bg-slate-50 p-3 rounded-lg">
                  <span>Assigned</span>
                  <span className="font-semibold">8</span>
                </div>
              </div>
            </div>

            <div className="bg-white p-5 rounded-xl border border-slate-200">
              <h3 className="font-semibold text-slate-900 mb-4">
                Live Activity
              </h3>
              <ul className="space-y-3 text-sm text-slate-600">
                <li className="flex justify-between">
                  <span>Incoming Call</span>
                  <span>2m ago</span>
                </li>
                <li className="flex justify-between">
                  <span>Email Opened</span>
                  <span>15m ago</span>
                </li>
                <li className="flex justify-between">
                  <span>Task Completed</span>
                  <span>1h ago</span>
                </li>
                <li className="flex justify-between">
                  <span>New Lead</span>
                  <span>2h ago</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}