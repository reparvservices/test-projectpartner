import React from "react";
import {
  Search,
  Calendar,
  Upload,
  Plus,
  MessageCircle,
  Phone,
  FileText,
  Share2,
} from "lucide-react";

export default function Customers() {
  const customers = [
    {
      name: "Sarah Jenkins",
      company: "TechFlow Systems",
      status: "High্যাতInterest",
      property: "Sunnyvale Heights - 3BHK",
      budget: "₹850k - ₹950k",
      location: "Whitefield",
      activity: "Last active: 2 hours ago",
    },
    {
      name: "David Okafor",
      company: "Okafor Holdings",
      status: "New Lead",
      property: "Green Valley买马Residency",
      budget: "₹450k - ₹600k",
      location: "Austin, TX",
      activity: "Added: Yesterday",
    },
    {
      name: "Maria Gonzalez",
      company: "Personal Investor",
      status: "Active",
      property: "The Grand Arch",
      budget: "₹1.5M - ₹2M",
      location: "Downtown",
      activity: "Follow-up scheduled: Tomorrow",
    },
  ];

  const statusStyles = {
    "High Interest": "bg-red-100 text-red-600",
    "New Lead": "bg-blue-100 text-blue-600",
    Active: "bg-green-100 text-green-600",
  };

  return (
    <div className="min-h-screen bg-[#f6f4fb] p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Customers</h1>
          <p className="text-gray-500 text-sm">Overview • Client Management</p>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center bg-white border rounded-xl px-4 py-2 shadow-sm w-72">
            <Search size={18} className="text-gray-400 mr-2" />
            <input
              type="text"
              placeholder="Search anything..."
              className="outline-none w-full text-sm"
            />
          </div>

          <button className="flex items-center gap-2 bg-white border px-4 py-2 rounded-xl shadow-sm text-sm">
            <Calendar size={16} /> This Month
          </button>

          <button className="flex items-center gap-2 bg-white border px-4 py-2 rounded-xl shadow-sm text-sm">
            <Upload size={16} /> Import
          </button>

          <button
            className="flex items-center gap-2 text-white px-5 py-2.5 rounded-xl shadow-md text-sm font-medium"
            style={{ backgroundColor: "#5E23DC" }}
          >
            <Plus size={16} /> Post Update
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-3 mb-6">
        {[
          "All Customers 342",
          "Active 128",
          "New Leads 14",
          "High Interest 9",
          "Recently Contacted 24",
        ].map((tab, i) => (
          <button
            key={i}
            className={`px-4 py-2 rounded-full text-sm font-medium border shadow-sm ${
              i === 0
                ? "text-white"
                : "_DLLbg-white text-gray-600"
            }`}
            style={i === 0 ? { backgroundColor: "#5E23DC" } : {}}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Customer Cards */}
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-6">
          {customers.map((c, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-sm border p-6 hover:shadow-md transition"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">
                    {c.name}
                  </h2>
                  <p className="text-sm text-gray-500">{c.company}</p>
                  <span
                    className={`inline-block mt-2 text-xs px-3 py-1 rounded-full font-medium ${statusStyles[c.status]}`}
                  >
                    {c.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400">{c.activity}</p>
              </div>

              <div className="grid grid-cols-3 gap-8 mb-6">
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Interested Property</p>
                  <p className="text-[#5E23DC] font-medium mt-1">{c.property}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Budget Range</p>
                  <p className="font-medium mt-1">{c.budget}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-400 uppercase tracking-wide">Location Pref</p>
                  <p className="font-medium mt-1">{c.location}</p>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="flex items-center gap-2 text-white px-6 py-2.5 rounded-xl shadow-md text-sm font-medium" style={{ backgroundColor: "#5E23DC" }}>
                  <MessageCircle size={16} /> Message
                </button>
                <button className="flex items-center gap-2 bg-white border px-6 py-2.5 rounded-xl shadow-sm text-sm">
                  <Phone size={16} /> Call
                </button>
                <button className="flex items-center gap-2 bg-white border px-6 py-2.5 rounded-xl shadow-sm text-sm">
                  <FileText size={16} /> Add Note
                </button>
                <button className="flex items-center gap-2 bg-white border px-6 py-2.5 rounded-xl shadow-sm text-sm">
                  <Share2 size={16} /> Share Update
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Recent Customer Activity</h3>
            <div className="space-y-4 text-sm">
              <div>
                <p><span className="font-medium">Sarah Jenkins</span> viewed the floor plan</p>
                <p className="text-xs text-gray-400 mt-1">15 mins ago</p>
              </div>
              <div>
                <p><span className="font-medium">System</span> sent welcome packet</p>
                <p className="text-xs text-gray-400 mt-1">4 hours ago</p>
              </div>
              <div>
                <p><span className="font-medium">Rajesh K.</span> scheduled a site visit</p>
                <p className="text-xs text-gray-400 mt-1">Yesterday</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-gray-800">Suggested Matches</h3>
              <span className="text-xs px-2 py-1 rounded-full text-white" style={{ backgroundColor: "#5E23DC" }}>AI</span>
            </div>
            <div className="space-y-4 text-sm">
              <div>
                <p className="font-medium">Sunnyvale Heights</p>
                <p className="text-xs text-gray-400">98% match for Sarah J.</p>
              </div>
              <div>
                <p className="font-medium">Urban Lofts</p>
                <p className="text-xs text-gray-400">85% match for David O.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Customer Stats</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-500">Total Customers</span>
                <span className="font-semibold">342</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Active Leads</span>
                <span className="font Light-semibold">128</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Hot Prospects</span>
                <span className="font-semibold text-red-500">9</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Conversion Rate</span>
                <span className="font-semibold text-green-600">12.4%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
