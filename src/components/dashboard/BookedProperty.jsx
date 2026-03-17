import { useNavigate } from "react-router-dom";

/**
 * BookedProperty
 * Props:
 *   properties : array — real API data; filters for enquiryStatus === "Booked"
 *   URI        : string — base API URL for images
 */
export default function BookedProperty({ properties = [], URI = "" }) {
  const navigate = useNavigate();
  const booked = properties.find(p => p.enquiryStatus === "Booked");

  // Try to parse frontView image from real API data
  const getImage = (item) => {
    if (!item) return "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600";
    try {
      const parsed = JSON.parse(item.frontView);
      if (Array.isArray(parsed) && parsed[0]) return `${URI}${parsed[0]}`;
    } catch {}
    return "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=600";
  };

  if (!booked) return null;

  return (
    <>
      {/* ── Desktop XL ── */}
      <div className="hidden xl:block bg-white border border-gray-100 rounded-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Booked Properties</h3>
          <button
            onClick={() => navigate("/app/properties")}
            className="text-violet-600 text-sm font-medium hover:text-violet-700 transition-colors cursor-pointer"
          >
            View All
          </button>
        </div>

        <div className="bg-white rounded-xl border border-gray-100 p-4">
          <img
            src={getImage(booked)}
            alt={booked.propertyName}
            className="rounded-xl mb-4 h-52 w-full object-cover"
          />

          <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-semibold uppercase tracking-wide">
            Booked
          </span>

          <p className="font-semibold text-base mt-3 text-gray-900 leading-snug">
            {booked.propertyName}
          </p>
          <p className="text-gray-500 text-sm mb-4">
            {booked.totalOfferPrice}
          </p>

          <hr className="mb-4 border-gray-100" />

          <div className="flex items-center gap-3">
            <img
              src={booked.avatar || "https://i.pravatar.cc/32?u=booked"}
              alt="buyer"
              className="w-8 h-8 rounded-full object-cover"
            />
            <p className="text-gray-500 text-sm">
              Booked by <span className="font-medium text-gray-700">{booked.customerName || "Customer"}</span>
            </p>
          </div>
        </div>
      </div>

      {/* ── Mobile / Tablet ── */}
      <div className="xl:hidden mx-0">
        <div className="flex items-center justify-between mb-4 px-1">
          <h3 className="text-lg font-semibold text-gray-900">Booked Properties</h3>
          <button
            onClick={() => navigate("/app/properties")}
            className="text-violet-600 text-sm font-medium cursor-pointer"
          >
            View All
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="relative">
            <img
              src={getImage(booked)}
              alt={booked.propertyName}
              className="h-52 w-full object-cover"
            />
            <span className="absolute top-4 left-4 bg-gray-800/80 text-white text-xs px-3 py-1 rounded-full font-medium">
              Booked
            </span>
          </div>

          <div className="p-4">
            <div className="flex justify-between items-start">
              <p className="font-semibold text-gray-900 text-base leading-snug flex-1 mr-2">
                {booked.propertyName}
              </p>
              <p className="text-violet-600 font-semibold text-base flex-shrink-0">
                {booked.totalOfferPrice}
              </p>
            </div>

            {booked.city && (
              <p className="text-gray-400 text-sm mt-1">{booked.city}</p>
            )}

            <hr className="my-4 border-gray-100" />

            <div className="flex items-center gap-3">
              <img
                src={booked.avatar || "https://i.pravatar.cc/32?u=booked-mob"}
                alt="buyer"
                className="w-8 h-8 rounded-full object-cover"
              />
              <p className="text-sm text-gray-500">
                Booked by <span className="font-medium text-gray-700">{booked.customerName || "Customer"}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}