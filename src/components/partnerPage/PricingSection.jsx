import { useState, useEffect, useRef } from "react";
import axios from "axios";
import {
  Check,
  Sparkles,
  Shield,
  Zap,
  ChevronLeft,
  ChevronRight,
  Crown,
  ArrowLeft,
} from "lucide-react";
import { useAuth } from "../../store/auth";
import { planIcons } from "../../utils";
import RegistrationForm from "../partnerPageUpdated/RegistartionForm";

const DEFAULT_FEATURES = [
  "Leads Included",
  "Site Visits",
  "CRM & Follow-up",
  "AI Lead Filtration",
];

const TRUST_ITEMS = [
  { icon: Zap, label: "Razorpay autopay" },
  { icon: Shield, label: "Secure billing" },
  { icon: Sparkles, label: "Full platform access" },
];

function parseFeatures(plan) {
  if (typeof plan?.features === "string" && plan.features.trim()) {
    return plan.features.split(",").map((f) => f.trim()).filter(Boolean);
  }
  if (Array.isArray(plan?.features) && plan.features.length) {
    return plan.features;
  }
  return DEFAULT_FEATURES;
}

function recommendedPlanIndex(plans) {
  if (!plans?.length) return -1;
  const byHighlight = plans.findIndex((p) => p?.mostPopular === true);
  if (byHighlight >= 0) return byHighlight;
  return Math.min(1, plans.length - 1);
}

function gridClass(count) {
  if (count <= 1) return "max-w-md mx-auto grid-cols-1";
  if (count === 2) return "max-w-3xl mx-auto grid-cols-1 md:grid-cols-2";
  return "max-w-6xl mx-auto grid-cols-1 md:grid-cols-2 xl:grid-cols-3";
}

function PlanCardSkeleton() {
  return (
    <div className="rounded-3xl border border-gray-100 bg-white p-7 animate-pulse min-h-[380px] flex flex-col">
      <div className="h-4 bg-gray-100 rounded w-2/3 mb-4" />
      <div className="h-10 bg-gray-100 rounded w-1/2 mb-8" />
      <div className="space-y-3 flex-1">
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className="h-3 bg-gray-50 rounded w-full" />
        ))}
      </div>
      <div className="h-11 bg-gray-100 rounded-xl mt-6" />
    </div>
  );
}

function PlanCard({ plan, index, isRecommended, onChoose }) {
  const features = parseFeatures(plan);
  const visible = features.slice(0, 5);
  const extra = features.length - 5;

  return (
    <article
      className={`relative flex flex-col h-full rounded-3xl bg-white transition-all duration-300 ${
        isRecommended
          ? "ring-2 ring-[#5E23DC] shadow-xl shadow-[#5E23DC]/15 scale-[1.02] z-[1]"
          : "border border-gray-200/80 shadow-sm hover:shadow-lg hover:border-[#5E23DC]/20"
      }`}
      style={{
        animation: `fadeSlideUp 0.4s ease both`,
        animationDelay: `${index * 70}ms`,
      }}
    >
      {isRecommended && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <span className="inline-flex items-center gap-1.5 text-white text-[11px] font-bold px-4 py-1.5 rounded-full shadow-md bg-gradient-to-r from-[#5E23DC] to-[#7c3aed]">
            <Sparkles size={12} />
            Most popular
          </span>
        </div>
      )}

      {plan.isTrial && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
          <span className="inline-flex items-center gap-1.5 text-white text-[11px] font-bold px-4 py-1.5 rounded-full shadow-md bg-emerald-500">
            <Crown size={12} />
            Free trial
          </span>
        </div>
      )}

      <div className="p-7 pt-9 flex flex-col flex-1">
        <div className="mb-1 flex items-center gap-2">
          {plan.icons && (
            <span className="flex h-9 w-9 items-center justify-center rounded-xl" style={{ background: plan.iconBg }}>
              {plan.icons}
            </span>
          )}
          <div>
            <h3 className="text-lg font-bold text-gray-900 tracking-tight leading-tight">
              {plan.name}
            </h3>
            <p className="text-xs text-gray-400 capitalize">{plan.description}</p>
          </div>
        </div>

        <div className="my-5 pb-5 border-b border-gray-100">
          <div className="flex items-baseline gap-1">
            <span className="text-4xl font-extrabold text-gray-900 tracking-tight">
              {plan.isTrial ? "Free" : `₹${Number(plan.totalPrice).toLocaleString("en-IN")}`}
            </span>
          </div>
          {!plan.isTrial && (
            <p className="text-xs text-gray-400 mt-1">per billing cycle · incl. 18% GST</p>
          )}
        </div>

        <ul className="space-y-3 mb-7 flex-1">
          {visible.map((feature, i) => (
            <li key={i} className="flex items-start gap-2.5 text-[13px] text-gray-600">
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#EDE9FE]">
                <Check size={12} className="text-[#5E23DC]" strokeWidth={3} />
              </span>
              <span className="leading-snug pt-0.5">{String(feature)}</span>
            </li>
          ))}
          {extra > 0 && (
            <li className="text-xs text-[#5E23DC] font-medium pl-7">
              + {extra} more features
            </li>
          )}
        </ul>

        <button
          type="button"
          onClick={() => onChoose(plan)}
          className={`mt-auto w-full py-3 rounded-xl font-semibold text-sm transition-all active:scale-[0.98] ${
            isRecommended
              ? "text-white shadow-md hover:shadow-lg bg-gradient-to-r from-[#5E23DC] to-[#7c3aed]"
              : plan.isTrial
              ? "bg-emerald-600 text-white hover:bg-emerald-700"
              : "bg-gray-900 text-white hover:bg-gray-800"
          }`}
        >
          {plan.isTrial ? "Start Free Trial" : "Choose Plan"}
        </button>
      </div>
    </article>
  );
}

export default function PricingSection() {
  const { URI } = useAuth();
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const sliderRef = useRef(null);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      setLoading(true);
      const res = await axios.get(
        `${URI}/api/subscription/partner-plans/${encodeURIComponent("Project Partner")}`,
      );
      const rows = Array.isArray(res.data) ? res.data : [];

      const formatted = rows.map((item, index) => {
        const isTrial =
          String(item.plan_type || item.planType || "").toLowerCase() === "trial";
        const features = item.features
          ? item.features.split(",").map((f) => f.trim())
          : DEFAULT_FEATURES;

        return {
          id: item.id,
          plan_type: item.plan_type || item.planType,
          isTrial,
          name: item.planName,
          description: item.planDuration || "",
          totalPrice: isTrial ? "0" : `${item.totalPrice}`,
          billPrice: isTrial ? "0" : `${item.totalPrice}`,
          basePrice: item.basePrice,
          gstAmount: item.gstAmount,
          features,
          mostPopular: item.highlight === "True",
          iconBg:
            index % 2 === 1
              ? "linear-gradient(135deg, #5E23DC 0%, #854DFB 100%)"
              : "linear-gradient(135deg, #AD46FF 0%, #9810FA 100%)",
          icons: planIcons[item.planDuration] || (
            <svg width="20" height="20" fill="none">
              <circle cx="10" cy="10" r="7.5" stroke="white" strokeWidth="2" />
            </svg>
          ),
        };
      });

      // Order: Trial first → Most popular → Rest
      const trialPlans = formatted.filter((p) => p.isTrial);
      const popularPlans = formatted.filter((p) => p.mostPopular && !p.isTrial);
      const rest = formatted.filter((p) => !p.isTrial && !p.mostPopular);
      setPlans([...trialPlans, ...popularPlans, ...rest]);
    } catch (err) {
      console.error(err);
      setPlans([]);
    } finally {
      setLoading(false);
    }
  };

  const scrollPlans = (dir) => {
    const el = sliderRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * el.clientWidth * 0.88, behavior: "smooth" });
  };

  const recIndex = recommendedPlanIndex(plans);

  // Registration view
  if (selectedPlan) {
    return (
      <section className="w-full bg-white min-h-screen py-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="flex flex-col items-center text-center mb-8">
            <button
              type="button"
              onClick={() => setSelectedPlan(null)}
              className="flex items-center gap-2 mb-5 text-sm font-semibold text-[#5E23DC] border border-[#5E23DC]/30 bg-[#faf8ff] hover:bg-[#ede9fe] px-5 py-2 rounded-full transition"
            >
              <ArrowLeft size={16} />
              Back to Plans
            </button>

            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              You selected the{" "}
              <span className="text-[#5E23DC]">{selectedPlan.name}</span> plan
            </h2>
            <p className="text-gray-500 text-sm sm:text-base mb-1">
              Fill out the form below to register as a Project Partner
            </p>
            <p className="text-gray-800 font-semibold text-sm">
              Duration: {selectedPlan.description}
              {!selectedPlan.isTrial && ` · Price: ₹${Number(selectedPlan.billPrice).toLocaleString("en-IN")}`}
            </p>
            <div className="w-16 h-1 bg-[#5E23DC] mx-auto mt-4 rounded-full" />
          </div>

          <RegistrationForm plan={selectedPlan} />
        </div>
      </section>
    );
  }

  // Pricing view
  return (
    <>
      <style>{`
        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <section id="pricing" className="relative w-full bg-[#faf9fc] py-20 px-4 overflow-hidden">
        {/* Ambient blobs */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden>
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#5E23DC]/[0.07] rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-0 w-[350px] h-[350px] bg-[#a855f7]/[0.05] rounded-full blur-3xl" />
        </div>

        <div className="relative max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#5E23DC]/15 bg-white px-4 py-1.5 text-xs font-semibold text-[#5E23DC] shadow-sm mb-5">
              Project Partner Plans
            </span>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-gray-900 tracking-tight">
              Choose Your Plan
            </h2>
            <p className="mt-3 text-gray-500 text-base sm:text-lg leading-relaxed">
              Flexible pricing designed to scale with your business
            </p>

            {/* Trust badges */}
            <div className="mt-6 flex flex-wrap items-center justify-center gap-2 sm:gap-3">
              {TRUST_ITEMS.map(({ icon: Icon, label }) => (
                <span
                  key={label}
                  className="inline-flex items-center gap-1.5 rounded-full bg-white border border-gray-200/80 px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm"
                >
                  <Icon size={14} className="text-[#5E23DC]" />
                  {label}
                </span>
              ))}
            </div>
          </div>

          {/* Mobile carousel */}
          <div className="lg:hidden relative -mx-4 sm:mx-0">
            <div className="flex justify-end gap-2 mb-3 px-4 sm:px-0">
              <button
                type="button"
                onClick={() => scrollPlans(-1)}
                aria-label="Previous plan"
                className="w-9 h-9 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center text-gray-600"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                type="button"
                onClick={() => scrollPlans(1)}
                aria-label="Next plan"
                className="w-9 h-9 rounded-full border border-gray-200 bg-white shadow-sm flex items-center justify-center text-gray-600"
              >
                <ChevronRight size={18} />
              </button>
            </div>
            <div
              ref={sliderRef}
              className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 px-4 scroll-smooth scrollbar-hide"
              onScroll={(e) => {
                const idx = Math.round(
                  e.target.scrollLeft / (e.target.clientWidth * 0.88),
                );
                setActiveIndex(idx);
              }}
            >
              {loading
                ? [1, 2, 3].map((i) => (
                    <div key={i} className="snap-center shrink-0 w-[min(88vw,340px)]">
                      <PlanCardSkeleton />
                    </div>
                  ))
                : plans.map((plan, index) => (
                    <div
                      key={plan.id ?? index}
                      className="snap-center shrink-0 w-[min(88vw,340px)]"
                    >
                      <PlanCard
                        plan={plan}
                        index={index}
                        isRecommended={plan.mostPopular || index === recIndex}
                        onChoose={setSelectedPlan}
                      />
                    </div>
                  ))}
            </div>
            {!loading && plans.length > 1 && (
              <div className="flex justify-center gap-2 mt-3">
                {plans.map((_, i) => (
                  <span
                    key={i}
                    className={`h-2 rounded-full transition-all ${
                      i === activeIndex ? "bg-[#5E23DC] w-6" : "bg-[#D6C8FA] w-2"
                    }`}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Desktop grid */}
          {loading ? (
            <div className={`hidden lg:grid gap-6 ${gridClass(3)}`}>
              {[1, 2, 3].map((i) => (
                <PlanCardSkeleton key={i} />
              ))}
            </div>
          ) : plans.length === 0 ? (
            <div className="text-center py-20 px-6 max-w-md mx-auto rounded-3xl bg-white border border-gray-100 shadow-sm">
              <p className="text-gray-900 font-semibold text-lg">No plans available</p>
              <p className="text-gray-500 text-sm mt-2 leading-relaxed">
                No active plans for Project Partner. Please contact your admin.
              </p>
            </div>
          ) : (
            <div className={`hidden lg:grid gap-6 ${gridClass(plans.length)}`}>
              {plans.map((plan, index) => (
                <PlanCard
                  key={plan.id ?? index}
                  plan={plan}
                  index={index}
                  isRecommended={plan.mostPopular || index === recIndex}
                  onChoose={setSelectedPlan}
                />
              ))}
            </div>
          )}

          {/* Bottom CTA */}
          {!loading && plans.length > 0 && (
            <div className="mt-14 text-center">
              <p className="text-sm text-gray-500 mb-2">
                Need a custom plan for your organization?
              </p>
              <a
                href="mailto:sales@reparv.in"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-2xl text-sm font-semibold border-2 border-[#5E23DC]/30 text-[#5E23DC] bg-white hover:bg-[#faf8ff] transition shadow-sm"
              >
                Contact Reparv Sales →
              </a>
            </div>
          )}
        </div>
      </section>
    </>
  );
}