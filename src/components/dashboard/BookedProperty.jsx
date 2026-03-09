export default function BookedProperty({ properties }) {
  const booked = properties.find((p) => p.enquiryStatus === "Booked");

  if (!booked) return null;

  return (
    <>
      {/* ---------------- Desktop XL Layout ---------------- */}
      <div className="hidden xl:block bg-white border rounded-xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">Booked Properties</h3>
          <span className="text-purple-600 font-medium cursor-pointer">
            View All
          </span>
        </div>

        <div className="bg-white rounded-xl border p-4">
          <img
            src="https://images.unsplash.com/photo-1542314831-068cd1dbfeeb"
            className="rounded-xl mb-4 h-56 w-full object-cover"
          />

          <span className="text-xs bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full font-semibold">
            RENTED
          </span>

          <p className="font-semibold text-lg mt-3">{booked.propertyName}</p>

          <p className="text-gray-500 text-sm mb-4">
            ₹{booked.totalOfferPrice}/mo
          </p>

          <hr className="mb-4" />

          <div className="flex items-center gap-3">
            <img
              src="https://randomuser.me/api/portraits/men/32.jpg"
              className="w-8 h-8 rounded-full"
            />
            <p className="text-gray-500 text-sm">Rented by James</p>
          </div>
        </div>
      </div>

      {/* ---------------- Mobile / Tablet Layout ---------------- */}
      <div className="md:hidden mx-2">
        <h3 className="text-lg font-semibold mb-4">Booked Properties</h3>

        <div className="bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1564013799919-ab600027ffc6"
              className="h-52 w-full object-cover"
            />

            <span className="absolute top-4 left-4 bg-gray-700 text-white text-xs px-3 py-1 rounded-full">
              Booked
            </span>
          </div>

          <div className="p-4">
            <div className="flex justify-between items-start">
              <p className="font-semibold text-lg">{booked.propertyName}</p>

              <p className="text-purple-600 font-semibold text-lg">
                {booked.totalOfferPrice}
              </p>
            </div>

            <p className="text-gray-500 text-sm mt-1">Worli Sea Face, Mumbai</p>

            <hr className="my-4" />

            <div className="flex items-center gap-3">
              <img
                src="https://randomuser.me/api/portraits/women/44.jpg"
                className="w-8 h-8 rounded-full"
              />

              <p className="text-sm text-gray-600">
                Rented by <span className="font-medium">Priya Sharma</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
