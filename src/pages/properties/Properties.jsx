import {
  FiSearch,
  FiMapPin,
  FiDownload,
  FiPlus,
  FiEye,
  FiEdit,
  FiTrash2,
  FiTrendingUp,
  FiSliders,
} from "react-icons/fi";

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
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-white pb-24 overflow-x-hidden">

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
        <div className="mx-auto max-w-7xl px-4 py-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-2xl font-semibold">Properties</h1>
            <p className="text-xs text-muted-foreground">
              Overview • All Listings
            </p>
          </div>

          <div className="flex items-center gap-2 w-full max-w-xl">
            <div className="relative w-full min-w-0 flex-1">
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <input
                className="h-9 w-full rounded-xl border pl-9 text-sm"
                placeholder="Search anything..."
              />
            </div>

            <button className="h-9 w-9 shrink-0 rounded-xl border grid place-items-center sm:hidden">
              <FiSliders />
            </button>

            <div className="hidden sm:flex gap-2 shrink-0">
              <button className="h-9 px-4 rounded-xl border text-sm flex items-center gap-2">
                <FiMapPin /> Map View
              </button>
              <button className="h-9 px-4 rounded-xl border text-sm flex items-center gap-2">
                <FiDownload /> Download
              </button>
              <button className="h-9 px-4 rounded-xl border text-sm">
                Post Update
              </button>
              <button className="h-9 px-4 rounded-xl bg-violet-600 text-white text-sm flex items-center gap-2 shadow">
                <FiPlus /> Add Property
              </button>
            </div>
          </div>
        </div>

        {/* Status Pills */}
        <div className="mx-auto max-w-7xl px-4 pb-3 flex gap-2 overflow-x-auto no-scrollbar text-sm">
          {[
            ["Approved", 12],
            ["Pending", 5],
            ["Rejected", 1],
            ["Draft", 3],
            ["Trending", "🔥"],
            ["Recently Updated", 8],
          ].map(([label, count], i) => (
            <button
              key={label}
              className={`px-4 py-1.5 whitespace-nowrap rounded-full border ${
                i === 0
                  ? "bg-violet-600 text-white"
                  : "bg-white text-muted-foreground"
              }`}
            >
              {label} {count && <span className="ml-1 opacity-70">{count}</span>}
            </button>
          ))}
        </div>
      </header>

      {/* Layout */}
      <main className="mx-auto max-w-7xl px-4 py-6 grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6">
        {/* Properties */}
        <section className="space-y-6">
          {properties.map((p) => (
            <div
              key={p.id}
              className="w-full max-w-full bg-white rounded-2xl border shadow-sm overflow-hidden"
            >
              <div className="relative">
                <img
                  src={p.image}
                  className="h-44 sm:h-64 w-full max-w-full object-cover"
                  alt={p.name}
                />

                <span
                  className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-medium ${
                    p.status === "Approved"
                      ? "bg-emerald-100 text-emerald-700"
                      : "bg-orange-100 text-orange-700"
                  }`}
                >
                  {p.status}
                </span>

                <div className="absolute top-3 right-3 flex gap-2">
                  {[FiEye, FiEdit, FiTrash2].map((Icon, i) => (
                    <button
                      key={i}
                      className={`h-8 w-8 rounded-full bg-white/90 grid place-items-center ${
                        Icon === FiTrash2 ? "text-red-500" : ""
                      }`}
                    >
                      <Icon size={14} />
                    </button>
                  ))}
                </div>
              </div>

              <div className="p-4 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3">
                <div className="min-w-0">
                  <p className="text-xs text-violet-600 font-medium">
                    {p.group}
                  </p>
                  <h3 className="font-semibold break-words">{p.name}</h3>
                  <p className="text-sm text-muted-foreground break-words">
                    {p.location} • 3BHK & 4BHK Luxury Apts
                  </p>
                </div>
                <div className="font-semibold text-violet-700 shrink-0">
                  {p.price}
                </div>
              </div>

              <div className="px-4 pb-4 grid grid-cols-3 text-center text-sm border-t pt-3 bg-muted/30">
                <div>
                  <p className="font-semibold">{p.views}</p>
                  <p className="text-xs text-muted-foreground">Views</p>
                </div>
                <div>
                  <p className="font-semibold">{p.enquiries}</p>
                  <p className="text-xs text-muted-foreground">Enquiries</p>
                </div>
                <div>
                  <p className="font-semibold">{p.units}</p>
                  <p className="text-xs text-muted-foreground">Units</p>
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Right Rail */}
        <aside className="hidden xl:block space-y-6">
          <div className="bg-white rounded-2xl border p-4 space-y-3">
            <h3 className="font-semibold flex items-center gap-2">
              Trending Properties <FiTrendingUp className="text-orange-500" />
            </h3>

            <div className="flex items-center gap-3">
              <img
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=400"
                className="h-10 w-10 rounded-lg object-cover"
              />
              <div>
                <p className="font-medium">Sunnyvale Heights</p>
                <p className="text-xs text-muted-foreground">12.5k views</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl border p-4 space-y-3 text-sm">
            <h3 className="font-semibold">Quick Stats</h3>
            <div className="flex justify-between">
              <span>Total Properties</span>
              <span className="font-semibold">24</span>
            </div>
            <div className="flex justify-between">
              <span>Active Listings</span>
              <span className="font-semibold">18</span>
            </div>
            <div className="flex justify-between">
              <span>Pending Approvals</span>
              <span className="font-semibold text-orange-500">5</span>
            </div>
          </div>
        </aside>
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