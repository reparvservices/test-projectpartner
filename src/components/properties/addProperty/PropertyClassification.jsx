import { MdApartment } from "react-icons/md";
import { GiFarmTractor, GiFamilyHouse } from "react-icons/gi";
import {
  FaHome, FaStore, FaBuilding, FaCity, FaTree, FaIndustry, FaWarehouse,
} from "react-icons/fa";
import { BsShopWindow } from "react-icons/bs";

// ── New property types (from propertyTypes array) ─────────────────────────────
const NEW_TYPES = [
  { label: "Buy New Flat",              value: "NewFlat",          icon: MdApartment },
  { label: "Buy New Plot",              value: "NewPlot",          icon: FaCity },
  { label: "Buy New Shop",              value: "NewShop",          icon: FaStore },
  { label: "Buy New Row House",         value: "RowHouse",         icon: FaHome },
  { label: "Buy New Farm Land",         value: "FarmLand",         icon: FaTree },
  { label: "Buy New Farm House",        value: "FarmHouse",        icon: GiFamilyHouse },
  { label: "Buy Commercial Flat",       value: "CommercialFlat",   icon: FaBuilding },
  { label: "Buy Commercial Plot",       value: "CommercialPlot",   icon: FaCity },
  { label: "Buy Industrial Space",      value: "IndustrialSpace",  icon: FaIndustry },
];

// ── Rental types ──────────────────────────────────────────────────────────────
const RENTAL_TYPES = [
  { label: "Rental Flat",      value: "RentalFlat",      icon: MdApartment },
  { label: "Rental Plot",      value: "RentalPlot",      icon: FaCity },
  { label: "Rental Villa",     value: "RentalVilla",     icon: FaTree },
  { label: "Rental Shop",      value: "RentalShop",      icon: FaStore },
  { label: "Rental Office",    value: "RentalOffice",    icon: FaBuilding },
  { label: "Rental House",     value: "RentalHouse",     icon: FaHome },
  { label: "Rental Godown",    value: "RentalGodown",    icon: FaWarehouse },
  { label: "Rental Land",      value: "RentalOpenLand",  icon: FaTree },
  { label: "Rental ShowRoom",  value: "RentalShowroom",  icon: BsShopWindow },
];

// ── Resale types ──────────────────────────────────────────────────────────────
const RESALE_TYPES = [
  { label: "Resale Flat",       value: "ResaleFlat",      icon: MdApartment },
  { label: "Resale Plot",       value: "ResalePlot",      icon: FaCity },
  { label: "Resale House",      value: "ResaleHouse",     icon: FaHome },
  { label: "Resale Villa",      value: "ResalelVilla",    icon: FaTree },
  { label: "Resale Shop",       value: "ResaleShop",      icon: FaStore },
  { label: "Resale Office",     value: "ResaleOffice",    icon: FaBuilding },
  { label: "Resale Farm House", value: "ResaleFarmHouse", icon: GiFarmTractor },
  { label: "Resale Godown",     value: "ResaleGodown",    icon: FaWarehouse },
  { label: "Resale Bunglow",    value: "ResaleBunglow",   icon: FaBuilding },
  { label: "Resale ShowRoom",   value: "ResaleShowroom",  icon: BsShopWindow },
];

const TABS = [
  { key: "new",    label: "New Launch" },
  { key: "resale", label: "Resale" },
  { key: "rent",   label: "Rental" },
];

/**
 * PropertyClassification
 * Props:
 *   propertyTab      : "new" | "resale" | "rent"
 *   propertyCategory : string (selected value)
 *   onTabChange      : fn(tab)
 *   onCategoryChange : fn(value)
 */
export default function PropertyClassification({
  propertyTab, propertyCategory, onTabChange, onCategoryChange,
}) {
  const types =
    propertyTab === "new"    ? NEW_TYPES    :
    propertyTab === "resale" ? RESALE_TYPES :
    RENTAL_TYPES;

  return (
    <div className="bg-white rounded-2xl border border-gray-100 p-4 sm:p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Property Classification</h3>

      {/* Tab pills */}
      <div className="flex flex-wrap gap-2 mb-5">
        {TABS.map(({ key, label }) => {
          const active = propertyTab === key;
          return (
            <button
              key={key}
              type="button"
              onClick={() => onTabChange(key)}
              className={`px-5 py-1.5 rounded-full text-sm font-medium border transition-all cursor-pointer
                ${active
                  ? "bg-violet-600 text-white border-violet-600 shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-violet-400 hover:text-violet-700"
                }`}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Category grid — 2 cols on mobile, 4 cols on sm+ */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {types.map(({ label, value, icon: Icon }) => {
          const active = propertyCategory === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => onCategoryChange(value)}
              className={`border rounded-xl p-4 flex flex-col items-center gap-2 transition-all cursor-pointer
                ${active
                  ? "bg-violet-600 text-white border-violet-600 shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:bg-violet-50 hover:border-violet-300"
                }`}
            >
              <Icon size={18} />
              <span className="text-xs text-center leading-tight">{label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}