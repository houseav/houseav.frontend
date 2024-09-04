import React, { useEffect, useState } from "react";
import { useTranslation, Trans } from "react-i18next";
import { Link } from "react-router-dom";

import { Navigation } from "swiper/modules";
import { useSelector } from "react-redux";
import SwiperCore from "swiper";
import "swiper/css/bundle";

import ListingItem from "../components/ListingItem";
import SearchFilter from "../components/SearchFilter/SearchFilter";
import DotPattern from "../components/bg-pattern/dot-pattern/DotPattern";
import { cn } from "../../utils/utils";

export default function Home() {
  const { t } = useTranslation();
  const { currentUser } = useSelector((state) => state.user);
  const [offerListings, setOfferListings] = useState([]);

  SwiperCore.use([Navigation]);
  useEffect(() => {
    const fetchOfferListings = async () => {
      try {
        const res = await fetch("/house/get?limit=4", {
          headers: {
            Authorization: `Bearer ${currentUser.access_token}`,
          },
        });
        const data = await res.json();
        setOfferListings(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOfferListings();
  }, []);
  return (
    <div>
      <div className="relative h-full w-full  overflow-hidden rounded-lg border bg-background  ">
        <DotPattern
          width={20}
          height={20}
          cx={1}
          cy={1}
          cr={1}
          className={cn(
            "[mask-image:linear-gradient(to_bottom_right,white,transparent,transparent)] "
          )}
        />

        <div className="flex flex-col lg:flex-row h-screen justify-center items-center lg:justify-between">
          <div className="flex-1 flex flex-col gap-6 p-10 md:p-28 px-3 max-w-6xl mx-auto max-w-[90%]">
            <h1 className="text-black-700 font-bold pt-24 sm:pt-0 text-4xl lg:text-7xl">
              <Trans
                i18nKey="homeTitle.title"
                components={{
                  1: <span className="text-slate-500"></span>,
                  2: <br />,
                }}
              ></Trans>
            </h1>
            <div className="text-gray-400 text-xs sm:text-sm">
              <Trans
                i18nKey="homeTitle.description"
                components={{ 2: <br /> }}
              />
            </div>

            {currentUser.user.fkRoleId && <SearchFilter />}
          </div>

          <div className="flex-1 flex justify-center pr-2 md:pr-32">
            <img
              src="./roomHomePage2.png"
              alt=""
              className="h-[290px] w-[290px] mb-24 sm:h-[350px] sm:w-[390px] lg:h-[450px] lg:w-[490px] items-center"
            />
          </div>
        </div>

        {currentUser.user.fkRoleId.id !== 3 && (
          <div className="max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10">
            {offerListings && offerListings.length > 0 && (
              <div className="">
                <div className="my-3">
                  <h2 className="text-2xl font-semibold text-slate-600">
                    {t("src.pages.home.recentOffersLabel")}
                  </h2>
                  <Link
                    className="text-sm text-blue-800 hover:underline"
                    to={"/search?availability=true"}
                  >
                    {t("src.pages.home.showMoreLabel")}
                  </Link>
                </div>
                <div className="flex flex-wrap gap-4">
                  {offerListings.map((listing) => (
                    <ListingItem listing={listing} key={listing.id} />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
