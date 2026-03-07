
function MobilePartnerCard({ partner }) {
  return (
    <div className="bg-white rounded-2xl border p-4 space-y-4 shadow-sm">

      {/* Top */}
      <div className="flex items-start justify-between">
        <div className="flex gap-3">
          <img src={partner.avatar} className="w-12 h-12 rounded-full" />
          <div>
            <h3 className="font-semibold text-gray-900">{partner.name}</h3>
            <span className="text-xs bg-gray-100 px-2 py-1 rounded">
              ID: {partner.id}
            </span>
          </div>
        </div>

        <span className="text-xs px-3 py-1 bg-purple-100 text-purple-700 rounded-full">
          {partner.territory}
        </span>
      </div>

      {/* Projects */}
      <div className="flex flex-wrap gap-2">
        {partner.projects.map(p => (
          <span key={p} className="text-xs bg-gray-100 px-2 py-1 rounded">
            {p}
          </span>
        ))}

        {partner.extraProjects > 0 && (
          <span className="text-xs bg-gray-100 px-2 py-1 rounded">
            +{partner.extraProjects} more
          </span>
        )}
      </div>

      {/* Contact */}
      <div className="grid grid-cols-2 text-sm gap-2">
        <div>
          <p className="text-gray-400 text-xs">Mobile</p>
          <p className="font-medium">{partner.phone}</p>
        </div>

        <div>
          <p className="text-gray-400 text-xs">Location</p>
          <p className="font-medium">{partner.city}, {partner.state}</p>
        </div>
      </div>

      {/* Status */}
      <div className="flex gap-2">
        <span className={`px-3 py-1 rounded-full text-xs ${badgeStyles[partner.followup]}`}>
          {partner.followup}
        </span>

        <span className={`px-3 py-1 rounded-full text-xs ${badgeStyles[partner.performance]}`}>
          {partner.performance} Perf
        </span>
      </div>

      {/* Actions */}
      <div className="flex gap-2 pt-2 border-t">
        <button className="flex-1 bg-[#5323DC] text-white rounded-lg py-2 font-medium">
          View Profile
        </button>

        <button className="border rounded-lg p-2">
          📞
        </button>

        <button className="border rounded-lg p-2">
          📊
        </button>

        <button className="border rounded-lg p-2">
          🎁
        </button>
      </div>
    </div>
  );
}

export default MobilePartnerCard;