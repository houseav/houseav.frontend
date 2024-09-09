import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

import { IoCheckmarkDoneCircle, IoCreate } from "react-icons/io5";
import { MdPlaylistPlay } from "react-icons/md";
import { FaSignOutAlt } from "react-icons/fa";
import { TiUserDelete } from "react-icons/ti";
import { CgProfile } from "react-icons/cg";
import defaultPhotoProfile from "../../assets/default-user-profile-photo.png";

import {
  updateUserFailure,
  updateUserStart,
  updateUserSuccess,
} from "../../redux/user/userSlice";

import {
  handleDeleteUserLogic,
  handleFileUploadLogic,
  handleShowListingsLogic,
} from "./handleFunctions";

import ProfileInReview from "./ProfileInReview";
import Spinner from "../../components/Spinner";
import YourListing from "../../components/YourListing";
import ProfileModal from "../../components/Modal";
import FloatingLabelInput from "../../components/Input/FloatingLabelnput";
import { BASE_URL } from "../../../utils/constants";

export default function Profile() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const fileRef = useRef(null);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const [updateSuccess, setUpdateSuccess] = useState(false);

  const [file, setFile] = useState(undefined);
  const [fileProgression, setFileProgression] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);

  const [showListingsError, setShowListingsError] = useState(false);
  const [userListings, setUserListings] = useState();
  const [formDataUserUpdate, setFormDataUserUpdate] = useState({
    username: currentUser.user.username,
    email: currentUser.user.email,
    avatar: currentUser.user.avatar,
  });
  const [modalInformations, setModalInformations] = useState({});
  const [errors, setErrors] = useState({});
  const modal = useRef();

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);

  const handleOpenCartClick = (buttonName) => {
    if (buttonName === "delete") {
      const deleteTitle = t("src.pages.profile.btnDeleteTitle");
      const deleteMessage = t("src.pages.profile.btnDeleteMessage");
      const deleteModal = t("src.pages.profile.btnDeleteModal");

      setModalInformations({
        title: deleteTitle,
        description: `Hey, ${currentUser.user.username}, ${deleteMessage}`,
        actions: modalActions(deleteModal, "bg-red-600", handleDeleteUser),
      });
    }

    if (buttonName === "signout") {
      const signOutTitle = t("src.pages.profile.btnSignOutTitle");
      setModalInformations({
        title: signOutTitle,
        description: t("src.pages.profile.btnSignOutMessage"),
        actions: modalActions(signOutTitle, "bg-blue-400", handleSignOut),
      });
    }

    modal.current.open();
  };

  const checkFormData = () => {
    let errors = {};
    let isValid = true;

    if (!formDataUserUpdate.username) {
      errors.username = "Username is required";
      isValid = false;
    }

    if (!formDataUserUpdate.email) {
      errors.email = "Email is required";
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };

  var modalActions = (nameButton, bgColorButton, functionToCall) => (
    <>
      <button
        className={`inline-flex w-full justify-center rounded-md ${bgColorButton} px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto`}
        onClick={functionToCall}
      >
        {nameButton}
      </button>
      <button className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto">
        {t("src.pages.profile.btnDeleteCancel")}
      </button>
    </>
  );

  const handleFileUpload = async (file) => {
    await handleFileUploadLogic(
      file,
      setFileProgression,
      setFileUploadError,
      setFormDataUserUpdate,
      formDataUserUpdate
    );
  };

  const handleChangeInput = (event) => {
    const { id, value } = event.target;
    setFormDataUserUpdate((prevFormData) => ({
      ...prevFormData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!checkFormData()) return;
    try {
      dispatch(updateUserStart());
      const res = await fetch(`${BASE_URL}/user/${currentUser.user.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.access_token}`,
        },
        body: JSON.stringify(formDataUserUpdate),
      });
      const acceptableStatusCodes = [200, 201, 202];
      if (!acceptableStatusCodes.includes(res.status)) {
        dispatch(updateUserFailure("Error while updating user"));
        return;
      }
      const data = await res.json();
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };

  const handleDeleteUser = async () => {
    await handleDeleteUserLogic(dispatch, currentUser);
  };

  const handleSignOut = async () => {
    localStorage.clear();
    window.location.reload();
    // TODO await handleSignOutLogic(dispatch);
  };

  const handleShowListings = async (event) => {
    event.preventDefault();
    await handleShowListingsLogic(
      currentUser.user.id,
      setShowListingsError,
      setUserListings,
      currentUser
    );
  };
  console.log(currentUser);
  return (
    <div className="p-3 max-w-lg mx-auto h-screen">
      <ProfileModal
        ref={modal}
        title={modalInformations.title || ""}
        descriptions={modalInformations.description || ""}
        actions={modalInformations.actions || ""}
      />
      {currentUser.user.fkRoleId.id !== 3 ? (
        <>
          <h1 className="text-3xl font-semibold my-7 flex items-center gap-2 justify-center">
            <CgProfile />
            {t("src.pages.profile.title")}
          </h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <input
              type="file"
              ref={fileRef}
              hidden
              accept="image/*"
              onChange={(event) => setFile(event.target.files[0])}
            />
            <img
              src={
                formDataUserUpdate?.avatar === "default"
                  ? defaultPhotoProfile
                  : formDataUserUpdate?.avatar
              }
              alt="profile"
              className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 hover:scale-105 shadow-lg hover:border-gray-400"
              onClick={() => fileRef.current.click()}
            />
            <p className="text-sm self-center">
              {fileUploadError ? (
                <span className="text-red-700"></span>
              ) : fileProgression > 0 && fileProgression < 100 ? (
                <span className="text-slate-400">{`Uploading ${fileProgression}%`}</span>
              ) : fileProgression === 100 ? (
                <span className="text-blue-300">
                  {t("src.pages.profile.imageLoaded")}
                </span>
              ) : (
                ""
              )}
            </p>
            <FloatingLabelInput
              label="username"
              onChange={handleChangeInput}
              value={formDataUserUpdate.username}
              error={errors.username}
              id="username"
            />
            <FloatingLabelInput
              id="email"
              label="email"
              value={formDataUserUpdate.email}
              onChange={handleChangeInput}
              error={errors.email}
            />
            {/* <FloatingLabelInput
            id="password"
            label="password"
            type="password"
            onChange={handleChangeInput}
          /> */}

            <div className="flex gap-2">
              <Link to={"/forgot-password-request"}>
                <span className="text-blue-500/50 hover:text-blue-600/50 hover:scale-105">
                  Forgot Password?
                </span>
              </Link>
            </div>
            <button
              disabled={loading}
              className="w-full text-center mt-4 justify-center text-gray-900 font-semibold py-3 px-6 bg-gray-400 bg-opacity-50 rounded-lg shadow-md hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center gap-3"
            >
              {loading ? (
                <Spinner />
              ) : (
                <div className="flex gap-2">
                  <IoCheckmarkDoneCircle className="text-2xl" />
                  {t("src.pages.profile.btnUpdate")}
                </div>
              )}
            </button>
            <Link
              className="w-full text-center mt-4 justify-center text-gray-900 font-semibold py-3 px-6 bg-gray-400 bg-opacity-50 rounded-lg shadow-md hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center gap-3"
              to={"/create-listing"}
            >
              <IoCreate className="text-2xl" />
              {t("src.pages.profile.btnCreateHouse")}
            </Link>
            <button
              type="button"
              onClick={(event) => handleShowListings(event)}
              className="w-full text-center mt-4 justify-center text-gray-900 font-semibold py-3 px-6 bg-gray-400 bg-opacity-50 rounded-lg shadow-md hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center gap-3"
            >
              <MdPlaylistPlay className="text-2xl" />
              {t("src.pages.profile.btnShowListing")}
            </button>
          </form>
          <div className="flex justify-between mt-5">
            <span
              className="text-red-700 cursor-pointer flex items-center gap-2 hover:scale-105"
              onClick={() => handleOpenCartClick("delete")}
            >
              <TiUserDelete />
              {t("src.pages.profile.btnDelete")}
            </span>
            <span
              className="text-blue-500 cursor-pointer flex items-center gap-2 hover:scale-105"
              onClick={() => handleOpenCartClick("signout")}
            >
              <FaSignOutAlt />
              {t("src.pages.profile.btnSignOutTitle")}
            </span>
          </div>
        </>
      ) : (
        <>
          <ProfileInReview />
          <span
            className="text-blue-500 hover:text-blue-600/50 cursor-pointer flex items-center gap-2 m-10"
            onClick={() => handleOpenCartClick("signout")}
          >
            <FaSignOutAlt />
            {t("src.pages.profile.btnSignOutTitle")}
          </span>
        </>
      )}

      <div className="flex justify-center mt-5">
        <p className="text-red-700 mt-5">{error ? error : ""}</p>
        <p className="text-green-500 mt-5">
          {updateSuccess ? t("src.pages.profile.successProfileUpdate") : ""}
        </p>
      </div>
      <div className="flex justify-center pb-10">
        <p className="text-red-700 mt-5">
          {showListingsError ? t("src.pages.profile.errorProfileUpdate") : ""}
        </p>
        <YourListing
          currentUser={currentUser}
          userListings={userListings}
          setUserListings={setUserListings}
        />
      </div>
    </div>
  );
}
