import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ResetPassword = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const email = location.state?.email;

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [fieldError, setFieldError] = useState({});

  const resetPasswordHandler = async (e) => {
    e.preventDefault();

    const newError = {};

    if (!email) {
      setError("Email not found. Please restart the password reset process.");
      toast.error("Email not found. Please try again.");
      return;
    }

    if (password === "") {
      newError.password = "Password field is required";
    } else if (password.length < 8) {
      newError.password = "Password must be at least 8 characters";
    }

    if (confirmPassword === "") {
      newError.confirmPassword = "Confirm password is required";
    } else if (password !== confirmPassword) {
      newError.confirmPassword = "Passwords do not match";
    }

    setFieldError(newError);

    if (Object.keys(newError).length > 0) {
      return;
    }

    try {
      setError("");
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8090/reset-password",
        {
          email: email,
          password: password,
        }
      );

      console.log(
        "Reset Password Response >>>",
        response.data
      );

      if (response.data.status) {
        toast.success("Password reset successfully!");

        setTimeout(() => {
          navigate("/login");
        }, 1000);
      } else {
        const message =
          response.data.message ||
          "Password reset failed. Please try again.";

        setError(message);
        toast.error(message);
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      setError(message);
      toast.error(message);

      console.log(
        "Reset Password Error >>>",
        error.response?.data
      );
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-[15px] text-white placeholder-slate-500 outline-none transition focus:border-teal-300/60 focus:bg-white/[0.07] focus:ring-4 focus:ring-teal-300/10";

  const labelClass =
    "mb-2 block text-sm font-medium text-slate-300";

  return (
    <div className="signup-root relative min-h-screen overflow-hidden bg-[#070b17] text-white">

      {/* Fonts + Animations */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Sora:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');

        .signup-root {
          font-family: 'Inter', system-ui, sans-serif;
        }

        .signup-root .font-display {
          font-family: 'Sora', 'Inter', sans-serif;
        }

        @keyframes drift-a {
          0%,100% {
            transform: translate(0,0) scale(1);
          }

          50% {
            transform: translate(60px,40px) scale(1.15);
          }
        }

        @keyframes drift-b {
          0%,100% {
            transform: translate(0,0) scale(1);
          }

          50% {
            transform: translate(-50px,-60px) scale(1.1);
          }
        }

        @keyframes rise {
          from {
            opacity: 0;
            transform: translateY(24px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .orb-a {
          animation: drift-a 14s ease-in-out infinite;
        }

        .orb-b {
          animation: drift-b 17s ease-in-out infinite;
        }

        .card-in {
          animation: rise .7s cubic-bezier(.2,.8,.2,1) both;
        }

        @media (prefers-reduced-motion: reduce) {
          .orb-a,
          .orb-b,
          .card-in {
            animation: none;
          }
        }
      `}</style>

      {/* Background */}
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

      {/* Main */}
      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-5 py-10">

        <div className="card-in w-full max-w-md">

          <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-8 shadow-2xl shadow-black/40 backdrop-blur-2xl sm:p-9">

            {/* Icon */}
            <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-300/10 text-teal-300 ring-1 ring-teal-300/20">

              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                className="h-7 w-7"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 9V5.25a3.75 3.75 0 10-7.5 0V9"
                />

                <rect
                  x="5"
                  y="9"
                  width="14"
                  height="11"
                  rx="2"
                />

                <path
                  strokeLinecap="round"
                  d="M12 13v3"
                />
              </svg>

            </div>

            {/* Heading */}
            <div className="mb-7">

              <h2 className="font-display text-2xl font-semibold">
                Reset your password
              </h2>

              <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                Create a new password for your account.
              </p>

              {email && (
                <p className="mt-3 truncate text-sm font-medium text-teal-300">
                  {email}
                </p>
              )}

            </div>

            <form
              onSubmit={resetPasswordHandler}
              className="space-y-5"
            >

              {/* New Password */}
              <div>

                <label
                  htmlFor="password"
                  className={labelClass}
                >
                  New Password
                </label>

                <div className="relative">

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);

                      setFieldError({
                        ...fieldError,
                        password: "",
                      });

                      setError("");
                    }}
                    className={`${inputClass} pr-16 ${
                      fieldError.password
                        ? "border-red-400/50 focus:border-red-400"
                        : ""
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400 transition hover:text-white"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>

                </div>

                {fieldError.password && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-400">
                    <span>!</span>
                    {fieldError.password}
                  </p>
                )}

              </div>

              {/* Confirm Password */}
              <div>

                <label
                  htmlFor="confirmPassword"
                  className={labelClass}
                >
                  Confirm Password
                </label>

                <div className="relative">

                  <input
                    id="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm new password"
                    value={confirmPassword}
                    onChange={(e) => {
                      setConfirmPassword(e.target.value);

                      setFieldError({
                        ...fieldError,
                        confirmPassword: "",
                      });

                      setError("");
                    }}
                    className={`${inputClass} pr-16 ${
                      fieldError.confirmPassword
                        ? "border-red-400/50 focus:border-red-400"
                        : ""
                    }`}
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-sm font-medium text-slate-400 transition hover:text-white"
                  >
                    {showConfirmPassword
                      ? "Hide"
                      : "Show"}
                  </button>

                </div>

                {fieldError.confirmPassword && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-400">
                    <span>!</span>
                    {fieldError.confirmPassword}
                  </p>
                )}

              </div>

              {/* Backend Error */}
              {error && (
                <p
                  role="alert"
                  className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-2.5 text-sm text-rose-200"
                >
                  {error}
                </p>
              )}

              {/* Reset Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-teal-300 via-sky-300 to-fuchsia-300 py-3.5 text-base font-semibold text-slate-900 shadow-lg shadow-teal-300/20 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-300/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading
                  ? "Resetting Password…"
                  : "Reset Password"}
              </button>

              {/* Back Login */}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="w-full rounded-xl border border-white/15 bg-white/[0.04] py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Back to Login
              </button>

            </form>

            {/* Bottom */}
            <p className="mt-6 text-center text-xs leading-relaxed text-slate-500">
              Your new password must contain at least 8
              characters.
            </p>

          </div>

        </div>

      </div>
    </div>
  );
};

export default ResetPassword;