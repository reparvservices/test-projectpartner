import { useState, useEffect } from "react";
import { FaUser, FaLock, FaHandshake, FaUserTie } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { IoEye } from "react-icons/io5";
import { IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../store/auth";
import Loader from "../components/Loader";
import ForgotPassword from "../components/ForgotPassword";

const roles = [
  {
    id: "project-partner",
    label: "Project Partner",
    icon: <MdLocationOn size={17} />,
    endpoint: "/project-partner/login",
    tokenKey: "projectPartnerToken",
    userKey: "projectPartnerUser",
    redirect: "/app/dashboard",
  },
  {
    id: "sales-partner",
    label: "Sales Partner",
    icon: <FaHandshake size={14} />,
    endpoint: "/sales-partner/login",
    tokenKey: "salesPartnerToken",
    userKey: "salesPartnerUser",
    redirect: "/app/dashboard",
  },
  {
    id: "territory-partner",
    label: "Territory Partner",
    icon: <FaUserTie size={14} />,
    endpoint: "/territory-partner/login",
    tokenKey: "territoryPartnerToken",
    userKey: "territoryPartnerUser",
    redirect: "/app/dashboard",
  },
];

function Login() {
  const { storeTokenInCookie, URI, setLoading } = useAuth();

  const [selectedRole, setSelectedRole] = useState(null);
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
        }
      );

      const token =
        response.data[activeRole.tokenKey] || response.data.token;

      if (token) {
        localStorage.setItem(
          activeRole.userKey,
          JSON.stringify(response.data.user)
        );
        storeTokenInCookie(token);
        navigate(activeRole.redirect, { replace: true });
        window.location.reload();
      } else {
        setErrorMessage("Invalid login credentials.");
      }
    } catch (error) {
      setErrorMessage(
        error.response?.data?.message || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="w-full min-h-screen flex items-center justify-center relative overflow-hidden"
    >
      {/* ── Aurora Background ── */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `
            linear-gradient(125deg, #5323DC 0%, transparent 30%),
            linear-gradient(235deg, #8E61FF 0%, transparent 30%),
            linear-gradient(355deg, #4f1fcf 0%, transparent 40%),
            radial-gradient(ellipse at 50% 0%, #a78bfa44 0%, transparent 40%)
          `,
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-5 left-5 w-16 h-16 rounded-full bg-[#ae8bff]/15 pointer-events-none" />
      <div className="absolute top-14 right-8 w-10 h-10 rounded-full bg-[#8E61FF]/20 pointer-events-none" />

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#3b0fa0]/50 to-transparent pointer-events-none" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-[410px] mx-4 my-8">
        {!showForgotPassword ? (
          <div className="border-2 rounded-3xl overflow-hidden shadow-2xl shadow-[#3a12c0]/40">

            {/* ── Compact Gradient Header ── */}
            <div
              className="relative overflow-hidden px-7 py-6"
              style={{
                background: "linear-gradient(145deg, #ffffff 0%, #ede8ff 60%, #d8ccff 100%)",
              }}
            >
              <div className="absolute -top-10 -right-10 w-36 h-36 rounded-full bg-[#8E61FF]/10 pointer-events-none" />
              <div className="absolute -bottom-8 -left-5 w-24 h-24 rounded-full bg-[#5323DC]/5 pointer-events-none" />

              <div className="relative z-10 flex items-center justify-between">
                <div>
                  <p className="text-xl font-semibold text-[#1a0f3c] leading-tight">Welcome back</p>
                  <p className="text-xs text-[#8E61FF] font-medium mt-0.5">Sign in to continue</p>
                </div>
                <div className="w-11 h-11 rounded-xl bg-[linear-gradient(135deg,#5323DC,#8E61FF)] flex items-center justify-center shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                    <path d="M12 2L2 7l10 5 10-5-10-5z" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M2 17l10 5 10-5" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M2 12l10 5 10-5" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                  </svg>
                </div>
              </div>
            </div>

            {/* ── Body ── */}
            <div className="bg-white px-7 pt-6 pb-7">

              {errorMessage && (
                <div className="mb-4 bg-red-50 border border-red-200 text-red-500 text-xs px-4 py-2.5 rounded-xl">
                  {errorMessage}
                </div>
              )}

              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest mb-2.5">
                Select your role
              </p>

              {/* Project Partner — full width */}
              <button
                type="button"
                onClick={() => { setSelectedRole("project-partner"); setErrorMessage(""); }}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl border-2 mb-2 transition-all
                  ${selectedRole === "project-partner"
                    ? "border-[#5323DC] bg-[#f5f1ff]"
                    : "border-[#ede8ff] hover:border-[#c4b8f5] hover:bg-[#faf8ff]"
                  }`}
              >
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 transition-all
                  ${selectedRole === "project-partner"
                    ? "bg-[linear-gradient(135deg,#5323DC,#8E61FF)]"
                    : "bg-[#f0ebff]"
                  }`}>
                  <MdLocationOn
                    size={17}
                    className={selectedRole === "project-partner" ? "text-white" : "text-[#8E61FF]"}
                  />
                </div>
                <span className={`text-sm font-medium transition-all
                  ${selectedRole === "project-partner" ? "text-[#5323DC]" : "text-gray-500"}`}>
                  Project Partner
                </span>
                <div className={`ml-auto w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 transition-all
                  ${selectedRole === "project-partner"
                    ? "border-[#5323DC] bg-[#5323DC]"
                    : "border-gray-300"
                  }`}>
                  {selectedRole === "project-partner" && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </div>
              </button>

              {/* Sales + Territory — horizontal 2 col */}
              <div className="grid grid-cols-2 gap-2 mb-5">
                {roles.slice(1).map((role) => (
                  <button
                    key={role.id}
                    type="button"
                    onClick={() => { setSelectedRole(role.id); setErrorMessage(""); }}
                    className={`flex items-center gap-2 px-3 py-2.5 rounded-xl border-2 transition-all
                      ${selectedRole === role.id
                        ? "border-[#5323DC] bg-[#f5f1ff]"
                        : "border-[#ede8ff] hover:border-[#c4b8f5] hover:bg-[#faf8ff]"
                      }`}
                  >
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 transition-all
                      ${selectedRole === role.id
                        ? "bg-[linear-gradient(135deg,#5323DC,#8E61FF)]"
                        : "bg-[#f0ebff]"
                      }`}>
                      <span className={selectedRole === role.id ? "text-white" : "text-[#8E61FF]"}>
                        {role.icon}
                      </span>
                    </div>
                    <span className={`text-xs font-medium transition-all
                      ${selectedRole === role.id ? "text-[#5323DC]" : "text-gray-500"}`}>
                      {role.label}
                    </span>
                  </button>
                ))}
              </div>

              {/* Email */}
              <div className={`group flex items-center border-2 rounded-2xl px-4 h-12 mb-3 transition-all
                ${emailOrUsername ? "border-[#5323DC]" : "border-[#ede8ff] focus-within:border-[#5323DC]"}`}>
                <FaUser className="text-[#c4b8f5] w-3.5 h-3.5 mr-3 group-focus-within:text-[#5323DC] transition-colors shrink-0" />
                <input
                  value={emailOrUsername}
                  required
                  onChange={(e) => setEmailOrUsername(e.target.value)}
                  type="text"
                  placeholder="Email or username"
                  className="w-full border-none outline-none text-sm text-gray-700 placeholder:text-[#c4b8f5] bg-transparent"
                />
              </div>

              {/* Password */}
              <div className={`group flex items-center border-2 rounded-2xl px-4 h-12 mb-2 transition-all
                ${password ? "border-[#5323DC]" : "border-[#ede8ff] focus-within:border-[#5323DC]"}`}>
                <FaLock className="text-[#c4b8f5] w-3.5 h-3.5 mr-3 group-focus-within:text-[#5323DC] transition-colors shrink-0" />
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={isPasswordShow ? "text" : "password"}
                  required
                  placeholder="Password"
                  className="w-full border-none outline-none text-sm text-gray-700 placeholder:text-[#c4b8f5] bg-transparent"
                />
                <button type="button" onClick={() => setIsPasswordShow(!isPasswordShow)} className="ml-2 shrink-0">
                  {isPasswordShow
                    ? <IoMdEyeOff className="text-[#c4b8f5] text-lg hover:text-[#8E61FF]" />
                    : <IoEye className="text-[#c4b8f5] text-lg hover:text-[#8E61FF]" />
                  }
                </button>
              </div>

              {/* Forgot + Loader */}
              <div className="flex items-center justify-between mb-5">
                <Loader />
                <p
                  onClick={() => setShowForgotPassword(true)}
                  className="text-xs text-[#8E61FF] cursor-pointer hover:underline"
                >
                  Forgot password?
                </p>
              </div>

              {/* Submit */}
              <button
                onClick={userLogin}
                className="w-full h-12 bg-[linear-gradient(135deg,#5323DC,#8E61FF)] text-white rounded-2xl text-sm font-semibold transition hover:opacity-90 active:scale-95 shadow-lg shadow-purple-200"
              >
                Sign In
              </button>
            </div>
          </div>
        ) : (
          <div className="rounded-3xl overflow-hidden shadow-2xl shadow-[#3a12c0]/40">
            <ForgotPassword setShowForgotPassword={setShowForgotPassword} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Login;