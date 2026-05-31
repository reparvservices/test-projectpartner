export async function sendPartnerJoinOtp(apiBase, phone) {
  const res = await fetch(`${apiBase}/frontend/project-partner/join-lead/send-otp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ phone }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Failed to send OTP");
  }
  return data;
}

export async function completePartnerJoin(apiBase, { firstName, lastName, phone, otp }) {
  const res = await fetch(`${apiBase}/frontend/project-partner/join-lead/complete`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, phone, otp }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Could not complete your application");
  }
  return data;
}

export async function fetchPartnerJoinLead(apiBase, token) {
  const res = await fetch(`${apiBase}/frontend/project-partner/join-lead/${encodeURIComponent(token)}`);
  const data = await res.json().catch(() => ({}));
  if (!res.ok) {
    throw new Error(data.message || "Lead not found");
  }
  return data;
}
