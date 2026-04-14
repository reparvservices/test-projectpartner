import { useState, useEffect } from "react";
import { Check, ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { useAuth } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import SubscriptionPlan from "../../components/subscription/SubscriptionPlan";
import FormatPrice from "../../components/FormatPrice";

export default function Subscription() {
  const { URI, user, role, showSubscription, setShowSubscription } = useAuth();
  const navigate = useNavigate();

  const isProjectPartner = role === "Project Partner";
  const getBasePath = () => {
    if (role === "Project Partner") return "/project-partner";
    if (role === "Territory Partner") return "/territory-partner";
    return "/sales"; // Sales Partner
  };
  const getPartnerType = () => {
    if (role === "Project Partner") return "Project Partner";
    if (role === "Territory Partner") return "Territory Partner";
    return "Sales Partner";
  };

  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState({});
  const [activeSubscription, setActiveSubscription] = useState(null);
  const [expandedCards, setExpandedCards] = useState({});
  const [loadingPlans, setLoadingPlans] = useState(true);
  const [loadingActive, setLoadingActive] = useState(true);

  const toggleCard = (index) => {
    setExpandedCards((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const fetchPlans = async () => {
    try {
      setLoadingPlans(true);
      const response = await fetch(
        `${URI}/admin/subscription/pricing/plans/${getPartnerType()}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        },
      );
      const data = await response.json();
      setPlans(data);
    } catch (err) {
      console.error("Error fetching plans:", err);
    } finally {
      setLoadingPlans(false);
    }
  };

  const fetchActiveSubscription = async () => {
    try {
      setLoadingActive(true);
      const response = await fetch(
        `${URI}${getBasePath()}/subscription/user/${user?.id}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        },
      );
      const data = await response.json();
      setActiveSubscription(data);
    } catch (err) {
      console.error("Error fetching active subscription:", err);
    } finally {
      setLoadingActive(false);
    }
  };

  useEffect(() => {
    fetchPlans();
    fetchActiveSubscription();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center px-4 pt-5 pb-4 bg-white border-b border-gray-100 sticky top-0 z-10 shadow-sm">
        <button
          onClick={() => navigate(-1)}
          className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
        >
          <ArrowLeft size={20} className="text-gray-700" />
        </button>
        <div className="flex-1 text-center">
          <h1 className="text-base font-bold text-gray-900">
            Choose Your Plan
          </h1>
          <p className="text-xs text-gray-400">Flexible subscription options</p>
        </div>
        {/* Spacer to balance back arrow */}
        <div className="w-9" />
      </div>

      <div className="py-8 md:py-16 px-4 md:px-6">
        {/* Desktop Header */}
        <div className="hidden md:block text-center mb-16">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Choose Your <span className="bg-[#5E23DC] text-white px-5 py-1 rounded-full">Plan</span>
          </h1>
          <p className="text-gray-500 mt-4 text-lg">
            Flexible duration plans designed for business growth
          </p>
        </div>

        {/* Active Subscription Banner */}
        {!loadingActive && activeSubscription && (
          <div className="max-w-3xl mx-auto mb-10 rounded-2xl overflow-hidden border border-[#5E23DC]/20 shadow-lg">
            <div className="bg-gradient-to-r from-[#5E23DC] to-[#8B5CF6] text-white px-6 py-4 flex justify-between items-center">
              <h3 className="font-semibold text-base">Active Subscription</h3>
              <span className="bg-white text-[#5E23DC] text-xs px-3 py-1 rounded-full font-semibold">
                ACTIVE
              </span>
            </div>
            <div className="bg-white p-6">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">
                    {activeSubscription.planName}
                  </h2>
                  <p className="text-gray-400 text-sm mt-0.5">
                    {activeSubscription.planDuration}
                  </p>
                  <div className="text-2xl font-bold text-[#5E23DC] mt-2">
                    <FormatPrice
                      price={parseFloat(activeSubscription?.amount)}
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">
                      Start Date
                    </p>
                    <p className="font-medium text-gray-800">
                      {activeSubscription.start_date}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-400 text-xs uppercase tracking-wide mb-1">
                      Expiry Date
                    </p>
                    <p className="font-medium text-gray-800">
                      {activeSubscription.end_date}
                    </p>
                  </div>
                </div>
              </div>
              <button
                onClick={() => navigate("/app/dashboard")}
                className="mt-5 w-full flex items-center justify-center gap-2 bg-[#5E23DC] text-white py-3 rounded-xl hover:bg-[#4c1bb5] transition font-medium text-sm"
              >
                <ArrowLeft size={15} />
                Go to Dashboard
              </button>
            </div>
          </div>
        )}

        {/* Compare All Plans — Mobile only, ABOVE cards */}
        <div className="md:hidden mb-5">
          <button
            onClick={() =>
              navigate("/app/subscription/compare-plans", { state: { plans } })
            }
            className="w-full flex items-center justify-center gap-2 border-2 border-[#5E23DC] text-[#5E23DC] rounded-2xl py-3.5 font-semibold text-sm hover:bg-[#5E23DC]/10 transition"
          >
            Compare All Plans
            <ArrowRight size={16} />
          </button>
        </div>

        {/* Plan Cards */}
        {loadingPlans ? (
          <div className="flex justify-center items-center py-24">
            <Loader2 className="animate-spin text-[#5E23DC]" size={36} />
          </div>
        ) : (
          <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan, index) => {
              const features = plan?.features?.split(",") || [];
              const visible = expandedCards[index]
                ? features
                : features.slice(0, 4);

              return (
                <div
                  key={index}
                  className={`relative bg-white rounded-2xl border p-6 flex flex-col justify-between transition-all duration-300 hover:shadow-xl ${
                    plan?.highlight === "True"
                      ? "border-2 border-[#5E23DC] shadow-xl md:scale-105"
                      : "border-gray-200"
                  }`}
                >
                  {plan?.highlight === "True" && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                      <span className="bg-[#5E23DC] text-white text-xs font-medium px-4 py-1 rounded-full shadow-md">
                        Recommended
                      </span>
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base font-semibold text-gray-800">
                        {plan?.planName}
                      </h3>
                      <span className="text-xs bg-purple-100 text-[#5E23DC] px-3 py-1 rounded-full font-medium">
                        {plan?.planDuration}
                      </span>
                    </div>

                    <div className="mb-5">
                      <span className="text-3xl font-bold text-gray-900">
                        <FormatPrice price={plan?.totalPrice} />
                      </span>
                      <span className="text-gray-400 text-sm"> /plan</span>
                    </div>

                    <ul className="space-y-2 mb-3">
                      {visible.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start gap-2 text-sm text-gray-600"
                        >
                          <Check
                            size={15}
                            className="text-[#5E23DC] mt-[2px] shrink-0"
                          />
                          {feature.trim()}
                        </li>
                      ))}
                    </ul>

                    {features.length > 4 && (
                      <button
                        onClick={() => toggleCard(index)}
                        className="text-xs font-semibold text-[#5E23DC] hover:underline mb-2"
                      >
                        {expandedCards[index]
                          ? "Show Less"
                          : `+${features.length - 4} more features`}
                      </button>
                    )}
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={() => {
                        setShowSubscription(true);
                        setSelectedPlan(plan);
                      }}
                      className={`w-full py-2.5 rounded-xl font-semibold text-sm transition-all duration-200 ${
                        plan?.highlight === "True"
                          ? "bg-[#5E23DC] text-white hover:bg-[#4c1bb5] shadow-md"
                          : "border border-gray-300 text-gray-700 hover:bg-gray-50"
                      }`}
                    >
                      Subscribe Now
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Compare All Plans — Desktop, BELOW cards */}
        <div className="hidden md:flex justify-center mt-14">
          <button
            onClick={() =>
              navigate("/app/subscription/compare-plans", { state: { plans } })
            }
            className="flex items-center gap-2 border-2 border-[#5E23DC] text-[#5E23DC] rounded-2xl px-8 py-3.5 font-semibold text-sm hover:bg-[#5E23DC]/10 transition"
          >
            Compare All Plans
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <SubscriptionPlan
        showModal={showSubscription}
        setShowModal={setShowSubscription}
        plan={selectedPlan}
      />
    </div>
  );
}
