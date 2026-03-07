import React from "react";
import {
  Search,
  Plus,
  MapPin,
  MessageCircle,
  LayoutGrid,
} from "lucide-react";

const liveActivity = [
  {
    name: "Urban Spaces",
    time: "2m ago",
    tag: "New Launch",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
  },
  {
    name: "Skyline Const.",
    time: "15m ago",
    tag: "Site Progress",
    image: "https://images.unsplash.com/photo-1600607687644-c7f34a2bfc1b",
  },
  {
    name: "Nova Homes",
    time: "1h ago",
    tag: "Deal Closed",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa",
  },
  {
    name: "Eco Living",
    time: "3h ago",
    tag: "Brochure",
    image: "https://images.unsplash.com/photo-1507089947367-19c1da9775ae",
  },
];

const builders = [
  {
    name: "Prestige Estates",
    location: "Bangalore, Karnataka",
    score: "98%",
    revenue: "₹450 Cr",
    deals: "₹124 Cr",
    projects: "12 Sites",
    partners: "45 Agencies",
    contact: "Rajesh Kumar",
    phone: "+91 98765 43210",
    image: "https://images.unsplash.com/photo-1600585152915-d208bec867a1",
  },
  {
    name: "Lodha Group",
    location: "Mumbai, Maharashtra",
    score: "94%",
    revenue: "₹890 Cr",
    deals: "₹340 Cr",
    projects: "8 Sites",
    partners: "120 Agencies",
    contact: "Priya Sharma",
    phone: "+91 99887 77665",
    image: "https://images.unsplash.com/photo-1600585152220-90363fe7e115",
  },
];

export default function Builders() {
  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-semibold">Builders Network</h1>
          <p className="text-gray-500 text-sm">
            Manage your construction partnerships and collaborations
          </p>
        </div>

        <div className="flex flex-wrap gap-3 items-center">
          {/* Search */}
          <div className="flex items-center border rounded-lg px-3 py-2 bg-white">
            <Search size={16} className="text-gray-400" />
            <input
              placeholder="Search anything..."
              className="ml-2 outline-none text-sm"
            />
          </div>

          <select className="border rounded-lg px-3 py-2 text-sm bg-white">
            <option>City</option>
          </select>

          <select className="border rounded-lg px-3 py-2 text-sm bg-white">
            <option>Project Type</option>
          </select>

          <button className="border rounded-lg px-3 py-2 text-sm bg-white">
            Verified
          </button>

          <button className="flex items-center gap-2 px-4 py-2 text-white rounded-lg bg-gradient-to-r from-purple-600 to-indigo-600">
            <Plus size={16} />
            Add Builder
          </button>
        </div>
      </div>

      {/* Live Activity */}
      <h2 className="text-sm font-semibold text-gray-500 mb-4">
        LIVE ACTIVITY
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {liveActivity.map((item, index) => (
          <div key={index} className="bg-white rounded-xl border p-3">
            <div className="flex items-center gap-2 mb-2">
              <img
                src={item.image}
                className="w-8 h-8 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium">{item.name}</p>
                <p className="text-xs text-gray-500">{item.time}</p>
              </div>
            </div>

            <div className="relative">
              <img
                src={item.image}
                className="rounded-lg h-28 w-full object-cover"
              />

              <span className="absolute bottom-2 left-2 text-xs bg-black/60 text-white px-2 py-1 rounded">
                {item.tag}
              </span>
            </div>

            <button className="w-full mt-3 border rounded-lg py-2 text-sm">
              View Update
            </button>
          </div>
        ))}
      </div>

      {/* Network */}
      <h2 className="text-sm font-semibold text-gray-500 mb-4">
        YOUR NETWORK (8)
      </h2>

      <div className="grid lg:grid-cols-2 gap-6">
        {builders.map((builder, index) => (
          <div key={index} className="bg-white border rounded-2xl p-5">
            {/* Top */}
            <div className="flex justify-between items-center mb-4">
              <div className="flex gap-3 items-center">
                <img
                  src={builder.image}
                  className="w-12 h-12 rounded-lg object-cover"
                />

                <div>
                  <h3 className="font-semibold">{builder.name}</h3>

                  <div className="flex items-center text-sm text-gray-500">
                    <MapPin size={14} className="mr-1" />
                    {builder.location}
                  </div>
                </div>
              </div>

              <span className="bg-green-100 text-green-600 text-xs px-2 py-1 rounded">
                ↗ {builder.score}
              </span>
            </div>

            {/* Contact */}
            <div className="bg-gray-100 rounded-lg p-3 mb-4 text-sm">
              <p className="font-medium">{builder.contact}</p>
              <p className="text-gray-500">{builder.phone}</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 text-sm mb-4">
              <div>
                <p className="text-gray-500">Revenue</p>
                <p className="font-semibold">{builder.revenue}</p>
              </div>

              <div>
                <p className="text-gray-500">Total Deals</p>
                <p className="font-semibold">{builder.deals}</p>
              </div>

              <div>
                <p className="text-gray-500">Active Proj.</p>
                <p className="font-semibold">{builder.projects}</p>
              </div>

              <div>
                <p className="text-gray-500">Partners</p>
                <p className="font-semibold">{builder.partners}</p>
              </div>
            </div>

            {/* Update */}
            <div className="bg-gray-100 rounded-lg p-3 text-sm mb-4">
              Launch video reached 2.4k views today.
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button className="flex-1 bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-lg py-2">
                View Profile
              </button>

              <button className="border rounded-lg p-2">
                <MessageCircle size={18} />
              </button>

              <button className="border rounded-lg p-2">
                <LayoutGrid size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
