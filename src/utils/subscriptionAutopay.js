/**
 * Razorpay Subscriptions (autopay) checkout for partner apps.
 * Server: POST /api/subscription/payment/create-subscription + verify-subscription
 */

export function loadRazorpayScript() {
  return new Promise((resolve) => {
    if (window.Razorpay) {
      resolve(true);
      return;
    }
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

/**
 * @param {object} p
 * @param {string} p.api — e.g. http://localhost:3000
 * @param {'project'|'sales'|'territory'} p.role
 * @param {number} p.userId — projectpartner.id (or other partner user id)
 * @param {number} p.planId — subscription_plans.id
 * @param {number} [p.discountAmount]
 * @param {number} [p.finalAmount] — stored on user_subscriptions; Razorpay charges plan price
 */
export async function createPartnerSubscriptionSession({
  api,
  role,
  userId,
  planId,
  discountAmount = 0,
  finalAmount = 0,
}) {
  const res = await fetch(`${api}/api/subscription/payment/create-subscription`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      role,
      user_id: userId,
      plan_id: planId,
      payment_type: "auto",
      discount_amount: discountAmount,
      final_amount: finalAmount,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Could not start subscription checkout");
  }
  if (!data.razorpay_subscription_id) {
    throw new Error(data.message || "Invalid response from subscription server");
  }
  return data;
}

/**
 * Opens Razorpay Checkout in subscription mode.
 * @returns {Promise<object>} response with razorpay_payment_id, razorpay_subscription_id, razorpay_signature
 */
export function openRazorpaySubscriptionCheckout({
  keyId,
  subscriptionId,
  name,
  description,
  email,
  contact,
}) {
  return new Promise((resolve, reject) => {
    const options = {
      key: keyId,
      subscription_id: subscriptionId,
      name: name || "Reparv",
      description: description || "Partner subscription",
      handler(response) {
        resolve(response);
      },
      modal: {
        ondismiss() {
          reject(new Error("Checkout closed"));
        },
      },
      prefill: {
        email: email || "",
        contact: contact || "",
      },
      theme: { color: "#5E23DC" },
    };

    const rzp = new window.Razorpay(options);
    rzp.on("payment.failed", (err) => {
      reject(err || new Error("Payment failed"));
    });
    rzp.open();
  });
}

export async function confirmPartnerSubscription({
  api,
  role,
  userId,
  planId,
  paymentId,
  subscriptionId,
  signature,
  email,
  discountAmount = 0,
  finalAmount = 0,
}) {
  const res = await fetch(`${api}/api/subscription/payment/verify-subscription`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      role,
      user_id: userId,
      plan_id: planId,
      razorpay_payment_id: paymentId,
      razorpay_subscription_id: subscriptionId,
      razorpay_signature: signature,
      email: email || "",
      discount_amount: discountAmount,
      final_amount: finalAmount,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Could not confirm subscription");
  }
  return data;
}
