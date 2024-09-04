import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore from "swiper";

import { Navigation } from "swiper/modules";
import Spinner from "../components/Spinner.jsx";
import ListingInReview from "./ListingInReview";
import "swiper/css/bundle";

import {
  FaBath,
  FaBed,
  FaChair,
  FaMapMarkerAlt,
  FaParking,
  FaWifi,
} from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { BsFillPeopleFill, BsFillCalendarDateFill } from "react-icons/bs";
import { CgUnavailable } from "react-icons/cg";
import {
  IoLogoWhatsapp,
  IoIosArrowDropdownCircle,
  IoIosArrowDropupCircle,
} from "react-icons/io";
import { IoCall, IoMailOutline } from "react-icons/io5";
import { MdConnectWithoutContact } from "react-icons/md";
import { TbMailFilled } from "react-icons/tb";
import { MdVerified } from "react-icons/md";

export default function Listing() {
  const { t } = useTranslation();
  SwiperCore.use([Navigation]);
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [copied, setCopied] = useState(false);

  const [showDetailsContact, setShowDetailsContact] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const params = useParams();
  const { currentLng } = useSelector((state) => state.language.language);
  const whatsappMessage = encodeURIComponent(
    "Hello there!\nTi contatto dalla piattaforma houseav,\n sono interessato al tuo annuncio.. \npotresti fornirmi maggiori dettagli?"
  );
  const emailSubject = encodeURIComponent(
    "[Houseav.] - Hey sono interessato al tuo annuncio"
  );
  const emailBody = encodeURIComponent(
    "Hello there!\nTi contatto dalla piattaforma houseav,\n sono interessato al tuo annuncio.. \npotresti fornirmi maggiori dettagli?\n\nGrazie!"
  );

  function getFormattedDate(date) {
    var newDate = new Date(date);
    return newDate.toISOString().split("T")[0];
  }

  const isItalian = currentLng === "it";
  const availabilityText =
    listing && listing.availability ? "Disponibile" : "Non disponibile";
  const availabilityClass =
    listing && listing.availability ? "text-gray-400" : "text-red-400";

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/house/${params.id}`);
        const acceptableStatusCodes = [200, 201, 202];
        if (!acceptableStatusCodes.includes(res.status)) {
          setError(true);
          setLoading(false);
          return;
        }
        const data = await res.json();
        if (data.verified == false) {
          setIsVerified(false);
        } else {
          setIsVerified(true);
          setListing({
            ...data,
            availabilityDateStart: getFormattedDate(data.availabilityDateStart),
            availabilityDateEnd: getFormattedDate(data.availabilityDateEnd),
            imageUrls: data.imageUrls.split(";"),
          });
        }

        setLoading(false);
        setError(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };
    fetchListing();
  }, [params.id]);

  return (
    <main>
      {loading && (
        <div className="flex items-center justify-center h-screen">
          <Spinner />
        </div>
      )}
      {error && (
        <p className="text-center my-7 text-2xl">
          {t("src.pages.listingPage.somethingWentWrong")}
        </p>
      )}

      {listing && !isVerified && <ListingInReview />}

      {listing && !loading && !error && (
        <div>
          <Swiper navigation>
            {listing.imageUrls.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className="h-[550px]"
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: "cover",
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>

          {copied && (
            <p className="fixed top-[23%] right-[5%] z-10 rounded-md bg-slate-100 p-2">
              {t("src.pages.listingPage.linkCopied")}
            </p>
          )}
          <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
            <div className="flex text-2xl font-semibold">
              {listing.title} -
              {listing.availability ? (
                <span className={listing.availability ? "ml-2 flex" : "flex"}>
                  <span
                    className={
                      listing.availability ? "text-gray-500" : "text-red-600"
                    }
                  >
                    {listing.availability ? "Av" : "Un"}
                  </span>
                  <span>{listing.availability ? "ailable " : "vailable "}</span>
                  <span className="flex items-center">
                    {" "}
                    {currentLng && isItalian && (
                      <p className={`text-xl ${availabilityClass}`}>
                        : {availabilityText}
                      </p>
                    )}
                  </span>
                </span>
              ) : null}
            </div>
            <div
              className="flex items-center gap-4 cursor-pointer"
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setCopied(true);
                setTimeout(() => {
                  setCopied(false);
                }, 2000);
              }}
            >
              <IoCopy className="text-slate-500 hover:text-gray-400" />
              <p className="hover:text-gray-600 text-gray-800 text-xs">
                {t("src.pages.listingPage.linkCopy")}
              </p>
            </div>
            <p className="flex items-center mt-1 gap-2 text-slate-600  text-sm">
              <FaMapMarkerAlt className="text-blue-400" />
              {listing.address}
            </p>
            {listing.availability == true && (
              <div className="flex gap-4">
                {listing.availabilityDateStart && (
                  <div className="bg-blue-400 w-full max-w-[200px] text-white text-center p-2 rounded-md flex gap-6 items-center">
                    <BsFillCalendarDateFill className="" />
                    <div>
                      <span className="">
                        <p className="text-[10px] text-gray-300">
                          {t("src.pages.listing.inputFromAvailable")}
                        </p>
                        {listing.availabilityDateStart}
                      </span>
                    </div>
                  </div>
                )}
                {listing.availabilityDateEnd && (
                  <div className="bg-blue-500 w-full max-w-[200px] text-white text-center p-3 rounded-md flex gap-6 items-center">
                    <BsFillCalendarDateFill className="" />
                    <div>
                      <span className="">
                        <p className="text-[10px] text-gray-300">
                          {t("src.pages.listing.inputToAvailable")}
                        </p>
                        {listing.availabilityDateEnd}
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}
            <p className="text-slate-800">
              <span className="font-semibold text-black">
                {t("src.pages.adminupdatehouse.houseDescriptionLabel")} -{" "}
              </span>
              {listing.description}
            </p>
            <ul className="text-gray-600 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6">
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <BsFillPeopleFill className="text-lg" />
                {listing.sleepPlace > 1
                  ? `${listing.sleepPlace} ${t(
                      "src.pages.listing.inputPlacesHolderSleepPlace"
                    )} `
                  : `${listing.sleepPlace} ${t(
                      "src.pages.listing.inputPlaceHolderSleepPlace"
                    )}`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBed className="text-lg" />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} ${t(
                      "src.components.listingItem.bedroomsLabel"
                    )}`
                  : `${listing.bedrooms} ${t(
                      "src.components.listingItem.bedroomLabel"
                    )}`}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaBath className="text-lg" />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} ${t(
                      "src.pages.listing.inputPlaceholderBathrooms"
                    )}`
                  : `${listing.bathrooms} ${t(
                      "src.components.listingItem.bathroomLabel"
                    )} `}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap">
                <FaParking className="text-lg" />
                {listing.parking
                  ? t("src.pages.listingPage.isPresent")
                  : t("src.pages.listingPage.isNotPresent")}
              </li>

              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaChair className="text-lg" />
                <li className="flex items-center gap-1 whitespace-nowrap">
                  <FaParking className="text-lg" />
                  {listing.parking
                    ? t("src.pages.listingPage.furnished")
                    : t("src.pages.listingPage.notFurnished")}
                </li>
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                <FaWifi className="text-lg" />
                {listing.wifi ? "Wifi" : "No wifi"}
              </li>
              <li className="flex items-center gap-1 whitespace-nowrap ">
                {listing.availability ? (
                  <div className="flex items-center  gap-2">
                    <MdVerified className="text-green-500" />
                    <p> {t("src.pages.listingPage.available")}</p>
                  </div>
                ) : (
                  <div className="flex items-center text-red-500 gap-2">
                    <CgUnavailable className="text-red-500" />
                    <p> {t("src.pages.listingPage.notAvailable")}</p>
                  </div>
                )}
              </li>
            </ul>
            <div className="mt-8">
              <div className="text-base font-bold text-gray-500 flex gap-1 mb-4">
                <MdConnectWithoutContact className="text-2xl" />
                <p> {t("src.pages.listingPage.contactOwner")}</p>
              </div>
              <div className="mt-2 text-3xl flex gap-4">
                <a
                  className="block mb-2 text-yellow-500"
                  href={`https://wa.me/${
                    listing.fkUserId.prefix.split("+")[1]
                  }${listing.fkUserId.number}?text=${whatsappMessage}`}
                >
                  <IoLogoWhatsapp className="hover:scale-105" />
                </a>
                <a
                  className="block"
                  href={`mailto:${listing.fkUserId.email}?subject=${emailSubject}&body=${emailBody}`}
                >
                  <TbMailFilled className="text-gray-400 hover:scale-105" />
                </a>
              </div>
              <div
                className="flex gap-1 items-center cursor-pointer mt-8"
                onClick={() => setShowDetailsContact(!showDetailsContact)}
              >
                {showDetailsContact ? (
                  <IoIosArrowDropdownCircle className="text-gray-400 text-xl hover:scale-105" />
                ) : (
                  <IoIosArrowDropupCircle className="text-gray-400 text-xl hover:scale-105" />
                )}
                <p className="text-gray-400 text-sm">
                  {t("src.pages.listingPage.showContactDetails")}
                </p>
              </div>

              {showDetailsContact && (
                <div>
                  <div className="flex items-center p-2 gap-4 mt-4">
                    <IoCall className="text-xs" />
                    <p className="text-bold text-gray-700"> Number </p>
                    {listing.fkUserId.prefix} {listing.fkUserId.number}
                  </div>
                  <div className="flex items-center p-3 gap-2 mt-4">
                    <IoMailOutline className="text-xs" />
                    <p className="text-bold text-gray-700"> Email </p>
                    {listing.fkUserId.email}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
