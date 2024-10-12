import { Link } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import {
  FaHouseCircleCheck,
  FaHouseCircleExclamation,
  FaUserClock,
} from "react-icons/fa6";
import { PiUsersThreeFill, PiHouseSimpleFill } from "react-icons/pi";
import { useTranslation } from "react-i18next";
import React from "react";
import AddUsersAsAdmin from "./AddUsersAsAdmin";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const { t } = useTranslation();
  const { currentUser } = useSelector((state) => state.user);

  return (
    <div className="p-3 mx-auto h-screen">
      <h1 className="text-3xl font-semibold text-center my-7">Dashboard</h1>
      <div className="flex justify-center gap-4 m-14">
        <div className="text-blue-700 text-xl opacity-65 flex items-center gap-2 bg-white rounded-xl p-7 border border-cyan-400">
          <PiUsersThreeFill /> <p className="font-bold">325</p> Users
        </div>
        <div className="text-blue-700 text-xl opacity-65 flex items-center gap-2 bg-white rounded-xl p-7 border border-cyan-400">
          <PiHouseSimpleFill /> <p className="font-bold">73</p> Houses
        </div>
        <div className="text-blue-700 text-xl opacity-65 flex items-center gap-2 bg-white rounded-xl p-7 border border-cyan-400">
          <FaUserClock /> <p className="font-bold">13</p> Users in Review
        </div>
        <div className="text-blue-700 text-xl opacity-65 flex items-center gap-2 bg-white rounded-xl p-7 border border-cyan-400">
          <FaHouseCircleExclamation />
          <p className="font-bold">3</p> Houses in Review
        </div>
      </div>
      <div className="flex justify-center gap-4">
        <Link to="/queue-register">
          <button className="text-blue-500 hover:scale-105 opacity-65 flex items-center gap-2 bg-white rounded-xl p-5 border border-cyan-400 shadow-lg">
            <FaUserShield />
            {t("src.pages.dashboard.reviewUsersBtn")}
          </button>
        </Link>
        <Link to="/queue-listing">
          <button className="text-blue-500 hover:scale-105 opacity-65 flex items-center gap-2 bg-white rounded-xl p-5 border border-cyan-400 shadow-lg">
            <FaHouseCircleCheck />
            {t("src.pages.dashboard.reviewHousesBtn")}
          </button>
        </Link>
      </div>
      <AddUsersAsAdmin />
    </div>
  );
}
