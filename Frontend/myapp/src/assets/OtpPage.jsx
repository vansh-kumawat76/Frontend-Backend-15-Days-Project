import axios from "axios";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OtpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const email = location.state?.email;

  const [page, setPage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  console.log("Full Location >>>>>>", location);
  console.log("Email From Location >>>>>>>", email);
  console.log("OTP >>>>>", page);

  const verifyOtp = async () => {
    setError("");

    // Email nahi mila
    if (!email) {
      setError("Email not found. Please try again.");
      toast.error("Email not found. Please try again.");
      return;
    }

    // OTP validation
    if (page === "") {
      setError("Please enter OTP.");
      toast.warning("Please enter OTP.");
      return;
    }

    if (page.length !== 6) {
      setError("OTP must be 6 digits.");
      toast.warning("OTP must be 6 digits.");
      return;
    }

    try {
      setLoading(true);

      console.log("Email Sending >>>>>", email);
      console.log("OTP Sending >>>>>", page);

      const response = await axios.post(
        "http://localhost:8090/verify-forget-otp",
        {
          email: email,
          otp: page,
        }
      );

      console.log(
        "Verify OTP Response >>>>>>>>",
        response.data
      );

      if (response.data.status) {
        toast.success("OTP verified successfully!");

        setTimeout(() => {
          navigate("/resetPassword", {
            state: {
              email: email,
            },
          });
        }, 1000);
      } else {
        setError(
          response.data.message || "Invalid OTP. Please try again."
        );

        toast.error(
          response.data.message || "Invalid OTP. Please try again."
        );
      }
    } catch (error) {
      const message =
        error.response?.data?.message ||
        "OTP verification failed. Please try again.";

      setError(message);
      toast.error(message);

      console.log(
        "Verify OTP Error >>>>>",
        error.response?.data
      );
    } finally {
      setLoading(false);
    }
  };

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
                <rect
                  x="3"
                  y="5"
                  width="18"
                  height="14"
                  rx="2"
                />

                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 7l9 6 9-6"
                />
              </svg>

            </div>

            {/* Heading */}
            <div className="mb-8">

              <h2 className="font-display text-2xl font-semibold">
                Verify your OTP
              </h2>

              <p className="mt-2 text-sm leading-relaxed text-slate-400">
                Enter the 6-digit OTP sent to your registered
                email address.
              </p>

              {email && (
                <p className="mt-3 truncate text-sm font-medium text-teal-300">
                  {email}
                </p>
              )}

            </div>

            {/* OTP Section */}
            <div>

              <label className="mb-3 block text-sm font-medium text-slate-300">
                Enter OTP
              </label>

              <div className="flex justify-center">

                <OtpInput
                  value={page}
                  onChange={(value) => {
                    setPage(value);
                    setError("");
                  }}
                  numInputs={6}
                  renderSeparator={
                    <span className="mx-1 text-slate-600">
                      •
                    </span>
                  }
                  renderInput={(props) => (
                    <input
                      {...props}
                      className={`!h-12 !w-10 rounded-xl border bg-white/[0.04] text-center text-lg font-semibold text-white outline-none transition focus:bg-white/[0.07] focus:ring-4 ${
                        error
                          ? "border-red-400/50 focus:border-red-400 focus:ring-red-400/10"
                          : "border-white/10 focus:border-teal-300/60 focus:ring-teal-300/10"
                      }`}
                    />
                  )}
                />

              </div>

              {/* Error */}
              {error && (
                <p
                  role="alert"
                  className="mt-4 rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-2.5 text-center text-sm text-rose-200"
                >
                  {error}
                </p>
              )}

              {/* Verify Button */}
              <button
                type="button"
                onClick={verifyOtp}
                disabled={loading}
                className="mt-6 w-full rounded-xl bg-gradient-to-r from-teal-300 via-sky-300 to-fuchsia-300 py-3.5 text-base font-semibold text-slate-900 shadow-lg shadow-teal-300/20 transition hover:brightness-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-teal-300/30 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Verifying OTP…" : "Verify OTP"}
              </button>

              {/* Back */}
              <button
                type="button"
                onClick={() => navigate("/forgetPassword")}
                className="mt-3 w-full rounded-xl border border-white/15 bg-white/[0.04] py-3 text-sm font-semibold text-white transition hover:bg-white/10"
              >
                Change Email
              </button>

            </div>

            {/* Bottom */}
            <p className="mt-6 text-center text-xs leading-relaxed text-slate-500">
              Didn't receive the OTP? Go back and try again.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default OtpPage;