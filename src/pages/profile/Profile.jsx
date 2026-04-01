import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../store/auth";
import MobileTopBar from "../../components/profile/MobileTopBar";
import ProfileHeader from "../../components/profile/ProfileHeader";
import PostsGrid from "../../components/profile/PostsGrid";
import SuggestedPartners from "../../components/profile/SuggestedPartners";
import PlatformUpdates from "../../components/profile/PlatformUpdates";

export default function Profile() {
  const { URI, setLoading, role } = useAuth();
  const navigate = useNavigate();
  const isProjectPartner = role === "Project Partner";

  const [user, setUser]         = useState({ fullname:"", username:"", email:"", contact:"", role:"", referral:"", userimage:"", id:"", status:"" });
  const [fetching, setFetching] = useState(true);

  const getBasePath = () => {
    if (role === "Project Partner") return "/project-partner";
    if (role === "Territory Partner") return "/territory-partner";
    return "/sales"; // Sales Partner
  };

  /* ── fetch profile (same as old code) ── */
  const fetchProfile = async () => {
    try {
      setFetching(true);
      const r = await fetch(`${URI}${getBasePath()}/profile`, {
        method: "GET", credentials: "include",
        headers: { "Content-Type": "application/json" },
      });
      if (!r.ok) throw new Error(`Error ${r.status}`);
      setUser(await r.json());
    } catch (e) { console.error("Error fetching profile:", e); }
    finally { setFetching(false); }
  };

  useEffect(() => { fetchProfile(); }, []);

  return (
    <div className="min-h-screen bg-[#F6F7FB]">
      <MobileTopBar />
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 xl:grid-cols-[1fr_300px]">
        {/* Main */}
        <div className="w-full bg-white p-4 sm:p-8 sm:pr-0 shadow-sm sm:border-r">
          <ProfileHeader
            user={user}
            loading={fetching}
            onEdit={() => navigate("/app/edit-profile")}
            onBusinessDetails={() => navigate(`/business-details/${user?.id}`)}
            onOpenSite={() => user?.contact && window.open(`https://www.reparv.in/project-partner/${user.contact}`, "_blank")}
          />
          <PostsGrid />
        </div>
        {/* Sidebar */}
        <aside className="hidden xl:flex flex-col bg-white">
          <SuggestedPartners />
          <PlatformUpdates />
        </aside>
      </div>
    </div>
  );
}