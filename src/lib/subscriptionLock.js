/** Routes that stay fully usable without an active subscription */
export const SUBSCRIPTION_UNLOCKED_PATHS = [
  "/app/subscription",
  "/app/profile",
  "/app/edit-profile",
  "/app/subscription/compare-plans",
];

export function isSubscriptionExemptPath(pathname = "") {
  return SUBSCRIPTION_UNLOCKED_PATHS.some(
    (p) => pathname === p || pathname.startsWith(`${p}/`),
  );
}

const ROUTE_FEATURE_TITLES = [
  { prefix: "/app/dashboard", title: "Dashboard" },
  { prefix: "/app/properties", title: "Properties" },
  { prefix: "/app/property", title: "Properties" },
  { prefix: "/app/enquir", title: "Enquiries" },
  { prefix: "/app/customers", title: "Customers" },
  { prefix: "/app/builders", title: "Builders" },
  { prefix: "/app/sales-partner", title: "Sales Partners" },
  { prefix: "/app/territory-partner", title: "Territory Partners" },
  { prefix: "/app/employees", title: "Employees" },
  { prefix: "/app/tickets", title: "Tickets" },
  { prefix: "/app/calendar", title: "Calendar" },
  { prefix: "/app/feed", title: "Feed" },
  { prefix: "/app/community", title: "Community" },
  { prefix: "/app/network", title: "Network" },
  { prefix: "/app/notifications", title: "Notifications" },
  { prefix: "/app/menu", title: "Menu" },
  { prefix: "/app/invite", title: "Referrals" },
];

export function getFeatureTitleForPath(pathname = "") {
  const hit = ROUTE_FEATURE_TITLES.find(({ prefix }) =>
    pathname.startsWith(prefix),
  );
  return hit?.title || "Partner tools";
}
