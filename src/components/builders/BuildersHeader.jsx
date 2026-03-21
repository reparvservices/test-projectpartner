import { useState } from "react";
import {
  Search,
  Plus,
  ChevronDown,
  ArrowLeft,
  SlidersHorizontal,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

function Toggle({ checked, onChange }) {
  return (
    <button
      onClick={() => onChange(!checked)}
      className={`relative w-10 h-[22px] rounded-full transition-all duration-200 focus:outline-none flex-shrink-0 ${
        checked ? "bg-violet-600" : "bg-gray-200"
      }`}
    >
      <span
        className={`absolute top-[3px] w-4 h-4 bg-white rounded-full shadow-sm transition-all duration-200 ${
          checked ? "left-[21px]" : "left-[3px]"
        }`}
      />
    </button>
  );
}

export default function BuildersHeader({ onBack }) {
  const navigate = useNavigate();
  const [verified, setVerified] = useState(false);

  return (
    <div className="bg-white border-b border-gray-100">
      {/* DESKTOP */}
      <div className="hidden md:flex items-center justify-between gap-6 px-8 py-[18px]">
        <div className="max-w-[300px] shrink-0">
          <h1 className="text-[20px] font-bold text-[#1E293B]">
            Builders Network
          </h1>
          <p className="text-[10px] text-gray-400 mt-0.5">
            Manage your construction partnerships and collaborations
          </p>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 flex-wrap">
          <div className="flex items-center gap-2 border border-gray-200 rounded-[6px] px-4 py-[6px] bg-gray-50 min-w-[220px] hover:border-gray-300 transition-colors">
            <Search size={14} className="text-gray-400 shrink-0" />
            <input
              placeholder="Search anything..."
              className="outline-none text-[12px] text-gray-700 placeholder:text-gray-400 bg-transparent w-full"
            />
          </div>

          <div className="flex items-center gap-1.5 border border-gray-200 rounded-[6px] px-3.5 py-[6px] bg-white cursor-pointer text-[12px] text-gray-700 font-medium select-none hover:border-gray-300 transition-colors whitespace-nowrap">
            City <ChevronDown size={13} className="text-gray-400" />
          </div>

          <div className="flex items-center gap-1.5 border border-gray-200 rounded-[6px] px-3.5 py-[6px] bg-white cursor-pointer text-[12px] text-gray-700 font-medium select-none hover:border-gray-300 transition-colors whitespace-nowrap">
            Project Type <ChevronDown size={13} className="text-gray-400" />
          </div>

          <div className="flex items-center gap-2 border border-gray-200 rounded-[6px] px-3.5 py-[6px] bg-white cursor-pointer text-[12px] text-gray-700 font-medium select-none hover:border-gray-300 transition-colors whitespace-nowrap">
            Verified
            <Toggle checked={verified} onChange={setVerified} />
          </div>

          <button
            className="flex items-center gap-2 px-5 py-[8px] text-white text-[12px] font-bold rounded-[6px] whitespace-nowrap shadow-[0_4px_14px_rgba(94,35,220,0.3)] hover:opacity-90 transition-opacity"
            style={{
              background:
                "linear-gradient(110.73deg, #5E23DC 0%, #7C3AED 100%)",
            }}
          >
            <Plus size={15} strokeWidth={2.5} />
            Add Builder
          </button>
        </div>
      </div>

      {/* MOBILE */}
      <div className="flex flex-col md:hidden">
        <div className="flex items-center justify-between px-4 pt-4 pb-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => {
                navigate(-1);
              }}
              className="p-0 bg-transparent border-none cursor-pointer"
            >
              <ArrowLeft
                size={20}
                className="text-gray-900"
                strokeWidth={2.2}
              />
            </button>
            <h1 className="text-[18px] font-semibold text-gray-900 tracking-tight">
              Builders Network
            </h1>
          </div>
          <button
            className="w-10 h-10 rounded-full flex items-center justify-center shadow-[0_4px_14px_rgba(94,35,220,0.35)] hover:opacity-90 transition-opacity shrink-0"
            style={{
              background:
                "linear-gradient(110.73deg, #5E23DC 0%, #7C3AED 100%)",
            }}
          >
            <Plus size={18} className="text-white" strokeWidth={2.5} />
          </button>
        </div>

        <div className="px-4 pb-3">
          <div className="flex items-center gap-2.5 bg-gray-100 rounded-xl px-4 py-[11px]">
            <Search size={15} className="text-gray-400 shrink-0" />
            <input
              placeholder="Search builders, projects..."
              className="outline-none text-sm text-gray-700 placeholder:text-gray-400 bg-transparent w-full"
            />
          </div>
        </div>

        <div className="flex items-center gap-2 px-4 pb-3.5 overflow-x-auto">
          <div className="flex items-center gap-1 bg-gray-100 rounded-[10px] px-3.5 py-2 text-[13px] text-gray-700 font-medium cursor-pointer whitespace-nowrap shrink-0">
            City <ChevronDown size={12} className="text-gray-500" />
          </div>
          <div className="flex items-center gap-1 bg-gray-100 rounded-[10px] px-3.5 py-2 text-[13px] text-gray-700 font-medium cursor-pointer whitespace-nowrap shrink-0">
            Project Type <ChevronDown size={12} className="text-gray-500" />
          </div>
          <div className="flex items-center gap-2 bg-gray-100 rounded-[10px] px-3.5 py-2 text-[13px] text-gray-700 font-medium cursor-pointer whitespace-nowrap shrink-0">
            Verified
            <Toggle checked={verified} onChange={setVerified} />
          </div>
          <div className="flex items-center bg-gray-100 rounded-[10px] px-3 py-2 cursor-pointer shrink-0">
            <SlidersHorizontal size={14} className="text-gray-500" />
          </div>
        </div>
      </div>
    </div>
  );
}
