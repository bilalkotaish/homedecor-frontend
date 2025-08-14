import React, { useRef, useState, useContext } from "react";
import { postData } from "../../utils/api";
import { useNavigate } from "react-router-dom";
import { myContext } from "../../App";

const OtpBox = () => {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);
  const histroy = useNavigate();
  const context = useContext(myContext);
  const actiontype = localStorage.getItem("action-type");

  const handleChange = (e, index) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    if (!value) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Move to next input
    if (index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const verifyOtp = () => {
    const fullOtp = otp.join("");
    if (fullOtp.length < 6) {
      alert("Please enter all 6 digits");
      return;
    }
    if (actiontype !== "forgetPassword") {
      postData("/api/user/verify", {
        email: localStorage.getItem("userEmail"),
        otp: fullOtp,
      }).then((res) => {
        console.log(res);
        if (res.success) {
          context.Alertbox("success", res.message);
          localStorage.removeItem("userEmail"), histroy("/login");
          // redirect or next action
        } else {
          context.Alertbox("error", res.message);
        }
      });
    } else {
      postData("/api/user/verify-forgetpassword", {
        email: localStorage.getItem("userEmail"),
        otp: fullOtp,
      }).then((res) => {
        console.log(res);
        if (res.success) {
          context.Alertbox("success", res.message);
          histroy("/Resetpassword");
          // redirect or next action
        } else {
          context.Alertbox("error", res.message);
        }
      });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <div className="flex gap-3 mb-4">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            maxLength={1}
            className="w-12 h-12 text-center text-lg border border-gray-400 rounded-md focus:outline-primary"
            value={digit}
            onChange={(e) => handleChange(e, index)}
            ref={(el) => (inputRefs.current[index] = el)}
          />
        ))}
      </div>

      <button
        onClick={verifyOtp}
        className="bg-primary text-white px-6 py-2 rounded hover:bg-gray-700"
      >
        Submit OTP
      </button>
    </div>
  );
};

export default OtpBox;
