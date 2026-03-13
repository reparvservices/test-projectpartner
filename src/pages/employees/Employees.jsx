import { useState } from "react";
import EmployeesHeader from "../../components/employees/EmployeesHeader";
import EmployeeStats from "../../components/employees/EmployeeStats";
import EmployeeTable from "../../components/employees/EmployeeTable";


export default function Employees({ onAddEmployee }) {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("directory");

  return (
    <div className="min-h-screen flex flex-col">
      <EmployeesHeader
        search={search}
        onSearch={setSearch}
        onAdd={onAddEmployee}
      />

      <div className="flex-1 px-4 md:px-8 py-6 space-y-5">
        <EmployeeStats />
        <EmployeeTable
          globalFilter={search}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
      </div>
    </div>
  );
}