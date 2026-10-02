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

  const [showPassword, setShowPassword] = useState(false);
  const [sending, setSending] = useState(false);
  const [verifying, setVerifying] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [fieldError, setFieldError] = useState({});

  const Navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value,
    });

    // Input fill karte hi us field ka error remove
    setFieldError({
      ...fieldError,
      [name]: "",
    });
  };

  // Send OTP
  const sendOtp = async () => {
    if (!form.email) {
      setFieldError({
        ...fieldError,
        email: "Email field is required",
      });
      return;
    }

    try {
      setError("");
      setSending(true);

      const response = await axios.post(
        "http://localhost:8090/otp-generate",
        {
          email: form.email,
        }
      );

      if (response.data.status) {
        setVerify(true);
        toast.success("OTP sent successfully!");
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Could not send OTP. Try again.";

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

      const response = await axios.post(
        "http://localhost:8090/verify-otp",
        {
          email: form.email,
          otp: otp,
        }
      );

      if (response.data.status) {
        setVerifyOtps(true);
        toast.success("Email verified successfully!");
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Wrong OTP. Check and retry.";

      setError(message);
      toast.error(message);
    } finally {
      setVerifying(false);
    }
  };

  // Signup Submit
  const submitHandler = async (e) => {
    e.preventDefault();

    const newError = {};

    if (form.name === "")
      newError.name = "Name field is required";

    if (form.email === "")
      newError.email = "Email field is required";

    if (form.password === "")
      newError.password = "Password field is required";

    if (form.gender === "")
      newError.gender = "Please select your gender";

    setFieldError(newError);

    if (Object.keys(newError).length > 0) {
      return;
    }

    if (!verifyOtps) {
      toast.warning("Please verify your email first!");
      return;
    }

    try {
      setError("");
      setSubmitting(true);

      const response = await axios.post(
        "http://localhost:8090/create-user",
        {
          name: form.name,
          email: form.email,
          password: form.password,
          gender: form.gender,
        }
      );

      if (response.data.status) {
        toast.success("Account created successfully!");

        setTimeout(() => {
          Navigate("/login");
        }, 1000);
      }
    } catch (err) {
      const message =
        err.response?.data?.message ||
        "Signup failed. Try again.";

      setError(message);
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const inputClass = `
    w-full rounded-xl
    border border-white/10
    bg-white/[0.05]
    px-4 py-3.5
    text-[15px] text-white
    placeholder:text-slate-500
    outline-none
    transition-all duration-300
    focus:border-cyan-300/70
    focus:bg-white/[0.08]
    focus:ring-4
    focus:ring-cyan-300/10
    hover:border-white/20
  `;

  const labelClass =
    "mb-2 block text-sm font-semibold tracking-wide text-slate-300";

  return (
    <div className="relative min-h-screen overflow-hidden bg-[#050816] text-white">

      {/* Background */}
      <div className="pointer-events-none absolute inset-0">

        <div className="absolute -left-40 -top-40 h-[30rem] w-[30rem] rounded-full bg-cyan-500/20 blur-[130px]" />

        <div className="absolute -bottom-40 -right-40 h-[32rem] w-[32rem] rounded-full bg-fuchsia-500/20 blur-[140px]" />

        <div className="absolute left-[45%] top-[30%] h-80 w-80 rounded-full bg-indigo-500/10 blur-[120px]" />

        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "42px 42px",
          }}
        />
      </div>

      {/* Main */}
      <div className="relative mx-auto flex min-h-screen max-w-7xl items-center justify-center px-5 py-10">

        <div className="grid w-full max-w-6xl items-center gap-14 lg:grid-cols-2">

          {/* LEFT SECTION */}
          <div className="hidden lg:block">

            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-cyan-300/20 bg-cyan-300/5 px-4 py-2 text-sm text-cyan-200">
              <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
              Secure account creation
            </div>

            <h1 className="text-6xl font-bold leading-[1.05] tracking-tight">
              Build your
              <br />

              <span className="bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-300 bg-clip-text text-transparent">
                digital journey.
              </span>
            </h1>

            <p className="mt-7 max-w-lg text-lg leading-8 text-slate-400">
              Create your account, verify your email and start
              exploring everything we have built for you.
            </p>

            {/* Features */}
            <div className="mt-10 space-y-4">

              {[
                {
                  title: "Email verification",
                  text: "Secure OTP based verification",
                },
                {
                  title: "Protected account",
                  text: "Your password stays private",
                },
                {
                  title: "Fast onboarding",
                  text: "Create your account in minutes",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="flex items-center gap-4 rounded-2xl border border-white/5 bg-white/[0.025] p-4 transition hover:border-cyan-300/20 hover:bg-white/[0.05]"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-300">
                    ✓
                  </div>

                  <div>
                    <p className="font-semibold text-slate-200">
                      {item.title}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {item.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* FORM CARD */}
          <div className="mx-auto w-full max-w-md">

            <div className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-7 shadow-2xl shadow-black/50 backdrop-blur-2xl sm:p-9">

              {/* Header */}
              <div className="mb-8">

                <h2 className="text-3xl font-bold tracking-tight">
                  Create account
                </h2>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  Enter your details below to get started.
                </p>
              </div>

              <form
                onSubmit={submitHandler}
                className="space-y-5"
              >

                {/* NAME */}
                <div>
                  <label
                    htmlFor="name"
                    className={labelClass}
                  >
                    Full name
                  </label>

                  <input
                    id="name"
                    type="text"
                    name="name"
                    placeholder="Enter your full name"
                    value={form.name}
                    onChange={inputHandler}
                    className={`${inputClass} ${
                      fieldError.name
                        ? "border-red-400/50 focus:border-red-400"
                        : ""
                    }`}
                  />

                  {fieldError.name && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-400">
                      <span>!</span>
                      {fieldError.name}
                    </p>
                  )}
                </div>

                {/* EMAIL */}
                <div>

                  <label
                    htmlFor="email"
                    className={labelClass}
                  >
                    Email address
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
                      className={`${inputClass} pr-28 ${
                        fieldError.email
                          ? "border-red-400/50 focus:border-red-400"
                          : ""
                      }`}
                    />

                    {form.email && !verifyOtps && (
                      <button
                        type="button"
                        onClick={sendOtp}
                        disabled={sending}
                        className="absolute right-1.5 top-1.5 bottom-1.5 rounded-lg bg-cyan-300 px-4 text-sm font-bold text-slate-950 transition-all hover:bg-cyan-200 hover:shadow-lg hover:shadow-cyan-300/20 disabled:cursor-not-allowed disabled:opacity-50"
                      >
                        {sending
                          ? "Sending..."
                          : verify
                          ? "Resend"
                          : "Verify"}
                      </button>
                    )}
                  </div>

                  {fieldError.email && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-400">
                      <span>!</span>
                      {fieldError.email}
                    </p>
                  )}

                  {/* OTP */}
                  {verify && !verifyOtps && (
                    <div className="mt-4 rounded-2xl border border-cyan-300/10 bg-black/20 p-5">

                      <div className="mb-4 flex items-start gap-3">

                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-cyan-300/10 text-cyan-300">
                          ✉
                        </div>

                        <div>
                          <p className="text-sm font-medium text-slate-200">
                            Verify your email
                          </p>

                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            Enter the 6-digit code sent to{" "}
                            <span className="text-cyan-300">
                              {form.email}
                            </span>
                          </p>
                        </div>
                      </div>

                      <div className="flex justify-center">

                        <OtpInput
                          value={otp}
                          onChange={setOtp}
                          numInputs={6}
                          renderSeparator={
                            <span className="mx-1 text-slate-700">
                              •
                            </span>
                          }
                          renderInput={(props) => (
                            <input
                              {...props}
                              className="!h-12 !w-10 rounded-xl border border-white/10 bg-white/[0.06] text-center text-lg font-bold text-white outline-none transition-all focus:border-cyan-300/70 focus:bg-cyan-300/5 focus:ring-4 focus:ring-cyan-300/10"
                            />
                          )}
                        />
                      </div>

                      <button
                        type="button"
                        onClick={verifyOtp}
                        disabled={
                          verifying || otp.length < 6
                        }
                        className="mt-5 w-full rounded-xl bg-white/[0.08] py-3 text-sm font-semibold text-white transition-all hover:bg-cyan-300 hover:text-slate-950 disabled:cursor-not-allowed disabled:opacity-40"
                      >
                        {verifying
                          ? "Verifying..."
                          : "Confirm OTP"}
                      </button>
                    </div>
                  )}

                  {/* VERIFIED */}
                  {verifyOtps && (
                    <div className="mt-3 flex items-center gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/5 px-4 py-3">

                      <span className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400/15 text-sm text-emerald-300">
                        ✓
                      </span>

                      <div>
                        <p className="text-sm font-semibold text-emerald-300">
                          Email verified
                        </p>

                        <p className="text-xs text-slate-500">
                          Your email has been successfully verified.
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* PASSWORD */}
                <div>

                  <label
                    htmlFor="password"
                    className={labelClass}
                  >
                    Password
                  </label>

                  <div className="relative">

                    <input
                      id="password"
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      name="password"
                      placeholder="Create a password"
                      value={form.password}
                      onChange={inputHandler}
                      className={`${inputClass} pr-20 ${
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
                      className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg px-2 py-1 text-xs font-semibold text-slate-400 transition hover:bg-white/5 hover:text-white"
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

                {/* GENDER */}
                <div>

                  <span className={labelClass}>
                    Gender
                  </span>

                  <div className="grid grid-cols-3 gap-2">

                    {["Male", "Female", "Others"].map(
                      (g) => (
                        <label
                          key={g}
                          className="cursor-pointer"
                        >

                          <input
                            type="radio"
                            name="gender"
                            value={g}
                            checked={
                              form.gender === g
                            }
                            onChange={inputHandler}
                            className="peer sr-only"
                          />

                          <div className="rounded-xl border border-white/10 bg-white/[0.04] px-2 py-3 text-center text-sm font-medium text-slate-400 transition-all hover:border-white/20 hover:bg-white/[0.07] peer-checked:border-cyan-300/60 peer-checked:bg-cyan-300/10 peer-checked:text-cyan-200">
                            {g}
                          </div>
                        </label>
                      )
                    )}
                  </div>

                  {fieldError.gender && (
                    <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-400">
                      <span>!</span>
                      {fieldError.gender}
                    </p>
                  )}
                </div>

                {/* API ERROR */}
                {error && (
                  <div className="flex items-center gap-3 rounded-xl border border-red-400/20 bg-red-400/5 px-4 py-3">

                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-red-400/10 text-sm font-bold text-red-400">
                      !
                    </span>

                    <p className="text-sm text-red-300">
                      {error}
                    </p>
                  </div>
                )}

                {/* SUBMIT */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-cyan-300 via-blue-300 to-fuchsia-300 py-3.5 text-sm font-bold text-slate-950 shadow-xl shadow-cyan-300/10 transition-all duration-300 hover:scale-[1.01] hover:shadow-cyan-300/20 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <span className="relative z-10">
                    {submitting
                      ? "Creating account..."
                      : "Create account"}
                  </span>

                  <div className="absolute inset-0 -translate-x-full bg-white/30 transition-transform duration-500 group-hover:translate-x-full" />
                </button>
              </form>

              {/* LOGIN */}
              <div className="mt-7 flex items-center gap-3">

                <div className="h-px flex-1 bg-white/10" />

                <span className="text-xs text-slate-600">
                  OR
                </span>

                <div className="h-px flex-1 bg-white/10" />
              </div>

              <p className="mt-5 text-center text-sm text-slate-500">
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={() =>
                    Navigate("/login")
                  }
                  className="font-semibold text-cyan-300 transition hover:text-cyan-200"
                >
                  Log in
                </button>
              </p>

            </div>

            <p className="mt-5 text-center text-xs text-slate-600">
              By creating an account, you agree to our terms
              and privacy policy.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Signup;

