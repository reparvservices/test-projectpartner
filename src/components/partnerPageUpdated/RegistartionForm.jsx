import React, { useState, useEffect } from "react";
import { useAuth } from "../../store/auth";
import { handlePayment } from "../../utils/payment.js";
import axios from "axios";

const RegistrationForm = ({ plan }) => {
  const { URI, setSuccessScreen } = useAuth();
  const registrationPrice = plan?.totalPrice;

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
      const response = await fetch(`${URI}/admin/cities/${newPartner.state}`, {
        method: "GET",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      const data = await response.json();
      setCities(data);
    } catch (err) {
      console.error(err);
    }
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const startTrial = async (userId) => {
    try {
      const res = await axios.post(
        `${URI}/projectpartner/subscription/activate-trial/${userId}`,
        {
          username: newPartner.username,
          password: newPartner.password,
        }
      );

      if (res.data.success) {
        alert(
          "🎉 Success! Your free trial has started. Login details sent to your email."
        );
      } else {
        alert(res.data.message || "Unable to start trial");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while starting trial");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Free plan: ensure username & password

    if (!newPartner.username || !newPartner.password) {
      alert("Please provide username and password for free plan");
      return;
    }

    try {
      // Submit registration data first
      const response = await fetch(`${URI}/admin/projectpartner/add`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newPartner),
      });

      if (!response.ok) {
        const errorRes = await response.json();
        console.error("Submission Error:", errorRes);
        alert(errorRes.message || "Failed to Submit Data. Please try again.");
        return;
      }

      const res = await response.json();

      // Free plan: start trial
      if (parseFloat(registrationPrice) === 0) {
        setSuccessScreen({
          show: true,
          label: "Registration Successful",
          description:
            "You are now registered as a Project Partner! Your free trial will start shortly.",
        });

        await startTrial(res.Id);

        setNewPartner({
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
        return;
      }

      // Paid plan: proceed with Razorpay
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded) {
        alert("Failed to load Razorpay. Please check your internet.");
        return;
      }

      setSuccessScreen({
        show: true,
        label: "Your Data Sent Successfully",
        description: `Pay Rs ${registrationPrice} to join as a Project Partner`,
      });

      await handlePayment(
        newPartner,
        "Project Partner",
        "https://projectpartner.reparv.in",
        registrationPrice,
        res.Id,
        "projectpartner",
        "id",
        setSuccessScreen
      );

      setNewPartner({
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
    } catch (err) {
      console.error("Error:", err);
      alert("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    fetchStates();
  }, []);

  useEffect(() => {
    if (newPartner.state) fetchCities();
  }, [newPartner.state]);

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
    <div className="min-h-screen w-full flex justify-center bg-white px-0 py-0 sm:px-4 sm:py-14">
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
          rounded-none
          shadow-none
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
              Fill in your details and proceed to secure payment to unlock your
              partnership benefits.
            </p>
          </div>
        </div>

        {/* FORM */}
        <div className="p-6 sm:p-10 space-y-8">
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

          {/* FREE PLAN: USERNAME & PASSWORD */}

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

            <input
              type="text"
              placeholder="Referral Code (optional)"
              value={newPartner.refrence}
              onChange={(e) =>
                setNewPartner({ ...newPartner, refrence: e.target.value })
              }
              className={inputClass}
            />
          </div>

          {/* CTA */}
          <div className="flex flex-col items-center gap-4 pt-6">
            <button
              type="submit"
              className="
                w-[260px]
                bg-gradient-to-r from-[#5E23DC] to-[#7C3AED]
                text-white
                py-3.5 rounded-2xl
                font-semibold
                shadow-lg shadow-[#5E23DC]/30
                transition-all duration-300
                hover:scale-105 hover:shadow-xl
                active:scale-95
              "
            >
              {parseFloat(registrationPrice) === 0
                ? "Register & Start Free Trial"
                : "Proceed to Secure Payment"}
            </button>

            <p className="text-xs text-slate-500 text-center max-w-md">
              {parseFloat(registrationPrice) === 0
                ? "Your free trial starts immediately after registration."
                : "You will be redirected to a secure Razorpay gateway. Your information is encrypted and protected."}
            </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
