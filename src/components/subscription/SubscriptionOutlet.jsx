import { useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../store/auth";
import {
  getFeatureTitleForPath,
  isSubscriptionExemptPath,
} from "../../lib/subscriptionLock";
import SubscriptionGate from "./SubscriptionGate";

function GateLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="w-10 h-10 rounded-full border-4 border-[#EDE9FE] border-t-[#5E23DC] animate-spin" />
    </div>
  );
}

/** Renders child routes; blurs and locks them when subscription is inactive. */
export default function SubscriptionOutlet() {
  const { subscription, subscriptionReady, isActiveSubscription, refreshSubscription } =
    useAuth();
  const location = useLocation();

  useEffect(() => {
    refreshSubscription(undefined, { silent: true });
  }, [location.pathname, refreshSubscription]);

  if (!subscriptionReady) {
    return <GateLoader />;
  }

  const exempt = isSubscriptionExemptPath(location.pathname);
  const hasAccess = Boolean(subscription?.active || isActiveSubscription);
  const locked = !hasAccess && !exempt;

  if (!locked) {
    return <Outlet />;
  }

  return (
    <SubscriptionGate title={getFeatureTitleForPath(location.pathname)}>
      <Outlet />
    </SubscriptionGate>
  );
}
