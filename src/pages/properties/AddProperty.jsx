import {
  FiArrowLeft,
  FiHome,
  FiMapPin,
  FiImage,
  FiUploadCloud,
  FiCheckCircle,
  FiInfo,
} from "react-icons/fi";

export default function AddProperty() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 to-white pb-20">

      {/* Header */}
      <header className="sticky top-0 z-30 bg-white/80 backdrop-blur border-b">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button className="h-9 w-9 grid place-items-center rounded-xl border">
              <FiArrowLeft />
            </button>
            <h1 className="text-lg sm:text-xl font-semibold">Add New Property</h1>
          </div>

          <div className="flex items-center gap-2">
            <button className="hidden sm:block text-sm text-muted-foreground">
              Save Draft
            </button>
            <button className="h-9 px-4 rounded-xl border text-sm">
              Cancel
            </button>
            <button className="h-9 px-4 rounded-xl bg-violet-600 text-white text-sm shadow">
              Publish Property
            </button>
          </div>
        </div>
      </header>

      {/* Layout */}
      <main className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">

        {/* Left Content */}
        <section className="space-y-6">

          {/* Property Classification */}
          <div className="bg-white rounded-2xl border p-4 sm:p-6">
            <h3 className="font-semibold mb-3">Property Classification</h3>

            <div className="flex flex-wrap gap-2 mb-4">
              {["New Launch", "Resale", "Rental"].map((t, i) => (
                <button
                  key={t}
                  className={`px-4 py-1.5 rounded-full text-sm border ${
                    i === 0 ? "bg-violet-600 text-white" : "bg-white"
                  }`}
                >
                  {t}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {["Flat / Apt", "Plot", "Shop", "Row House", "Industrial", "Farm Land"].map(
                (item, i) => (
                  <button
                    key={item}
                    className={`border rounded-xl p-4 flex flex-col items-center gap-2 ${
                      i === 0
                        ? "bg-violet-600 text-white"
                        : "bg-white hover:bg-violet-50"
                    }`}
                  >
                    <FiHome />
                    <span className="text-sm">{item}</span>
                  </button>
                )
              )}
            </div>
          </div>

          {/* Forms */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Basic Info */}
            <div className="bg-white rounded-2xl border p-4 sm:p-6 space-y-4">
              <h3 className="font-semibold">Basic Information</h3>

              {[
                ["Property Name / Project", "Green Valley Heights"],
                ["Built Up Area (sq ft)", "1,450"],
                ["Carpet Area (sq ft)", "1,100"],
                ["Total Sales Price (₹)", "85,00,000"],
                ["Offer Price (₹)", "82,50,000"],
              ].map(([label, value]) => (
                <div key={label}>
                  <label className="text-xs text-muted-foreground">{label}</label>
                  <input
                    defaultValue={value}
                    className="mt-1 w-full h-10 rounded-xl border px-3 text-sm"
                  />
                </div>
              ))}
            </div>

            {/* Location */}
            <div className="bg-white rounded-2xl border p-4 sm:p-6 space-y-4">
              <h3 className="font-semibold">Location Details</h3>

              {[
                ["State", "Maharashtra"],
                ["City", "Pune"],
                ["Address / Locality", "Wakad, Sector 4"],
              ].map(([label, value]) => (
                <div key={label}>
                  <label className="text-xs text-muted-foreground">{label}</label>
                  <input
                    defaultValue={value}
                    className="mt-1 w-full h-10 rounded-xl border px-3 text-sm"
                  />
                </div>
              ))}

              <div className="h-36 rounded-xl border flex flex-col items-center justify-center text-sm text-muted-foreground gap-2">
                <FiMapPin className="text-violet-600" />
                Location Pinned on Map
              </div>
            </div>
          </div>

          {/* Media Gallery */}
          <div className="bg-white rounded-2xl border p-4 sm:p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Media Gallery</h3>
              <button className="text-sm text-violet-600">Manage Files</button>
            </div>

            <div className="border-2 border-dashed rounded-xl p-6 flex flex-col items-center justify-center text-center text-sm text-muted-foreground">
              <FiUploadCloud size={28} className="text-violet-600 mb-2" />
              Click to upload or drag & drop
              <p className="text-xs mt-1">PNG, JPG, GIF (max 800x400px)</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
              {[
                "https://images.unsplash.com/photo-1502673530728-f79b4cab31b1?w=400",
                "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400",
                "https://images.unsplash.com/photo-1494526585095-c41746248156?w=400",
              ].map((img) => (
                <img
                  key={img}
                  src={img}
                  className="h-24 w-full object-cover rounded-xl"
                />
              ))}

              <button className="h-24 border rounded-xl grid place-items-center text-violet-600 text-xl">
                +
              </button>
            </div>
          </div>
        </section>

        {/* Right Sidebar */}
        <aside className="space-y-6">

          <div className="bg-white rounded-2xl border p-4 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Listing Quality</h3>
              <span className="text-violet-600 font-semibold">65%</span>
            </div>

            {[
              "Basic Details",
              "Location Info",
              "Price & Payment",
              "Upload Floor Plan",
              "Add Amenities",
            ].map((t, i) => (
              <div key={t} className="flex items-center gap-2 text-sm">
                <FiCheckCircle
                  className={i < 3 ? "text-violet-600" : "text-gray-300"}
                />
                {t}
              </div>
            ))}
          </div>

          <div className="bg-violet-50 rounded-2xl border p-4 text-sm flex gap-2">
            <FiInfo className="text-violet-600 mt-0.5" />
            Listings with high-quality images & videos get 40% more enquiries.
          </div>
        </aside>
      </main>
    </div>
  );
}