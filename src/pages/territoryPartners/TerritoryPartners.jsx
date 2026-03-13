import { useState } from "react";
import TerritoryHeader from "../../components/territoryPartners/TerritoryHeader";
import TerritoryStats from "../../components/territoryPartners/TerritoryStats";
import TerritoryFilters from "../../components/territoryPartners/TerritoryFilters";
import TerritoryTable from "../../components/territoryPartners/TerritoryTable";

const DEFAULT_FILTERS = {
  state: "All", city: "Mumbai", status: "Active",
  followup: "Pending", project: "Green Valley", performance: "High",
};

export default function TerritoryPartners() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [globalFilter, setGlobalFilter] = useState("");

  const handleFilterChange = (key, value) => setFilters(prev => ({ ...prev, [key]: value }));
  const handleClear = () => setFilters(DEFAULT_FILTERS);

  return (
    <div className="min-h-screen flex flex-col">
      <TerritoryHeader onBack={() => window.history.back()} />

      <div className="flex-1 px-5 md:px-8 py-5 space-y-5">
        <TerritoryStats />
        <TerritoryFilters filters={filters} onChange={handleFilterChange} onClear={handleClear} />
        <TerritoryTable globalFilter={globalFilter} />
      </div>
    </div>
  );
}