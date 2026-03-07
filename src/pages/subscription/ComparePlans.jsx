import { useState } from "react";

export default function ComparePlans() {
  const [showDiff, setShowDiff] = useState(false);

  const plans = [
    {
      name: "Project Trial",
      duration: "1 Month",
      price: "₹8,259",
      popular: false,
    },
    {
      name: "Project Starter",
      duration: "3 Months",
      price: "₹53,098",
      popular: false,
    },
    {
      name: "Project Standard",
      duration: "6 Months",
      price: "₹1,16,819",
      popular: true,
    },
    {
      name: "Project Booster",
      duration: "9 Months",
      price: "₹1,73,459",
      popular: false,
    },
    {
      name: "Project Icon",
      duration: "12 Months",
      price: "₹3,42,199",
      popular: false,
    },
  ];

  const features = [
    {
      category: "Lead Generation",
      items: [
        { name: "Leads Included", values: ["50", "250", "600", "1200", "2500"] },
        { name: "Site Visits", values: ["5", "25", "60", "120", "250"] },
        { name: "AI Lead Filtration", values: ["✕", "✕", "✓", "✓", "✓"] },
        { name: "Incoming Call System", values: ["✕", "✓", "✓", "✓", "✓"] },
      ],
    },
    {
      category: "Marketing Support",
      items: [
        { name: "Social Media Posts / Month", values: ["4", "8", "15", "30", "Unlimited"] },
        { name: "Social Media Video Reels", values: ["✕", "2", "4", "8", "15"] },
        { name: "Project PR", values: ["✕", "✕", "✕", "✓", "✓"] },
        { name: "Marketing Material", values: ["✓", "✓", "✓", "✓", "✓"] },
      ],
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">

      {/* Header */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold">Compare Plans</h2>
        <p className="text-gray-500 mt-2">
          Choose the right subscription for your business growth
        </p>

        <div className="flex justify-center items-center gap-3 mt-4">
          <span className="text-sm">Show all features</span>

          <button
            onClick={() => setShowDiff(!showDiff)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition ${
              showDiff ? "bg-purple-600" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition ${
                showDiff ? "translate-x-6" : ""
              }`}
            />
          </button>

          <span className="text-sm">Differences only</span>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block border rounded-xl overflow-hidden">

        {/* Plan Header */}
        <div className="grid grid-cols-6 bg-gray-50 border-b">
          <div></div>

          {plans.map((plan, i) => (
            <div
              key={i}
              className={`p-4 text-center border-l ${
                plan.popular ? "border-2 border-purple-500 bg-purple-50" : ""
              }`}
            >
              {plan.popular && (
                <div className="text-xs bg-purple-600 text-white px-2 py-1 rounded-full inline-block mb-2">
                  MOST POPULAR
                </div>
              )}

              <p className="font-medium">{plan.name}</p>
              <p className="text-sm text-gray-500">{plan.duration}</p>

              <p className="text-xl font-bold mt-1">{plan.price}</p>

              <button className="mt-3 px-4 py-2 rounded-md border hover:bg-purple-600 hover:text-white">
                Subscribe
              </button>
            </div>
          ))}
        </div>

        {/* Features */}
        {features.map((section, i) => (
          <div key={i}>
            <div className="bg-gray-100 px-4 py-2 font-semibold text-sm">
              {section.category}
            </div>

            {section.items.map((feature, idx) => (
              <div
                key={idx}
                className="grid grid-cols-6 border-t text-sm items-center"
              >
                <div className="p-3 font-medium">{feature.name}</div>

                {feature.values.map((val, j) => (
                  <div key={j} className="text-center p-3 border-l">
                    {val}
                  </div>
                ))}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-6">

        {plans.map((plan, i) => (
          <div
            key={i}
            className={`border rounded-xl p-5 ${
              plan.popular ? "border-purple-500 shadow-md" : ""
            }`}
          >
            {plan.popular && (
              <div className="text-xs bg-purple-600 text-white px-2 py-1 rounded-full inline-block mb-2">
                MOST POPULAR
              </div>
            )}

            <h3 className="font-semibold text-lg">{plan.name}</h3>
            <p className="text-gray-500 text-sm">{plan.duration}</p>

            <p className="text-2xl font-bold mt-2">{plan.price}</p>

            <button className="w-full mt-4 bg-purple-600 text-white py-2 rounded-md">
              Subscribe
            </button>

            <div className="mt-4 space-y-2 text-sm">
              {features.map((section) =>
                section.items.map((feature, idx) => (
                  <div key={idx} className="flex justify-between border-b pb-1">
                    <span className="text-gray-600">{feature.name}</span>
                    <span>{feature.values[i]}</span>
                  </div>
                ))
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}