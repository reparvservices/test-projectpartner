
export default function BasicInfoForm({ form, errors, propertyTab, onChange, onValidate }) {

  const inputCls = (err) =>
    `mt-1 w-full h-10 rounded-xl border px-3 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400
     ${err
       ? "border-red-400 focus:ring-2 focus:ring-red-100"
       : "border-gray-200 focus:border-violet-500 focus:ring-2 focus:ring-violet-100"
     }`;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6 space-y-4">
      <h3 className="font-semibold text-gray-900">Basic Information</h3>

      {/* Property Name */}
      <div>
        <label className="text-xs text-gray-500 font-medium">
          Property Name / Project <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={form.propertyName}
          onChange={e => {
            const v = e.target.value.replace(/[^A-Za-z\s]/g, "");
            onChange("propertyName", v);
            onValidate("propertyName", v);
          }}
          placeholder="e.g. Green Valley Heights"
          className={inputCls(errors.propertyName)}
        />
        {errors.propertyName
          ? <p className="text-xs text-red-500 mt-1">{errors.propertyName}</p>
          : <p className="text-xs text-gray-400 mt-1">Letters only — must be unique</p>
        }
      </div>

      {/* Built Up Area */}
      <div>
        <label className="text-xs text-gray-500 font-medium">Built Up Area (sq ft)</label>
        <input
          type="number"
          value={form.builtUpArea || ""}
          onChange={e => onChange("builtUpArea", e.target.value)}
          placeholder="e.g. 1,450"
          className={inputCls(false)}
        />
      </div>

      {/* Carpet Area */}
      <div>
        <label className="text-xs text-gray-500 font-medium">
          Carpet Area (sq ft) <span className="text-red-500">*</span>
        </label>
        <input
          type="number"
          value={form.carpetArea}
          onChange={e => onChange("carpetArea", e.target.value)}
          placeholder="e.g. 1,100"
          className={inputCls(false)}
        />
      </div>

      {/* Total Sales Price */}
      <div>
        <label className="text-xs text-gray-500 font-medium">
          {propertyTab === "rent" ? "Monthly Rent (₹)" : "Total Sales Price (₹)"}
          <span className="text-red-500 ml-1">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-medium mt-0.5">₹</span>
          <input
            type="number"
            value={form.totalSalesPrice}
            onChange={e => onChange("totalSalesPrice", e.target.value)}
            placeholder="00"
            className={`mt-1 w-full h-10 rounded-xl border border-gray-200 pl-7 pr-3 text-sm text-gray-800 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all placeholder:text-gray-400`}
          />
        </div>
      </div>

      {/* Offer Price */}
      <div>
        <label className="text-xs text-gray-500 font-medium">
          Offer Price (₹) <span className="text-red-500">*</span>
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-medium mt-0.5">₹</span>
          <input
            type="number"
            value={form.totalOfferPrice}
            onChange={e => onChange("totalOfferPrice", e.target.value)}
            placeholder="00"
            className={`mt-1 w-full h-10 rounded-xl border border-gray-200 pl-7 pr-3 text-sm text-gray-800 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-100 transition-all placeholder:text-gray-400`}
          />
        </div>
        <p className="text-xs text-gray-400 mt-1">Price you're willing to negotiate</p>
      </div>
    </div>
  );
}