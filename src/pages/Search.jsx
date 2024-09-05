import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { FaSearch } from "react-icons/fa";
import ListingItem from "../components/ListingItem";
import ProfileInReview from "../pages/Profile/ProfileInReview";
import { BASE_URL } from "../../utils/constants";

export default function Search() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const [sidebardata, setSidebardata] = useState({
    searchTerm: "",
    parking: false,
    furnished: false,
    wifi: false,
    sort: "createdAt",
    order: "desc",
    animali: false,
    availability: false,
    allergy: false,
  });

  const [loading, setLoading] = useState(false);
  const [listings, setListings] = useState([]);
  const [showMore, setShowMore] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const parkingFromUrl = urlParams.get("parking");
    const furnishedFromUrl = urlParams.get("furnished");
    const wifiFromUrl = urlParams.get("wifi");
    const sortFromUrl = urlParams.get("sort");
    const orderFromUrl = urlParams.get("order");
    const allergyFromUrl = urlParams.get("allergy");
    const availabilityFromUrl = urlParams.get("availability");
    const animaliFromUrl = urlParams.get("animali");

    const parseBoolean = (value) => value === "true";

    if (
      searchTermFromUrl ||
      parkingFromUrl ||
      furnishedFromUrl ||
      wifiFromUrl ||
      sortFromUrl ||
      orderFromUrl ||
      allergyFromUrl ||
      availabilityFromUrl ||
      animaliFromUrl
    ) {
      setSidebardata({
        searchTerm: searchTermFromUrl || "",
        parking: parseBoolean(parkingFromUrl),
        furnished: parseBoolean(furnishedFromUrl),
        wifi: parseBoolean(wifiFromUrl),
        sort: sortFromUrl || "createdAt",
        order: orderFromUrl || "desc",
        allergy: parseBoolean(allergyFromUrl),
        availability: parseBoolean(availabilityFromUrl),
        animali: parseBoolean(animaliFromUrl),
      });
    }

    const fetchListings = async () => {
      setLoading(true);
      setShowMore(false);
      const searchQuery = urlParams.toString();
      const res = await fetch(`${BASE_URL}/house/get?${searchQuery}`, {
        headers: {
          Authorization: `Bearer ${currentUser.access_token}`,
        },
      });
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListings(data);
      setLoading(false);
    };

    fetchListings();
  }, [location.search]);

  const handleChange = (e) => {
    const { id, value, checked, type } = e.target;

    if (id === "searchTerm") {
      setSidebardata({ ...sidebardata, searchTerm: value });
    } else if (id === "sort_order") {
      const [sort, order] = value.split("_");
      setSidebardata({ ...sidebardata, sort, order });
    } else {
      const isChecked = type === "checkbox" ? checked : value === "true";
      setSidebardata({ ...sidebardata, [id]: isChecked });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", sidebardata.searchTerm);
    urlParams.set("parking", sidebardata.parking);
    urlParams.set("furnished", sidebardata.furnished);
    urlParams.set("wifi", sidebardata.wifi);
    urlParams.set("sort", sidebardata.sort);
    urlParams.set("order", sidebardata.order);
    urlParams.set("animali", sidebardata.animali);
    urlParams.set("allergy", sidebardata.allergy);
    urlParams.set("availability", sidebardata.availability);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  const onShowMoreClick = async () => {
    const numberOfListings = listings.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`${BASE_URL}/house/get?${searchQuery}`, {
      headers: {
        Authorization: `Bearer ${currentUser.access_token}`,
      },
    });
    const data = await res.json();
    if (data.length < 9) {
      setShowMore(false);
    }
    setListings([...listings, ...data]);
  };
  return (
    <div className="flex flex-col md:flex-row">
      {currentUser.user.fkRoleId.id !== 3 ? (
        <>
          <div className="p-7  border-b-2 md:border-r-2 md:min-h-screen">
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              <div className="flex items-center gap-2">
                <label className="whitespace-nowrap font-semibold">
                  {t("src.pages.search.searchTerm")}
                </label>
                <input
                  type="text"
                  id="searchTerm"
                  placeholder="Search..."
                  className="border rounded-lg p-3 w-full"
                  value={sidebardata.searchTerm}
                  onChange={handleChange}
                />
              </div>
              <label className="font-semibold">
                {t("src.pages.search.amenitiesLabel")}:
              </label>
              <div className="flex gap-2 flex-wrap items-center">
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="availability"
                    className="w-5"
                    onChange={handleChange}
                    checked={sidebardata.availability}
                  />
                  <span>
                    {t("src.pages.listing.labelPlaceHolderAvailability")}
                  </span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="allergy"
                    className="w-5"
                    onChange={handleChange}
                    checked={sidebardata.allergy}
                  />
                  <span>{t("src.pages.listing.labelAllergy")}</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="animali"
                    className="w-5"
                    onChange={handleChange}
                    checked={sidebardata.animali}
                  />
                  <span>{t("src.pages.listing.labelAnimals")}</span>
                </div>
              </div>
              <div className="flex gap-2 flex-wrap items-center">
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="wifi"
                    className="w-5"
                    onChange={handleChange}
                    checked={sidebardata.wifi}
                  />
                  <span>Wifi</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="parking"
                    className="w-5"
                    onChange={handleChange}
                    checked={sidebardata.parking}
                  />
                  <span>{t("src.pages.listing.inputPlaceHolderParking")}</span>
                </div>
                <div className="flex gap-2">
                  <input
                    type="checkbox"
                    id="furnished"
                    className="w-5"
                    onChange={handleChange}
                    checked={sidebardata.furnished}
                  />
                  <span>
                    {t("src.pages.listing.inputPlaceHolderFurnished")}
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <label className="font-semibold">
                  {t("src.pages.search.sortForLabel")}:
                </label>
                <select
                  onChange={handleChange}
                  defaultValue={"created_at_desc"}
                  id="sort_order"
                  className="border rounded-lg p-3"
                >
                  <option value="createdAt_desc">
                    {t("src.pages.search.sortForOptionFirst")}
                  </option>
                  <option value="createdAt_asc">
                    {t("src.pages.search.sortForOptionSecond")}
                  </option>
                  <option value="sleepPlace_desc">
                    {t("src.pages.search.sortForOptionThird")}
                  </option>
                  <option value="sleepPlace_asc">
                    {t("src.pages.search.sortForOptionFourth")}
                  </option>
                </select>
              </div>
              <button className="w-full text-center mt-4 justify-center text-gray-900 font-semibold py-3 px-6 bg-gray-400 bg-opacity-50 rounded-lg shadow-md hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center gap-3 justify-between">
                {t("src.pages.search.searchBtn")}
                <FaSearch />
              </button>
            </form>
          </div>
          <div className="flex-1">
            <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
              {t("src.pages.search.searchResults")}
            </h1>
            <div className="p-7 flex flex-wrap gap-4">
              {!loading && listings.length === 0 && (
                <p className="text-xl text-slate-700">
                  {t("src.pages.search.searchNoResults")}
                </p>
              )}
              {loading && (
                <p className="text-xl text-slate-700 text-center w-full">
                  {t("src.pages.search.searchResultsLoading")}
                </p>
              )}

              {!loading &&
                listings &&
                listings.map((listing) => (
                  <ListingItem key={listing.id} listing={listing} />
                ))}

              {showMore && (
                <button
                  onClick={onShowMoreClick}
                  className="text-green-700 hover:underline p-7 text-center w-full"
                >
                  {t("src.pages.search.searchResultsLoadMore")}
                </button>
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="p-3 max-w-lg mx-auto h-screen pt-20">
          <p className="text-2xl text-center text-red-600 animate-pulse">
            {t("src.pages.search.searchNotAuth")}
          </p>
          <ProfileInReview />
        </div>
      )}
    </div>
  );
}
