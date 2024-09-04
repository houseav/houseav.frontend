import SafeSpinner from "../../assets/spinner-safe.gif";
import { useTranslation } from "react-i18next";
import React from "react";

export default function ProfileInReview() {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex-col text-center h-[30vh] mt-10 mb-10">
        <div className="flex justify-center">
          <img src={SafeSpinner} width={44} height={44} />
        </div>
        <h2 className="text-xl font-bold mt-4 text-red-400 hover:text-red-600 animate-pulse">
          {t("src.pages.profileInReview.title")}
        </h2>
        <div className="bg-white p-5 min-h-[300px] space-y-3 mt-4 rounded-xl shadow-xl">
          <p className="mt-3 text-gray-700">
            {t("src.pages.profileInReview.messagePart1")}
            <br /> {t("src.pages.profileInReview.messagePart2")}
          </p>
          <br />
          <p className="text-gray-500 pb-4">
            {t("src.pages.profileInReview.messagePart3")}
            <br />
          </p>
          <p className="text-gray-200">houseav.</p>
        </div>
      </div>
    </>
  );
}
