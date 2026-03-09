export default function EnquiryTabs({ tabs, activeTab, setActiveTab }) {
  return (
    <div className="flex md:flex-wrap gap-3 p-4 sm:p-6 bg-white border-b overflow-scroll">
      {tabs.map((tab) => (
        <button
          key={tab.label}
          onClick={() => setActiveTab(tab.label)}
          className={`flex gap-2 items-center justify-center px-4 py-2 rounded-full text-sm font-medium ${
            activeTab === tab.label
              ? "bg-[#5323DC] text-white"
              : "bg-[#F2F4FF] text-[#2B2F3A]"
          }`}
        >
          {tab.label}
          <span
            className={`text-xs bg-white rounded-lg py-[2px] px-[4px] ${
              activeTab === tab.label
                ? "bg-white text-[#2B2F3A]"
                : "bg-[#0000000F] "
            }`}
          >
            {" "}
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
}
