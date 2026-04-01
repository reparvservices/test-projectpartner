import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { X, Tag, CheckCircle2, AlertCircle, CreditCard, Loader2 } from "lucide-react";
import { useAuth } from "../../store/auth";
import { handlePayment } from "../../utils/payment.js";

import "swiper/css";
import "swiper/css/pagination";
import { getImageURI } from "../../utils/helper.js";

const SubscriptionPlan = ({ plan }) => {
  const [amount, setAmount] = useState(plan?.totalPrice);
  const { URI, user, showSubscription, setShowSubscription, setSuccessScreen } = useAuth();
  const user_id = user?.id + user?.contact.slice(8);

  const [coupon, setCoupon] = useState("");
  const [isUsedCoupon, setIsUsedCoupon] = useState(false);
  const [error, setError] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  const images = [plan?.firstImage, plan?.secondImage, plan?.thirdImage].filter(Boolean);
  const features = plan?.features?.split(",") || [];

  const isCouponSuccess = error === "Coupon applied Successfully";

  const loadRazorpayScript = () =>
    new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });

  const handlePayNow = async () => {
    setIsPaying(true);
    const scriptLoaded = await loadRazorpayScript();
    if (!scriptLoaded) {
      alert("Failed to load Razorpay. Please check your internet.");
      setIsPaying(false);
      return;
    }
    try {
      await handlePayment(
        user_id,
        plan?.planName,
        plan?.id,
        plan?.planDuration,
        coupon,
        isUsedCoupon,
        "projectpartnerid",
        amount,
        user?.email,
        user?.id,
        "projectpartner",
        "id",
        setSuccessScreen
      );
    } catch (paymentError) {
      console.error("Payment Error:", paymentError.message);
      alert("Payment failed. Please contact support.");
    } finally {
      setIsPaying(false);
    }
  };

  const handleApplyCoupon = async () => {
    if (!coupon.trim()) return;
    setIsApplying(true);
    try {
      const response = await fetch(`${URI}/api/redeem/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          coupon,
          planId: plan.id,
          partnerType: "Project Partner",
          user_id,
        }),
      });
      const data = await response.json();
      if (data.success) {
        setError("Coupon applied Successfully");
        setIsUsedCoupon(true);
        setAmount((prev) => parseInt(prev) - parseInt(data.discount));
      } else {
        setError(data.message);
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Something went wrong. Try again.");
    } finally {
      setIsApplying(false);
    }
  };

  const handleClose = () => {
    setShowSubscription(false);
    setCoupon("");
    setError("");
  };

  useEffect(() => {
    setAmount(plan?.totalPrice);
  }, [plan?.totalPrice]);

  if (!showSubscription) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-[60] bg-black/40 backdrop-blur-sm"
        onClick={handleClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-[61] flex items-end md:items-center justify-center p-0 md:p-6">
        <div className="w-full md:max-w-[520px] max-h-[90vh] overflow-y-auto scrollbar-hide bg-white md:rounded-2xl rounded-t-2xl shadow-2xl flex flex-col">

          {/* Header */}
          <div className="relative bg-gradient-to-br from-[#5E23DC] to-[#8B5CF6] px-6 pt-8 pb-6 text-white rounded-t-2xl shrink-0">
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition"
            >
              <X size={16} />
            </button>
            <p className="text-xs font-semibold uppercase tracking-widest text-purple-200 mb-1">
              Subscription Plan
            </p>
            <h2 className="text-2xl font-bold">{plan?.planName}</h2>
            <span className="inline-block mt-2 text-xs bg-white/20 px-3 py-1 rounded-full font-medium">
              {plan?.planDuration}
            </span>
          </div>

          {/* Body */}
          <div className="px-6 py-6 flex flex-col gap-6">

            {/* Image Slider */}
            {images.length > 0 && (
              <div className="rounded-xl overflow-hidden border border-gray-100 shadow-sm">
                <Swiper
                  modules={[Autoplay, Pagination]}
                  autoplay={{ delay: 2500, disableOnInteraction: false }}
                  pagination={{ clickable: true }}
                  loop={true}
                  spaceBetween={0}
                  slidesPerView={1}
                >
                  {images.map((url, index) => (
                    <SwiperSlide key={index}>
                      <img
                        src={getImageURI(url)}
                        alt={`Banner ${index + 1}`}
                        className="w-full h-44 object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}

            {/* Features */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-3">
                What's included
              </p>
              <ul className="space-y-2">
                {features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 size={15} className="text-[#5E23DC] mt-[2px] shrink-0" />
                    {feature.trim()}
                  </li>
                ))}
              </ul>
            </div>

            {/* Price Summary */}
            <div className="bg-purple-50 border border-purple-100 rounded-xl p-4">
              <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
                <span>Plan Price</span>
                <span>₹{plan?.totalPrice?.toLocaleString?.() ?? plan?.totalPrice}</span>
              </div>
              {isUsedCoupon && (
                <div className="flex justify-between items-center text-sm text-green-600 mb-2">
                  <span>Coupon Discount</span>
                  <span>− ₹{(parseInt(plan?.totalPrice) - parseInt(amount)).toLocaleString()}</span>
                </div>
              )}
              <div className="border-t border-purple-200 pt-2 flex justify-between items-center font-bold text-gray-900">
                <span>Total Payable</span>
                <span className="text-[#5E23DC] text-lg">
                  ₹{parseInt(amount).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Coupon */}
            <div>
              <label className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest mb-2">
                <Tag size={12} />
                {isCouponSuccess ? (
                  <span className="text-green-600">Coupon Applied!</span>
                ) : error && coupon ? (
                  <span className="text-red-500">Invalid Coupon</span>
                ) : (
                  <span className="text-gray-400">Apply Coupon</span>
                )}
              </label>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="text"
                    placeholder="Enter coupon code"
                    value={coupon}
                    disabled={isUsedCoupon}
                    onChange={(e) => {
                      setCoupon(e.target.value);
                      setError("");
                    }}
                    className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 transition ${
                      isCouponSuccess
                        ? "border-green-400 bg-green-50 focus:ring-green-300"
                        : error && coupon
                        ? "border-red-400 bg-red-50 focus:ring-red-300"
                        : "border-gray-200 focus:ring-[#5E23DC]/30"
                    } disabled:opacity-60 disabled:cursor-not-allowed`}
                  />
                  {isCouponSuccess && (
                    <CheckCircle2
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-green-500"
                    />
                  )}
                  {error && coupon && !isCouponSuccess && (
                    <AlertCircle
                      size={16}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-red-400"
                    />
                  )}
                </div>

                <button
                  type="button"
                  onClick={handleApplyCoupon}
                  disabled={isUsedCoupon || isApplying || !coupon.trim()}
                  className="px-4 py-2.5 bg-[#5E23DC] text-white text-sm font-semibold rounded-xl hover:bg-[#4c1bb5] transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shrink-0"
                >
                  {isApplying ? <Loader2 size={14} className="animate-spin" /> : "Apply"}
                </button>
              </div>

              {error && coupon && !isCouponSuccess && (
                <p className="text-xs text-red-500 mt-1.5">{error}</p>
              )}
            </div>
          </div>

          {/* Footer Actions */}
          <div className="px-6 pb-8 pt-2 flex gap-3 shrink-0">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 py-3 rounded-xl border border-gray-200 text-gray-600 text-sm font-medium hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={handlePayNow}
              disabled={isPaying}
              className="flex-2 w-full py-3 rounded-xl bg-[#5E23DC] text-white text-sm font-semibold hover:bg-[#4c1bb5] transition active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isPaying ? (
                <>
                  <Loader2 size={16} className="animate-spin" />
                  Processing...
                </>
              ) : (
                <>
                  <CreditCard size={16} />
                  Pay ₹{parseInt(amount).toLocaleString()}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SubscriptionPlan;