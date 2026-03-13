import FiltersBar from "../../components/salesPartners/FiltersBar";
import PartnersTable from "../../components/salesPartners/PartnersTable";
import SalesPartnersHeader from "../../components/salesPartners/SalesPartnersHeader";
import StatsCards from "../../components/salesPartners/StatsCards";


export default function SalesPartners() {
  const handleClearFilters = () => {
    // wire to filter state as needed
    console.log("Filters cleared");
  };

  return (
    <div className="min-h-screen flex flex-col">

      {/* ── Top Header ── */}
      <SalesPartnersHeader />

      {/* ── Page Body ── */}
      <div className="flex-1 px-5 md:px-8 py-7 space-y-6">

        {/* Stats Row */}
        <StatsCards />

        {/* Filters */}
        <FiltersBar onClear={handleClearFilters} />

        {/* Table */}
        <PartnersTable />

      </div>
    </div>
  );
}