export default function SuggestedPartners() {
  return (
    <div className="bg-white p-6">
      <div className="flex justify-between mb-4">
        <h4 className="font-semibold">Suggested Partners</h4>
        <button className="text-violet-600 text-sm">See All</button>
      </div>

      {["David Miller", "Sarah Chen", "Marcus Johnson"].map((name) => (
        <div key={name} className="flex items-center justify-between py-3">
          <div className="flex items-center gap-3">
            <img src={`https://i.pravatar.cc/100?u=${name}`} className="w-10 h-10 rounded-full" />
            <div>
              <p className="text-sm font-medium">{name}</p>
              <p className="text-xs text-gray-400">TechFlow</p>
            </div>
          </div>
          <button className="text-violet-600 text-sm">Follow</button>
        </div>
      ))}
    </div>
  );
}