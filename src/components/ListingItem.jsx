import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { MdLocationOn } from "react-icons/md";
import PropTypes from "prop-types";
import defaultHousePhoto from "../assets/default-house-photo.png";

export default function ListingItem({ listing }) {
  const { currentLng } = useSelector((state) => state.language.language);
  const { t } = useTranslation();
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`/listing/${listing.id}`}>
        <img
          src={listing.imageUrls.split(";")[0] || defaultHousePhoto}
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold text-slate-700">
            {listing.title}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate w-full">
              {listing.address}
            </p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>
          <span className={listing.availability ? "ml-2 flex" : "flex"}>
            <span
              className={
                listing.availability ? "text-gray-500" : "text-red-600"
              }
            >
              {listing.availability ? "Av" : "Un"}
            </span>
            <span>{listing.availability ? "ailable " : "vailable "}</span>
            {currentLng != undefined && (
              <span className="flex items-center">
                {" "}
                {currentLng == "it" && listing.availability == true ? (
                  <p className="text-base text-gray-400">: disponibile</p>
                ) : (
                  <p className="text-base text-red-500 ">: non disponibile</p>
                )}
              </span>
            )}
          </span>

          <div className="text-slate-700 flex gap-4">
            <div className="font-bold text-xs">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} ${t(
                    "src.components.listingItem.bedroomsLabel"
                  )}`
                : `${listing.bedrooms} ${t(
                    "src.components.listingItem.bedroomLabel"
                  )}`}
            </div>

            <div className="font-bold text-xs">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} ${t(
                    "src.pages.listing.inputPlaceholderBathrooms"
                  )}`
                : `${listing.bathrooms} ${t(
                    "src.components.listingItem.bathroomLabel"
                  )} `}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

ListingItem.propTypes = {
  listing: PropTypes.object.isRequired,
};
