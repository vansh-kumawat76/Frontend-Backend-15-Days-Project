import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify"
const Login = () => {
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  // UI-only states
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const Navigate = useNavigate();

  // Input change ke liye
  const LoginHandlerInput = (e) => {
    const { name, value } = e.target;
    setLoginForm({ ...loginForm, [name]: value });
  };

  // Form submit ke liye
  const LoginHandler = async (e) => {
    e.preventDefault();

    try {
      setError("");
      setLoading(true);

      const response = await axios.post("http://localhost:8090/login-user", {
        email: loginForm.email,
        password: loginForm.password,
      });

      console.log("Response >>>>>>", response.data);

      if (response.data.status) {
        toast.success("Login successfull");
        console.log("Login Successfully");
        console.log("Token >>>>>>", response.data.token);
      }
    } catch (err) {
      const message = 
        err.response?.data?.message || "Login failed. Check your email and password."
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[15px] text-white placeholder-slate-500 outline-none transition focus:border-teal-300/60 focus:bg-white/[0.07] focus:ring-4 focus:ring-teal-300/10";

  const labelClass = "mb-2 block text-sm font-medium text-slate-300";

  return (
    <div className="signup-root relative min-h-screen overflow-hidden bg-[#070b17] text-white">
      {/* Fonts + animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');
        .signup-root { font-family: 'Inter', system-ui, sans-serif; }
        .signup-root .font-display { font-family: 'Sora', 'Inter', sans-serif; }
        @keyframes drift-a { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(60px,40px) scale(1.15); } }
        @keyframes drift-b { 0%,100% { transform: translate(0,0) scale(1); } 50% { transform: translate(-50px,-60px) scale(1.1); } }
        @keyframes rise { from { opacity: 0; transform: translateY(24px); } to { opacity: 1; transform: translateY(0); } }
        .orb-a { animation: drift-a 14s ease-in-out infinite; }
        .orb-b { animation: drift-b 17s ease-in-out infinite; }
        .card-in { animation: rise .7s cubic-bezier(.2,.8,.2,1) both; }
        @media (prefers-reduced-motion: reduce) {
          .orb-a, .orb-b, .card-in { animation: none; }
        }
      `}</style>

      {/* Background: glowing orbs + fine grid */}
      <div className="pointer-events-none absolute inset-0">
        <div className="orb-a absolute -left-32 -top-32 h-[28rem] w-[28rem] rounded-full bg-teal-400/30 blur-[120px]" />
        <div className="orb-b absolute -bottom-40 right-[-8rem] h-[32rem] w-[32rem] rounded-full bg-fuchsia-500/25 blur-[130px]" />
        <div className="absolute left-1/2 top-1/3 h-72 w-72 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[110px]" />
        <div
          className="absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "44px 44px",
            maskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
      </div>

      <div className="relative mx-auto grid min-h-screen max-w-6xl items-center gap-12 px-5 py-10 lg:grid-cols-2">
        {/* Right: pitch (desktop only) */}
        <div className="hidden lg:order-2 lg:block lg:pl-8">
          <h1 className="font-display text-5xl font-bold leading-[1.1] tracking-tight">
            Welcome back,
            <br />
            <span className="bg-gradient-to-r from-teal-300 via-sky-300 to-fuchsia-300 bg-clip-text text-transparent">
              pick up where you left off.
            </span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-400">
            Log in to get back to your account. Everything is exactly how you
            left it.
          </p>

          <ul className="mt-10 space-y-4 text-slate-300">
            {[
              "Secure login with your email",
              "Reset your password anytime",
              "Your data stays private",
            ].map((item) => (
              <li key={item} className="flex items-center gap-3">
                <span className="flex h-6 w-6 items-center justify-center rounded-full bg-teal-300/15 text-teal-300">
                  <svg
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    className="h-3.5 w-3.5"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 111.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Left: form card */}
        <div className="card-in mx-auto w-full max-w-md lg:order-1">
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-9">
            <div className="mb-7">
              <h2 className="font-display text-2xl font-semibold">
                Log in to your account
              </h2>
              <p className="mt-1.5 text-sm text-slate-400">
                Enter your email and password to continue.
              </p>
            </div>

            <form onSubmit={LoginHandler} className="space-y-5">
              {/* Email */}
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={loginForm.email}
                  onChange={LoginHandlerInput}
                  className={inputClass}
                />
              </div>

              {/* Password */}
              <div>
                <div className="mb-2 flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="text-sm font-medium text-slate-300"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => Navigate("/forgetPassword")}
                    className="text-sm font-medium text-teal-300 transition hover:text-teal-200"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Your password"
                    value={loginForm.password}
                    onChange={LoginHandlerInput}
                    className={`${inputClass} pr-16`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400 transition hover:text-white"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>

              {/* Error */}
              {error && (
                <p
                  role="alert"
                  className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-2.5 text-sm text-rose-200"
                >
                  {error}
                </p>
              )}

              {/* Login Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-teal-300 via-sky-300 to-fuchsia-300 py-3.5 text-base font-semibold text-slate-900 shadow-lg shadow-teal-300/20 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-300/30 disabled:opacity-60"
              >
                {loading ? "Logging in…" : "Log in"}
              </button>

              {/* Reset Password */}
              <button
                type="button"
                onClick={() => Navigate("/resetPassword")}
                className="w-full rounded-xl border border-white/15 bg-white/[0.04] py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Reset password
              </button>
            </form>

            {/* Signup */}
            <p className="mt-6 text-center text-sm text-slate-400">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => Navigate("/signup")}
                className="font-semibold text-teal-300 transition hover:text-teal-200"
              >
                Sign up
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
