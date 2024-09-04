import LoadingSpinner from "../assets/spinner-loading.gif";
import { useTranslation } from "react-i18next";
import FloatingLabelInput from "../components/Input/FloatingLabelnput";
import React, { useState } from "react";
import { BsFillSendArrowUpFill } from "react-icons/bs";
import { AiOutlineSend } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

export default function ForgotPasswordRequest() {
  const { t } = useTranslation();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleResetPasswordRequest = async () => {
    if (email === "" || (email === null) | undefined) {
      setErrors({ email: "Email is required" });
      return;
    }
    setLoading(true);
    const res = await fetch(`/forgot-password/request`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ email: email }),
    });

    const data = await res.json();
    if (data.status == "error") {
      setErrors({ email: data.message });
      return;
    } else {
      setLoading(false);
      navigate("/sign-in");
    }
    console.log(data);
  };

  return (
    <div className="flex flex-col justify-center items-center h-[30vh] mt-20 mb-10 ">
      <div className="flex justify-center items-center space-x-3 text-xl font-bold mt-4 text-red-400 hover:text-red-600 animate-pulse">
        <BsFillSendArrowUpFill />
        <p> {t("src.pages.forgotPasswordRequest.title")}</p>
      </div>
      <div className="md:min-w-[500px] max-w-[800px] pl-10 pr-10 pb-5 pt-5 min-h-[300px] space-y-5 mt-4 rounded-xl shadow-xl flex flex-col justify-center items-center">
        <p className="text-gray-500 pl-10 pr-10">
          {t("src.pages.forgotPasswordRequest.insightText1")}
        </p>
        <FloatingLabelInput
          type="email"
          id="email"
          label="email"
          wFull="w-full"
          onChange={(e) => setEmail(e.target.value)}
          error={errors.email}
        />
        {loading ? (
          <img src={LoadingSpinner} alt="loading" className="w-10 h-10" />
        ) : (
          <button
            className="btn-outline border border-gray-600 hover:border-gray-400 flex items-center space-x-2 text-slate-400 hover:text-slate-600/40  hover:bg-slate-300/40 hover:shadow-sm hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out rounded-md pl-3 pt-2 pb-2 pr-3"
            onClick={handleResetPasswordRequest}
          >
            <AiOutlineSend /> Send Request
          </button>
        )}
        <p className="text-gray-200">houseav.</p>
      </div>
    </div>
  );
}
