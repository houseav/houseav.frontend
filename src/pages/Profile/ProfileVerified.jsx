import SafeSpinner from "../../assets/spinner-safe.gif";
import { useTranslation } from "react-i18next";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

export default function ProfileVerified() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(30);
  const [loggedOut, setLoggedOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1);
    }, 1000); // Update every 1 second

    const logoutTimer = setTimeout(() => {
      setLoggedOut(true);
      handlLogout();
    }, 30000); // After 30 seconds

    return () => {
      clearInterval(timer);
      clearTimeout(logoutTimer);
    };
  }, []);

  const handleSignOut = async () => {
    localStorage.clear();
    window.location.reload();
  };

  const handlLogout = () => {
    localStorage.clear();
    navigate("/sign-in");
  };

  return (
    <>
      <div className="flex-col text-center h-[30vh] mt-10 mb-10">
        <div className="flex justify-center"></div>
        <h2 className="text-xl font-bold mt-4 text-red-400 hover:text-red-600 animate-pulse">
          Profile Verified
        </h2>
        <div className="bg-white p-5 min-h-[300px] mt-4 rounded-xl shadow-xl space-y-6">
          {loggedOut ? (
            <p className="mt-3 text-gray-700 text-xl">
              You have been logged out due to inactivity.
            </p>
          ) : (
            <div className="mt-3 text-gray-700 text-xl">
              Your profile has been successfully verified.
              <br /> Please log in again to continue.
              <br />
              <span className="text-red-500">
                You will be logged out in {timeLeft} seconds...
              </span>
              <div
                className="flex justify-start items-center space-x-2 m-5 text-base text-blue-600 hover:text-blue-400 ease-in-out hover:cursor-pointer"
                onClick={handlLogout}
              >
                <FaSignOutAlt />
                <p>Sign out</p>
              </div>
            </div>
          )}
          <br />
          <p className="text-gray-200">houseav.</p>
        </div>
      </div>
    </>
  );
}
