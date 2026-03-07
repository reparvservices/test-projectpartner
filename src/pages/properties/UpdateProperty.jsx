import { useState } from "react";
import { FiUpload, FiArrowLeft } from "react-icons/fi";

export default function UpdateProperty() {
  const [updateType, setUpdateType] = useState("Announcement");
  const [visibility, setVisibility] = useState("public");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState([]);
  const [progress, setProgress] = useState(65);
  const [unitsSold, setUnitsSold] = useState("12");
  const [remaining, setRemaining] = useState("45");

  const card = "bg-white border border-[#E5E7EB] rounded-2xl p-5 space-y-4";
  const pill =
    "px-4 py-2 rounded-full border text-sm whitespace-nowrap cursor-pointer transition";
  const pillActive = "border-[#8A38F5] text-[#8A38F5] bg-[#F4ECFF]";
  const pillIdle = "border-gray-300 text-gray-600 hover:border-[#8A38F5]";
  const input =
    "w-full border border-[#D9D9D9] rounded-lg px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-[#8A38F5]";

  const handleFiles = (e) => {
    const files = Array.from(e.target.files);
    setMedia((prev) => [...prev, ...files]);
  };

  return (
    <div className="min-h-screen bg-[#FAF8FF]">
      {/* TOP BAR */}
      <div className="bg-white border-b sticky top-0 z-20">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              onClick={() => window.history.back()}
              className="p-2 rounded-full hover:bg-gray-100"
            >
              <FiArrowLeft size={20} />
            </button>

            <div>
              <h2 className="text-base sm:text-lg font-semibold">
                Create Property Update
              </h2>
              <p className="text-xs sm:text-sm text-gray-500">
                Posting to:{" "}
                <span className="font-medium">Green Valley Heights</span>
              </p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2">
            <button className="px-4 py-2 text-sm border rounded-lg">
              Save Draft
            </button>
            <button className="px-4 py-2 text-sm bg-[#8A38F5] text-white rounded-lg">
              Post Update
            </button>
          </div>
        </div>
      </div>

      {/* BODY */}
      <div className="max-w-[1400px] mx-auto p-4 sm:p-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT */}
        <div className="lg:col-span-2 space-y-6">
          {/* UPDATE TYPE */}
          <div className={card}>
            <h3 className="font-semibold text-sm">UPDATE TYPE</h3>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {[
                "Announcement",
                "Construction",
                "Price Update",
                "Media",
                "Sales Milestone",
              ].map((item) => (
                <button
                  key={item}
                  onClick={() => setUpdateType(item)}
                  className={`${pill} ${
                    updateType === item ? pillActive : pillIdle
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            <div className="border rounded-xl overflow-hidden">
              <div className="bg-[#F4F0FF] px-3 py-2 flex gap-3 text-gray-500 text-sm">
                <b>B</b> <i>I</i> <u>U</u> • ≡ • 🔗
              </div>
              <textarea
                rows={6}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full p-4 text-sm outline-none"
                placeholder="Write your update here..."
              />
            </div>
          </div>

          {/* MEDIA */}
          <div className={card}>
            <h3 className="font-semibold text-sm">MEDIA & ATTACHMENTS</h3>

            <label className="w-full border-2 border-dashed rounded-xl py-10 flex flex-col items-center gap-2 cursor-pointer bg-[#F4F0FF]">
              <FiUpload size={26} className="text-[#8A38F5]" />
              <p className="text-sm font-medium">
                Click or drag files to upload
              </p>
              <span className="text-xs text-gray-500">
                Images, Videos or Documents
              </span>
              <input
                type="file"
                multiple
                className="hidden"
                onChange={handleFiles}
              />
            </label>

            <div className="flex gap-3 mt-3">
              {media.map((file, i) => (
                <img
                  key={i}
                  src={URL.createObjectURL(file)}
                  className="w-24 h-20 rounded-lg object-cover border"
                  alt=""
                />
              ))}
            </div>
          </div>

          {/* METRICS */}
          <div className={card}>
            <div className="flex justify-between">
              <h3 className="font-semibold text-sm">PROPERTY METRICS</h3>
              <span className="text-xs text-gray-400">Optional</span>
            </div>

            <label className="text-sm font-medium">
              Construction Progress{" "}
              <span className="text-[#8A38F5]">{progress}%</span>
            </label>
            <input
              type="range"
              min="0"
              max="100"
              value={progress}
              onChange={(e) => setProgress(e.target.value)}
              className="w-full accent-[#8A38F5]"
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-3">
              <input
                className={input}
                placeholder="Units Sold (This Month)"
                value={unitsSold}
                onChange={(e) => setUnitsSold(e.target.value)}
              />
              <input
                className={input}
                placeholder="Remaining Availability"
                value={remaining}
                onChange={(e) => setRemaining(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="space-y-6">
          {/* VISIBILITY */}
          <div className={card}>
            <h3 className="font-semibold text-sm">VISIBILITY</h3>

            {[
              {
                key: "public",
                label: "Public Network",
                desc: "Visible to all partners and customers",
              },
              {
                key: "partners",
                label: "Sales Partners Only",
                desc: "Restricted to channel partners",
              },
              {
                key: "internal",
                label: "Internal Team",
                desc: "Private team update",
              },
            ].map((item) => (
              <label
                key={item.key}
                className={`border rounded-lg p-3 flex gap-3 cursor-pointer ${
                  visibility === item.key
                    ? "border-[#8A38F5] bg-[#F4ECFF]"
                    : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  checked={visibility === item.key}
                  onChange={() => setVisibility(item.key)}
                  className="accent-[#8A38F5] mt-1"
                />
                <div>
                  <p className="font-medium text-sm">{item.label}</p>
                  <p className="text-xs text-gray-500">{item.desc}</p>
                </div>
              </label>
            ))}
          </div>

          {/* PREVIEW */}
          <div className={card}>
            <h3 className="font-semibold text-sm">PREVIEW</h3>

            <div className="rounded-xl bg-[#8A38F5] text-white p-4 space-y-2">
              <p className="font-semibold">Green Valley Heights</p>
              <p className="text-xs opacity-80">Wakad, Pune</p>

              <div className="bg-white/20 rounded-lg p-3 text-xs min-h-[80px]">
                {content || "This is how your update will appear in the feed."}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* MOBILE ACTION BAR */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-3 flex gap-3 sm:hidden">
        <button className="w-1/2 border rounded-lg py-2 text-sm">
          Save Draft
        </button>
        <button className="w-1/2 bg-[#8A38F5] text-white rounded-lg py-2 text-sm">
          Post Update
        </button>
      </div>
    </div>
  );
}