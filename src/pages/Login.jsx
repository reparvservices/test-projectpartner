import { useState, useEffect } from "react";
import { MdLocationOn, MdOutlineMap } from "react-icons/md";
import { FaHandshake, FaBriefcase } from "react-icons/fa";
import { IoEye, IoEyeOff, IoMailOutline } from "react-icons/io5";
import { LuLockKeyhole, LuSparkles } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../store/auth";
import Loader from "../components/Loader";
import ForgotPassword from "../components/ForgotPassword";
import LoginBackImage from "../assets/login/LoginBackImage.svg";

const roles = [
  {
    id: "project-partner",
    label: "Project Partner",
    icon: FaBriefcase,
    endpoint: "/project-partner/login",
    tokenKey: "projectPartnerToken",
    userKey: "projectPartnerUser",
    redirect: "/app/dashboard",
  },
  {
    id: "sales-partner",
    label: "Sales Partner",
    icon: FaHandshake,
    endpoint: "/sales-partner/login",
    tokenKey: "salesPartnerToken",
    userKey: "salesPartnerUser",
    redirect: "/app/dashboard",
  },
  {
    id: "territory-partner",
    label: "Territory Partner",
    icon: MdOutlineMap,
    endpoint: "/territory-partner/login",
    tokenKey: "territoryPartnerToken",
    userKey: "territoryPartnerUser",
    redirect: "/app/dashboard",
  },
];

function Login() {
  const { storeTokenInCookie, URI, setLoading } = useAuth();

  const [selectedRole, setSelectedRole] = useState("project-partner");
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const [emailOrUsername, setEmailOrUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    axios.defaults.withCredentials = true;
  }, []);

  const activeRole = roles.find((r) => r.id === selectedRole);

  const userLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");

    if (!selectedRole) {
      setErrorMessage("Please select a role to continue.");
      return;
    }
    if (!emailOrUsername || !password) {
      setErrorMessage("All fields are required.");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post(
        `${URI}${activeRole.endpoint}`,
        { emailOrUsername, password },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        },
      );

      const token = response.data[activeRole.tokenKey] || response.data.token;

      if (token) {
        localStorage.setItem(
          activeRole.userKey,
          JSON.stringify(response.data.user),
        );
        storeTokenInCookie(token);
        navigate(activeRole.redirect, { replace: true });
        window.location.reload();
      } else {
        setErrorMessage("Invalid login credentials.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Login failed. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full min-w-0 min-h-screen flex items-center justify-center overflow-hidden"
      style={{
        backgroundImage: `url(${LoginBackImage})`,
        backgroundSize: "cover",
      }}
    >
      {/* Card */}
      <div className="relative z-10 w-full max-w-115 mx-4 my-8">
        {!showForgotPassword ? (
          <div
            className="bg-white rounded-3xl overflow-hidden"
            style={{ boxShadow: "0 25px 60px rgba(80, 30, 180, 0.35)" }}
          >
            {/* Body */}
            <div className="px-5 sm:px-8 py-6 sm:py-8">
              {/* Header */}
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h1 className="text-[26px] font-bold text-gray-900 leading-tight">
                    Welcome Back 👋
                  </h1>
                  <p className="text-sm text-gray-400 mt-1">
                    Manage your leads, bookings &amp; partners seamlessly
                  </p>
                </div>
                <div className="w-11 h-11 rounded-2xl bg-[#f0ebff] flex items-center justify-center shrink-0 ml-4">
                  <LuSparkles size={20} className="text-[#6C35DE]" />
                </div>
              </div>

              {/* Error */}
              {errorMessage && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-500 text-xs px-4 py-2.5 rounded-xl">
                  {errorMessage}
                </div>
              )}

              {/* Role Selector — 3 equal columns */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                {roles.map((role) => {
                  const Icon = role.icon;
                  const isActive = selectedRole === role.id;
                  return (
                    <button
                      key={role.id}
                      type="button"
                      onClick={() => {
                        setSelectedRole(role.id);
                        setErrorMessage("");
                      }}
                      className={`flex flex-col items-center gap-2.5 py-4 px-2 rounded-2xl border-2 transition-all duration-200
                        ${
                          isActive
                            ? "border-[#6C35DE] bg-[#f4efff]"
                            : "border-gray-100 bg-gray-50 hover:border-[#c4b8f5] hover:bg-[#faf8ff]"
                        }`}
                    >
                      <Icon
                        size={22}
                        className={
                          isActive ? "text-[#6C35DE]" : "text-gray-400"
                        }
                      />
                      <span
                        className={`text-xs font-semibold text-center leading-tight transition-colors
                          ${isActive ? "text-[#6C35DE]" : "text-gray-400"}`}
                      >
                        {role.label}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Email Input */}
              <div
                className={`flex items-center border-2 rounded-2xl px-4 h-[54px] mb-3 transition-all duration-200
                  ${emailOrUsername ? "border-[#6C35DE]" : "border-gray-200 focus-within:border-[#6C35DE]"}`}
              >
                <IoMailOutline
                  size={19}
                  className="text-gray-400 mr-3 shrink-0"
                />
                <input
                  value={emailOrUsername}
                  required
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  type="text"
                  placeholder="Enter your email or username"
                  className="w-full border-none outline-none text-sm text-gray-700 placeholder:text-gray-300 bg-transparent"
                />
              </div>

              {/* Password Input */}
              <div
                className={`flex items-center border-2 rounded-2xl px-4 h-[54px] mb-3 transition-all duration-200
                  ${password ? "border-[#6C35DE]" : "border-gray-200 focus-within:border-[#6C35DE]"}`}
              >
                <LuLockKeyhole
                  size={18}
                  className="text-gray-400 mr-3 shrink-0"
                />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={isPasswordShow ? "text" : "password"}
                  required
                  placeholder="Enter your password"
                  className="w-full border-none outline-none text-sm text-gray-700 placeholder:text-gray-300 bg-transparent"
                />
                <button
                  type="button"
                  onClick={() => setIsPasswordShow(!isPasswordShow)}
                  className="ml-2 shrink-0"
                >
                  {isPasswordShow ? (
                    <IoEyeOff
                      size={18}
                      className="text-gray-400 hover:text-[#6C35DE] transition-colors"
                    />
                  ) : (
                    <IoEye
                      size={18}
                      className="text-gray-400 hover:text-[#6C35DE] transition-colors"
                    />
                  )}
                </button>
              </div>

              {/* Forgot Password + Loader row */}
              <div className="flex items-center justify-between mb-6">
                <Loader />
                <button
                  type="button"
                  onClick={() => setShowForgotPassword(true)}
                  className="text-xs font-semibold text-[#6C35DE] hover:underline"
                >
                  Forgot password?
                </button>
              </div>

              {/* Submit Button */}
              <button
                onClick={userLogin}
                className="w-full h-[54px] bg-[#6C35DE] text-white rounded-2xl text-sm font-semibold flex items-center justify-center gap-2 transition-all hover:bg-[#5a28c4] active:scale-[0.98]"
                style={{ boxShadow: "0 8px 24px rgba(108, 53, 222, 0.35)" }}
              >
                Sign In
                <span className="text-base">→</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl overflow-hidden shadow-2xl">
            <ForgotPassword setShowForgotPassword={setShowForgotPassword} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;
