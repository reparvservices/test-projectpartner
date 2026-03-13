import { useState } from "react";
import { Filter, ChevronDown } from "lucide-react";

const filterConfig = [
  { key: "state",       label: "Territory State", options: ["All", "Maharashtra", "Delhi", "Telangana", "Karnataka"] },
  { key: "city",        label: "Territory City",  options: ["All", "Mumbai", "Pune", "Delhi", "Hyderabad"] },
  { key: "status",      label: "Status",          options: ["All", "Active", "Inactive"] },
  { key: "followup",    label: "Followup",        options: ["All", "Pending", "Overdue", "Completed", "Scheduled"] },
  { key: "project",     label: "Project",         options: ["All", "Green Valley", "Skyline Towers", "Blue Ridge", "Cyber Towers"] },
  { key: "performance", label: "Performance",     options: ["All", "High", "Medium", "Low", "Very High"] },
];

function FilterChip({ config, value, onChange }) {
  return (
    <div className="relative inline-block">
      <select
        value={value}
        onChange={e => onChange(e.target.value)}
        className="appearance-none border border-gray-200 rounded-[8px] pl-3 pr-7 py-[7px] text-[13px] bg-white cursor-pointer outline-none hover:border-gray-300 transition-colors"
        style={{ color: value === "All" ? "#9ca3af" : "#111827" }}
      >
        {config.options.map(opt => (
          <option key={opt} value={opt}>
            {value === "All" || opt !== "All"
              ? `${config.label}: ${opt}`
              : config.label}
          </option>
        ))}
      </select>
      <ChevronDown size={12} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
    </div>
  );
}

export default function TerritoryFilters({ filters, onChange, onClear }) {
  return (
    <div className="bg-white rounded-[12px] border border-gray-100 shadow-sm overflow-hidden">

      {/* ── MOBILE: horizontal scroll row ── */}
      <div className="flex md:hidden items-center gap-0">
        {/* "Filters:" label pinned left */}
        <div className="flex items-center gap-1.5 pl-4 pr-3 py-3.5 border-r border-gray-100 shrink-0">
          <Filter size={14} className="text-violet-500 shrink-0" />
          <span className="text-[12.5px] font-bold text-gray-700 whitespace-nowrap">Filters</span>
        </div>

        {/* Scrollable chips */}
        <div
          className="flex items-center gap-2 overflow-x-auto py-3 px-3 flex-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {filterConfig.map(cfg => (
            <div key={cfg.key} className="relative shrink-0">
              <select
                value={filters[cfg.key]}
                onChange={e => onChange(cfg.key, e.target.value)}
                className="appearance-none border border-gray-200 rounded-full pl-3 pr-6 py-1.5 text-[12px] bg-white cursor-pointer outline-none whitespace-nowrap"
                style={{ color: filters[cfg.key] === "All" ? "#9ca3af" : "#5E23DC", fontWeight: filters[cfg.key] === "All" ? 400 : 600 }}
              >
                {cfg.options.map(opt => (
                  <option key={opt} value={opt}>
                    {opt === "All" ? cfg.label : `${cfg.label}: ${opt}`}
                  </option>
                ))}
              </select>
              <ChevronDown size={10} className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
            </div>
          ))}

          {/* Clear All inline at end */}
          <button
            onClick={onClear}
            className="text-[12px] font-semibold text-violet-600 whitespace-nowrap shrink-0 pl-1"
          >
            Clear All
          </button>
        </div>
      </div>

      {/* ── DESKTOP: wrapped chips ── */}
      <div className="hidden md:block px-5 py-4">
        <div className="flex items-start gap-3 flex-wrap">
          <div className="flex items-center gap-2 pt-[7px] shrink-0">
            <Filter size={15} className="text-violet-500" />
            <span className="text-[13px] font-bold text-gray-700">Filters:</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap flex-1">
            {filterConfig.map(cfg => (
              <FilterChip
                key={cfg.key}
                config={cfg}
                value={filters[cfg.key]}
                onChange={v => onChange(cfg.key, v)}
              />
            ))}
          </div>
          <button
            onClick={onClear}
            className="text-[13px] font-semibold text-violet-600 hover:text-violet-800 transition-colors whitespace-nowrap pt-[7px] ml-auto"
          >
            Clear All
          </button>
        </div>
      </div>

    </div>
  );
}