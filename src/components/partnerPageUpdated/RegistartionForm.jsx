import React, { useState, useEffect } from "react";
import { useAuth } from "../../store/auth";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 

const RegistrationForm = ({ plan }) => {
  const navigate = useNavigate(); 
  const { URI } = useAuth();

  const [newPartner, setNewPartner] = useState({
    fullname: "",
    contact: "",
    email: "",
    state: "",
    city: "",
    intrest: "",
    refrence: "",
    username: "",
    password: "",
  });

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const fetchStates = async () => {
    try {
      const response = await fetch(`${URI}/admin/states`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setStates(data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchCities = async () => {
    try {
      const response = await fetch(
        `${URI}/admin/cities/${newPartner.state}`,
        {
          method: "GET",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
        },
      );
      const data = await response.json();
      setCities(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {
    if (newPartner.state) fetchCities();
  }, [newPartner.state]);

  const isTrial =
    String(plan?.plan_type || plan?.planType || "").toLowerCase() === "trial" ||
    Number(plan?.totalPrice) === 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!newPartner.username || !newPartner.password) {
      setError("Please provide a username and password.");
      return;
    }

    setSubmitting(true);

    try {
      // Step 1: Register the partner
      const response = await fetch(`${URI}/admin/projectpartner/add`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPartner),
      });

      if (!response.ok) {
        const errorRes = await response.json();
        setError(errorRes.message || "Registration failed. Please try again.");
        setSubmitting(false);
        return;
      }

      const res = await response.json();
      const userId = res.Id;

      // Step 2: If trial plan, activate it
      if (isTrial && plan?.id) {
        try {
          await axios.post(
            `${URI}/projectpartner/subscription/activate-trial/${userId}`,
            {
              plan_id: Number(plan.id),
              username: newPartner.username,
              password: newPartner.password,
            },
          );
        } catch (trialErr) {
          console.error("Trial activation error:", trialErr);
          // Non-blocking — registration already succeeded, redirect anyway
        }
      }

      // Step 3: Redirect to login page
      navigate("/login");
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = `
    w-full h-[52px]
    px-4
    bg-white/90 backdrop-blur
    text-sm sm:text-base font-medium
    text-slate-900 placeholder:text-slate-400
    border border-slate-200
    rounded-xl
    shadow-sm
    transition-all duration-200
    focus:outline-none
    focus:border-[#5E23DC]
    focus:ring-4 focus:ring-[#5E23DC]/10
    hover:border-slate-300
  `;

  return (
    <div className="min-h-screen w-full flex justify-center">
      <form
        onSubmit={handleSubmit}
        className="
          w-full
          min-h-screen
          sm:min-h-0
          sm:max-w-4xl
          bg-white/80
          backdrop-blur-xl
          border border-slate-200
          overflow-hidden
          shadow-none
          rounded-2xl
          sm:rounded-3xl
          sm:shadow-[0_20px_60px_-20px_rgba(94,35,220,0.35)]
        "
      >
        {/* HEADER */}
        <div className="relative px-6 sm:px-10 py-8 bg-gradient-to-r from-[#5E23DC] to-[#7C3AED] text-white">
          <div className="absolute inset-0 bg-white/5 backdrop-blur" />
          <div className="relative">
            <h3 className="text-xl sm:text-3xl font-bold tracking-tight">
              Become a Project Partner
            </h3>
            <p className="text-sm sm:text-base opacity-90 mt-2 max-w-xl">
              {isTrial
                ? "Fill in your details to start your free trial instantly."
                : `Fill in your details to register for the ${plan?.name || "selected"} plan.`}
            </p>
          </div>
        </div>

        {/* FORM BODY */}
        <div className="p-6 sm:p-10 space-y-8">

          {/* Error banner */}
          {error && (
            <div className="flex items-start gap-3 rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              <span className="mt-0.5 shrink-0">⚠️</span>
              <span>{error}</span>
            </div>
          )}

          {/* Plan summary pill */}
          {plan?.name && (
            <div className="flex items-center gap-3 rounded-xl bg-[#faf8ff] border border-[#5E23DC]/20 px-4 py-3">
              <span className="text-sm text-gray-600">
                Selected plan:
              </span>
              <span className="font-semibold text-[#5E23DC] text-sm">
                {plan.name}
              </span>
              {plan.description && (
                <span className="text-xs text-gray-400">· {plan.description}</span>
              )}
              <span className="ml-auto text-sm font-bold text-gray-800">
                {isTrial ? "Free" : `₹${Number(plan.totalPrice).toLocaleString("en-IN")}`}
              </span>
            </div>
          )}

          {/* PERSONAL */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
              Personal Information
            </h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="Full Name"
                value={newPartner.fullname}
                onChange={(e) =>
                  setNewPartner({ ...newPartner, fullname: e.target.value })
                }
                className={inputClass}
              />
              <input
                type="text"
                required
                minLength={10}
                maxLength={10}
                placeholder="Phone Number"
                value={newPartner.contact}
                onChange={(e) => {
                  if (/^\d{0,10}$/.test(e.target.value)) {
                    setNewPartner({ ...newPartner, contact: e.target.value });
                  }
                }}
                className={inputClass}
              />
            </div>
            <input
              type="email"
              required
              placeholder="Email Address"
              value={newPartner.email}
              onChange={(e) =>
                setNewPartner({ ...newPartner, email: e.target.value })
              }
              className={inputClass}
            />
          </div>

          {/* LOCATION */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
              Location Details
            </h4>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <select
                required
                value={newPartner.state}
                onChange={(e) =>
                  setNewPartner({ ...newPartner, state: e.target.value })
                }
                className={`${inputClass} appearance-none`}
              >
                <option value="">Select State</option>
                {states.map((s, i) => (
                  <option key={i} value={s.state}>
                    {s.state}
                  </option>
                ))}
              </select>
              <select
                required
                value={newPartner.city}
                onChange={(e) =>
                  setNewPartner({ ...newPartner, city: e.target.value })
                }
                className={`${inputClass} appearance-none`}
              >
                <option value="">Select City</option>
                {cities.map((c, i) => (
                  <option key={i} value={c.city}>
                    {c.city}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* CREDENTIALS */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
              Account Credentials
            </h4>
            <input
              type="text"
              required
              placeholder="Choose Username"
              value={newPartner.username}
              onChange={(e) =>
                setNewPartner({ ...newPartner, username: e.target.value })
              }
              className={inputClass}
            />
            <input
              type="password"
              required
              placeholder="Create Password"
              value={newPartner.password}
              onChange={(e) =>
                setNewPartner({ ...newPartner, password: e.target.value })
              }
              className={inputClass}
            />
          </div>

          {/* INTENT */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
              Partnership Intent
            </h4>
            <select
              required
              value={newPartner.intrest}
              onChange={(e) =>
                setNewPartner({ ...newPartner, intrest: e.target.value })
              }
              className={`${inputClass} appearance-none`}
            >
              <option value="" disabled>
                Why are you interested?
              </option>
              <option value="Mutual Growth Opportunity">
                Mutual Growth Opportunity
              </option>
              <option value="Strong Interest in Infrastructure and Development">
                Strong Interest in Infrastructure and Development
              </option>
              <option value="Complementary Skills and Experience">
                Complementary Skills and Experience
              </option>
              <option value="Market Expansion Vision">
                Market Expansion Vision
              </option>
              <option value="Long-Term Value Creation">
                Long-Term Value Creation
              </option>
              <option value="Collaborative Approach">
                Collaborative Approach
              </option>
              <option value="Technology Integration">
                Technology Integration
              </option>
              <option value="Interest in Sustainable and Smart Projects">
                Interest in Sustainable and Smart Projects
              </option>
            </select>
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-4 pt-4">
            <button
              type="submit"
              disabled={submitting}
              className="
                w-[280px]
                bg-gradient-to-r from-[#5E23DC] to-[#7C3AED]
                text-white
                py-3.5 rounded-2xl
                font-semibold
                shadow-lg shadow-[#5E23DC]/30
                transition-all duration-300
                hover:scale-105 hover:shadow-xl
                active:scale-95
                disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100
                flex items-center justify-center gap-2
              "
            >
              {submitting ? (
                <>
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    />
                  </svg>
                  Registering…
                </>
              ) : isTrial ? (
                "Register & Start Free Trial"
              ) : (
                "Complete Registration"
              )}
            </button>
            <p className="text-xs text-slate-500 text-center max-w-md">
              {isTrial
                ? "Your free trial starts immediately after registration. Login credentials will be sent to your email."
                : "After registration you'll be redirected to login. Your information is encrypted and protected."}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;