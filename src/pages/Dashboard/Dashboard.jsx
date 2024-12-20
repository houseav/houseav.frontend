import { Link } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import {
  FaHouseCircleCheck,
  FaHouseCircleExclamation,
  FaUserClock,
} from "react-icons/fa6";
import { PiUsersThreeFill, PiHouseSimpleFill } from "react-icons/pi";
import { BiSolidDashboard } from "react-icons/bi";
import { useTranslation } from "react-i18next";
import React from "react";
import AddUsersAsAdmin from "./AddUsersAsAdmin";
import { useSelector } from "react-redux";

export default function Dashboard() {
  const { t } = useTranslation();
  const { currentUser } = useSelector((state) => state.user);
  const items = [
    {
      icon: <PiUsersThreeFill />,
      count: 325,
      label: 'Users',
    },
    {
      icon: <PiHouseSimpleFill />,
      count: 73,
      label: 'Houses',
    },
    {
      icon: <FaUserClock />,
      count: 13,
      label: 'Users in Review',
    },
    {
      icon: <FaHouseCircleExclamation />,
      count: 3,
      label: 'Houses in Review',
    },
  ];

  return (
    <div className="p-3 mx-auto h-screen">
      <div className="flex justify-center items-center space-x-3">
      <BiSolidDashboard className="text-3xl"/>
      <h1 className="text-3xl font-semibold my-7">Dashboard</h1>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-5 m-6 max-w-screen-xl mx-auto">
        {items.map((item, index) => (
          <div
          key={index}
          className="w-full text-blue-700 opacity-75 text-xl flex items-center gap-2 bg-white rounded-xl p-7 border border-cyan-400 transform transition-transform duration-300 ease-in-out hover:scale-105 hover:shadow-lg hover:bg-blue-50 hover:text-blue-800"
          >
          {item.icon}
          <p className="font-bold">{item.count}</p>
            {item.label}
          </div>
        ))}
      </div>

      {/* Buttons Section */}
      <div className="flex justify-center gap-4 my-6">
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

        <AddUsersAsAdmin currentUser={currentUser} />
    </div>
  );
}