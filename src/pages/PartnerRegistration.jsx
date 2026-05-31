import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, Shield, Zap, Sparkles, Crown, Star } from "lucide-react";
import RegistrationForm from "../components/partnerPageUpdated/RegistartionForm";

// ─── Plan Summary Card ────────────────────────────────────────────────────────

function PlanSummary({ plan }) {
  if (!plan) return null;

  return (
    <div
      className="rounded-2xl overflow-hidden shadow-lg mb-8"
      style={{
        background: plan.isTrial
          ? "linear-gradient(135deg, #059669 0%, #10b981 100%)"
          : "linear-gradient(135deg, #5E23DC 0%, #7c3aed 100%)",
      }}
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-4">
          {plan.icons && (
            <span
              className="flex h-10 w-10 items-center justify-center rounded-xl"
              style={{ background: "rgba(255,255,255,0.2)" }}
            >
              {plan.icons}
            </span>
          )}
          <div className="flex-1">
            <h3 className="text-lg font-bold text-white leading-tight">
              {plan.name}
            </h3>
            <p className="text-white/65 text-xs capitalize">
              {plan.description}
            </p>
          </div>
          {plan.mostPopular && !plan.isTrial && (
            <span className="inline-flex items-center gap-1 bg-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full">
              <Star size={10} fill="currentColor" /> Popular
            </span>
          )}
          {plan.isTrial && (
            <span className="inline-flex items-center gap-1 bg-white/20 text-white text-[10px] font-bold px-3 py-1 rounded-full">
              <Crown size={10} /> Free Trial
            </span>
          )}
        </div>

        <div className="flex items-baseline gap-2">
          <span className="text-3xl font-extrabold text-white tracking-tight">
            {plan.isTrial
              ? "Free"
              : `₹${Number(plan.billPrice).toLocaleString("en-IN")}`}
          </span>
          {!plan.isTrial && (
            <span className="text-white/60 text-sm">/ billing cycle</span>
          )}
        </div>
        {!plan.isTrial && (
          <p className="text-white/45 text-xs mt-0.5">incl. 18% GST</p>
        )}
      </div>
    </div>
  );
}

// ─── Registration Page ────────────────────────────────────────────────────────

export default function PartnerRegistrationPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Plan can be passed via router state: navigate("/partner-registration", { state: { plan } })
  const plan = location.state?.plan || null;

  return (
    <div className="min-h-screen bg-[#faf9fc]">
      {/* Ambient blobs */}
      <div
        className="pointer-events-none fixed inset-0 overflow-hidden"
        aria-hidden
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#5E23DC]/[0.06] rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-[#a855f7]/[0.05] rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-3xl mx-auto px-4 py-24 sm:py-27">
        {/* Back button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="hidden sm:inline-flex items-center gap-2 mb-4 sm:mb-8 text-xs sm:text-sm font-semibold text-[#5E23DC] border border-[#5E23DC]/25 bg-white hover:bg-[#ede9fe] px-2 sm:px-5 py-1 sm:py-2 rounded-full shadow-sm transition"
        >
          <ArrowLeft size={15} />
          <span className="hidden sm:block">Back to Home</span>
        </button>

        {/* Page header */}
        <div className="w-full sm:mx-auto sm:text-center items-center justify-center mb-10">
          <div className="w-full flex gap-3 ">
            {/* Back button */}
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="inline-flex sm:hidden items-center gap-2 mb-4 sm:mb-8 text-xs sm:text-sm font-semibold text-[#5E23DC] border border-[#5E23DC]/25 bg-white hover:bg-[#ede9fe] px-2 sm:px-5 py-1 sm:py-2 rounded-full shadow-sm transition"
        >
          <ArrowLeft size={15} />
          <span className="hidden sm:block">Back to Home</span>
        </button>
          <div className="sm:mx-auto flex items-center justify-center gap-2 rounded-full border border-[#5E23DC]/15 bg-white px-4 py-1.5 text-xs sm:text-sm font-semibold text-[#5E23DC] shadow-sm mb-4">
            Project Partner Registration
          </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-[#0F172A] mb-2">
            Complete Your Registration
          </h1>
          <p className="text-gray-500 text-sm sm:text-base">
            Fill in your details below to get started as a Project Partner
          </p>

          {/* Trust badges */}
          <div className="mt-5 flex flex-wrap items-center sm:justify-center gap-2">
            {[
              { icon: Zap, label: "Razorpay autopay" },
              { icon: Shield, label: "Secure billing" },
              { icon: Sparkles, label: "Full platform access" },
            ].map(({ icon: Icon, label }) => (
              <span
                key={label}
                className="inline-flex items-center gap-1.5 rounded-full bg-white border border-gray-200/80 px-3 py-1.5 text-xs font-medium text-gray-600 shadow-sm"
              >
                <Icon size={13} className="text-[#5E23DC]" />
                {label}
              </span>
            ))}
          </div>
        </div>

        {/* Selected plan summary (if navigated with plan state) */}
        {plan && <PlanSummary plan={plan} />}

        {/* Registration form card */}
        <RegistrationForm plan={plan} />

        {/* Footer note */}
        <p className="text-center text-xs text-gray-400 mt-6">
          By registering you agree to Reparv's{" "}
          <Link to="/terms-and-conditions" className="text-[#5E23DC] hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy-policy" className="text-[#5E23DC] hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
