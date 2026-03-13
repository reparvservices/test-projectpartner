import {
  useReactTable, getCoreRowModel, getSortedRowModel,
  getPaginationRowModel, getFilteredRowModel, flexRender,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import {
  ChevronUp, ChevronDown, Phone, BarChart2, MapPin,
  Briefcase, Clock, AlertTriangle, CheckCircle2, Zap,
} from "lucide-react";

const GRADIENT = "linear-gradient(110.73deg, #5E23DC 0%, #7C3AED 100%)";

// ── Data ──────────────────────────────────────────────────────────────────────
export const partnersData = [
  { id: 1, name: "Rohan Mehta",  idCode: "TP-4401", avatar: "https://i.pravatar.cc/40?img=3",  territory: "North Mumbai", projects: ["Green Valley", "Skyline Towers", "+3 more"], phone: "+91 98765 43210", state: "Maharashtra", city: "Andheri West, MH", followup: "Pending",   performance: "High"      },
  { id: 2, name: "Anjali Desai", idCode: "TP-4408", avatar: "https://i.pravatar.cc/40?img=9",  territory: "Pune West",    projects: ["Skyline Towers"],                            phone: "+91 99887 66554", state: "Maharashtra", city: "Pune, MH",         followup: "None",      performance: "Medium"    },
  { id: 3, name: "Rajesh Kumar", idCode: "TP-3321", avatar: "https://i.pravatar.cc/40?img=6",  territory: "Navi Mumbai",  projects: ["Blue Ridge", "+1 more"],                    phone: "+91 88776 65544", state: "Maharashtra", city: "Mumbai, MH",       followup: "Overdue",   performance: "Low"       },
  { id: 4, name: "Meera Reddy",  idCode: "TP-5566", avatar: "https://i.pravatar.cc/40?img=10", territory: "Hitech City",  projects: ["Cyber Towers"],                             phone: "+91 77665 54433", state: "Telangana",   city: "Hyderabad, TG",    followup: "Scheduled", performance: "Very High" },
  { id: 5, name: "Arjun Kapoor", idCode: "TP-4412", avatar: "https://i.pravatar.cc/40?img=15", territory: "South Delhi",  projects: ["Not Assigned"],                             phone: "+91 99001 12233", state: "Delhi",       city: "New Delhi, DL",    followup: "Scheduled", performance: "New"       },
  { id: 6, name: "Kavitha Nair", idCode: "TP-5010", avatar: "https://i.pravatar.cc/40?img=20", territory: "Whitefield",   projects: ["Prestige Heights", "Eco Park", "+2 more"],  phone: "+91 90012 34567", state: "Karnataka",   city: "Bangalore, KA",    followup: "Pending",   performance: "High"      },
  { id: 7, name: "Suresh Patel", idCode: "TP-4219", avatar: "https://i.pravatar.cc/40?img=22", territory: "Juhu",         projects: ["Grand Arch"],                               phone: "+91 91234 56000", state: "Maharashtra", city: "Mumbai, MH",       followup: "Completed", performance: "Medium"    },
  { id: 8, name: "Divya Sharma", idCode: "TP-4990", avatar: "https://i.pravatar.cc/40?img=25", territory: "Gurgaon Sec",  projects: ["Urban Heights", "+1 more"],                 phone: "+91 98887 11223", state: "Haryana",     city: "Gurgaon, HR",      followup: "Overdue",   performance: "Low"       },
];

// ── Desktop Table Badges ──────────────────────────────────────────────────────
function TerritoryBadge({ value }) {
  return (
    <span className="inline-flex items-center text-[12px] font-semibold px-3 py-1.5 rounded-full bg-violet-100 text-violet-600 whitespace-nowrap leading-tight">
      {value}
    </span>
  );
}

function DesktopProjectTags({ projects }) {
  if (projects[0] === "Not Assigned")
    return <span className="text-[12.5px] text-gray-400 italic">Not Assigned</span>;
  return (
    <div className="flex items-center gap-1.5 flex-wrap">
      {projects.map((p, i) => (
        <span key={i} className={`text-[12px] font-medium px-2.5 py-1 rounded-[6px] whitespace-nowrap ${
          p.includes("more") || p.startsWith("+") ? "bg-gray-100 text-gray-500" : "bg-gray-100 text-gray-600"
        }`}>{p}</span>
      ))}
    </div>
  );
}

function FollowupBadge({ status }) {
  const s = { "Pending": "bg-amber-50 text-amber-600", "Overdue": "bg-red-50 text-red-500", "Completed": "bg-emerald-50 text-emerald-600", "Scheduled": "bg-orange-50 text-orange-500", "None": "bg-gray-100 text-gray-400" };
  return <span className={`inline-flex text-[11.5px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${s[status] || "bg-gray-100 text-gray-400"}`}>{status}</span>;
}

function PerformanceBadge({ status }) {
  const s = { "Very High": "bg-emerald-50 text-emerald-600", "High": "bg-green-50 text-green-600", "Medium": "bg-amber-50 text-amber-600", "Low": "bg-red-50 text-red-400", "New": "bg-gray-100 text-gray-400" };
  return <span className={`inline-flex text-[11.5px] font-semibold px-2.5 py-1 rounded-full whitespace-nowrap ${s[status] || "bg-gray-100 text-gray-400"}`}>{status}</span>;
}

// ── Mobile-only Status Badges (icons + labels matching images) ────────────────
function MobileFollowupBadge({ status }) {
  const cfg = {
    "Pending":   { bg: "bg-amber-50",   border: "border-amber-100",   text: "text-amber-500",   Icon: Clock,         label: "Pending Followup" },
    "Overdue":   { bg: "bg-red-50",     border: "border-red-100",     text: "text-red-500",     Icon: AlertTriangle, label: "Overdue"          },
    "Completed": { bg: "bg-emerald-50", border: "border-emerald-100", text: "text-emerald-600", Icon: CheckCircle2,  label: "Scheduled"        },
    "Scheduled": { bg: "bg-emerald-50", border: "border-emerald-100", text: "text-emerald-600", Icon: CheckCircle2,  label: "Scheduled"        },
    "None":      { bg: "bg-gray-50",    border: "border-gray-200",    text: "text-gray-400",    Icon: null,          label: "None"             },
  };
  const { bg, border, text, Icon: Ico, label } = cfg[status] || cfg["None"];
  return (
    <span className={`inline-flex items-center gap-1.5 text-[13px] font-semibold px-3.5 py-2 rounded-[10px] border whitespace-nowrap ${bg} ${border} ${text}`}>
      {Ico && <Ico size={13} />}
      {label}
    </span>
  );
}

function MobilePerformanceBadge({ status }) {
  const cfg = {
    "Very High": { bg: "bg-violet-50", border: "border-violet-100", text: "text-violet-600" },
    "High":      { bg: "bg-violet-50", border: "border-violet-100", text: "text-violet-600" },
    "Medium":    { bg: "bg-gray-100",  border: "border-gray-200",   text: "text-gray-600"   },
    "Low":       { bg: "bg-red-50",    border: "border-red-100",    text: "text-red-500"    },
    "New":       { bg: "bg-gray-100",  border: "border-gray-200",   text: "text-gray-400"   },
  };
  const { bg, border, text } = cfg[status] || cfg["New"];
  return (
    <span className={`inline-flex items-center gap-1.5 text-[13px] font-semibold px-3.5 py-2 rounded-[10px] border whitespace-nowrap ${bg} ${border} ${text}`}>
      <Zap size={13} />
      {status} Perf
    </span>
  );
}

// ── Mobile Card ───────────────────────────────────────────────────────────────
function MobileCard({ p }) {
  return (
    <div className="bg-white border rounded-[20px] p-5 flex flex-col gap-4 shadow-sm">

      {/* Row 1: Avatar + Name + ID + Territory (top-right) */}
      <div className="flex items-start gap-3">
        <img
          src={p.avatar}
          alt={p.name}
          className="w-[60px] h-[60px] rounded-full object-cover shrink-0"
        />
        <div className="flex-1 min-w-0 flex items-start justify-between gap-2">
          <div>
            <h3 className="text-[18px] font-extrabold text-gray-900 leading-tight">{p.name}</h3>
            <span className="inline-block mt-1.5 bg-violet-50 text-violet-500 text-[11.5px] font-semibold px-2.5 py-0.5 rounded-[5px]">
              ID: {p.idCode}
            </span>
          </div>
          <span className="flex items-center gap-1.5 bg-violet-50 text-violet-600 text-[12.5px] font-semibold px-3 py-1.5 rounded-[10px] whitespace-nowrap shrink-0">
            <MapPin size={12} />
            {p.territory}
          </span>
        </div>
      </div>

      {/* Row 2: Project Tags */}
      {p.projects[0] === "Not Assigned" ? (
        <p className="text-[13px] text-gray-400 italic">Not Assigned</p>
      ) : (
        <div className="flex items-center gap-2 flex-wrap">
          {p.projects.map((proj, i) => (
            <span
              key={i}
              className={`text-[13px] font-semibold px-3.5 py-1.5 rounded-[8px] border whitespace-nowrap ${
                proj.includes("more") || proj.startsWith("+")
                  ? "bg-white border-gray-200 text-gray-500"
                  : "bg-violet-50 border-violet-100 text-violet-600"
              }`}
            >
              {proj}
            </span>
          ))}
        </div>
      )}

      {/* Row 3: Mobile + Location labels */}
      <div className="grid grid-cols-2 gap-x-4">
        <div>
          <p className="text-[12px] text-gray-400 font-medium mb-0.5">Mobile</p>
          <p className="text-[15px] font-bold text-gray-900">{p.phone}</p>
        </div>
        <div>
          <p className="text-[12px] text-gray-400 font-medium mb-0.5">Location</p>
          <p className="text-[15px] font-bold text-gray-900">{p.city}</p>
        </div>
      </div>

      {/* Row 4: Followup + Performance status */}
      <div className="flex items-center gap-2.5 flex-wrap">
        <MobileFollowupBadge status={p.followup} />
        <MobilePerformanceBadge status={p.performance} />
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100" />

      {/* Row 5: View Profile + icon buttons */}
      <div className="flex items-center gap-2.5">
        <button
          className="flex-1 py-3.5 rounded-[12px] text-[15px] font-bold text-white text-center hover:opacity-90 transition-opacity"
          style={{ background: GRADIENT }}
        >
          View Profile
        </button>
        {[Phone, BarChart2, Briefcase].map((Icon, i) => (
          <button
            key={i}
            className="w-[52px] h-[52px] flex items-center justify-center rounded-[12px] border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
          >
            <Icon size={18} className="text-gray-500" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function TerritoryTable({ globalFilter }) {
  const [sorting, setSorting] = useState([]);
  const [rowSelection, setRowSelection] = useState({});
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

  const columns = useMemo(() => [
    {
      id: "select",
      header: ({ table }) => (
        <input type="checkbox" checked={table.getIsAllPageRowsSelected()} onChange={table.getToggleAllPageRowsSelectedHandler()} className="w-4 h-4 accent-violet-600 cursor-pointer" />
      ),
      cell: ({ row }) => (
        <input type="checkbox" checked={row.getIsSelected()} onChange={row.getToggleSelectedHandler()} className="w-4 h-4 accent-violet-600 cursor-pointer" />
      ),
      enableSorting: false,
    },
    {
      accessorKey: "name",
      header: "PARTNER NAME",
      cell: ({ row: r }) => (
        <div className="flex items-center gap-3 min-w-[170px]">
          <img src={r.original.avatar} alt={r.original.name} className="w-10 h-10 rounded-full object-cover shrink-0" />
          <div>
            <p className="text-[13.5px] font-bold text-gray-900 leading-tight">{r.original.name}</p>
            <p className="text-[11px] text-gray-400 mt-0.5">ID: {r.original.idCode}</p>
          </div>
        </div>
      ),
    },
    { accessorKey: "territory",   header: "TERRITORY",          cell: ({ getValue }) => <TerritoryBadge value={getValue()} /> },
    { accessorKey: "projects",    header: "ASSIGNED PROJECTS",  cell: ({ getValue }) => <DesktopProjectTags projects={getValue()} />, enableSorting: false },
    { accessorKey: "phone",       header: "CONTACT NUMBER",     cell: ({ getValue }) => <span className="text-[13px] text-gray-700 whitespace-nowrap">{getValue()}</span> },
    { accessorKey: "state",       header: "STATE",              cell: ({ getValue }) => <span className="text-[13px] text-gray-700 whitespace-nowrap">{getValue()}</span> },
    { accessorKey: "city",        header: "CITY",               cell: ({ getValue }) => <span className="text-[13px] text-gray-700 whitespace-nowrap">{getValue()}</span> },
    { accessorKey: "followup",    header: "FOLLOWUP",           cell: ({ getValue }) => <FollowupBadge status={getValue()} /> },
    { accessorKey: "performance", header: "PERFORMANCE",        cell: ({ getValue }) => <PerformanceBadge status={getValue()} /> },
  ], []);

  const table = useReactTable({
    data: partnersData,
    columns,
    state: { sorting, rowSelection, pagination, globalFilter },
    onSortingChange: setSorting,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
    manualPagination: false,
  });

  const total         = table.getFilteredRowModel().rows.length;
  const start         = pagination.pageIndex * pagination.pageSize + 1;
  const end           = Math.min(start + pagination.pageSize - 1, total);
  const selectedCount = Object.keys(rowSelection).length;

  return (
    <div className="flex flex-col gap-4">

      {/* ── MOBILE: Cards ── */}
      <div className="flex flex-col gap-4 md:hidden">
        {table.getRowModel().rows.map(row => (
          <MobileCard key={row.id} p={row.original} />
        ))}
      </div>

      {/* ── DESKTOP: Table ── */}
      <div className="hidden md:block bg-white rounded-[12px] border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="bg-gray-50/80 border-b border-gray-100">
                {table.getHeaderGroups().map(hg =>
                  hg.headers.map(header => (
                    <th
                      key={header.id}
                      onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                      className={`px-4 py-3.5 text-left text-[10.5px] font-bold text-gray-400 tracking-widest uppercase whitespace-nowrap select-none ${
                        header.column.getCanSort() ? "cursor-pointer hover:text-gray-600 transition-colors" : ""
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <span className="flex flex-col ml-0.5 opacity-40">
                            <ChevronUp    size={8} className={header.column.getIsSorted() === "asc"  ? "opacity-100 text-violet-600" : ""} />
                            <ChevronDown  size={8} className={header.column.getIsSorted() === "desc" ? "opacity-100 text-violet-600" : ""} />
                          </span>
                        )}
                      </div>
                    </th>
                  ))
                )}
              </tr>
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr
                  key={row.id}
                  className={`border-b border-gray-50 last:border-0 transition-colors hover:bg-gray-50/50 ${
                    row.getIsSelected() ? "bg-violet-50/30" : "bg-white"
                  }`}
                >
                  {row.getVisibleCells().map(cell => (
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

      {/* ── Pagination ── */}
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <p className="text-[13px] text-gray-400">
          Showing {start}–{end} of {total} partners
          {selectedCount > 0 && (
            <span className="ml-3 text-violet-600 font-semibold">· {selectedCount} selected</span>
          )}
        </p>
        <div className="flex items-center gap-2">
          {table.getPageCount() > 1 && Array.from({ length: table.getPageCount() }).map((_, i) => (
            <button
              key={i}
              onClick={() => table.setPageIndex(i)}
              className={`w-8 h-8 text-[13px] font-semibold rounded-[7px] transition-colors ${
                pagination.pageIndex === i ? "text-white shadow-sm" : "border border-gray-200 bg-white text-gray-600 hover:bg-gray-50"
              }`}
              style={pagination.pageIndex === i ? { background: GRADIENT } : {}}
            >
              {i + 1}
            </button>
          ))}
          <button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()} className="px-4 py-2 text-[13px] font-semibold text-gray-700 border border-gray-200 rounded-[7px] bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">Previous</button>
          <button onClick={() => table.nextPage()}     disabled={!table.getCanNextPage()}     className="px-4 py-2 text-[13px] font-semibold text-gray-700 border border-gray-200 rounded-[7px] bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">Next</button>
        </div>
      </div>
    </div>
  );
}