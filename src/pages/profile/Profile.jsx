import MobileTopBar from "../../components/profile/MobileTopBar";
import PlatformUpdates from "../../components/profile/PlatformUpdates";
import PostsGrid from "../../components/profile/PostsGrid";
import ProfileHeader from "../../components/profile/ProfileHeader";
import SuggestedPartners from "../../components/profile/SuggestedPartners";
import { FiMenu, FiSearch, FiBell } from "react-icons/fi";

export default function Profile() {
  return (
    <div className="min-h-screen bg-[#F6F7FB]">
      {/* Mobile Top ar */}
      <MobileTopBar />
      <div className="max-w-[1400px] mx-auto grid grid-cols-1 xl:grid-cols-[1fr_300px]">
        {/* Main Content */}
        <div className="w-full bg-white p-4 sm:p-8 sm:pr-0 shadow-sm sm:border-r">
          <ProfileHeader />
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
