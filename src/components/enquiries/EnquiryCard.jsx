import {
  MapPin,
  Clock,
  Phone,
  FileText,
  ArrowRight,
  Instagram,
  UserPlus,
  MessageCircle,
  Calendar,
  Globe,
} from "lucide-react";

export default function EnquiryCard({ item }) {
  const assigned = item.assignedPartner;

  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-5 md:p-6 hover:shadow-sm transition">

      {/* TOP SECTION */}
      <div className="flex justify-between items-start">

        <div className="flex gap-3 md:gap-4">

          <img
            src={item.avatar || "https://i.pravatar.cc/100"}
            className="h-12 w-12 md:h-14 md:w-14 rounded-full object-cover"
          />

          <div>

            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="font-semibold text-slate-900 text-base md:text-lg">
                {item.name}
              </h2>

              {item.status && (
                <span
                  className={`text-xs px-3 py-1 rounded-full font-medium
                  ${
                    item.status === "Hot Lead"
                      ? "bg-red-100 text-red-600"
                      : item.status === "Assigned"
                      ? "bg-green-100 text-green-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {item.status}
                </span>
              )}
            </div>

            <div className="flex items-center gap-3 text-xs md:text-sm text-slate-500 mt-1">

              <span className="flex items-center gap-1">
                <MapPin size={14} /> {item.location}
              </span>

              <span className="flex items-center gap-1">
                <Clock size={14} /> {item.time}
              </span>

            </div>

          </div>

        </div>
      </div>

      {/* INFO BLOCK */}
      <div className="grid grid-cols-3 gap-3 md:gap-5 bg-[#F2F4FF] p-4 rounded-md mt-4">

        <div>
          <p className="text-[11px] md:text-xs uppercase text-[#94A3B8]">
            Interested In
          </p>
          <p className="font-medium text-sm md:text-base">
            {item.interested}
          </p>
        </div>

        <div>
          <p className="text-[11px] md:text-xs uppercase text-[#94A3B8] ">
            Budget
          </p>
          <p className="font-medium text-sm md:text-base">
            {item.budget}
          </p>
        </div>

        <div>
          <p className="text-[11px] md:text-xs uppercase text-[#94A3B8]">
            Source
          </p>
          <p className="flex items-center gap-2 font-medium text-sm md:text-base">
            {item.source === "Instagram Ads" && (
              <Instagram size={16} className="text-pink-500" />
            )}
            {item.source === "Direct Website" && (
              <Globe size={16} className="text-indigo-500" />
            )}
            {item.source}
          </p>
        </div>

      </div>

      {/* ASSIGNED PARTNER */}
      {assigned && (
        <div className="bg-indigo-50 text-indigo-700 rounded-lg px-4 py-3 mt-4 text-sm flex items-center gap-3">

          <img
            src={assigned.avatar || "https://i.pravatar.cc/40"}
            className="h-7 w-7 rounded-full"
          />

          Assigned to:{" "}
          <span className="font-medium">
            {assigned.name}
          </span>

        </div>
      )}

      {/* ACTIONS */}
      <div className="mt-5 pt-4 border-t border-slate-200">

        {/* MOBILE ACTIONS */}
        <div className="md:hidden">

          {!assigned ? (
            <button className="w-full text-white py-3 rounded-xl font-medium bg-gradient-to-r from-[#5E23DC] to-[#7C3AED]">
              Assign Partner
            </button>
          ) : (
            <div className="flex gap-3">

              <button className="flex-1 text-white py-3 rounded-xl bg-gradient-to-r from-[#5E23DC] to-[#7C3AED]">
                Message
              </button>

              <button className="p-3 border rounded-xl">
                <Phone size={18} />
              </button>

              <button className="p-3 border rounded-xl">
                <Calendar size={18} />
              </button>

            </div>
          )}
        </div>

        {/* DESKTOP ACTIONS */}
        <div className="hidden md:flex justify-between items-center">

          <div className="flex gap-3">

            <button className="bg-[#5223DC] text-white px-4 py-2 rounded-md text-sm">
              View Details
            </button>

            {assigned && (
              <button className="flex items-center gap-2 text-sm px-4 py-2 rounded-md bg-indigo-50 text-indigo-600">
                <UserPlus size={16} />
                Assign Partner
              </button>
            )}

            {assigned && (
              <>
                <button className="flex items-center gap-1 text-sm text-slate-600">
                  <Phone size={14} /> Call
                </button>

                <button className="flex items-center gap-1 text-sm text-slate-600">
                  <FileText size={14} /> Add Note
                </button>
              </>
            )}

          </div>

          <button className="flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900">
            Schedule Visit <ArrowRight size={14} />
          </button>

        </div>

      </div>
    </div>
  );
}