import { Link } from "react-router-dom";
import { FaUserShield } from "react-icons/fa";
import { FaHouseCircleCheck } from "react-icons/fa6";
import { useTranslation } from "react-i18next";

export default function Dashboard() {
  const { t } = useTranslation();
  return (
    <div className="p-3 max-w-lg mx-auto h-screen">
      <h1 className="text-3xl font-semibold text-center my-7">Dashboard</h1>
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
    </div>
  );
}
