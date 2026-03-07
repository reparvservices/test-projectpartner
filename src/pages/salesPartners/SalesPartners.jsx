import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  Search,
  Calendar,
  Download,
  Plus,
  Phone,
  MessageSquare,
  BarChart3,
  ArrowLeft,
} from "lucide-react";

export default function SalesPartners() {
  const [globalFilter, setGlobalFilter] = useState("");

  const data = useMemo(
    () => [
      {
        name: "Vikram Mehta",
        email: "vikram.m@gmail.com",
        followup: "Proposal Sent",
        projects: "Skyline Towers +2",
        phone: "+91 98765 43210",
        location: "Mumbai, MH",
        payment: "Paid",
        earnings: "₹1,25,000",
      },
      {
        name: "Priya Singh",
        email: "priya.realty@gmail.com",
        followup: "Follow Up",
        projects: "Green Valley",
        phone: "+91 99887 76655",
        location: "Bangalore, KA",
        payment: "Pending",
        earnings: "₹45,000",
      },
      {
        name: "Rahul Kapoor",
        email: "rahul.k@properties.com",
        followup: "Closed",
        projects: "Lakeside View",
        phone: "+91 91234 56789",
        location: "Delhi, NCR",
        payment: "Paid",
        earnings: "₹3,40,500",
      },
      {
        name: "Anjali Desai",
        email: "anjali.d@gmail.com",
        followup: "Negotiation",
        projects: "Grand Arch",
        phone: "+91 98700 11223",
        location: "Pune, MH",
        payment: "Unbilled",
        earnings: "₹0",
      },
      {
        name: "Karan Malhotra",
        email: "karan.m@housing.com",
        followup: "Interested",
        projects: "Urban Heights +3",
        phone: "+91 95544 33221",
        location: "Hyderabad, TG",
        payment: "Paid",
        earnings: "₹88,200",
      },
    ],
    []
  );

  const columns = useMemo(
    () => [
      {
        header: "Partner Name",
        accessorKey: "name",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gray-200" />
            <div>
              <p className="font-medium text-gray-800">{row.original.name}</p>
              <p className="text-sm text-gray-500">{row.original.email}</p>
            </div>
          </div>
        ),
      },
      {
        header: "Followup Status",
        accessorKey: "followup",
        cell: ({ getValue }) => (
          <span className="px-3 py-1 text-xs rounded-full bg-purple-100 text-[#5E23DC] font-medium">
            {getValue()}
          </span>
        ),
      },
      { header: "Assigned Projects", accessorKey: "projects" },
      { header: "Phone Number", accessorKey: "phone" },
      { header: "Location", accessorKey: "location" },
      {
        header: "Payment Status",
        accessorKey: "payment",
        cell: ({ getValue }) => {
          const value = getValue();
          const styles =
            value === "Paid"
              ? "bg-green-100 text-green-600"
              : value === "Pending"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-gray-200 text-gray-600";
          return (
            <span className={`px-3 py-1 text-xs rounded-full font-medium ${styles}`}>
              {value}
            </span>
          );
        },
      },
      {
        header: "Total Earnings",
        accessorKey: "earnings",
        cell: ({ getValue }) => (
          <span className="font-semibold text-gray-800">{getValue()}</span>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const stats = [
    { label: "Total Partners", value: "4,285", sub: "+12% from last month" },
    { label: "Active Partners", value: "3,102", sub: "72% engagement rate" },
    { label: "Paid Partners", value: "1,450", sub: "+5% conversion" },
    { label: "Pending Payments", value: "₹4.2L", sub: "15 invoices pending" },
    { label: "Leads Converted", value: "892", sub: "+24% vs average" },
  ];

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* ================= MOBILE VIEW ================= */}
      <div className="md:hidden">
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 bg-white shadow-sm">
          <div className="flex items-center gap-3">
            <ArrowLeft size={20} />
            <h1 className="text-lg font-semibold">Sales Partners</h1>
          </div>
          <button className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-[#5E23DC] text-white flex items-center justify-center shadow-lg">
            <Plus size={18} />
          </button>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="flex items-center bg-white border rounded-xl px-3 py-3">
            <Search size={16} className="text-gray-400 mr-2" />
            <input
              placeholder="Search partners, email, location..."
              className="outline-none text-sm w-full"
            />
          </div>
        </div>

        {/* Cards */}
        <div className="px-4 pb-6 space-y-6">
          {data.map((item, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-14 h-14 rounded-full bg-gray-200" />
                <div>
                  <h3 className="font-semibold text-lg">{item.name}</h3>
                  <p className="text-sm text-gray-500">{item.email}</p>
                </div>
              </div>

              <div className="text-sm text-gray-600 space-y-1">
                <p>{item.phone}</p>
                <p>{item.location}</p>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 flex items-center justify-between">
                <span className="px-3 py-1 text-xs rounded-full font-medium bg-green-100 text-green-600">
                  {item.payment.toUpperCase()}
                </span>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Total Earnings</p>
                  <p className="font-semibold">{item.earnings}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button className="flex-1 bg-gradient-to-r from-purple-600 to-[#5E23DC] text-white py-3 rounded-xl">
                  View Details
                </button>
                <button className="p-3 border rounded-xl"><Phone size={16} /></button>
                <button className="p-3 border rounded-xl"><MessageSquare size={16} /></button>
                <button className="p-3 border rounded-xl"><BarChart3 size={16} /></button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ================= DESKTOP VIEW ================= */}
      <div className="hidden md:block p-6 md:p-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Sales Partners</h1>
            <p className="text-gray-500 text-sm mt-1">Dashboard / Partners / Sales Partners</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center bg-white border rounded-xl px-3 py-2 shadow-sm">
              <Search size={16} className="text-gray-400 mr-2" />
              <input
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                placeholder="Search anything..."
                className="outline-none text-sm"
              />
            </div>

            <button className="flex items-center gap-2 bg-white border px-4 py-2 rounded-xl text-sm shadow-sm">
              <Calendar size={16} /> This Month
            </button>

            <button className="flex items-center gap-2 bg-white border px-4 py-2 rounded-xl text-sm shadow-sm">
              <Download size={16} /> Export
            </button>

            <button className="flex items-center gap-2 bg-[#5E23DC] text-white px-4 py-2 rounded-xl text-sm shadow-md">
              <Plus size={16} /> Add Partner
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border">
              <p className="text-sm text-gray-500">{stat.label}</p>
              <h3 className="text-2xl font-bold text-gray-900 mt-2">{stat.value}</h3>
              <p className="text-sm text-green-600 mt-1">{stat.sub}</p>
            </div>
          ))}
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl shadow-sm border overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-100 text-gray-500 uppercase text-xs">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="px-6 py-4 text-left font-medium">
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr key={row.id} className="border-t hover:bg-gray-50 transition">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-6 py-4 whitespace-nowrap">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between mt-6">
          <p className="text-sm text-gray-500">Showing 1–5 of 4,285 partners</p>
          <div className="flex gap-3">
            <button className="px-4 py-2 bg-white border rounded-lg text-sm">Previous</button>
            <button className="px-4 py-2 bg-white border rounded-lg text-sm">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
}
