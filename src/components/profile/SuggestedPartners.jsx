export default function SuggestedPartners() {
  return (
    <div className="bg-white p-6 border-b border-gray-100">
      <div className="flex justify-between mb-4">
        <h4 className="font-semibold text-gray-900">Suggested Partners</h4>
        <button className="text-[#5323DC] text-sm hover:underline">See All</button>
      </div>
      {["David Miller", "Sarah Chen", "Marcus Johnson"].map(name => (
        <div key={name} className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <img src={`https://i.pravatar.cc/100?u=${name}`} alt={name}
              className="w-10 h-10 rounded-full object-cover" />
            <div>
              <p className="text-sm font-medium text-gray-900">{name}</p>
              <p className="text-xs text-gray-400">TechFlow</p>
            </div>
          </div>
          <button className="text-[#5323DC] text-sm font-medium hover:underline active:scale-95 transition-transform">
            Follow
          </button>
        </div>
      ))}
    </div>
  );
}