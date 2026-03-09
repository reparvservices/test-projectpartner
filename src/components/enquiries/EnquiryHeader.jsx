import {
  Search,
  Plus,
  Calendar,
  SlidersHorizontal,
  Upload,
  ChevronDown,
  ArrowLeft,
} from "lucide-react";

export default function EnquiryHeader({ search, setSearch }) {
  return (
    <div className="bg-white border-b">
      {/* ---------- MOBILE HEADER ---------- */}
      <div className="md:hidden p-4 space-y-4">
        {/* Top Row */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ArrowLeft size={22} />
            <h1 className="text-xl font-semibold">Enquiries</h1>
          </div>

          <button className="bg-gradient-to-br from-[#8B5CF6] to-[#6D28D9] text-white p-3 rounded-full shadow-[0px_4px_6px_-1px_#7C3AED4D]">
            <Plus size={18} />
          </button>
        </div>

        {/* Search */}
        <div className="relative">
          <Search
            size={18}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#757575]"
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, location, source..."
            className="w-full bg-[#F2F4FF] rounded-md pl-10 pr-4 py-3 text-sm outline-none"
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3">
          <button className="flex items-center gap-2 bg-[#F2F4FF] px-4 py-2 rounded-md text-sm">
            All Sources <ChevronDown size={16} />
          </button>

          <button className="flex items-center gap-2 bg-[#F2F4FF] px-4 py-2 rounded-md text-sm">
            <Calendar size={16} /> Oct 12 - Nov 11
          </button>

          <button className="bg-[#F2F4FF] p-2 rounded-md">
            <SlidersHorizontal size={16} />
          </button>

          <button className="bg-[#F2F4FF] p-2 rounded-md">
            <Upload size={16} />
          </button>
        </div>
      </div>

      {/* ---------- DESKTOP HEADER ---------- */}
      <div className="hidden md:flex flex-wrap gap-4 items-center justify-between p-6">
        {/* Left */}
        <div className="flex items-center gap-6">
          <h1 className="text-2xl font-semibold text-slate-900">Enquiries</h1>

          <button className="flex items-center gap-2 bg-[#F2F4FF] px-4 py-2 rounded-md text-sm">
            All Sources <ChevronDown size={16} />
          </button>
        </div>

        {/* Right */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Search */}
          <div className="relative w-64">
            <Search
              size={16}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#757575] "
            />

            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search anything..."
              className="w-full pl-9 pr-4 py-2 border rounded-md text-sm"
            />
          </div>

          <button className="flex items-center gap-2 border px-4 py-2 rounded-md bg-white text-sm">
            <Calendar size={16} />
            Oct 12 - Nov 11
          </button>

          <button className="border p-2 rounded-lg bg-white">
            <SlidersHorizontal size={16} />
          </button>

          <button className="flex items-center gap-2 border px-4 py-2 rounded-md bg-white text-sm">
            <Upload size={16} />
            Import CSV
          </button>

          <button className="flex items-center gap-2 bg-gradient-to-r from-[#5E23DC] to-[#7C3AED] text-white px-5 py-2 rounded-md text-sm">
            <Plus size={16} />
            Add Enquiry
          </button>
        </div>
      </div>
    </div>
  );
}
