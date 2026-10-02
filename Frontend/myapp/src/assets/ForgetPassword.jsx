import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const ForgetPassword = () => {
  const [forget, setForget] = useState({
    email: "",
  });

  const [error, setError] = useState("");
  const [fieldError, setFieldError] = useState({});
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const forgetInputHandler = (e) => {
    const { name, value } = e.target;

    setForget({
      ...forget,
      [name]: value,
    });

    setFieldError({
      ...fieldError,
      [name]: "",
    });

    setError("");
  };

  const forgetHandler = async (e) => {
    e.preventDefault();

    const newError = {};

    if (forget.email === "") {
      newError.email = "Email field is required";
    }

    setFieldError(newError);

    // Validation error hai to API call nahi hogi
    if (Object.keys(newError).length > 0) {
      return;
    }

    try {
      setError("");
      setLoading(true);

      const response = await axios.post(
        "http://localhost:8090/forget-password",
        forget
      );

      console.log(
        "Forget Password Response >>>>>",
        response.data
      );

      if (response.data.status) {
        toast.success("OTP sent successfully!");

        console.log(
          "Email Before Navigate >>>>>>>",
          forget.email
        );

        navigate("/otpPage", {
          state: {
            email: forget.email,
          },
        });
      } else {
        setError(response.data.message);
        toast.error(response.data.message);
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "Something went wrong. Please try again.";

      setError(message);
      toast.error(message);

      console.log(
        "Forget Password Error >>>>>",
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

      {/* Fonts + animations */}
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

            {/* Heading */}
            <div className="mb-7">

              <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-300/10 text-teal-300 ring-1 ring-teal-300/20">
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
                    d="M15.75 9V5.25a3.75 3.75 0 10-7.5 0V9m-1.5 0h10.5a1.5 1.5 0 011.5 1.5v8.25a1.5 1.5 0 01-1.5 1.5H6.75a1.5 1.5 0 01-1.5-1.5V10.5A1.5 1.5 0 016.75 9z"
                  />
                </svg>
              </div>

              <h2 className="font-display text-2xl font-semibold">
                Forgot your password?
              </h2>

              <p className="mt-1.5 text-sm leading-relaxed text-slate-400">
                Enter your registered email and we'll send you
                an OTP to reset your password.
              </p>

            </div>

            <form
              onSubmit={forgetHandler}
              className="space-y-5"
            >

              {/* Email */}
              <div>

                <label
                  htmlFor="email"
                  className={labelClass}
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={forget.email}
                  onChange={forgetInputHandler}
                  className={`${inputClass} ${
                    fieldError.email
                      ? "border-red-400/50 focus:border-red-400"
                      : ""
                  }`}
                />

                {fieldError.email && (
                  <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-400">
                    <span>!</span>
                    {fieldError.email}
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

              {/* Send OTP */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-gradient-to-r from-teal-300 via-sky-300 to-fuchsia-300 py-3.5 text-base font-semibold text-slate-900 shadow-lg shadow-teal-300/20 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-300/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending OTP…" : "Send OTP"}
              </button>

              {/* Back to Login */}
              <button
                type="button"
                onClick={() => navigate("/login")}
                className="w-full rounded-xl border border-white/15 bg-white/[0.04] py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Back to Login
              </button>

            </form>

            {/* Bottom Info */}
            <p className="mt-6 text-center text-xs leading-relaxed text-slate-500">
              We'll send a verification code to your registered
              email address.
            </p>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgetPassword;