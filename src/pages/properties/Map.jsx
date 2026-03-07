import { useState, useEffect } from "react";
import LeafletCityMap from "../../components/map/LeafletCityMap";
import { useAuth } from "../../store/auth";
import Select from "react-select";
import propertyPicture from "../../assets/propertyPicture.svg";
import FormatPrice from "../../components/FormatPrice";
import { getImageURI } from "../../utils/helper";
import { FiSearch, FiFilter, FiMap, FiPhone, FiMail, FiHeart } from "react-icons/fi";

export const dummyProperties = [
  {
    propertyid: 1,
    propertyName: "Skyline Heights",
    company_name: "Lodha Group",
    totalOfferPrice: 25000000,
    seoSlug: "skyline-heights-mumbai",
    frontView: JSON.stringify([
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994",
    ]),
    lat: 19.076,
    lng: 72.8777,
  },
  {
    propertyid: 2,
    propertyName: "Green Valley",
    company_name: "Godrej Properties",
    totalOfferPrice: 8500000,
    seoSlug: "green-valley-mumbai",
    frontView: JSON.stringify([
      "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
    ]),
    lat: 19.082,
    lng: 72.882,
  },
  {
    propertyid: 3,
    propertyName: "The Crest",
    company_name: "DLF Limited",
    totalOfferPrice: 42000000,
    seoSlug: "the-crest-mumbai",
    frontView: JSON.stringify([
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00",
    ]),
    lat: 19.072,
    lng: 72.865,
  },
  {
    propertyid: 4,
    propertyName: "Orchid Villas",
    company_name: "Prestige Group",
    totalOfferPrice: 18000000,
    seoSlug: "orchid-villas-mumbai",
    frontView: JSON.stringify([
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    ]),
    lat: 19.09,
    lng: 72.89,
  },
  {
    propertyid: 5,
    propertyName: "Tech Park One",
    company_name: "Embassy Group",
    totalOfferPrice: 125000000,
    seoSlug: "tech-park-one-mumbai",
    frontView: JSON.stringify([
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab",
    ]),
    lat: 19.065,
    lng: 72.86,
  },
];

const dummyCities = ["Mumbai", "Pune", "Bangalore"];

const Map = () => {
  const { URI, setLoading } = useAuth();
  const [properties, setProperties] = useState(dummyProperties);
  const [cities, setCities] = useState(dummyCities);
  const [selectedCity, setSelectedCity] = useState("");

  const cityOptions = cities?.map((city) => ({
    value: city,
    label: city,
  }));

  const customStyles = {
    control: (base, state) => ({
      ...base,
      fontSize: "12px",
      cursor: "pointer",
      borderColor: state.isFocused ? "#7C3AED" : "#e5e7eb",
      boxShadow: "none",
      "&:hover": { borderColor: "#7C3AED" },
    }),
  };

  const fetchAllCity = async () => {
    const res = await fetch(URI + "/project-partner/map/properties/cities", {
      credentials: "include",
    });
    const data = await res.json();
    setCities(data);
    setSelectedCity(data[0]);
  };

  const fetchProperties = async () => {
    if (!selectedCity) return;
    setLoading(true);
    try {
      const res = await fetch(
        `${URI}/project-partner/map/properties/get/${selectedCity}`,
        { credentials: "include" }
      );
      const data = await res.json();
      setProperties(data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    //fetchAllCity();
  }, []);

  useEffect(() => {
    //fetchProperties();
    setProperties(dummyProperties);
    setSelectedCity("Mumbai");
  }, [selectedCity]);

  return (
    <div className="min-h-[85vh] bg-[#FAF8FF] rounded-2xl p-4">
      {/* TOP BAR */}
      <div className="bg-white rounded-xl p-4 flex flex-wrap gap-3 items-center justify-between mb-4">
        <h2 className="font-semibold">Property Map</h2>

        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              placeholder="Search location or project..."
              className="w-full border rounded-lg pl-9 pr-3 py-2 text-sm"
            />
          </div>

          <Select
            className="w-[150px] text-xs"
            styles={customStyles}
            options={cityOptions}
            value={cityOptions?.find((opt) => opt.value === selectedCity) || null}
            onChange={(opt) => setSelectedCity(opt.value)}
          />

          <button className="border rounded-lg px-3 py-2 text-sm flex items-center gap-2">
            <FiFilter /> Filters
          </button>

          <button className="hidden sm:flex bg-[#7C3AED] text-white px-3 py-2 rounded-lg text-sm items-center gap-2">
            <FiMap /> Map
          </button>
        </div>
      </div>

      {/* FILTER PILLS */}
      <div className="flex gap-2 justify-center mb-3">
        {["For Sale", "For Rent", "New Projects", "Plots"].map((t, i) => (
          <button
            key={t}
            className={`px-4 py-1 rounded-full text-sm border ${
              i === 0
                ? "bg-[#7C3AED] text-white border-[#7C3AED]"
                : "border-gray-300 text-gray-600"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* MAP + LIST */}
      <div className="flex flex-col xl:flex-row gap-4 h-[70vh]">
        {/* MAP */}
        <div className="w-full xl:w-[70%] h-full bg-white rounded-xl overflow-hidden">
          <LeafletCityMap properties={dummyProperties} selectedCity={selectedCity} />
        </div>

        {/* RIGHT PROPERTY LIST */}
        <div className="w-full xl:w-[30%] bg-white rounded-xl p-3 overflow-y-auto">
          <h3 className="font-semibold text-sm mb-3">
            Found {properties.length} properties
          </h3>

          <div className="space-y-3">
            {properties.map((row) => {
              let imageSrc = propertyPicture;
              try {
                const parsed = JSON.parse(row.frontView);
                if (parsed?.[0]) imageSrc = getImageURI(parsed[0]);
              } catch {}

              return (
                <div
                  key={row.propertyid}
                  className="border rounded-xl p-3 flex gap-3 hover:border-[#7C3AED] transition cursor-pointer"
                  onClick={() =>
                    window.open(
                      "https://www.reparv.in/property-info/" + row.seoSlug,
                      "_blank"
                    )
                  }
                >
                  <img
                    src={imageSrc}
                    className="w-20 h-20 rounded-lg object-cover"
                  />

                  <div className="flex-1">
                    <h4 className="font-semibold text-sm">
                      {row.propertyName}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {row.company_name}
                    </p>
                    <p className="text-[#7C3AED] font-semibold text-sm mt-1">
                      <FormatPrice price={row.totalOfferPrice} />
                    </p>

                    <div className="flex gap-3 text-gray-500 mt-2">
                      <FiPhone />
                      <FiMail />
                      <FiHeart />
                    </div>
                  </div>

                  <span className="text-[10px] h-fit bg-green-100 text-green-700 px-2 py-1 rounded-full">
                    READY
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Map;