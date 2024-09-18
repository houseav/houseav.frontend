import React, { useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { FaHouseUser } from "react-icons/fa";
import AdminUpdateHouse from "./AdminUpdateHouse";
import ProfileModal from "../../components/Modal";
import PropTypes from "prop-types";
import { BASE_URL } from "../../../utils/constants";

export default function QueueListing() {
  const { t } = useTranslation();
  const { currentUser } = useSelector((state) => state.user);
  const [houses, setHouses] = useState([]);
  const [error, setError] = useState(null);
  const [houseToUpdateRetrivedOnClick, setHouseToUpdateRetrivedOnClick] =
    useState(null);
  const modal = useRef();

  const handleClickOpenModal = (house) => {
    setHouseToUpdateRetrivedOnClick({ ...house });
    modal.current.open();
  };

  console.log("house", houses);
  console.log("houseToUpdateRetrivedOnClick", houseToUpdateRetrivedOnClick);

  const handleCloseModal = () => {
    modal.current.close();
    setHouseToUpdateRetrivedOnClick(null);
  };

  var modalActions = () => (
    <>
      <button
        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
        onClick={handleCloseModal}
      >
        {t("src.pages.dashboard.queueListing.modalCloseBtn")}
      </button>
    </>
  );

  useEffect(() => {
    const fetchHouseToAccept = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/queue-house-registration/verified-false`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${currentUser.access_token}`,
            },
          }
        );
        const acceptableStatusCodes = [200, 201, 202];
        if (acceptableStatusCodes.includes(res.status)) {
          const data = await res.json();
          if (data.status !== 404) {
            setHouses(data);
          } else {
            setError(data);
          }
          console.log(data);
          return;
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchHouseToAccept();
  }, []);

  const consoleLog = () => {
    console.log(houseToUpdateRetrivedOnClick);
    console.log("clicked update");
  };

  return (
    <div className="p-3 w-full max-w-lg md:max-w-none mx-auto h-screen px-4 md:px-14">
      {error && error.status == 401 ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative animate-pulse text-center mt-24">
          <strong className="font-bold">{error.message}!</strong>
        </div>
      ) : (
        <div className="p-3 max-w-lg mx-auto h-screen">
          <ProfileModal
            ref={modal}
            title={t(
              "src.pages.dashboard.queueListing.adminEditHouseTitleModal"
            )}
            iconHeader={
              <FaHouseUser className="text-2xl pl-1 hover:scale-105 opacity-80" />
            }
            actions={modalActions("Updates", "bg-orange-400", consoleLog)}
            component={
              <AdminUpdateHouse
                house={houseToUpdateRetrivedOnClick}
                setHouse={setHouseToUpdateRetrivedOnClick}
                onCloseModal={handleCloseModal}
              />
            }
          />
          <h1 className="text-3xl font-semibold text-center my-7">
            {t("src.pages.dashboard.queueListing.adminEditHouseTitle")}
          </h1>
          {!houses && (
            <h5 className="text-xs font-semibold text-center my-7 text-gray-400">
              {t("src.pages.dashboard.queueListing.adminHouseNotFound")}
            </h5>
          )}
          {houses && (
            <div>
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      {error && error.status === 404 ? (
                        <p className="text-center text-gray-400 mt-24">
                          {error.message}
                        </p>
                      ) : (
                        <table className="min-w-full text-left text-sm font-light text-surface">
                          <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                            <tr>
                              <th scope="col" className="px-6 py-4">
                                #
                              </th>
                              <th scope="col" className="px-6 py-4">
                                email
                              </th>
                              <th scope="col" className="px-6 py-4">
                                {t(
                                  "src.pages.dashboard.queueListing.adminHouseTableTitle"
                                )}
                              </th>
                              <th scope="col" className="px-6 py-4">
                                {t(
                                  "src.pages.dashboard.queueListing.adminHouseTableCreatedAt"
                                )}
                              </th>
                              <th scope="col" className="px-6 py-4">
                                {t(
                                  "src.pages.dashboard.queueListing.adminHouseTableAddress"
                                )}
                              </th>
                            </tr>
                          </thead>

                          <tbody>
                            {houses &&
                              houses.map(
                                (house, index) =>
                                  house.verified === false && (
                                    <tr
                                      className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-slate-200"
                                      key={house.id}
                                      onClick={() =>
                                        handleClickOpenModal(house)
                                      }
                                    >
                                      <td className="whitespace-nowrap px-6 py-4 font-medium">
                                        {index}
                                      </td>
                                      <td className="whitespace-nowrap px-6 py-4">
                                        {house.fkHouseId.id}
                                        {house.verified.toString()}
                                      </td>
                                      <td className="whitespace-nowrap px-6 py-4">
                                        {house.fkHouseId.title}
                                      </td>
                                      <td className="whitespace-nowrap px-6 py-4">
                                        {house.fkHouseId.createdAt}
                                      </td>
                                      <td className="whitespace-nowrap px-6 py-4">
                                        {house.fkHouseId.address}
                                      </td>
                                    </tr>
                                  )
                              )}
                          </tbody>
                        </table>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

QueueListing.propTypes = {
  house: PropTypes.object,
  setHouse: PropTypes.func,
  onCloseModal: PropTypes.func,
};
