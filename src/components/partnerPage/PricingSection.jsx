import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { FiArrowUpLeft } from "react-icons/fi";
import RegistrationForm from "../partnerPageUpdated/RegistartionForm";
import { planIcons } from "../../utils";
import PricingCard from "../partnerPageUpdated/PricingCard";
import { useAuth } from "../../store/auth";
import ContactForm from "./ContactForm";

export default function PricingSection({ auth }) {
  const { URI, setSuccessScreen } = useAuth();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedPlans, setExpandedPlans] = useState({});
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [couponState, setCouponState] = useState({});
  const [redeemConfirm, setRedeemConfirm] = useState(null);
  const [showContactForm, setShowContactForm] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  // structure: { plan, code, discount }

  const sliderRef = useRef(null);

  const toggleFeatures = (id) => {
    setExpandedPlans((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const updateCouponState = (planId, newState) => {
    setCouponState((prev) => ({
      ...prev,
      [planId]: { ...prev[planId], ...newState },
    }));
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${URI}/admin/subscription/pricing/plans/Project%20Partner`,
        { headers: { Authorization: `Bearer ${auth?.token}` } },
      );

      const activePlans = res.data.filter(
        (p) => p.partnerType === "Project Partner" && p.status === "Active",
      );

      const uniquePlansMap = new Map();
      activePlans.forEach((plan) => {
        if (
          !uniquePlansMap.has(plan.planDuration) ||
          plan.highlight === "True"
        ) {
          uniquePlansMap.set(plan.planDuration, plan);
        }
      });

      let formattedPlans = Array.from(uniquePlansMap.values()).map(
        (item, index) => {
          const features = item.features
            ? item.features.split(",").map((f) => f.trim())
            : [];
          return {
            id: item.id,
            name: item.planName,
            description: `${item.planDuration} `,
            monthlyPrice: `₹${item.totalPrice}`,
            totalPrice: `${item.totalPrice}`,
            yearlyPrice: `₹${Math.round(
              (item.totalPrice / parseInt(item.planDuration)) * 12,
            )}`,
            billPrice: `${item.totalPrice}`,
            features,
            mostPopular: item.highlight === "True",
            iconBg:
              index === 1
                ? "linear-gradient(135deg, #5E23DC 0%, #854DFB 100%)"
                : "linear-gradient(135deg, #AD46FF 0%, #9810FA 100%)",
            buttonText: "Choose Plan",
            buttonClass:
              item.highlight === "True"
                ? "bg-[#5E23DC] text-white"
                : "border border-[#5E23DC] text-[#5E23DC] hover:bg-[#5E23DC] hover:text-white",
            icons: planIcons[item.planDuration] || (
              <svg width="24" height="24" fill="none">
                <circle
                  cx="12"
                  cy="12"
                  r="9"
                  stroke="white"
                  strokeWidth="2.5"
                />
              </svg>
            ),
          };
        },
      );

      // Add Free Trial Plan
      const freeTrialPlan = {
        id: "free-trial",
        name: "7-Day Free Trial",
        description: "7 Days",
        monthlyPrice: "Free",
        totalPrice: "0",
        yearlyPrice: "Free",
        billPrice: "0",
        features: ["All Features Included"],
        mostPopular: false,
        iconBg: "linear-gradient(135deg, #AD46FF 0%, #9810FA 100%)",
        buttonText: "Start Free Trial",
        buttonClass:
          "border border-[#5E23DC] text-[#5E23DC] hover:bg-[#5E23DC] hover:text-white",
        icons: (
          <svg
            width="24"
            height="24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="12" cy="12" r="10" stroke="#ffffff" strokeWidth="2.9" />
          </svg>
        ),
      };

      formattedPlans.unshift(freeTrialPlan);

      // Order: Free → Most Popular → Rest
      const freePlan = formattedPlans.find((p) => p.totalPrice === "0");
      const mostPopularPlan = formattedPlans.find(
        (p) => p.mostPopular && p.totalPrice !== "0",
      );
      const remainingPlans = formattedPlans.filter(
        (p) => p !== freePlan && p !== mostPopularPlan,
      );
      const orderedPlans = [
        ...(freePlan ? [freePlan] : []),
        ...(mostPopularPlan ? [mostPopularPlan] : []),
        ...remainingPlans,
      ];

      setPlans(orderedPlans);

      // Initialize coupon state
      const initialCouponState = {};
      orderedPlans.forEach((plan) => {
        initialCouponState[plan.id] = {
          redeemCode: "",
          couponMsg: "",
          isApplying: false,
        };
      });
      setCouponState(initialCouponState);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const generateUniqueId = () => {
    return Math.floor(1000 + Math.random() * 9000);
  };

  const handleRedeem = async (plan, code) => {
    if (!code.trim()) {
      window.alert("Enter a redeem code");
      return;
    }

    let userId = localStorage.getItem("userId");
    if (!userId) {
      userId = Math.floor(1000 + Math.random() * 9000);
      localStorage.setItem("userId", userId);
    }

    updateCouponState(plan.id, { isApplying: true, couponMsg: "" });

    try {
      const res = await axios.post(
        `${URI}/projectpartner/subscription/validate`,
        {
          user_id: userId,
          code: code.trim(),
          planid: plan.id,
        },
      );

      if (res.data.success) {
        const discount = Number(res.data.discount || 0);

        // 👉 OPEN CONFIRM POPUP (do NOT apply yet)
        setRedeemConfirm({
          plan,
          code,
          discount,
        });
      } else {
        updateCouponState(plan.id, {
          couponMsg: res.data.message || "Invalid Code",
        });
      }
    } catch (err) {
      console.error(err);
      updateCouponState(plan.id, { couponMsg: "Something went wrong" });
    } finally {
      updateCouponState(plan.id, { isApplying: false });
    }
  };
  const confirmRedeem = () => {
    if (!redeemConfirm) return;

    const { plan, discount } = redeemConfirm;

    const originalPrice = Number(plan.billPrice);
    const discountedPrice = Number(originalPrice - discount, 0);

    const updatedPlan = {
      ...plan,
      totalPrice: discountedPrice,
      billPrice: discountedPrice,
      monthlyPrice: `₹${discountedPrice}`,
    };

    // Update plans list
    setPlans((prev) => prev.map((p) => (p.id === plan.id ? updatedPlan : p)));

    // Update selected plan AFTER continue
    setSelectedPlan(updatedPlan);

    updateCouponState(plan.id, {
      couponMsg: `Coupon Applied: ₹${discount} OFF`,
    });

    setRedeemConfirm(null); // close popup
  };
  const cancelRedeem = () => {
    setRedeemConfirm(null);
  };

  const handleChoosePlan = (plan) => setSelectedPlan(plan);

  // Selected plan registration
  if (selectedPlan) {
    return (
      <div className="bg-white min-h-screen w-full py-10 sm:py-10">
        <div className="w-full sm:max-w-6xl mx-auto bg-white px-0 sm:px-6">
          <div className="flex flex-col items-center text-center mb-6 px-4 sm:px-0">
            <button
              type="button"
              onClick={() => setSelectedPlan(null)}
              className="max-w-[220px] flex gap-1 items-center justify-center mb-4 bg-[#5E23DC] px-4 pl-5 py-1.5 rounded-full text-white cursor-pointer transition hover:scale-105 active:scale-95"
            >
              <span className="font-semibold">Go Back to Plans</span>
              <FiArrowUpLeft className="w-5 h-5" />
            </button>

            <h2 className="text-lg sm:text-xl lg:text-3xl font-bold text-black mb-2">
              You selected the{" "}
              <span className="text-[#5E23DC]">{selectedPlan.name}</span> plan
            </h2>

            <p className="text-gray-600 text-sm sm:text-base mb-1">
              Fill out the form below to register as a Project Partner
            </p>

            <p className="text-center text-black font-semibold text-sm sm:text-base">
              Duration: {selectedPlan.description} | Price: ₹
              {selectedPlan.billPrice}
            </p>

            <div className="w-16 sm:w-20 h-1 bg-[#5E23DC] mx-auto mt-3 rounded" />
          </div>

          <div className="w-full">
            <RegistrationForm plan={selectedPlan} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <section id="pricing" className="w-full bg-[#F8FAFF] py-20 px-4">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-[#0F172A]">
          Choose Your Plan
        </h2>
        <p className="mt-2 text-gray-600 text-sm lg:text-lg">
          Flexible pricing designed to scale with your business
        </p>

        {/* MOBILE SLIDER */}
        <div className="mt-10 md:hidden">
          {loading ? (
            <div className="flex gap-4 overflow-x-auto">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="min-w-[85%] bg-white rounded-2xl p-8 border animate-pulse"
                />
              ))}
            </div>
          ) : (
            <>
              <div
                className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
                ref={sliderRef}
                onScroll={(e) => {
                  const index = Math.round(
                    e.target.scrollLeft / e.target.clientWidth,
                  );
                  setActiveIndex(index);
                }}
              >
                {plans.map((plan) => (
                  <div
                    key={plan.id}
                    className="w-[98%] snap-center flex-shrink-0"
                  >
                    <PricingCard
                      plan={plan}
                      expandedPlans={expandedPlans}
                      toggleFeatures={toggleFeatures}
                      redeemCode={couponState[plan.id]?.redeemCode || ""}
                      couponMsg={couponState[plan.id]?.couponMsg || ""}
                      isApplying={couponState[plan.id]?.isApplying || false}
                      setRedeemCode={(val) =>
                        updateCouponState(plan.id, { redeemCode: val })
                      }
                      setCouponMsg={(val) =>
                        updateCouponState(plan.id, { couponMsg: val })
                      }
                      setIsApplying={(val) =>
                        updateCouponState(plan.id, { isApplying: val })
                      }
                      onChoose={handleChoosePlan}
                      handleRedeem={handleRedeem}
                    />
                  </div>
                ))}
              </div>

              {/* DOTS */}
              <div className="flex justify-center gap-2 mt-4">
                {plans.map((_, i) => (
                  <span
                    key={i}
                    className={`h-2 rounded-full transition-all ${
                      i === activeIndex
                        ? "bg-[#5E23DC] w-6"
                        : "bg-[#D6C8FA] w-2"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>

        {/* DESKTOP GRID */}
        <div className="hidden md:grid mt-10 grid-cols-1 md:grid-cols-3 gap-8">
          {loading
            ? [1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="bg-white rounded-2xl p-8 border animate-pulse"
                />
              ))
            : plans.map((plan) => (
                <PricingCard
                  key={plan.id}
                  plan={plan}
                  expandedPlans={expandedPlans}
                  toggleFeatures={toggleFeatures}
                  redeemCode={couponState[plan.id]?.redeemCode || ""}
                  couponMsg={couponState[plan.id]?.couponMsg || ""}
                  isApplying={couponState[plan.id]?.isApplying || false}
                  setRedeemCode={(val) =>
                    updateCouponState(plan.id, { redeemCode: val })
                  }
                  setCouponMsg={(val) =>
                    updateCouponState(plan.id, { couponMsg: val })
                  }
                  setIsApplying={(val) =>
                    updateCouponState(plan.id, { isApplying: val })
                  }
                  onChoose={handleChoosePlan}
                  handleRedeem={handleRedeem}
                />
              ))}
        </div>

        {redeemConfirm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-3xl p-7 w-[92%] max-w-sm text-center shadow-2xl animate-[scaleIn_0.2s_ease-out]">
              {/* ICON */}
              <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-[#EEE6FF]">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M20 7L10 17L5 12"
                    stroke="#5E23DC"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              {/* TITLE */}
              <h3 className="text-xl font-bold text-gray-900 mb-1">
                Confirm Coupon
              </h3>

              <p className="text-gray-500 text-sm mb-5">
                You’re about to apply a discount
              </p>

              {/* DISCOUNT INFO */}
              <div className="bg-[#F5F2FF] rounded-xl p-4 mb-6">
                <p className="text-sm text-gray-600">You will save</p>

                <p className="text-2xl font-bold text-[#5E23DC] mt-1">
                  ₹{redeemConfirm.discount}
                </p>

                <p className="text-xs text-gray-500 mt-1">
                  on this subscription plan
                </p>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex gap-3">
                <button
                  onClick={cancelRedeem}
                  className="w-1/2 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-100 transition"
                >
                  Cancel
                </button>

                <button
                  onClick={confirmRedeem}
                  className="w-1/2 py-2.5 rounded-xl bg-[#5E23DC] text-white font-semibold hover:bg-[#4b1bb4] transition shadow-md"
                >
                  Continue
                </button>
              </div>
            </div>
          </div>
        )}

        <p className="mt-12 text-gray-700 text-sm">
          Need a custom plan for your organization?
        </p>
        <button
          onClick={() => {
            setShowContactForm(true);
          }}
          className="mt-3 inline-flex items-center justify-center w-[295px] h-[46px] bg-[#5E23DC] rounded-[11px] text-white font-semibold hover:bg-[#4b1bb4]"
        >
          Contact Reparv Sales →
        </button>
      </div>
      {showContactForm && (
        <ContactForm onClose={() => setShowContactForm(false)} />
      )}
    </section>
  );
}
