"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import OTPInput from "react-otp-input";

const OtpPage = () => {
  const router = useRouter();
  const [otp, setOtp] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    // TODO: Add API call to verify OTP here
    if (otp.length === 4) {
      router.push("/reset-password");
    } else {
      alert("Please enter a valid 4-digit OTP");
    }
  };

  return (
    <section className="w-full md:w-1/2 flex items-center justify-center px-6 py-12">
      <div className="max-w-md w-full space-y-6">
        <h2 className="text-3xl font-bold text-gray-900">Enter OTP 🔐</h2>

        <p className="text-sm text-gray-600">
          We've sent a 4-digit code to your email. Enter it below to verify.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="w-full">
            <OTPInput
              value={otp}
              onChange={setOtp}
              numInputs={4}
              skipDefaultStyles
              inputType="tel"
              containerStyle="flex justify-between gap-4"
              inputStyle="w-full h-20 rounded-md border border-gray-300 text-center text-xl text-gray-800 shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
              renderSeparator={<span></span>}
              renderInput={(props) => <input {...props} />}
            />
          </div>

          <button
            type="submit"
            className="text-center bg-blue-700 text-white w-full py-2 rounded hover:bg-blue-800 transition"
          >
            Verify OTP
          </button>
        </form>

        <p className="text-sm text-gray-600">
          Didn’t receive the code?{" "}
          <span className="text-blue-600 hover:underline cursor-pointer">
            Resend
          </span>
        </p>
      </div>
    </section>
  );
};

export default OtpPage;
