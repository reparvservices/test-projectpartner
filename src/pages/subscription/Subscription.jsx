import React from "react";
import { Check } from "lucide-react";

export default function Subscription() {
  const plans = [
    {
      name: "Project Trial",
      duration: "_CAN_1 Month",
      price: "₹8,259",
      recommended: false,
    },
    {
      name: "Project Starter",
      duration: "3 Months",
      price: "₹53,098",
      recommended: false,
    },
    {
      name: "Project Standard",
      duration: "6 Months",
      price: "₹1,16,819",
      recommended: true,
    },
    {
      name: "Project Booster",
      duration: "9 Months",
      price: "₹1,73,459",
      recommended: false,
    },
    {
      name: "Project Icon",
      duration: "12 Months",
      price: "₹3,42,199",
      recommended: false,
    },
  ];

  const features = [
    "Leads Included",
    "Site Visits",
    "CRM & Follow-up",
    "AI Lead Filtration",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6f4fb] to-white py-16 px-6">
      {/* Header */}
      <div className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
          Choose Your <span className="text-[#5E23DC]">Plan</span>
        </h1>
        <p className="text-gray-500 mt-4 text-lg">
          Flexible duration plans designed for business growth
        </p>
      </div>

      {/* Plans */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
        {plans.map((plan, index) => (
          <div
            key={index}
            className={`relative bg-white rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${
              plan.recommended
                ? "border-2 border-[#5E23DC] shadow-xl scale-105"
                : "border-gray-200"
            }`}
          >
            {plan.recommended && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="bg-[#5E23DC] text-white text-xs font-medium px-4 py-1 rounded-full shadow-md">
                  Recommended
                </span>
              </div>
            )}

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {plan.name}
                </h3>
                <span className="text-xs bg-purple-100 text-[#5E23DC] px-3 py-1 rounded-full font-medium">
                  {plan.duration}
                </span>
              </div>

              <div className="mb-6">
                <span className="text-3xl font-bold text-gray-900">
                  {plan.price}
                </span>
                <span className="text-gray-500 text-sm"> /plan</span>
              </div>

              <ul className="space-y-3 mb-8">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-center gap-2 text-sm text-gray-700">
                    <Check size={16} className="text-[#5E23DC]" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <button
                className={`w-full py-2.5 rounded-xl font-medium transition-all duration-200 ${
                  plan.recommended
                    ? "text-white shadow-md"
                    : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                }`}
                style={
                  plan.recommended
                    ? { backgroundColor: "#5E23DC" }
                    : {}
                }
              >
                Subscribe
              </button>

              <p className="text-center text-sm text-[#5E23DC] mt-4 cursor-pointer hover:underline">
                View Details
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Bottom Link */}
      <div className="text-center mt-16">
        <button className="text-[#5E23DC] font-medium hover:underline">
          Compare all features →
        </button>
      </div>
    </div>
  );
}