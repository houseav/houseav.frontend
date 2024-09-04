import React from "react";
import SafeSpinner from "../assets/spinner-safe.gif";
import { useTranslation } from "react-i18next";

export default function ListingInReview() {
  const { t } = useTranslation();
  return (
    <>
      <div className="flex-col text-center h-[30vh] mt-10 mb-10">
        <div className="flex justify-center">
          <img src={SafeSpinner} width={44} height={44} />
        </div>
        <h2 className="text-xl font-bold mt-4 text-red-400 hover:text-red-600 animate-pulse">
          {t("src.pages.listingInReview.title")}
        </h2>
        <div className="bg-white p-3 mt-4 rounded-xl shadow-xl">
          <p className="mt-3 text-gray-700">
            {t("src.pages.listingInReview.messagePart1")}
            <br />
            {t("src.pages.listingInReview.messagePart2")}
          </p>
          <br />
          <p className="text-gray-500 pb-4">
            {t("src.pages.listingInReview.messagePart3")}
            <br />
            <p className="text-gray-200">houseav.</p>
          </p>
        </div>
      </div>
    </>
  );
}
