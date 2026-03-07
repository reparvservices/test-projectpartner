import React, { useMemo, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getPaginationRowModel,
  flexRender,
} from "@tanstack/react-table";
import {
  FiSearch,
  FiCalendar,
  FiDownload,
  FiEye,
  FiEdit,
  FiTrash2,
} from "react-icons/fi";

export const employees = [
  {
    id: "EMP-001",
    name: "Rahul Sharma",
    role: "Site Engineer",
    project: "Green Valley Ph-2",
    phone: "+91 98765 43210",
    email: "rahul.s@reparv.com",
    salary: 45000,
    aadhaar: "XXXX 4532",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "EMP-004",
    name: "Priya Patel",
    role: "Sales Manager",
    project: "City Center Mall",
    phone: "+91 98980 12345",
    email: "priya.p@reparv.com",
    salary: 65000,
    aadhaar: "XXXX 8821",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "EMP-012",
    name: "Amit Singh",
    role: "Supervisor",
    project: "Highway Project",
    phone: "+91 76543 21098",
    email: "amit.s@reparv.com",
    salary: 32000,
    aadhaar: "XXXX 1290",
    status: "On Leave",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    id: "EMP-001",
    name: "Rahul Sharma",
    role: "Site Engineer",
    project: "Green Valley Ph-2",
    phone: "+91 98765 43210",
    email: "rahul.s@reparv.com",
    salary: 45000,
    aadhaar: "XXXX 4532",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "EMP-004",
    name: "Priya Patel",
    role: "Sales Manager",
    project: "City Center Mall",
    phone: "+91 98980 12345",
    email: "priya.p@reparv.com",
    salary: 65000,
    aadhaar: "XXXX 8821",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "EMP-012",
    name: "Amit Singh",
    role: "Supervisor",
    project: "Highway Project",
    phone: "+91 76543 21098",
    email: "amit.s@reparv.com",
    salary: 32000,
    aadhaar: "XXXX 1290",
    status: "On Leave",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    id: "EMP-001",
    name: "Rahul Sharma",
    role: "Site Engineer",
    project: "Green Valley Ph-2",
    phone: "+91 98765 43210",
    email: "rahul.s@reparv.com",
    salary: 45000,
    aadhaar: "XXXX 4532",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "EMP-004",
    name: "Priya Patel",
    role: "Sales Manager",
    project: "City Center Mall",
    phone: "+91 98980 12345",
    email: "priya.p@reparv.com",
    salary: 65000,
    aadhaar: "XXXX 8821",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "EMP-012",
    name: "Amit Singh",
    role: "Supervisor",
    project: "Highway Project",
    phone: "+91 76543 21098",
    email: "amit.s@reparv.com",
    salary: 32000,
    aadhaar: "XXXX 1290",
    status: "On Leave",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
  },
  {
    id: "EMP-001",
    name: "Rahul Sharma",
    role: "Site Engineer",
    project: "Green Valley Ph-2",
    phone: "+91 98765 43210",
    email: "rahul.s@reparv.com",
    salary: 45000,
    aadhaar: "XXXX 4532",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: "EMP-004",
    name: "Priya Patel",
    role: "Sales Manager",
    project: "City Center Mall",
    phone: "+91 98980 12345",
    email: "priya.p@reparv.com",
    salary: 65000,
    aadhaar: "XXXX 8821",
    status: "Active",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: "EMP-012",
    name: "Amit Singh",
    role: "Supervisor",
    project: "Highway Project",
    phone: "+91 76543 21098",
    email: "amit.s@reparv.com",
    salary: 32000,
    aadhaar: "XXXX 1290",
    status: "On Leave",
    avatar: "https://randomuser.me/api/portraits/men/76.jpg",
  },
];


export default function Employees() {
  const [data] = useState(employees);
  const [activeTab, setActiveTab] = useState("directory");

  const columns = useMemo(
    () => [
      {
        header: "EMPLOYEE NAME",
        accessorKey: "name",
        cell: ({ row }) => (
          <div className="flex items-center gap-3">
            <img
              src={row.original.avatar}
              className="w-11 h-11 rounded-full object-cover"
              alt=""
            />
            <div>
              <p className="font-semibold">{row.original.name}</p>
              <p className="text-xs text-gray-500">{row.original.id}</p>
            </div>
          </div>
        ),
      },
      {
        header: "ROLE",
        accessorKey: "role",
      },
      { header: "PROJECT", accessorKey: "project" },
      { header: "CONTACT", accessorKey: "phone" },
      {
        header: "SALARY",
        accessorKey: "salary",
        cell: (info) => (
          <span className="font-semibold">
            ₹ {info.getValue().toLocaleString()}
          </span>
        ),
      },
      { header: "AADHAAR", accessorKey: "aadhaar" },
      { header: "STATUS", accessorKey: "status" },
      {
        header: "ACTIONS",
        cell: () => (
          <div className="flex gap-3 text-gray-500">
            <FiEye className="cursor-pointer hover:text-purple-600" />
            <FiEdit className="cursor-pointer hover:text-blue-600" />
            <FiTrash2 className="cursor-pointer hover:text-red-600" />
          </div>
        ),
      },
    ],
    []
  );

  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: { pageSize: 5 },
    },
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const paginatedRows = table.getRowModel().rows;

  return (
    <div className="bg-[#F7F5FF] min-h-screen p-4 md:p-6">

      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-6 gap-4">
        <div>
          <h1 className="text-2xl font-bold">Employees</h1>
          <p className="text-gray-500 text-sm">Dashboard / Employees</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <div className="flex items-center border bg-white rounded-xl px-4 py-2 w-full md:w-[260px]">
            <FiSearch className="text-gray-400 mr-2" />
            <input
              placeholder="Search anything..."
              className="outline-none text-sm w-full"
            />
          </div>

          <button className="border bg-white px-4 py-2 rounded-xl text-sm flex items-center gap-2">
            <FiCalendar /> Oct 2023
          </button>

          <button className="border bg-white px-4 py-2 rounded-xl text-sm flex items-center gap-2">
            <FiDownload /> Export
          </button>

          <button className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white px-5 py-2 rounded-xl shadow">
            + Add Employee
          </button>
        </div>
      </div>

      {/* STATS CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {[
          { title: "Total Employees", value: "124", sub: "+12% this month" },
          { title: "Active Employees", value: "112", sub: "Currently working" },
          { title: "Site Engineers", value: "45", sub: "Across 12 sites" },
          { title: "Monthly Salary", value: "₹ 48.5 L", sub: "Last processed Oct 01" },
        ].map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl shadow-sm border">
            <p className="text-gray-500 text-sm">{card.title}</p>
            <h2 className="text-2xl font-bold mt-2">{card.value}</h2>
            <p className="text-sm text-green-600 mt-1">{card.sub}</p>
          </div>
        ))}
      </div>

      {/* TABLE CARD */}
      <div className="bg-white rounded-2xl shadow-sm border overflow-hidden">

        {/* TABS */}
        <div className="flex justify-between items-center px-6 pt-6 border-b">
          <div className="flex gap-8">
            {["directory", "departments", "roles"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-medium capitalize ${
                  activeTab === tab
                    ? "text-purple-600 border-b-2 border-purple-600"
                    : "text-gray-500"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <button className="border px-4 py-2 rounded-lg text-sm">
            Filter
          </button>
        </div>

        {/* ===================== */}
        {/* MOBILE CARD VIEW */}
        {/* ===================== */}
        <div className="md:hidden p-4 space-y-4">
          {paginatedRows.map((row) => {
            const emp = row.original;
            return (
              <div
                key={emp.id}
                className="border rounded-xl p-4 bg-gray-50"
              >
                <div className="flex items-center gap-3 mb-3">
                  <img
                    src={emp.avatar}
                    className="w-12 h-12 rounded-full"
                    alt=""
                  />
                  <div>
                    <p className="font-semibold">{emp.name}</p>
                    <p className="text-xs text-gray-500">{emp.id}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-500">Role</p>
                    <p>{emp.role}</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Project</p>
                    <p>{emp.project}</p>
                  </div>

                  <div>
                    <p className="text-gray-500">Salary</p>
                    <p className="font-semibold">
                      ₹ {emp.salary.toLocaleString()}
                    </p>
                  </div>

                  <div>
                    <p className="text-gray-500">Status</p>
                    <p>{emp.status}</p>
                  </div>
                </div>

                <div className="flex justify-end gap-4 mt-4 text-gray-500">
                  <FiEye />
                  <FiEdit />
                  <FiTrash2 />
                </div>
              </div>
            );
          })}
        </div>

        {/* ===================== */}
        {/* DESKTOP TABLE VIEW */}
        {/* ===================== */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <th key={header.id} className="p-4 text-left">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>

            <tbody>
              {paginatedRows.map((row) => (
                <tr key={row.id} className="border-t hover:bg-purple-50">
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="p-4">
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex justify-between items-center p-6 border-t text-sm">
          <p>
            Showing{" "}
            {table.getState().pagination.pageIndex *
              table.getState().pagination.pageSize +
              1}
            –
            {Math.min(
              (table.getState().pagination.pageIndex + 1) *
                table.getState().pagination.pageSize,
              data.length
            )}{" "}
            of {data.length}
          </p>

          <div className="flex gap-3">
            <button
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
              className="border px-4 py-2 rounded-lg disabled:opacity-40"
            >
              Previous
            </button>

            <button
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
              className="border px-4 py-2 rounded-lg disabled:opacity-40"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}