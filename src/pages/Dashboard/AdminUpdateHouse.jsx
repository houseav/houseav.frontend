import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import PropTypes from "prop-types";
import { formattedDate } from "../../../utils/utils";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import Toggle from "../../components/Toggle";
import Spinner from "../../components/Spinner";
import { BASE_URL } from "../../../utils/constants";

export default function AdminUpdateHouse({ house, setHouse, onCloseModal }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false); // Define loading state
  const { currentUser } = useSelector((state) => state.user);
  const [houseVerified, setHouseVerified] = useState(house?.verified ?? false);
  const navigate = useNavigate();

  const handleChangeInput = (event) => {
    const { id, value } = event.target;
    console.log("AdminUpdateHouse:handleChangeInput::[id, value]", id, value);
    setHouse((prevHouse) => ({
      ...prevHouse,
      fkHouseId: {
        ...prevHouse.fkHouseId,
        [id]: value,
      },
    }));
    console.log("AdminUpdateHouse:handleChangeInput::", house);
  };

  const handleUpdateSingleHouse = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!houseVerified) {
      console.log("House not verified");
      setLoading(false);
      return;
    }
    house.verified = houseVerified;
    try {
      const res = await fetch(`${BASE_URL}/queue-house-registration/verify`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.access_token}`,
        },
        body: JSON.stringify({
          house,
        }),
      });
      const acceptableStatusCodes = [200, 201, 202];
      if (acceptableStatusCodes.includes(res.status)) {
        const data = await res.json();
        console.log("DATA:::", data);
        setLoading(false);
        navigate("/queue-listing");
        onCloseModal(house);
        window.location.reload();
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (house) house.verified = houseVerified;
  }, [houseVerified]);

  return (
    <div>
      {house ? (
        <div>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder={t(
                "src.pages.adminupdatehouse.houseTitlePlaceHolder"
              )}
              defaultValue={house.fkHouseId.title}
              id="title"
              className="border p-3 rounded-lg"
              onChange={handleChangeInput}
            />
            <input
              type="text"
              placeholder={t(
                "src.pages.adminupdatehouse.houseAddressPlaceHolder"
              )}
              id="address"
              defaultValue={house.fkHouseId.address}
              className="border p-3 rounded-lg"
              onChange={handleChangeInput}
            />
            <input
              type="text"
              placeholder={t(
                "src.pages.adminupdatehouse.houseAllergyPlaceHolder"
              )}
              id="allergy"
              defaultValue={house.fkHouseId.allergy}
              className="border p-3 rounded-lg"
              onChange={handleChangeInput}
            />
            <input
              type="date"
              placeholder="availability date start"
              id="availabilityDateStart"
              defaultValue={formattedDate(house.fkHouseId.createdAt)}
              className="border p-3 rounded-lg"
              onChange={handleChangeInput}
            />
            <input
              type="date"
              placeholder="availability date end"
              id="availabilityDateEnd"
              defaultValue={formattedDate(house.fkHouseId.updatedAt)}
              className="border p-3 rounded-lg"
              onChange={handleChangeInput}
            />
            <input
              type="number"
              placeholder={t(
                "src.pages.adminupdatehouse.houseBathroomsPlaceHolder"
              )}
              id="bathrooms"
              defaultValue={house.fkHouseId.bathrooms}
              className="border p-3 rounded-lg"
              onChange={handleChangeInput}
            />
            <input
              type="number"
              placeholder={t(
                "src.pages.adminupdatehouse.houseBedroomsPlaceHolder"
              )}
              defaultValue={house.fkHouseId.bedrooms}
              id="bedrooms"
              className="border p-3 rounded-lg"
              onChange={handleChangeInput}
            />
            <input
              type="text"
              placeholder={t(
                "src.pages.adminupdatehouse.houseDescriptionPlaceHolder"
              )}
              defaultValue={house.fkHouseId.description}
              id="description"
              className="border p-3 rounded-lg"
              onChange={handleChangeInput}
            />
            <div className="flex justify-end space-x-2 m-2">
              {houseVerified ? (
                <p className="text-green-500">
                  {t("src.pages.adminupdatehouse.houseVerified")}
                </p>
              ) : (
                <p className="text-red-500">
                  {t("src.pages.adminupdatehouse.houseToVerify")}
                </p>
              )}
              <Toggle
                verified={houseVerified}
                onVerifiedChange={setHouseVerified}
              />
            </div>
            <button
              onClick={handleUpdateSingleHouse}
              className="w-full text-center mt-4 justify-center text-gray-900 font-semibold py-3 px-6 bg-gray-400 bg-opacity-50 rounded-lg shadow-md hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center gap-3"
            >
              {loading ? (
                <Spinner />
              ) : (
                <div className="flex gap-2">
                  <IoCheckmarkDoneCircle className="text-2xl" />
                  {t("src.pages.adminupdatehouse.houseUpdateBtn")}
                </div>
              )}
            </button>
          </form>
        </div>
      ) : (
        <>
          <p>{t("src.pages.adminupdatehouse.houseUpdateBtn")}</p>
          <Spinner />
        </>
      )}
    </div>
  );
}

AdminUpdateHouse.propTypes = {
  house: PropTypes.object,
  setHouse: PropTypes.func,
  onCloseModal: PropTypes.func,
};
