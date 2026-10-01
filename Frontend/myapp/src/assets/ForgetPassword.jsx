import axios from "axios";
import React, { useState } from "react";

import { useNavigate } from "react-router-dom";

const ForgetPassword = () => {
  const [forget, setForget] = useState({
    email: "",
  });

  const navigate = useNavigate();

  const forgetInputHandler = (e) => {
    const { name, value } = e.target;

    setForget({
      ...forget,
      [name]: value,
    });
  };

  const forgetHandler = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8090/forget-password",
        forget
      );

      console.log(
        "Forget Password Response >>>>>",
        response.data
      );

      if (response.data.status) {
        console.log("Email Before Navigate >>>>>>>", forget.email)
        navigate("/otpPage", {
          state: {
            email: forget.email,
          },
        });
      }

    } catch (error) {
      console.log(
        "Forget Password Error >>>>>",
        error.response?.data
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">

      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8">

        {/* Heading */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">
            Forgot Password
          </h1>

          <p className="text-gray-500 mt-2">
            Enter your email to receive an OTP
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
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Enter Email
            </label>

            <input
              id="email"
              type="email"
              placeholder="Enter your email"
              name="email"
              value={forget.email}
              onChange={forgetInputHandler}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Send OTP */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            Send OTP
          </button>

        </form>

      </div>
    </div>
  );
};

export default ForgetPassword;

