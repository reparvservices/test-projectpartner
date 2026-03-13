import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getPaginationRowModel,
  getFilteredRowModel,
  flexRender,
} from "@tanstack/react-table";
import { useMemo, useState } from "react";
import {
  ChevronUp,
  ChevronDown,
  Eye,
  Pencil,
  Trash2,
  Filter,
  Phone,
  Mail,
  FileText,
} from "lucide-react";

const GRADIENT = "linear-gradient(110.73deg, #5E23DC 0%, #7C3AED 100%)";

// ── Data ──────────────────────────────────────────────────────────────────────
const employeesData = [
  {
    id: 1,
    name: "Rahul Sharma",
    empId: "EMP-001",
    avatar: "https://i.pravatar.cc/40?img=3",
    role: "Site Engineer",
    project: "Green Valley Ph-2",
    phone: "+91 98765 43210",
    email: "rahul.s@reparv.com",
    salary: "₹45,000",
    aadhaar: "XXXX 4532",
    status: "Active",
  },
  {
    id: 2,
    name: "Priya Patel",
    empId: "EMP-004",
    avatar: "https://i.pravatar.cc/40?img=44",
    role: "Sales Manager",
    project: "City Center Mall",
    phone: "+91 98980 12345",
    email: "priya.p@reparv.com",
    salary: "₹65,000",
    aadhaar: "XXXX 8821",
    status: "Active",
  },
  {
    id: 3,
    name: "Amit Singh",
    empId: "EMP-012",
    avatar: "https://i.pravatar.cc/40?img=12",
    role: "Supervisor",
    project: "Highway Project",
    phone: "+91 76543 21098",
    email: "amit.s@reparv.com",
    salary: "₹32,000",
    aadhaar: "XXXX 1290",
    status: "On Leave",
  },
  {
    id: 4,
    name: "Sneha Gupta",
    empId: "EMP-008",
    avatar: "https://i.pravatar.cc/40?img=32",
    role: "Architect",
    project: "Design Hub",
    phone: "+91 99887 77665",
    email: "sneha.g@reparv.com",
    salary: "₹85,000",
    aadhaar: "XXXX 6743",
    status: "Active",
  },
  {
    id: 5,
    name: "Vikram Malhotra",
    empId: "EMP-015",
    avatar: "https://i.pravatar.cc/40?img=15",
    role: "Civil Engineer",
    project: "Green Valley Ph-2",
    phone: "+91 88776 65544",
    email: "vikram.m@reparv.com",
    salary: "₹55,000",
    aadhaar: "XXXX 9921",
    status: "Inactive",
  },
  {
    id: 6,
    name: "Kavitha Nair",
    empId: "EMP-019",
    avatar: "https://i.pravatar.cc/40?img=20",
    role: "HR Manager",
    project: "HQ Office",
    phone: "+91 90012 34567",
    email: "kavitha.n@reparv.com",
    salary: "₹72,000",
    aadhaar: "XXXX 3310",
    status: "Active",
  },
  {
    id: 7,
    name: "Suresh Patel",
    empId: "EMP-022",
    avatar: "https://i.pravatar.cc/40?img=22",
    role: "Finance Head",
    project: "HQ Office",
    phone: "+91 91234 56000",
    email: "suresh.p@reparv.com",
    salary: "₹90,000",
    aadhaar: "XXXX 5540",
    status: "Active",
  },
  {
    id: 8,
    name: "Priya Sharma",
    empId: "EMP-2023-045",
    avatar: "https://i.pravatar.cc/40?img=25",
    role: "Sr. Architect",
    project: "Skyline Towers",
    phone: "+91 98765...",
    email: "priya.s@reparv...",
    salary: "₹85,000",
    aadhaar: "XXXX-4589",
    status: "Active",
  },
];

// ── Status Badge ──────────────────────────────────────────────────────────────
function StatusBadge({ status }) {
  const cfg = {
    Active: { text: "text-emerald-600", bg: "bg-emerald-50" },
    Inactive: { text: "text-red-500", bg: "bg-red-50" },
    "On Leave": { text: "text-amber-600", bg: "bg-amber-50" },
  };
  const { text, bg } = cfg[status] || cfg["Active"];
  return (
    <span
      className={`inline-flex items-center text-[12px] font-semibold px-3 py-1.5 rounded-full ${bg} ${text} whitespace-nowrap`}
    >
      {status}
    </span>
  );
}

// ── Role Badge — violet pill like image ───────────────────────────────────────
function RoleBadge({ role }) {
  return (
    <span className="inline-flex text-[12px] font-semibold px-3 py-1.5 rounded-full bg-violet-100 text-violet-700 whitespace-nowrap">
      {role}
    </span>
  );
}

// ── Desktop Role Badge ─────────────────────────────────────────────────────────
function DesktopRoleBadge({ role }) {
  return (
    <span className="inline-flex text-[12px] font-medium px-3 py-1.5 rounded-[8px] bg-gray-100 text-gray-600 whitespace-nowrap leading-tight text-center">
      {role}
    </span>
  );
}

// ── Mobile Card — matches image exactly ──────────────────────────────────────
function MobileCard({ emp, onView, onEdit, onDelete }) {
  return (
    <div className="bg-white rounded-[18px] p-5 border border-gray-100 shadow-sm flex flex-col gap-4">
      {/* Row 1: Avatar + Name + ID + Status badge (top-right) */}
      <div className="flex items-start gap-3">
        <img
          src={emp.avatar}
          alt={emp.name}
          className="w-14 h-14 rounded-full object-cover shrink-0 ring-2 ring-gray-100"
        />
        <div className="flex-1 min-w-0">
          <h3 className="text-[17px] font-extrabold text-gray-900 leading-tight">
            {emp.name}
          </h3>
          <p className="text-[12px] text-gray-400 mt-0.5">{emp.empId}</p>
        </div>
        <StatusBadge status={emp.status} />
      </div>

      {/* Row 2: Role + Project — 2-col */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        <div>
          <p className="text-[11.5px] text-gray-400 font-medium mb-1.5">Role</p>
          <RoleBadge role={emp.role} />
        </div>
        <div>
          <p className="text-[11.5px] text-gray-400 font-medium mb-1.5">
            Project
          </p>
          <p className="text-[14px] font-bold text-gray-900">{emp.project}</p>
        </div>
      </div>

      {/* Row 3: Phone + Email */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        <div>
          <p className="text-[11.5px] text-gray-400 font-medium mb-1">Phone</p>
          <p className="flex items-center gap-1.5 text-[13.5px] font-semibold text-gray-900">
            <Phone size={13} className="text-gray-400 shrink-0" />
            {emp.phone}
          </p>
        </div>
        <div>
          <p className="text-[11.5px] text-gray-400 font-medium mb-1">Email</p>
          <p className="text-[13.5px] font-semibold text-gray-900 truncate">
            {emp.email}
          </p>
        </div>
      </div>

      {/* Row 4: Salary + Aadhaar */}
      <div className="grid grid-cols-2 gap-x-4 gap-y-3">
        <div>
          <p className="text-[11.5px] text-gray-400 font-medium mb-1">Salary</p>
          <p className="text-[15px] font-extrabold text-gray-900">
            {emp.salary}
          </p>
        </div>
        <div>
          <p className="text-[11.5px] text-gray-400 font-medium mb-1">
            Aadhaar
          </p>
          <p className="flex items-center gap-1.5 text-[13.5px] font-semibold text-gray-900">
            <FileText size={13} className="text-gray-400 shrink-0" />
            {emp.aadhaar}
          </p>
        </div>
      </div>

      {/* Row 5: Action icon buttons aligned right */}
      <div className="flex items-center justify-end gap-2 pt-1">
        <button
          onClick={() => onView(emp)}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-50 hover:bg-violet-50 transition-colors"
        >
          <Eye size={17} className="text-gray-400 hover:text-violet-600" />
        </button>
        <button
          onClick={() => onEdit(emp)}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-gray-50 hover:bg-violet-50 transition-colors"
        >
          <Pencil size={17} className="text-gray-400 hover:text-violet-600" />
        </button>
        <button
          onClick={() => onDelete(emp)}
          className="w-11 h-11 flex items-center justify-center rounded-full bg-red-50 hover:bg-red-100 transition-colors"
        >
          <Trash2 size={17} className="text-red-400" />
        </button>
      </div>
    </div>
  );
}

// ── Tabs ──────────────────────────────────────────────────────────────────────
const TABS = [
  { key: "directory", label: "Directory" },
  { key: "departments", label: "Departments" },
  { key: "roles", label: "Roles" },
];

// ── Main Component ────────────────────────────────────────────────────────────
export default function EmployeeTable({
  globalFilter,
  activeTab,
  onTabChange,
}) {
  const [sorting, setSorting] = useState([]);
  const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 5 });
  const [showDeleteModal, setShowDeleteModal] = useState(null);
  const [mobileCount, setMobileCount] = useState(5);

  const handleView = (emp) => alert(`Viewing: ${emp.name}`);
  const handleEdit = (emp) => alert(`Editing: ${emp.name}`);
  const handleDelete = (emp) => setShowDeleteModal(emp);
  const confirmDelete = () => {
    alert(`Deleted: ${showDeleteModal?.name}`);
    setShowDeleteModal(null);
  };

  const columns = useMemo(
    () => [
      {
        accessorKey: "name",
        header: "EMPLOYEE NAME",
        cell: ({ row: r }) => (
          <div className="flex items-center gap-3 min-w-[160px]">
            <img
              src={r.original.avatar}
              alt={r.original.name}
              className="w-10 h-10 rounded-full object-cover shrink-0"
            />
            <div>
              <p className="text-[13.5px] font-extrabold text-gray-900 leading-tight">
                {r.original.name}
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5">
                {r.original.empId}
              </p>
            </div>
          </div>
        ),
      },
      {
        accessorKey: "role",
        header: "ROLE",
        cell: ({ getValue }) => <DesktopRoleBadge role={getValue()} />,
      },
      {
        accessorKey: "project",
        header: "PROJECT ASSIGNED",
        cell: ({ getValue }) => (
          <span className="text-[13px] text-gray-700">{getValue()}</span>
        ),
      },
      {
        accessorKey: "phone",
        header: "CONTACT",
        cell: ({ row: r }) => (
          <div>
            <p className="text-[13px] text-gray-700 whitespace-nowrap">
              {r.original.phone}
            </p>
            <p className="text-[11.5px] text-gray-400 mt-0.5">
              {r.original.email}
            </p>
          </div>
        ),
      },
      {
        accessorKey: "salary",
        header: "SALARY",
        cell: ({ getValue }) => (
          <span className="text-[13.5px] font-extrabold text-gray-900 whitespace-nowrap">
            {getValue()}
          </span>
        ),
      },
      {
        accessorKey: "aadhaar",
        header: "AADHAAR",
        cell: ({ getValue }) => (
          <span className="inline-flex text-[12px] font-mono font-semibold bg-gray-100 text-gray-600 px-2.5 py-1 rounded-[6px] whitespace-nowrap">
            {getValue()}
          </span>
        ),
      },
      {
        accessorKey: "status",
        header: "STATUS",
        cell: ({ getValue }) => <StatusBadge status={getValue()} />,
      },
      {
        id: "actions",
        header: "ACTIONS",
        enableSorting: false,
        cell: ({ row: r }) => (
          <div className="flex items-center gap-3">
            <button
              onClick={() => handleView(r.original)}
              className="p-1.5 text-gray-400 hover:text-violet-600 transition-colors"
            >
              <Eye size={16} />
            </button>
            <button
              onClick={() => handleEdit(r.original)}
              className="p-1.5 text-gray-400 hover:text-violet-600 transition-colors"
            >
              <Pencil size={16} />
            </button>
            <button
              onClick={() => handleDelete(r.original)}
              className="p-1.5 text-gray-400 hover:text-red-500 transition-colors"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ),
      },
    ],
    [],
  );

  const table = useReactTable({
    data: employeesData,
    columns,
    state: { sorting, pagination, globalFilter },
    onSortingChange: setSorting,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
  });

  const total = table.getFilteredRowModel().rows.length;
  const start = pagination.pageIndex * pagination.pageSize + 1;
  const end = Math.min(start + pagination.pageSize - 1, total);
  const mobileRows = employeesData.slice(0, mobileCount);
  const hasMore = mobileCount < employeesData.length;

  return (
    <>
      <div className="bg-white rounded-[14px] border border-gray-100 shadow-sm overflow-hidden">
        {/* ── Tabs ── */}
        <div className="flex items-center justify-between px-5 border-b border-gray-100">
          <div className="flex items-center gap-1">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => onTabChange(tab.key)}
                className={`px-5 py-4 text-[14px] font-semibold transition-colors relative whitespace-nowrap ${
                  activeTab === tab.key
                    ? "text-violet-600"
                    : "text-gray-400 hover:text-gray-700"
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-violet-600 rounded-t-full" />
                )}
              </button>
            ))}
          </div>
          <button className="hidden md:flex items-center gap-1.5 border border-gray-200 rounded-[8px] px-3.5 py-2 text-[13px] text-gray-600 font-medium hover:bg-gray-50 transition-colors">
            <Filter size={13} className="text-gray-500" /> Filter
          </button>
        </div>

        {/* ── MOBILE: Cards ── */}
        <div className="flex flex-col gap-3 p-4 md:hidden">
          {mobileRows.map((emp) => (
            <MobileCard
              key={emp.id}
              emp={emp}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          ))}
        </div>

        {/* ── DESKTOP: Table ── */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="bg-gray-50/70 border-b border-gray-100">
                {table.getHeaderGroups().map((hg) =>
                  hg.headers.map((header) => (
                    <th
                      key={header.id}
                      onClick={
                        header.column.getCanSort()
                          ? header.column.getToggleSortingHandler()
                          : undefined
                      }
                      className={`px-5 py-3.5 text-left text-[10.5px] font-bold text-gray-400 tracking-widest uppercase whitespace-nowrap select-none ${
                        header.column.getCanSort()
                          ? "cursor-pointer hover:text-gray-600 transition-colors"
                          : ""
                      }`}
                    >
                      <div className="flex items-center gap-1">
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                        {header.column.getCanSort() && (
                          <span className="flex flex-col ml-0.5 opacity-40">
                            <ChevronUp
                              size={8}
                              className={
                                header.column.getIsSorted() === "asc"
                                  ? "opacity-100 text-violet-600"
                                  : ""
                              }
                            />
                            <ChevronDown
                              size={8}
                              className={
                                header.column.getIsSorted() === "desc"
                                  ? "opacity-100 text-violet-600"
                                  : ""
                              }
                            />
                          </span>
                        )}
                      </div>
                    </th>
                  )),
                )}
              </tr>
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  className={`border-b border-gray-50 last:border-0 transition-colors hover:bg-gray-50/40 ${
                    row.original.status === "On Leave"
                      ? "bg-violet-50/20"
                      : "bg-white"
                  }`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-5 py-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ── MOBILE: Load More ── */}
      {hasMore && (
        <div className="flex md:hidden justify-center py-4">
          <button
            onClick={() => setMobileCount((c) => c + 5)}
            className="w-full text-[13.5px] text-gray-400 font-medium hover:text-gray-600 px-6 py-3 border rounded-xl transition-colors"
          >
            Load More Employees
          </button>
        </div>
      )}

      {/* ── DESKTOP: Pagination ── */}
      <div className="hidden md:flex items-center justify-between gap-4 flex-wrap py-2">
        <p className="text-[13px] text-gray-400">
          Showing {start}–{end} of 4,285 partners
        </p>
        <div className="flex items-center gap-2">
          <button
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
            className="px-5 py-2 text-[13px] font-semibold text-gray-700 border border-gray-200 rounded-[8px] bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Previous
          </button>
          <button
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
            className="px-5 py-2 text-[13px] font-semibold text-gray-700 border border-gray-200 rounded-[8px] bg-white hover:bg-gray-50 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>

      {/* ── Delete Confirm Modal ── */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4">
          <div className="bg-white rounded-[16px] p-6 max-w-sm w-full shadow-2xl">
            <h3 className="text-[17px] font-extrabold text-gray-900 mb-2">
              Delete Employee?
            </h3>
            <p className="text-[13.5px] text-gray-500 mb-6">
              Are you sure you want to delete{" "}
              <span className="font-bold text-gray-800">
                {showDeleteModal.name}
              </span>
              ? This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteModal(null)}
                className="flex-1 py-2.5 rounded-[8px] border border-gray-200 text-[13.5px] font-semibold text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="flex-1 py-2.5 rounded-[8px] text-[13.5px] font-bold text-white bg-red-500 hover:bg-red-600 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
