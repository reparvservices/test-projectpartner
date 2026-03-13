import { Search, Calendar, Download, Plus, ArrowLeft, ChevronDown, Filter } from "lucide-react";

const GRADIENT = "linear-gradient(110.73deg, #5E23DC 0%, #7C3AED 100%)";

export default function SalesPartnersHeader({ onBack }) {
  return (
    <div className="bg-white border-b border-gray-100">

      {/* ── DESKTOP ── */}
      <div className="hidden md:block px-8 py-4">
        <div className="flex flex-wrap items-center justify-between gap-6">

          {/* Title + Breadcrumb */}
          <div>
            <h1 className="text-[20px] font-extrabold text-gray-900 tracking-tight leading-tight">
              Sales Partners
            </h1>
            <p className="text-xs text-gray-400 mt-0.5">
              <span className="hover:text-violet-600 cursor-pointer transition-colors">Dashboard</span>
              <span className="mx-1.5 text-gray-300">/</span>
              <span className="text-gray-600 font-medium">Sales Partners</span>
            </p>
          </div>

          {/* Controls */}
          <div className="flex flex-wrap items-center gap-2.5">
            {/* Search */}
            <div className="flex items-center gap-2 border border-gray-200 rounded-[8px] px-3.5 py-2 bg-white min-w-[210px] focus-within:border-violet-400 transition-colors">
              <Search size={14} className="text-gray-400 shrink-0" />
              <input
                placeholder="Search anything..."
                className="outline-none text-[13px] text-gray-700 placeholder:text-gray-400 bg-transparent w-full"
              />
            </div>

            {/* This Month */}
            <button className="flex items-center gap-2 border border-gray-200 rounded-[8px] px-3.5 py-[9px] text-[13px] text-gray-700 font-medium bg-white hover:border-gray-300 transition-colors whitespace-nowrap">
              <Calendar size={14} className="text-gray-500" />
              This Month
            </button>

            {/* Export */}
            <button className="flex items-center gap-2 border border-gray-200 rounded-[8px] px-3.5 py-[9px] text-[13px] text-gray-700 font-medium bg-white hover:border-gray-300 transition-colors whitespace-nowrap">
              <Download size={14} className="text-gray-500" />
              Export
            </button>

            {/* Add Partner */}
            <button
              className="flex items-center gap-2 px-4 py-[9px] text-white text-[13px] font-bold rounded-[8px] whitespace-nowrap hover:opacity-90 transition-opacity shadow-[0_4px_12px_rgba(94,35,220,0.28)]"
              style={{ background: GRADIENT }}
            >
              <Plus size={14} strokeWidth={2.5} />
              Add Partner
            </button>
          </div>
        </div>
      </div>

      {/* ── MOBILE ── */}
      <div className="flex flex-col md:hidden">

        {/* Row 1: Back + Title + FAB */}
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={onBack}
              className="p-0 bg-transparent border-none cursor-pointer"
            >
              <ArrowLeft size={20} className="text-gray-900" strokeWidth={2.2} />
            </button>
            <h1 className="text-[18px] font-extrabold text-gray-900 tracking-tight">
              Sales Partners
            </h1>
          </div>

          {/* Circular FAB */}
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center shadow-[0_4px_14px_rgba(94,35,220,0.35)] hover:opacity-90 transition-opacity shrink-0"
            style={{ background: GRADIENT }}
          >
            <Plus size={18} className="text-white" strokeWidth={2.5} />
          </button>
        </div>

        {/* Row 2: Search */}
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2.5 bg-gray-100 rounded-xl px-4 py-[11px] focus-within:ring-2 focus-within:ring-violet-100 transition-all">
            <Search size={15} className="text-gray-400 shrink-0" />
            <input
              placeholder="Search partners, email, location..."
              className="outline-none text-sm text-gray-700 placeholder:text-gray-400 bg-transparent w-full"
            />
          </div>
        </div>

        {/* Row 3: This Month + Export + Filter */}
        <div className="flex items-center gap-2 px-4 pb-4">
          {/* This Month dropdown */}
          <button className="flex items-center gap-1.5 bg-gray-100 rounded-[10px] px-4 py-2 text-[13px] text-gray-700 font-medium whitespace-nowrap">
            This Month
            <ChevronDown size={13} className="text-gray-500" />
          </button>

          {/* Export icon */}
          <button className="flex items-center justify-center bg-gray-100 rounded-[10px] w-10 h-9 text-gray-600 hover:bg-gray-200 transition-colors">
            <Download size={16} />
          </button>

          {/* Filter icon */}
          <button className="flex items-center justify-center bg-gray-100 rounded-[10px] w-10 h-9 text-gray-600 hover:bg-gray-200 transition-colors">
            <Filter size={16} />
          </button>
        </div>

      </div>
    </div>
  );
}