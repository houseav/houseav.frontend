import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LoadingSpinner from "../assets/spinner-loading.gif";
import FloatingLabelInput from "../components/Input/FloatingLabelnput";
import { useLocation, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../utils/constants";

export default function ForgotPassword() {
  const { t } = useTranslation();
  const location = useLocation();
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});

  const fiveMinutes = 5 * 60 * 1000; // milliseconds
  const urlParams = new URLSearchParams(location.search);
  const timeCreation = urlParams.get("timeCreation");
  const timeCreationDate = timeCreation ? new Date(timeCreation) : new Date();

  const calculateRemainingTime = () => {
    const now = new Date();
    const timeDifference = now - timeCreationDate;
    return fiveMinutes - timeDifference;
  };

  const [remainingTime, setRemainingTime] = useState(calculateRemainingTime);

  useEffect(() => {
    // Update the timer every second
    const interval = setInterval(() => {
      if (remainingTime >= 0) {
        setRemainingTime(calculateRemainingTime());
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [timeCreationDate]);

  const minutes = Math.floor(remainingTime / 60000);
  const seconds = Math.floor((remainingTime % 60000) / 1000);

  const handleResetPassword = async () => {
    if (formData.password !== formData["confirm-password"]) {
      setErrors({
        password: t("src.pages.forgotPassword.PasswordNotMatch"),
      });
      return;
    }
    const searchQuery = urlParams.toString();
    const fetchData = async () => {
      const res = await fetch(
        `${BASE_URL}/forgot-password/reset?${searchQuery}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ newPassword: formData.password }),
          method: "PUT",
        }
      );
      const data = await res.json();
      if (data.status === "error") {
        setErrors({
          general: t("src.pages.forgotPassword.generalError"),
        });
        return;
      } else {
        setLoading(false);
        navigate("/sign-in");
      }
    };
    fetchData();
  };

  useEffect(() => {
    const fetchData = async () => {
      const searchQuery = urlParams.toString();
      const res = await fetch(
        `${BASE_URL}/forgot-password/check?${searchQuery}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
          method: "GET",
        }
      );
      const data = await res.json();
      if (data.status === "error") {
        setErrors({
          general: t("src.pages.forgotPassword.generalError"),
        });
        return;
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, [location.search]);

  const handleChange = (event) => {
    const { id, value } = event.target;
    const newState = {
      ...formData,
      [id]: value,
    };
    setFormData(newState);
  };

  return (
    <div className="flex flex-col justify-center items-center h-[35vh] mt-20 mb-10 ">
      <h2 className="text-xl font-bold mt-4 text-red-400 hover:text-red-600 animate-pulse">
        {t("src.pages.forgotPassword.title")}
      </h2>

      {loading ? (
        <div className="flex flex-col justify-center items-center space-x-3 text-md mt-4 text-red-400 hover:text-red-600 animate-pulse">
          <img
            className="m-5 w-10 h-10"
            src={LoadingSpinner}
            alt="Loading Spinner"
          />
          {errors && !errors.general && (
            <p> {t("src.pages.forgotPassword.loadingYourRequest")}</p>
          )}
          <p className="text-red-600/40 m-8">{errors && errors.general}</p>
        </div>
      ) : remainingTime <= 0 ? (
        <div className="text-center text-red-500">
          <p className="mt-10 text-xl">
            {t("src.pages.forgotPassword.SessionExpired")}
          </p>
          <p className="text-red-400/60 mt-3">
            {t("src.pages.forgotPassword.GeneralText1")}
          </p>
        </div>
      ) : (
        <div className="md:min-w-[500px] max-w-[800px] pl-10 pr-10 pb-5 pt-5 min-h-[400px] space-y-5 mt-4 rounded-xl shadow-xl flex flex-col justify-center items-center">
          <div className="mt-6 text-lg font-semibold">
            {t("src.pages.forgotPassword.SessionTimeRemaining")}: {minutes}m{" "}
            {seconds}s
          </div>
          <p className="text-gray-500">
            {t("src.pages.forgotPassword.GeneralText2")}
          </p>
          <FloatingLabelInput
            id="password"
            label="Password"
            wFull="w-full"
            onChange={handleChange}
          />
          <div className="flex w-full">
            <FloatingLabelInput
              id="confirm-password"
              label="Confirm Password"
              wFull="w-full"
              onChange={handleChange}
              error={errors.password}
            />
          </div>
          <button
            className="btn-outline border border-gray-600 hover:border-gray-400 flex items-center space-x-2 text-slate-400 hover:text-slate-600/40 hover:bg-slate-300/40 hover:shadow-sm hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out rounded-md pl-2 pt-2 pb-2 pr-2"
            onClick={handleResetPassword}
          >
            Reset Password
          </button>
          <p className="text-gray-200">houseav.</p>
        </div>
      )}
    </div>
  );
}
