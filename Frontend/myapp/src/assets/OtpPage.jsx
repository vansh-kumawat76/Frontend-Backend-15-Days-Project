import axios from "axios";
import React, { useState } from "react";
import OtpInput from "react-otp-input";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const OtpPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
console.log("Full Location >>>>>>", location)
  const email = location.state?.email;
console.log("Email Form Location >>>>>>>", email);

  const [page, setPage] = useState("");

  console.log("Email >>>>>", email);
  console.log("OTP >>>>>", page);

  const verifyOtp = async () => {
    try {
        console.log("Email Sending>>>>>",email);
        console.log("Otp Sendign >>>>>",page)
      const response = await axios.post(
        "http://localhost:8090/verify-forget-otp",
        {
          email: email,
          otp: page,
        }
      );

      console.log("verify otp response >>>>>>>>", response.data);

      if (response.data.status) {
        toast.success("verify otp successfully");
setTimeout(()=>{
navigate("/resetPassword", {
          state: {
            email: email,
          },
        });
},1000)
        
      }
    } catch (error) {
      toast.error(
        "Verify OTP Error >>>>>",
        error.response?.data
      );
    }
  };

  return (
    <div className="mt-5 p-4 bg-gray-50 rounded-xl border border-gray-200">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        Enter OTP
      </label>

      <div className="flex justify-center">
        <OtpInput
          value={page}
          onChange={setPage}
          numInputs={6}
          renderSeparator={<span className="mx-1">-</span>}
          renderInput={(props) => (
            <input
              {...props}
              className="!w-10 h-12 border border-gray-300 rounded-lg text-center text-lg font-semibold outline-none focus:ring-2 focus:ring-blue-500"
            />
          )}
        />
      </div>

      <button
        type="button"
        onClick={verifyOtp}
        className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition"
      >
        Verify OTP
      </button>
    </div>
  );
};

export default OtpPage;