export default function QuickStats() {
  return (
    <div className="bg-white p-5 rounded-xl border">
      <h3 className="font-semibold mb-4">Quick Stats</h3>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between bg-[#F2F4FF] p-3 rounded-lg">
          <span>Today's Leads</span>
          <span className="font-semibold">12</span>
        </div>

        <div className="flex justify-between bg-[#F2F4FF] p-3 rounded-lg">
          <span>Pending Follow-up</span>
          <span className="font-semibold text-red-500">4</span>
        </div>

        <div className="flex justify-between bg-[#F2F4FF] p-3 rounded-lg">
          <span>Assigned</span>
          <span className="font-semibold">8</span>
        </div>
      </div>
    </div>
  );
}