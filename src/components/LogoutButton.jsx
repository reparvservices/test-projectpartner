import { FaSignOutAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../store/auth";

function LogoutButton() {
  const navigate = useNavigate();
  const { delTokenInCookie, URI } = useAuth();

  const userLogout = async () => {
    try {
      let endpoint = "";

      if (localStorage.getItem("projectPartnerUser")) {
        endpoint = "/project-partner/logout";
      } else if (localStorage.getItem("salesUser")) {
        endpoint = "/sales/logout";
      } else if (localStorage.getItem("territoryUser")) {
        endpoint = "/territory-partner/logout";
      }

      if (endpoint) {
        await axios.post(URI + endpoint, {}, { withCredentials: true });
      }

      // Clear everything
      delTokenInCookie();

      localStorage.removeItem("projectPartnerUser");
      localStorage.removeItem("salesUser");
      localStorage.removeItem("territoryUser");

      navigate("/", { replace: true });
    } catch (error) {
      console.log("Logout failed:", error);
    }
  };

  return (
    <div
      onClick={userLogout}
      className="logoutBtn px-2 md:w-[79px] h-[28px] flex gap-6 items-center justify-center border-[1px] border-[#FF4646] rounded-[8px] text-[#FF4646] text-[16px] active:scale-95 cursor-pointer"
    >
      <p className="hidden md:block">Logout</p>
      <FaSignOutAlt className="md:hidden block" />
    </div>
  );
}

export default LogoutButton;
