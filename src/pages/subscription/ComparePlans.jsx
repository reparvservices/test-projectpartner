import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Check, X, ChevronDown } from "lucide-react";
import { useAuth } from "../../store/auth";
import SubscriptionPlan from "../../components/subscription/SubscriptionPlan";

// ── Static comparison data structure ──────────────────────────────────────────
// Each category has a label and rows. Row values can be:
//   true  → show check icon
//   false → show cross icon
//   string → show the string as text


const COMPARE_CATEGORIES = [
  {
    label: "Lead Generation",
    rows: [
      { feature: "Guaranteed Leads", key: "guaranteedLeads" },
      { feature: "Lead Quality Check", key: "leadQualityCheck" },
      { feature: "Site Visits", key: "siteVisits" },
      { feature: "Replacement Policy", key: "replacementPolicy" },
    ],
  },
  {
    label: "Marketing Support",
    rows: [
      { feature: "Social Media Posts", key: "socialMediaPosts" },
      { feature: "Email Campaigns", key: "emailCampaigns" },
      { feature: "WhatsApp Marketing", key: "whatsappMarketing" },
    ],
  },
  {
    label: "CRM & Tracking",
    rows: [
      { feature: "Dashboard Access", key: "dashboardAccess" },
      { feature: "Call Tracking", key: "callTracking" },
      { feature: "Auto Lead Assignment", key: "autoLeadAssignment" },
    ],
  },
  {
    label: "Support & Growth",
    rows: [
      { feature: "Dedicated Account Mgr", key: "dedicatedAccountMgr" },
      { feature: "Priority Support", key: "prioritySupport" },
      { feature: "Response Time", key: "responseTime" },
    ],
  },
  {
    label: "Branding & Visibility",
    rows: [
      { feature: "Featured Projects", key: "featuredProjects" },
      { feature: "Verified Badge", key: "verifiedBadge" },
    ],
  },
];

// ── Map plan features string → structured comparison data ─────────────────────
// Falls back to showing plain feature text if the key doesn't exist in planData
const PLAN_DATA_MAP = {
  "Project Trial": {
    guaranteedLeads: "50",
    leadQualityCheck: true,
    siteVisits: "5",
    replacementPolicy: "10%",
    socialMediaPosts: false,
    emailCampaigns: false,
    whatsappMarketing: false,
    dashboardAccess: true,
    callTracking: true,
    autoLeadAssignment: false,
    dedicatedAccountMgr: false,
    prioritySupport: "Email",
    responseTime: "24 Hrs",
    featuredProjects: false,
    verifiedBadge: false,
  },
  "Project Starter": {
    guaranteedLeads: "150",
    leadQualityCheck: true,
    siteVisits: "15",
    replacementPolicy: "15%",
    socialMediaPosts: "10/mo",
    emailCampaigns: true,
    whatsappMarketing: "5,000",
    dashboardAccess: true,
    callTracking: true,
    autoLeadAssignment: true,
    dedicatedAccountMgr: true,
    prioritySupport: "Call & Email",
    responseTime: "12 Hrs",
    featuredProjects: "2 Slots",
    verifiedBadge: true,
  },
  "Project Standard": {
    guaranteedLeads: "300",
    leadQualityCheck: true,
    siteVisits: "30",
    replacementPolicy: "20%",
    socialMediaPosts: "20/mo",
    emailCampaigns: true,
    whatsappMarketing: "10,000",
    dashboardAccess: true,
    callTracking: true,
    autoLeadAssignment: true,
    dedicatedAccountMgr: true,
    prioritySupport: "Call & Email",
    responseTime: "6 Hrs",
    featuredProjects: "5 Slots",
    verifiedBadge: true,
  },
  "Project Booster": {
    guaranteedLeads: "500",
    leadQualityCheck: true,
    siteVisits: "50",
    replacementPolicy: "25%",
    socialMediaPosts: "30/mo",
    emailCampaigns: true,
    whatsappMarketing: "20,000",
    dashboardAccess: true,
    callTracking: true,
    autoLeadAssignment: true,
    dedicatedAccountMgr: true,
    prioritySupport: "Dedicated Manager",
    responseTime: "4 Hrs",
    featuredProjects: "10 Slots",
    verifiedBadge: true,
  },
  "Project Icon": {
    guaranteedLeads: "Unlimited",
    leadQualityCheck: true,
    siteVisits: "Unlimited",
    replacementPolicy: "30%",
    socialMediaPosts: "Unlimited",
    emailCampaigns: true,
    whatsappMarketing: "Unlimited",
    dashboardAccess: true,
    callTracking: true,
    autoLeadAssignment: true,
    dedicatedAccountMgr: true,
    prioritySupport: "24/7 Hotline",
    responseTime: "1 Hr",
    featuredProjects: "Unlimited",
    verifiedBadge: true,
  },
};

// ── Cell renderer ─────────────────────────────────────────────────────────────
function Cell({ value }) {
  if (value === true)
    return <Check size={18} className="text-[#5E23DC] mx-auto" />;
  if (value === false)
    return <X size={18} className="text-gray-300 mx-auto" />;
  return (
    <span className="text-xs font-semibold text-gray-800 text-center block leading-tight">
      {value}
    </span>
  );
}

// ── Plan Selector Dropdown ────────────────────────────────────────────────────
function PlanSelector({ label, plans, selected, onChange }) {
  const [open, setOpen] = useState(false);
  const current = plans.find((p) => p.planName === selected) || plans[0];

  return (
    <div className="relative">
      <p className="text-[10px] font-bold uppercase tracking-widest text-gray-400 mb-1.5">
        {label}
      </p>
      <button
        onClick={() => setOpen((o) => !o)}
        className="w-full flex items-center justify-between gap-1 bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 text-left"
      >
        <div>
          <p className="text-sm font-semibold text-gray-800 leading-tight truncate max-w-[110px]">
            {current?.planName}
          </p>
          <p className="text-[11px] text-[#5E23DC] font-medium">
            ₹{current?.totalPrice?.toLocaleString?.() ?? current?.totalPrice} •{" "}
            {current?.planDuration}
          </p>
        </div>
        <ChevronDown
          size={16}
          className={`text-gray-400 shrink-0 transition-transform ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className="absolute top-full left-0 right-0 z-20 mt-1 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
          {plans.map((plan) => (
            <button
              key={plan.planName}
              onClick={() => {
                onChange(plan.planName);
                setOpen(false);
              }}
              className={`w-full px-3 py-2.5 text-left hover:bg-purple-50 transition ${
                plan.planName === selected ? "bg-purple-50" : ""
              }`}
            >
              <p className="text-sm font-semibold text-gray-800">{plan.planName}</p>
              <p className="text-[11px] text-[#5E23DC]">
                ₹{plan?.totalPrice?.toLocaleString?.() ?? plan?.totalPrice} •{" "}
                {plan?.planDuration}
              </p>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────
export default function ComparePlans() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { showSubscription, setShowSubscription } = useAuth();

  const plans = state?.plans || [];

  const [planA, setPlanA] = useState(plans[0]?.planName || "");
  const [planB, setPlanB] = useState(plans[1]?.planName || "");
  const [selectedPlan, setSelectedPlan] = useState({});

  const dataA = PLAN_DATA_MAP[planA] || {};
  const dataB = PLAN_DATA_MAP[planB] || {};
  const planAObj = plans.find((p) => p.planName === planA);
  const planBObj = plans.find((p) => p.planName === planB);

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#f6f4fb] to-white">

      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
        <div className="flex items-center px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-gray-100 transition"
          >
            <ArrowLeft size={20} className="text-gray-700" />
          </button>
          <div className="flex-1 text-center">
            <h1 className="text-base font-bold text-gray-900">Compare Plans</h1>
          </div>
          <div className="w-9" />
        </div>

        {/* Plan selectors */}
        <div className="px-4 pb-4 grid grid-cols-2 gap-3">
          <PlanSelector
            label="Plan A"
            plans={plans}
            selected={planA}
            onChange={setPlanA}
          />
          <PlanSelector
            label="Plan B"
            plans={plans}
            selected={planB}
            onChange={setPlanB}
          />
        </div>
      </div>

      {/* Comparison Table */}
      <div className="px-4 py-6 space-y-5 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-4">
        {COMPARE_CATEGORIES.map((cat) => (
          <div
            key={cat.label}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
          >
            {/* Category header */}
            <div className="px-4 py-3 bg-gray-50 border-b border-gray-100">
              <p className="text-sm font-bold text-gray-800">{cat.label}</p>
            </div>

            {/* Rows */}
            {cat.rows.map((row, ri) => (
              <div
                key={row.key}
                className={`grid grid-cols-[1fr_1px_80px_1px_80px] items-center px-4 py-3 ${
                  ri !== cat.rows.length - 1 ? "border-b border-gray-50" : ""
                }`}
              >
                <p className="text-sm text-gray-600 leading-snug pr-2">
                  {row.feature}
                </p>
                {/* divider */}
                <div className="bg-gray-100 self-stretch" />
                <div className="flex items-center justify-center px-2">
                  <Cell value={dataA[row.key] ?? false} />
                </div>
                {/* divider */}
                <div className="bg-gray-100 self-stretch" />
                <div className="flex items-center justify-center px-2">
                  <Cell value={dataB[row.key] ?? false} />
                </div>
              </div>
            ))}
          </div>
        ))}

        {/* CTA Buttons */}
        <div className="col-span-1 lg:col-span-2 grid grid-cols-2 gap-3 pt-2 pb-10">
          <button
            onClick={() => {
              if (planAObj) {
                setSelectedPlan(planAObj);
                setShowSubscription(true);
              }
            }}
            className="py-3 rounded-xl border-2 border-[#5E23DC] text-[#5E23DC] font-semibold text-sm hover:bg-purple-50 transition"
          >
            Get {planA?.split(" ")[1] || "Plan A"}
          </button>
          <button
            onClick={() => {
              if (planBObj) {
                setSelectedPlan(planBObj);
                setShowSubscription(true);
              }
            }}
            className="py-3 rounded-xl bg-[#5E23DC] text-white font-semibold text-sm hover:bg-[#4c1bb5] transition shadow-md"
          >
            Get {planB?.split(" ")[1] || "Plan B"}
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