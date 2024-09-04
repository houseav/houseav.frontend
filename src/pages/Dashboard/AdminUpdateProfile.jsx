import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { formattedDate } from "../../../utils/utils";
import Spinner from "../../components/Spinner";
import Toggle from "../../components/Toggle";
import SecurityEnDe from "../../../utils/security_en_de";
import PropTypes from "prop-types";

export default function AdminUpdateProfile({ user, setUser, onCloseModal }) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false); // Define loading state
  const { currentUser } = useSelector((state) => state.user);
  const [userVerified, setUserVerified] = useState(user?.verified ?? false);
  const navigate = useNavigate();

  const handleChangeInput = (event) => {
    const { id, value } = event.target;
    console.log("handleChangeInput", value);
    setUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
    console.log("handleChangeInput:::", user);
  };

  const handleUpdateSingleProfile = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!userVerified) {
      console.log("User not verified");
      setLoading(false);
      return;
    }
    const sec = new SecurityEnDe();
    const token = await sec.token();
    console.log("adminUpdateProfile::", user);

    try {
      const res = await fetch("/queue-user-registration/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.access_token}`,
        },
        body: JSON.stringify({
          token: token,
          user: user,
        }),
      });
      const acceptableStatusCodes = [200, 201, 202];
      if (acceptableStatusCodes.includes(res.status)) {
        const data = await res.json();
        console.log("DATA:::", data);
        setLoading(false);
        navigate("/queue-register");
        onCloseModal(user);
        window.location.reload();
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user) user.verified = userVerified;
  }, [userVerified]);

  return (
    <div>
      {user ? (
        <div>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="username"
              defaultValue={user.username}
              id="username"
              className="border p-3 rounded-lg"
              onChange={handleChangeInput}
            />
            <input
              type="email"
              placeholder="email"
              id="email"
              defaultValue={user.email}
              className="border p-3 rounded-lg"
              onChange={handleChangeInput}
            />
            <input
              type="text"
              placeholder="url image"
              id="avatar"
              defaultValue={t(
                "src.pages.adminupdateprofile.userUrlImagePlaceHolder"
              )}
              className="border p-3 rounded-lg"
              onChange={handleChangeInput}
            />
            <input
              type="date"
              placeholder="created at"
              id="createdAt"
              defaultValue={formattedDate(user.createdAt)}
              className="border p-3 rounded-lg"
              onChange={handleChangeInput}
            />
            <input
              type="date"
              placeholder="updated at"
              id="updatedAt"
              defaultValue={formattedDate(user.updatedAt)}
              className="border p-3 rounded-lg"
              onChange={handleChangeInput}
            />
            <input
              type="password"
              placeholder="password"
              id="password"
              className="border p-3 rounded-lg"
              onChange={handleChangeInput}
            />

            <input
              type="text"
              placeholder={t(
                "src.pages.adminupdateprofile.userNumberPlaceHolder"
              )}
              defaultValue={user.number}
              id="number"
              className="border p-3 rounded-lg"
              onChange={handleChangeInput}
            />
            <div className="flex justify-end space-x-2 m-2">
              {userVerified ? (
                <p className="text-green-500">
                  {t("src.pages.adminupdateprofile.userVerified")}
                </p>
              ) : (
                <p className="text-red-500">
                  {t("src.pages.adminupdateprofile.userToVerify")}
                </p>
              )}
              <Toggle
                verified={userVerified}
                onVerifiedChange={setUserVerified}
              />
            </div>
            <button
              onClick={handleUpdateSingleProfile}
              className="w-full text-center mt-4 justify-center text-gray-900 font-semibold py-3 px-6 bg-gray-400 bg-opacity-50 rounded-lg shadow-md hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center gap-3"
            >
              {loading ? (
                <Spinner />
              ) : (
                <div className="flex gap-2">
                  <IoCheckmarkDoneCircle className="text-2xl" />
                  {t("src.pages.adminupdateprofile.userUpdateBtn")}
                </div>
              )}
            </button>
          </form>
        </div>
      ) : (
        <>
          <p> {t("src.pages.adminupdateprofile.dataNotFound")}</p>
          <Spinner />
        </>
      )}
    </div>
  );
}

AdminUpdateProfile.propTypes = {
  user: PropTypes.object,
  setUser: PropTypes.func,
  onCloseModal: PropTypes.func,
};
