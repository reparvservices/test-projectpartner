import { useState } from "react";
import PropertyHeader from "../../components/properties/PropertyHeader";
import PropertyFilter from "../../components/properties/PropertyFilter";
import PropertySidebar from "../../components/properties/PropertySidebar";
import PropertyCard from "../../components/properties/PropertyCard";

const properties = [
  {
    id: 1,
    status: "Approved",
    name: "Sunnyvale Heights - Phase 2",
    group: "PRESTIGE GROUP",
    location: "Whitefield, Bangalore",
    price: "₹ 850k - ₹ 1.2M",
    views: "1.2k",
    enquiries: 45,
    units: 8,
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1400&auto=format&fit=crop",
  },
  {
    id: 2,
    status: "Pending",
    name: "Green Valley Residency",
    group: "DLF CREATORS",
    location: "Austin, Texas",
    price: "₹ 450k - ₹ 600k",
    views: "1.2k",
    enquiries: 45,
    units: 8,
    image:
      "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?q=80&w=1400&auto=format&fit=crop",
  },
];

export default function Properties() {
  const [filter, setFilter] = useState("Approved");
  return (
    <div className="w-full min-h-screen  pb-24 overflow-x-hidden">
      {/* Header */}
      <header className="sticky top-0 z-30 bg-transparent backdrop-blur border-b">
        <PropertyHeader
          onSearch={(value) => console.log("search:", value)}
          onAddProperty={() => console.log("Add property")}
          onDownload={() => console.log("Download")}
          onMapView={() => console.log("Map view")}
          onPostUpdate={() => console.log("Post update")}
        />

        <PropertyFilter
          active={filter}
          onChange={(value) => setFilter(value)}
        />
      </header>

      <main className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 xl:grid-cols-[minmax(0,1fr)_340px] gap-6">
          {/* Properties */}
          <section className="min-w-0 space-y-6">
            {properties.map((p) => (
              <PropertyCard key={p.id} property={p} />
            ))}
          </section>

          {/* Sidebar */}
          <aside className="hidden xl:block w-[340px] space-y-6">
            <PropertySidebar />
          </aside>
        </div>
      </main>

      {/* Mobile CTA */}
      <div className="fixed bottom-4 left-4 right-4 sm:hidden">
        <button className="w-full h-12 rounded-2xl bg-violet-600 text-white font-semibold shadow-lg">
          + Add Property
        </button>
      </div>
    </div>
  );
}
