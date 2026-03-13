import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import { ChevronUp, ChevronDown, Phone, MessageSquare, BarChart2, MapPin } from "lucide-react";

const GRADIENT = "linear-gradient(110.73deg, #5E23DC 0%, #7C3AED 100%)";

// ── Data ──────────────────────────────────────────────────────────────────────
const partnersData = [
  {
    id: 1,
    name: "Vikram Mehta",
    email: "vikram.m@gmail.com",
    avatar: "https://i.pravatar.cc/40?img=11",
    followupStatus: "Proposal Sent",
    assignedProjects: ["Skyline Towers", "Sobha City", "+2"],
    phone: "+91 98765 43210",
    location: "Mumbai, MH",
    paymentStatus: "Paid",
    totalEarnings: "₹1,25,000",
    highlight: false,
  },
  {
    id: 2,
    name: "Priya Singh",
    email: "priya.realty@gmail.com",
    avatar: "https://i.pravatar.cc/40?img=5",
    followupStatus: "Follow Up",
    assignedProjects: ["Green Valley"],
    phone: "+91 99887 76655",
    location: "Bangalore, KA",
    paymentStatus: "Pending",
    totalEarnings: "₹45,000",
    highlight: false,
  },
  {
    id: 3,
    name: "Rahul Kapoor",
    email: "rahul.k@properties.com",
    avatar: "https://i.pravatar.cc/40?img=12",
    followupStatus: "Closed",
    assignedProjects: ["Lakeside View"],
    phone: "+91 91234 56789",
    location: "Delhi, NCR",
    paymentStatus: "Paid",
    totalEarnings: "₹3,40,500",
    highlight: true,
  },
  {
    id: 4,
    name: "Anjali Desai",
    email: "anjali.d@gmail.com",
    avatar: "https://i.pravatar.cc/40?img=9",
    followupStatus: "Negotiation",
    assignedProjects: ["Grand Arch"],
    phone: "+91 98700 11223",
    location: "Pune, MH",
    paymentStatus: "Unbilled",
    totalEarnings: "₹0",
    highlight: false,
  },
  {
    id: 5,
    name: "Karan Malhotra",
    email: "karan.m@housing.com",
    avatar: "https://i.pravatar.cc/40?img=15",
    followupStatus: "Interested",
    assignedProjects: ["Urban Heights", "+3"],
    phone: "+91 95544 33221",
    location: "Hyderabad, TG",
    paymentStatus: "Paid",
    totalEarnings: "₹88,200",
    highlight: false,
  },
];

// ── Badges ────────────────────────────────────────────────────────────────────
function FollowupBadge({ status }) {
  const styles = {
    "Proposal Sent": "bg-violet-50 text-violet-600 border-violet-100",
    "Follow Up":     "bg-teal-50 text-teal-600 border-teal-100",
    "Closed":        "bg-gray-100 text-gray-500 border-gray-200",
    "Negotiation":   "bg-orange-50 text-orange-600 border-orange-100",
    "Interested":    "bg-blue-50 text-blue-600 border-blue-100",
    "New":           "bg-gray-100 text-gray-500 border-gray-200",
    "Active":        "bg-teal-50 text-teal-600 border-teal-100",
  };
  return (
    <span className={`inline-flex items-center text-[11px] font-bold px-2.5 py-1 rounded-[6px] border tracking-wide uppercase whitespace-nowrap ${styles[status] || "bg-gray-100 text-gray-600 border-gray-200"}`}>
      {status}
    </span>
  );
}

function PaymentBadge({ status }) {
  const styles = {
    "Paid":     "bg-emerald-100 text-emerald-600",
    "Pending":  "bg-amber-100 text-amber-600",
    "Unbilled": "bg-gray-100 text-gray-400",
  };
  return (
    <span className={`inline-flex items-center text-[11px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wide whitespace-nowrap ${styles[status] || "bg-gray-100 text-gray-500"}`}>
      {status}
    </span>
  );
}

function ProjectTags({ projects }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      {projects.map((p, i) => (
        <span
          key={i}
          className={`text-[12px] font-semibold px-3 py-1 rounded-[6px] border whitespace-nowrap ${
            p.startsWith("+")
              ? "bg-violet-50 text-violet-500 border-violet-100"
              : "bg-white text-gray-700 border-gray-200"
          }`}
        >
          {p}
        </span>
      ))}
    </div>
  );
}

// ── Mobile Card ───────────────────────────────────────────────────────────────
function PartnerMobileCard({ partner }) {
  return (
    <div className="bg-white rounded-[16px] p-4 flex flex-col gap-4 shadow-sm border border-gray-100">

      {/* Row 1: Avatar + Name + Badge */}
      <div className="flex items-start gap-3">
        <img
          src={partner.avatar}
          alt={partner.name}
          className="w-14 h-14 rounded-full object-cover shrink-0"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-[16px] font-bold text-gray-900 leading-tight">{partner.name}</h3>
            <FollowupBadge status={partner.followupStatus} />
          </div>
          <p className="text-[12.5px] text-gray-400 mt-1">{partner.email}</p>
        </div>
      </div>

      {/* Row 2: Phone + Location */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-1.5 text-[13px] text-gray-500">
          <Phone size={13} className="text-gray-400 shrink-0" />
          {partner.phone}
        </div>
        <div className="flex items-center gap-1.5 text-[13px] text-gray-500">
          <MapPin size={13} className="text-gray-400 shrink-0" />
          {partner.location.split(",")[0]}
        </div>
      </div>

      {/* Row 3: Project Tags */}
      <ProjectTags projects={partner.assignedProjects} />

      {/* Row 4: Payment Status + Earnings */}
      <div className="flex items-center justify-between bg-gray-50 rounded-[10px] px-4 py-3">
        <PaymentBadge status={partner.paymentStatus} />
        <div className="text-right">
          <p className="text-[11px] text-gray-400 font-medium">Total Earnings</p>
          <p className="text-[16px] font-extrabold text-gray-900 leading-tight">{partner.totalEarnings}</p>
        </div>
      </div>

      {/* Row 5: Actions */}
      <div className="flex items-center gap-2">
        <button
          className="flex-1 py-3 rounded-[10px] text-[14px] font-bold text-white hover:opacity-90 transition-opacity"
          style={{ background: GRADIENT }}
        >
          View Details
        </button>
        {[Phone, MessageSquare, BarChart2].map((Icon, i) => (
          <button
            key={i}
            className="w-12 h-12 flex items-center justify-center rounded-[10px] border border-gray-200 bg-white hover:bg-gray-50 transition-colors"
          >
            <Icon size={17} className="text-gray-500" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Desktop Table ─────────────────────────────────────────────────────────────
export default function PartnersTable() {
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });

  const columns = useMemo(() => [
    {
      accessorKey: "name",
      header: "PARTNER NAME",
      cell: ({ row }) => (
        <div className="flex items-center gap-3 min-w-[180px]">
          <img src={row.original.avatar} alt={row.original.name} className="w-9 h-9 rounded-full object-cover shrink-0" />
          <div>
            <p className="text-[13.5px] font-semibold text-gray-900 leading-tight">{row.original.name}</p>
            <p className="text-[11.5px] text-gray-400 mt-0.5">{row.original.email}</p>
          </div>
        </div>
      ),
    },
    {
      accessorKey: "followupStatus",
      header: "FOLLOWUP STATUS",
      cell: ({ getValue }) => <FollowupBadge status={getValue()} />,
    },
    {
      accessorKey: "assignedProjects",
      header: "ASSIGNED PROJECTS",
      cell: ({ getValue }) => <ProjectTags projects={getValue()} />,
      enableSorting: false,
    },
    {
      accessorKey: "phone",
      header: "PHONE NUMBER",
      cell: ({ getValue }) => <span className="text-[13px] text-gray-700 whitespace-nowrap">{getValue()}</span>,
    },
    {
      accessorKey: "location",
      header: "LOCATION",
      cell: ({ getValue }) => <span className="text-[13px] text-gray-700 whitespace-nowrap">{getValue()}</span>,
    },
    {
      accessorKey: "paymentStatus",
      header: "PAYMENT STATUS",
      cell: ({ getValue }) => <PaymentBadge status={getValue()} />,
    },
    {
      accessorKey: "totalEarnings",
      header: "TOTAL EARNINGS",
      cell: ({ getValue }) => <span className="text-[13.5px] font-bold text-gray-900 whitespace-nowrap">{getValue()}</span>,
    },
  ], []);

  const table = useReactTable({
    data: partnersData,
    columns,
    state: { sorting, pagination },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: false,
  });

  const totalRows = partnersData.length;
  const start = pagination.pageIndex * pagination.pageSize + 1;
  const end = Math.min(start + pagination.pageSize - 1, totalRows);

  return (
    <div className="flex flex-col gap-4">

      {/* ── MOBILE: Cards ── */}
      <div className="flex flex-col gap-3 md:hidden">
        {partnersData
          .slice(pagination.pageIndex * pagination.pageSize, (pagination.pageIndex + 1) * pagination.pageSize)
          .map(partner => (
            <PartnerMobileCard key={partner.id} partner={partner} />
          ))}
      </div>

      {/* ── DESKTOP: Table ── */}
      <div className="hidden md:block bg-white rounded-[10px] border border-gray-100 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[860px]">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                {table.getHeaderGroups().map(hg =>
                  hg.headers.map(header => (
                    <th
                      key={header.id}
                      onClick={header.column.getCanSort() ? header.column.getToggleSortingHandler() : undefined}
                      className={`px-5 py-3.5 text-left text-[11px] font-bold text-gray-400 tracking-widest uppercase whitespace-nowrap select-none ${
                        header.column.getCanSort() ? "cursor-pointer hover:text-gray-600 transition-colors" : ""
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                        {header.column.getCanSort() && (
                          <span className="flex flex-col ml-0.5 opacity-40">
                            <ChevronUp size={9} className={header.column.getIsSorted() === "asc" ? "opacity-100 text-violet-600" : ""} />
                            <ChevronDown size={9} className={header.column.getIsSorted() === "desc" ? "opacity-100 text-violet-600" : ""} />
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
                  className={`border-b border-gray-50 last:border-0 transition-colors hover:bg-gray-50/60 ${
                    row.original.highlight ? "bg-violet-50/40" : "bg-white"
                  }`}
                >
                  {row.getVisibleCells().map(cell => (
                    <td key={cell.id} className="px-5 py-4">
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
          Showing {start}–{end} of {totalRows} partners
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-4 py-2 text-[13px] font-semibold text-gray-700 border border-gray-200 rounded-[7px] bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-4 py-2 text-[13px] font-semibold text-gray-700 border border-gray-200 rounded-[7px] bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}