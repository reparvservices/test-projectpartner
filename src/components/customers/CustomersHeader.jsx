import {
  Search,
  Calendar,
  Upload,
  MessageCircle,
  ChevronDown,
  ArrowLeft,
  Plus,
  SlidersHorizontal,
  Download,
} from "lucide-react";

const GRADIENT = "linear-gradient(110.73deg, #5E23DC 0%, #7C3AED 100%)";

export default function CustomersHeader({ search, onSearch }) {
  return (
    <div className=" border-b">
      {/* ── DESKTOP ── */}
      <div className="hidden md:flex flex-wrap items-center justify-between gap-6 px-8 py-4">
        <div>
          <h1 className="text-[20px] font-bold">
            Customers
          </h1>
          <p className="text-[12.5px] text-gray-500 mt-0.5">
            Overview • Client Management
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center gap-2 border rounded-[6px] px-3.5 py-[8px] bg-white min-w-[300px]">
            <Search size={14} className="text-gray-400 shrink-0" />
            <input
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search anything..."
              className="outline-none text-[12px] text-gray-700 placeholder:text-gray-400 bg-transparent w-full"
            />
          </div>

          <button className="flex items-center gap-2 border rounded-[6px] px-3.5 py-[8px] text-[13px] font-medium bg-transparent hover:bg-white/5 transition-colors whitespace-nowrap">
            <Calendar size={14} className="text-gray-800" />
            This Month
          </button>

          <button className="flex items-center gap-2 border rounded-[6px] px-3.5 py-[8px] text-[12px] font-medium bg-transparent hover:bg-white/5 transition-colors whitespace-nowrap">
            <Download size={14} className="text-gray-400" />
            Export
          </button>

          <button
            className="flex items-center gap-2 px-4 py-[8px] text-[12px] font-bold rounded-[10px] whitespace-nowrap hover:opacity-90 transition-opacity border border-[#5323DC]"
            style={{ background: "transparent" }}
          >
            <MessageCircle size={14} className="text-[#5323DC]" />
            <span className="text-[#5323DC]">Post Update</span>
          </button>
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="flex gap-3 flex-col md:hidden pb-4">
        {/* Row 1: Back arrow + centered title + gradient FAB */}
        <div className="relative flex items-center justify-between px-4 pt-4 pb-3 bg-white border-b">
          <button className="p-1.5 rounded-full hover:bg-gray-100 transition-colors">
            <ArrowLeft size={20} className="text-gray-900" strokeWidth={2.2} />
          </button>
          <h1 className="absolute left-1/2 -translate-x-1/2 text-[18px] font-semibold text-gray-900 tracking-tight">
            Customers
          </h1>
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center shadow-[0_4px_14px_rgba(94,35,220,0.4)] hover:opacity-90 transition-opacity"
            style={{ background: GRADIENT }}
          >
            <Plus size={18} className="text-white" strokeWidth={2.5} />
          </button>
        </div>

        {/* Row 2: Search bar */}
        <div className="px-4">
          <div className="flex items-center gap-2 bg-white border rounded-[10px] px-4 py-[11px]">
            <Search size={15} className="text-gray-400 shrink-0" />
            <input
              value={search}
              onChange={(e) => onSearch(e.target.value)}
              placeholder="Search customers, leads..."
              className="outline-none text-[13.5px] text-gray-700 placeholder:text-gray-400 bg-transparent w-full"
            />
          </div>
        </div>

        {/* Row 3: This Month chip + Download + Filter icons */}
        <div className="flex items-center gap-2.5 px-4">
          <button className="flex items-center gap-1.5 bg-white border border-gray-200 rounded-[6px] px-4 py-2 text-[12px] text-gray-700 font-medium whitespace-nowrap">
            This Month
            <ChevronDown size={13} className="text-gray-500" />
          </button>
          <div className="flex-1" />
          <button className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-[10px] hover:bg-gray-50 transition-colors">
            <Download size={16} className="text-violet-600" />
          </button>
          <button className="w-10 h-10 flex items-center justify-center bg-white border border-gray-200 rounded-[10px] hover:bg-gray-50 transition-colors">
            <SlidersHorizontal size={16} className="text-violet-600" />
          </button>
        </div>
      </div>
    </div>
  );
}
