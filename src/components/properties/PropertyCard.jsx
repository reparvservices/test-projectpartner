import {
  FiEye,
  FiEdit,
  FiTrash2,
  FiMapPin,
  FiCheckCircle,
} from "react-icons/fi";

export default function PropertyCard({ property }) {
  return (
    <div className="w-full max-w-[1000px] bg-white rounded-lg border shadow-sm overflow-hidden">
      {/* IMAGE */}
      <div className="relative">
        <img
          src={property.image}
          alt={property.name}
          className="w-full h-52 md:h-72 object-cover"
        />

        {/* STATUS */}
        <div className="absolute top-4 left-4 flex items-center gap-2 bg-white/90 backdrop-blur px-4 py-1.5 rounded-full text-emerald-600 text-sm font-semibold shadow">
          <FiCheckCircle size={16} />
          {property.status}
        </div>

        {/* ACTION ICONS */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="h-10 w-10 rounded-full bg-black/40 text-white grid place-items-center backdrop-blur">
            <FiEye size={18} />
          </button>

          <button className="h-10 w-10 rounded-full bg-black/40 text-white grid place-items-center backdrop-blur">
            <FiEdit size={18} />
          </button>

          <button className="h-10 w-10 rounded-full bg-red-500 text-white grid place-items-center">
            <FiTrash2 size={18} />
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-4 sm:p-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 sm:gap-6">
          {/* LEFT INFO */}
          <div className="space-y-2">
            <p className="text-violet-600 text-sm font-semibold uppercase">
              {property.group}
            </p>

            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900">
              {property.name}
            </h2>

            <p className="flex items-center gap-2 text-gray-500 text-xs sm:text-sm">
              <FiMapPin />
              {property.location} • {property.type}
            </p>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex flex-col items-start md:items-end gap-3 sm:gap-4">
            {/* PRICE */}
            <p className="text-xl sm:text-2xl font-semibold text-gray-900">
              {property.price}
            </p>

            {/* STATS */}
            <div className="w-full md:w-auto grid grid-cols-3 bg-[#F8F6FF] rounded-xl overflow-hidden text-center">
              <div className="px-6 py-3">
                <p className="font-semibold text-lg">{property.views}</p>
                <p className="text-xs text-gray-500">Views</p>
              </div>


              <div className="px-6 py-3 border-x">
                <p className="font-semibold text-lg">{property.enquiries}</p>
                <p className="text-xs text-gray-500">Enquiries</p>
              </div>


              <div className="px-6 py-3">
                <p className="font-semibold text-lg">{property.units}</p>
                <p className="text-xs text-gray-500">Units</p>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE ACTION BUTTONS */}
        <div className="grid grid-cols-2 gap-3 mt-4 sm:mt-6 md:hidden">
          <button className="h-10 sm:h-12 rounded-xl border text-gray-800 font-semibold hover:bg-gray-50">
            View Details
          </button>

          <button className="h-10 sm:h-12 rounded-xl bg-gradient-to-r from-violet-600 to-indigo-600 text-white font-semibold shadow">
            Post Update
          </button>
        </div>
      </div>
    </div>
  );
}
