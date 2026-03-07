import React from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import { Search, Calendar, Download, Plus, Filter } from "lucide-react";

const columnHelper = createColumnHelper();

const data = [
  {
    id: "TP-4401",
    name: "Rohan Mehta",
    avatar: "https://i.pravatar.cc/40?img=12",
    territory: "North Mumbai",
    projects: ["Green Valley"],
    extraProjects: 3,
    phone: "+91 98223 11223",
    state: "Maharashtra",
    city: "Mumbai",
    followup: "Pending",
    performance: "High",
  },
  {
    id: "TP-4408",
    name: "Anjali Desai",
    avatar: "https://i.pravatar.cc/40?img=5",
    territory: "Pune West",
    projects: ["Skyline Towers"],
    extraProjects: 0,
    phone: "+91 99887 66554",
    state: "Maharashtra",
    city: "Pune",
    followup: "None",
    performance: "Medium",
  },
  {
    id: "TP-3321",
    name: "Rajesh Kumar",
    avatar: "https://i.pravatar.cc/40?img=3",
    territory: "Navi Mumbai",
    projects: ["Blue Ridge"],
    extraProjects: 1,
    phone: "+91 88776 65544",
    state: "Maharashtra",
    city: "Mumbai",
    followup: "Overdue",
    performance: "Low",
  },
  {
    id: "TP-5566",
    name: "Meera Reddy",
    avatar: "https://i.pravatar.cc/40?img=20",
    territory: "Hitech City",
    projects: ["Cyber Towers"],
    extraProjects: 0,
    phone: "+91 77665 54433",
    state: "Telangana",
    city: "Hyderabad",
    followup: "Completed",
    performance: "Very High",
  },
  {
    id: "TP-4412",
    name: "Arjun Kapoor",
    avatar: "https://i.pravatar.cc/40?img=15",
    territory: "South Delhi",
    projects: [],
    extraProjects: 0,
    phone: "+91 99001 12233",
    state: "Delhi",
    city: "New Delhi",
    followup: "Scheduled",
    performance: "New",
  },
];

const badgeStyles = {
  Pending: "bg-yellow-100 text-yellow-700",
  None: "bg-gray-100 text-gray-600",
  Overdue: "bg-red-100 text-red-600",
  Completed: "bg-green-100 text-green-700",
  Scheduled: "bg-orange-100 text-orange-700",
  High: "bg-green-100 text-green-700",
  "Very High": "bg-green-100 text-green-700",
  Medium: "bg-yellow-100 text-yellow-700",
  Low: "bg-red-100 text-red-600",
  New: "bg-gray-100 text-gray-600",
};

const columns = [
  columnHelper.accessor("name", {
    header: "PARTNER NAME",
    cell: (info) => {
      const row = info.row.original;
      return (
        <div className="flex items-center gap-3">
          <img src={row.avatar} className="w-10 h-10 rounded-full" />
          <div>
            <div className="font-semibold">{row.name}</div>
            <div className="text-xs text-gray-500">ID: {row.id}</div>
          </div>
        </div>
      );
    },
  }),
  columnHelper.accessor("territory", {
    header: "TERRITORY",
  }),
  columnHelper.accessor("phone", { header: "PHONE" }),
  columnHelper.accessor("state", { header: "STATE" }),
  columnHelper.accessor("city", { header: "CITY" }),
  columnHelper.accessor("followup", {
    header: "FOLLOWUP",
    cell: (info) => (
      <span
        className={`px-3 py-1 rounded-full text-xs ${badgeStyles[info.getValue()]}`}
      >
        {info.getValue()}
      </span>
    ),
  }),
  columnHelper.accessor("performance", {
    header: "PERFORMANCE",
    cell: (info) => (
      <span
        className={`px-3 py-1 rounded-full text-xs ${badgeStyles[info.getValue()]}`}
      >
        {info.getValue()}
      </span>
    ),
  }),
];

export default function TerritoryPartners() {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="p-4 md:p-6 bg-gray-50 min-h-screen space-y-6">
      {/* HEADER */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-xl md:text-2xl font-semibold">
            Territory Partners
          </h1>
          <p className="text-sm text-gray-500">
            Dashboard › Partners › Territory Partners
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 md:gap-3">
          <div className="flex items-center bg-white border rounded-lg px-3 py-2 w-full md:w-64">
            <Search size={16} className="text-gray-400" />
            <input
              placeholder="Search anything..."
              className="ml-2 outline-none text-sm w-full"
            />
          </div>

          <button className="flex items-center gap-2 border px-3 py-2 rounded-lg bg-white text-sm">
            <Calendar size={16} /> Last 30 Days
          </button>

          <button className="flex items-center gap-2 border px-3 py-2 rounded-lg bg-white text-sm">
            <Download size={16} /> Export
          </button>

          <button className="flex items-center gap-2 bg-[#5323DC] text-white px-4 py-2 rounded-lg shadow">
            <Plus size={16} /> Add Partner
          </button>
        </div>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <StatCard title="Total Territory Partners" value="342" subtitle="+8%" />
        <StatCard title="Active Territories" value="56" subtitle="+3 zones" />
        <StatCard title="Covered Cities" value="18" subtitle="4 states" />
        <StatCard title="Leads Assigned" value="1,250" subtitle="+15%" />
        <StatCard
          title="Pending Followups"
          value="85"
          subtitle="Action needed"
        />
      </div>

      {/* FILTERS */}
      <div className="bg-white border rounded-xl p-4 flex flex-wrap gap-3 items-center">
        <div className="flex items-center gap-2 text-sm font-medium text-gray-600">
          <Filter size={16} /> Filters:
        </div>

        <FilterSelect label="State" value="All" />
        <FilterSelect label="City" value="Mumbai" />
        <FilterSelect label="Performance" value="High" />

        <button className="ml-auto text-purple-600 text-sm font-medium">
          Clear All
        </button>
      </div>

      {/* MOBILE VIEW (Cards) */}
      <div className="lg:hidden space-y-4">
        {/* Search */}
        <div className="flex items-center bg-white border rounded-lg px-3 py-3">
          <Search size={16} className="text-gray-400" />
          <input
            placeholder="Search partners..."
            className="ml-2 outline-none text-sm w-full"
          />
        </div>

        {/* Partner Cards */}
        {data.map((partner) => (
          <MobilePartnerCard key={partner.id} partner={partner} />
        ))}
      </div>

      {/* DESKTOP VIEW (Table) */}
      <div className="hidden lg:block bg-white rounded-xl border overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-gray-500">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="px-4 py-3 text-left font-medium"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-t hover:bg-gray-50">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function StatCard({ title, value, subtitle }) {
  return (
    <div className="bg-white border rounded-xl p-5">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-2xl font-semibold mt-2">{value}</h3>
      <p className="text-xs text-green-600 mt-1">{subtitle}</p>
    </div>
  );
}

function FilterSelect({ label, value }) {
  return (
    <div className="flex items-center gap-2 border rounded-lg px-3 py-2 text-sm bg-gray-50">
      <span className="text-gray-500">{label}:</span>
      <span className="font-medium">{value}</span>
    </div>
  );
}

function MobilePartnerCard({ partner }) {
  return (
    <div className="bg-white rounded-2xl border p-4 space-y-4 shadow-sm">

      {/* Top */}
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <img src={partner.avatar} className="w-12 h-12 rounded-full" />
          <div>
            <h3 className="font-semibold text-gray-900">{partner.name}</h3>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              ID: {partner.id}
            </span>
          </div>
        </div>

        <span className="text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
          {partner.territory}
        </span>
      </div>

      {/* Projects */}
      <div className="flex flex-wrap gap-2">
        {partner.projects.map(p => (
          <span key={p} className="text-xs bg-gray-100 px-2 py-1 rounded">
            {p}
          </span>
        ))}

        {partner.extraProjects > 0 && (
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
            +{partner.extraProjects} more
          </span>
        )}
      </div>

      {/* Contact */}
      <div className="grid grid-cols-2 text-sm gap-2">
        <div>
          <p className="text-gray-400 text-xs">Mobile</p>
          <p className="font-medium">{partner.phone}</p>
        </div>

        <div>
          <p className="text-gray-400 text-xs">Location</p>
          <p className="font-medium">{partner.city}, {partner.state}</p>
        </div>
      </div>

      {/* Status */}
      <div className="flex gap-2">
        <span className={`px-3 py-1 rounded-full text-xs ${badgeStyles[partner.followup]}`}>
          {partner.followup}
        </span>

        <span className={`px-3 py-1 rounded-full text-xs ${badgeStyles[partner.performance]}`}>
          {partner.performance} Perf
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-2 border-t">
        <button className="flex-1 bg-[#5323DC] text-white rounded-lg py-2 font-medium">
          View Profile
        </button>

        <button className="border rounded-lg p-2">
          📞
        </button>

        <button className="border rounded-lg p-2">
          📊
        </button>

        <button className="border rounded-lg p-2">
          🎁
        </button>
      </div>
    </div>
  );
}

function FilterChip({ label }) {
  return (
    <button className="border rounded-full px-4 py-2 text-sm bg-white whitespace-nowrap">
      {label}
    </button>
  );
}
