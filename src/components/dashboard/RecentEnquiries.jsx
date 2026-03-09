import {
  FiPhone,
  FiMessageSquare,
  FiCalendar,
  FiCheckCircle,
} from "react-icons/fi";

export default function RecentEnquiries({ enquiries }) {
  const data = enquiries.slice(0, 5);

  return (
    <div className="xl:col-span-2 md:bg-white md:border md:rounded-2xl">
      {/* Header */}
      <div className="flex items-center justify-between px-2 md:px-4 py-4 border-b">
        <h3 className="font-semibold text-lg">Recent Enquiries</h3>
        <button className="text-violet-600 text-sm font-medium">
          View All
        </button>
      </div>

      {/* List */}
      <div className="space-y-4 md:space-y-0 md:divide-y md:p-0">
        {data.map((item, i) => (
          <div
            key={i}
            className="
            bg-white
            rounded-2xl
            shadow-sm
            p-4
            md:shadow-none
            md:rounded-none
            md:flex
            md:items-center
            md:justify-between
            md:px-6
            md:py-4
            "
          >
            {/* LEFT SECTION */}
            <div className="flex items-start justify-between gap-3 md:items-center">
              <div className="flex items-start gap-3 md:items-center">
                {/* Avatar */}
                <img
                  src={
                    item.avatar ||
                    "https://randomuser.me/api/portraits/women/44.jpg"
                  }
                  alt=""
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full object-cover"
                />

                <div>
                  <p className="font-semibold text-gray-900">
                    {item.customerName || "Customer"}
                  </p>

                  <p className="text-sm text-violet-600 md:text-gray-500">
                    {item.propertyName}
                  </p>

                  {/* Mobile Property Details */}
                  <div className="flex gap-3 text-xs text-gray-500 mt-1 md:hidden">
                    <span>{item.propertyType}</span>
                    <span>•</span>
                    <span>{item.budget}</span>
                    <span>•</span>
                    <span>{item.location}</span>
                  </div>
                </div>
              </div>
              <span className="block md:hidden text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-600">
                {item.enquiryStatus || "New"}
              </span>
            </div>

            {/* DESKTOP DETAILS */}
            <div className="hidden md:block text-sm text-gray-700">
              {item.propertyType} • {item.budget}
              <div className="text-gray-400 text-sm">{item.location}</div>
            </div>

            {/* STATUS + TIME */}
            <div className="flex items-center justify-between mt-3 md:mt-0 md:gap-6">
              <div className="hidden md:flex items-center gap-3">
                <span className="text-xs px-3 py-1 rounded-full bg-blue-100 text-blue-600">
                  {item.enquiryStatus || "New"}
                </span>

                <span className=" text-sm text-gray-400">
                  {item.time || "2h ago"}
                </span>
              </div>

              {/* ACTION ICONS */}
              <div className="w-full md:w-auto flex items-center justify-between gap-3 md:gap-4 text-violet-600 md:text-gray-400">
                <button className="p-3 md:p-0 rounded-full bg-violet-50 md:bg-transparent">
                  <FiPhone size={18} />
                </button>

                <button className="p-3 md:p-0 rounded-full bg-violet-50 md:bg-transparent">
                  <FiMessageSquare size={18} />
                </button>

                <button className="p-3 md:p-0 rounded-full bg-violet-50 md:bg-transparent">
                  <FiCalendar size={18} />
                </button>

                <button className="p-3 md:p-0 rounded-full bg-violet-50 md:bg-transparent">
                  <FiCheckCircle size={18} />
                </button>
              </div>
            </div>

            {/* Divider for mobile */}
            <div className="border-t mt-4 md:hidden"></div>
          </div>
        ))}
      </div>
    </div>
  );
}
