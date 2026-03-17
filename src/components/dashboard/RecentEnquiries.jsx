import { FiPhone, FiMessageSquare, FiCalendar, FiCheckCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const STATUS_STYLES = {
  "New Lead":    "bg-blue-100 text-blue-600",
  "Contacted":   "bg-yellow-100 text-yellow-700",
  "Site Visit":  "bg-purple-100 text-purple-700",
  "Negotiation": "bg-orange-100 text-orange-700",
  "Booked":      "bg-green-100 text-green-700",
  "Enquired":    "bg-blue-100 text-blue-600",
};

/**
 * RecentEnquiries
 * Props:
 *   enquiries : array — real API data from /project-partner/dashboard/properties
 */
export default function RecentEnquiries({ enquiries = [] }) {
  const navigate = useNavigate();
  const data = enquiries.slice(0, 5);

  return (
    <div className="xl:col-span-2 md:bg-white md:border md:rounded-2xl">
      {/* Header */}
      <div className="flex items-center justify-between px-2 md:px-4 py-4 border-b border-gray-100">
        <h3 className="font-semibold text-lg text-gray-900">Recent Enquiries</h3>
        <button
          onClick={() => navigate("/app/enquiries")}
          className="text-violet-600 text-sm font-medium hover:text-violet-700 transition-colors cursor-pointer"
        >
          View All
        </button>
      </div>

      {/* Empty state */}
      {data.length === 0 && (
        <div className="py-12 text-center text-gray-400 text-sm">
          No enquiries found.
        </div>
      )}

      {/* List */}
      <div className="space-y-4 md:space-y-0 md:divide-y md:p-0">
        {data.map((item, i) => (
          <div
            key={item.id || i}
            className="bg-white rounded-2xl shadow-sm p-4 md:shadow-none md:rounded-none md:flex md:items-center md:justify-between md:px-6 md:py-4"
          >
            {/* LEFT */}
            <div className="flex items-start justify-between gap-3 md:items-center">
              <div className="flex items-start gap-3 md:items-center">
                <img
                  src={item.avatar || `https://i.pravatar.cc/48?u=${item.id || i}`}
                  alt={item.customerName}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover flex-shrink-0"
                />
                <div>
                  <p className="font-semibold text-gray-900 text-sm md:text-base">
                    {item.customerName || "Customer"}
                  </p>
                  <p className="text-sm text-violet-600 md:text-gray-500 leading-tight">
                    {item.propertyName}
                  </p>
                  {/* Mobile details row */}
                  <div className="flex gap-2 text-xs text-gray-400 mt-1 md:hidden flex-wrap">
                    {item.propertyCategory && <span>{item.propertyCategory}</span>}
                    {item.totalOfferPrice  && <><span>•</span><span>{item.totalOfferPrice}</span></>}
                    {item.city            && <><span>•</span><span>{item.city}</span></>}
                  </div>
                </div>
              </div>
              {/* Mobile status badge */}
              <span className={`block md:hidden text-xs px-2.5 py-1 rounded-full font-medium flex-shrink-0 ${STATUS_STYLES[item.enquiryStatus] || "bg-gray-100 text-gray-600"}`}>
                {item.enquiryStatus || "New"}
              </span>
            </div>

            {/* Desktop middle */}
            <div className="hidden md:block text-sm text-gray-700 min-w-[140px]">
              {item.propertyCategory}
              <div className="text-gray-400 text-xs mt-0.5">{item.city}</div>
            </div>

            {/* Status + actions */}
            <div className="flex items-center justify-between mt-3 md:mt-0 md:gap-6">
              <div className="hidden md:flex items-center gap-3">
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${STATUS_STYLES[item.enquiryStatus] || "bg-gray-100 text-gray-600"}`}>
                  {item.enquiryStatus || "New"}
                </span>
                <span className="text-sm text-gray-400">{item.created_at?.split("|")[1]?.trim() || "Recently"}</span>
              </div>

              {/* Action icons */}
              <div className="w-full md:w-auto flex items-center justify-between gap-3 md:gap-4 text-violet-600 md:text-gray-400">
                <button className="p-3 md:p-0 rounded-full bg-violet-50 md:bg-transparent hover:text-violet-600 transition-colors cursor-pointer">
                  <FiPhone size={17} />
                </button>
                <button className="p-3 md:p-0 rounded-full bg-violet-50 md:bg-transparent hover:text-violet-600 transition-colors cursor-pointer">
                  <FiMessageSquare size={17} />
                </button>
                <button className="p-3 md:p-0 rounded-full bg-violet-50 md:bg-transparent hover:text-violet-600 transition-colors cursor-pointer">
                  <FiCalendar size={17} />
                </button>
                <button className="p-3 md:p-0 rounded-full bg-violet-50 md:bg-transparent hover:text-green-500 transition-colors cursor-pointer">
                  <FiCheckCircle size={17} />
                </button>
              </div>
            </div>

            <div className="border-t mt-4 md:hidden border-gray-100" />
          </div>
        ))}
      </div>
    </div>
  );
}