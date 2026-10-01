import React, { useState } from "react";
import OtpInput from "react-otp-input";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Signup = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    gender: "",
  });

  const [verify, setVerify] = useState(false);
  const [otp, setOtp] = useState("");
  const [verifyOtps, setVerifyOtps] = useState(false);

  // UI-only states (backend logic same hai)
  const [showPassword, setShowPassword] = useState(false);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const Navigate = useNavigate();

  // Input Handler
  const inputHandler = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // Send OTP
  const sendOtp = async () => {
    try {
      setError("");
      setSending(true);
      const response = await axios.post("http://localhost:8090/otp-generate", {
        email: form.email,
      });

      if (response.data.status) {
        setVerify(true);
        toast.success("OTP Sent Successfully!");
      }
    } catch (err) {
     const message =  err.response?.data?.message || "Could not send OTP. Try again.";
      toast.error(message);
    } finally {
      setSending(false);
    }
  };

  // Verify OTP
  const verifyOtp = async () => {
    try {
      setError("");
      setVerifying(true);
      const response = await axios.post("http://localhost:8090/verify-otp", {
        email: form.email,
        otp: otp,
      });

      if (response.data.status) {
        setVerifyOtps(true);
        toast.success("Email verified successfully!");
      }
    } catch (err) {
      const message = err.response?.data?.message || "Wrong OTP. Check and retry.";
      setError(message);
      toast.error(message);
    } finally {
      setVerifying(false);
    }
  };

  // Signup Submit
  const submitHandler = async (e) => {
    e.preventDefault();

    if (!verifyOtps) {
      toast.warning("Please verify your email first!");
      return;
    }

    try {
      setError("");
      setSubmitting(true);
      const response = await axios.post("http://localhost:8090/create-user", {
        name: form.name,
        email: form.email,
        password: form.password,
        gender: form.gender,
      });

      if (response.data.status) {
        toast.success("Account created successfully!");
        setTimeout(()=>{
            Navigate("/login");
        },1000)
       
      }
    } catch (err) {
      const message = err.response?.data?.message || "Signup failed. Try again.";
      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
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
        {/* Left: pitch (desktop only) */}
        <div className="hidden lg:block">
          <h1 className="font-display text-5xl font-bold leading-[1.1] tracking-tight">
            Start building
            <br />
            <span className="bg-gradient-to-r from-teal-300 via-sky-300 to-fuchsia-300 bg-clip-text text-transparent">
              something great.
            </span>
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-slate-400">
            Make your free account in under a minute. Verify your email once
            and you're ready to go.
          </p>

          <ul className="mt-10 space-y-4 text-slate-300">
            {[
              "Email verified with a one-time code",
              "Your password is never shown to anyone",
              "No credit card needed",
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

        {/* Right: form card */}
        <div className="card-in mx-auto w-full max-w-md">
          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-9">
            <div className="mb-7">
              <h2 className="font-display text-2xl font-semibold">
                Create your account
              </h2>
              <p className="mt-1.5 text-sm text-slate-400">
                Fill in your details to get started.
              </p>
            </div>

            <form onSubmit={submitHandler} className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className={labelClass}>
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  name="name"
                  placeholder="Your name"
                  value={form.name}
                  onChange={inputHandler}
                  className={inputClass}
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className={labelClass}>
                  Email
                </label>

                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    name="email"
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={inputHandler}
                    disabled={verifyOtps}
                    className={`${inputClass} pr-24 disabled:opacity-70`}
                  />

                  {form.email && !verifyOtps && (
                    <button
                      type="button"
                      onClick={sendOtp}
                      disabled={sending}
                      className="absolute right-1.5 top-1.5 bottom-1.5 rounded-lg bg-teal-300 px-4 text-sm font-semibold text-slate-900 transition hover:bg-teal-200 disabled:opacity-60"
                    >
                      {sending ? "Sending…" : verify ? "Resend" : "Verify"}
                    </button>
                  )}
                </div>

                {/* OTP Section */}
                {verify && !verifyOtps && (
                  <div className="mt-4 rounded-2xl border border-white/10 bg-black/20 p-4">
                    <p className="mb-3 text-sm text-slate-400">
                      We sent a 6-digit code to{" "}
                      <span className="text-slate-200">{form.email}</span>
                    </p>

                    <div className="flex justify-center">
                      <OtpInput
                        value={otp}
                        onChange={setOtp}
                        numInputs={6}
                        renderSeparator={
                          <span className="mx-1 text-slate-600">-</span>
                        }
                        renderInput={(props) => (
                          <input
                            {...props}
                            className="!w-10 h-12 rounded-lg border border-white/15 bg-white/5 text-center text-lg font-semibold text-white outline-none transition focus:border-teal-300 focus:ring-4 focus:ring-teal-300/10"
                          />
                        )}
                      />
                    </div>

                    <button
                      type="button"
                      onClick={verifyOtp}
                      disabled={verifying || otp.length < 6}
                      className="mt-4 w-full rounded-xl bg-white/10 py-2.5 text-sm font-semibold text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {verifying ? "Checking…" : "Confirm code"}
                    </button>
                  </div>
                )}

                {/* OTP Verified */}
                {verifyOtps && (
                  <p className="mt-2 flex items-center gap-1.5 text-sm font-medium text-teal-300">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-4 w-4">
                      <path
                        fillRule="evenodd"
                        d="M16.7 5.3a1 1 0 010 1.4l-7.5 7.5a1 1 0 01-1.4 0L3.3 9.7a1 1 0 111.4-1.4l3.8 3.8 6.8-6.8a1 1 0 011.4 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Email verified
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className={labelClass}>
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Create a password"
                    value={form.password}
                    onChange={inputHandler}
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

              {/* Gender */}
              <div>
                <span className={labelClass}>Gender</span>
                <div className="grid grid-cols-3 gap-2">
                  {["Male", "Female", "Others"].map((g) => (
                    <label key={g} className="cursor-pointer">
                      <input
                        type="radio"
                        name="gender"
                        value={g}
                        checked={form.gender === g}
                        onChange={inputHandler}
                        className="peer sr-only"
                      />
                      <span className="block rounded-xl border border-white/10 bg-white/[0.04] py-2.5 text-center text-sm text-slate-300 transition hover:bg-white/[0.08] peer-checked:border-teal-300/70 peer-checked:bg-teal-300/15 peer-checked:text-teal-200 peer-focus-visible:ring-4 peer-focus-visible:ring-teal-300/20">
                        {g}
                      </span>
                    </label>
                  ))}
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

              {/* Submit */}
              <button
                type="submit"
                disabled={submitting}
                className="w-full rounded-xl bg-gradient-to-r from-teal-300 via-sky-300 to-fuchsia-300 py-3.5 text-base font-semibold text-slate-900 shadow-lg shadow-teal-300/20 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-300/30 disabled:opacity-60"
              >
                {submitting ? "Creating account…" : "Create account"}
              </button>
            </form>

            {/* Login */}
            <p className="mt-6 text-center text-sm text-slate-400">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => Navigate("/login")}
                className="font-semibold text-teal-300 transition hover:text-teal-200"
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
