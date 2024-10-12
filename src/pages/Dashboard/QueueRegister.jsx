import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import { FaUserEdit } from "react-icons/fa";
import { SlEnvolopeLetter } from "react-icons/sl";
import { IoMdMailUnread } from "react-icons/io";

import AdminUpdateProfileModal from "./AdminUpdateProfileModal";
import AdminViewReferralLetterModal from "./AdminViewReferralLetterModal";
import ProfileModal from "../../components/Modal";
import Badge from "../../components/Badge";
import { BASE_URL } from "../../../utils/constants";

export default function QueueRegister() {
  const { t } = useTranslation();
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [churchesViewAdmin, setChurchesViewAdmin] = useState([]);
  const [referenceLetterViewUser, setReferenceLetterViewUser] = useState(null);
  const [errors, setErrors] = useState(null);
  const [userToUpdateRetrivedOnClick, setUserToUpdateRetrivedOnClick] =
    useState(null);
  const modal = useRef();
  const modalReferralLetter = useRef();

  const handleClickOpenModal = (user) => {
    setUserToUpdateRetrivedOnClick({
      verified: user.fkUserId.verified,
      number: user.fkUserId.number,
      social: user.fkUserId.social,
      avatar: user.fkUserId.avatar,
      createdAt: new Date(user.fkUserId.createdAt),
      updatedAt: new Date(user.fkUserId.updatedAt),
      email: user.fkUserId.email,
      role: user.fkUserId.fkRoleId.id,
      username: user.fkUserId.username,
      id: user.fkUserId.id,
      idQueueUserRegistration: user.id,
    });
    modal.current.open();
  };

  const handleCloseModal = () => {
    modal.current.close();
  };

  const handleClickViewReferralLetter = (referceLetter) => {
    setReferenceLetterViewUser(referceLetter);
    modalReferralLetter.current.open();
  };

  var modalActions = () => (
    <>
      <button
        className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
        onClick={handleCloseModal}
      >
        {t("src.pages.dashboard.queueUsers.modalCloseBtn")}
      </button>
    </>
  );

  useEffect(() => {
    async function fetchData() {
      const churchesView = await getChurchesViewAdmin(currentUser.user.id);
      if (churchesView && churchesView.error == 401) {
        setErrors(churchesView.message);
        return;
      } else if (!churchesView) {
        // TODO understand how to standar handling different errors
        setErrors({ message: "General Error", status: 500 });
        return;
      }
      const usersRetrieved = await fetchUserToAccept(churchesView);
      if (!usersRetrieved) {
        return;
      }
      setUsers(usersRetrieved);
    }
    fetchData();
  }, [currentUser]);

  const fetchUserToAccept = async (churches) => {
    console.log("churches", churches);
    try {
      const res = await fetch(
        `${BASE_URL}/queue-user-registration/view-admin-church`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${currentUser.access_token}`,
          },
          body: JSON.stringify({ churches }),
        }
      );
      const acceptableStatusCodes = [200, 201, 202];
      if (acceptableStatusCodes.includes(res.status)) {
        const data = await res.json();
        if (data.status !== 404) {
          return data;
        } else {
          setErrors(data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getChurchesViewAdmin = async (id) => {
    try {
      console.log("ID:::getChurchesViewAdmin", id);
      console.log("currentuser", currentUser);
      const res = await fetch(`${BASE_URL}/user/admin-view-churches/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${currentUser.access_token}`,
        },
      });
      const acceptableStatusCodes = [200, 201, 202];
      if (acceptableStatusCodes.includes(res.status)) {
        const data = await res.json();
        setChurchesViewAdmin(data);
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3 w-full max-w-lg md:max-w-none mx-auto h-screen px-4 md:px-14">
      {errors && errors.status === 401 ? (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative animate-pulse text-center mt-24">
          <strong className="font-bold">{errors}!</strong>
        </div>
      ) : (
        <>
          {/* Profile Modal */}
          <ProfileModal
            ref={modal}
            title={t("src.pages.dashboard.queueUsers.adminEditUserTitleModal")}
            iconHeader={
              <FaUserEdit className="text-2xl pl-1 hover:scale-105 opacity-80" />
            }
            actions={modalActions("Update", "bg-orange-400")}
            component={
              <AdminUpdateProfileModal
                user={userToUpdateRetrivedOnClick}
                setUser={setUserToUpdateRetrivedOnClick}
                onCloseModal={handleCloseModal}
              />
            }
          />

          {/* Referral Letter Modal */}
          <ProfileModal
            ref={modalReferralLetter}
            title={t("src.pages.dashboard.queueUsers.adminEditUserRLetterTh")}
            iconHeader={
              <IoMdMailUnread className="text-2xl pl-0 hover:scale-105 opacity-80" />
            }
            actions={modalActions(null, "bg-orange-400")}
            component={
              <AdminViewReferralLetterModal
                referenceLetterViewUser={referenceLetterViewUser}
                onCloseModal={handleCloseModal}
              />
            }
          />

          {/* Page Title */}
          <h1 className="text-3xl font-semibold text-center my-7">
            {t("src.pages.dashboard.queueUsers.adminEditUserTitle")}
          </h1>

          {errors && (errors.status === 404 || errors.status === 500) && (
            <p className="text-center text-gray-400 mt-24">{errors.message}</p>
          )}

          {/* Admin Church View */}
          {users.length > 0 && churchesViewAdmin.length > 0 && (
            <div>
              <div className="flex flex-wrap gap-2">
                {churchesViewAdmin.length < 50 ? (
                  churchesViewAdmin.map((church) => (
                    <Badge
                      message={church.name}
                      styleType="blue"
                      key={church.id}
                      className="w-1/5"
                    />
                  ))
                ) : (
                  <Badge
                    message="All Churches"
                    styleType="red"
                    className="w-1/5"
                  />
                )}
              </div>

              {/* User Table */}
              <div className="flex flex-col">
                <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                  <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                    <div className="overflow-hidden">
                      <p className="text-sm text-gray-400 p-4">
                        Total users: {users.length}
                      </p>

                      <table className="min-w-full text-left text-sm font-light text-surface">
                        <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
                          <tr>
                            <th scope="col" className="px-6 py-4">
                              #
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Username
                            </th>
                            <th scope="col" className="px-6 py-4">
                              Email
                            </th>
                            <th scope="col" className="px-6 py-4">
                              {t(
                                "src.pages.dashboard.queueUsers.adminEditUserChurchTh"
                              )}
                            </th>
                            <th scope="col" className="px-6 py-4">
                              {t(
                                "src.pages.dashboard.queueUsers.adminEditUserRLetterTh"
                              )}
                            </th>
                            <th scope="col" className="px-6 py-4">
                              {t(
                                "src.pages.dashboard.queueUsers.adminEditUserCreatedAt"
                              )}
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {users.map(
                            (user, index) =>
                              !user.verified &&
                              user.fkUserId && (
                                <tr
                                  className="border-b border-neutral-200 transition duration-300 ease-in-out hover:bg-slate-200"
                                  key={user.fkUserId.id}
                                >
                                  <td
                                    className="whitespace-nowrap px-6 py-4 font-medium"
                                    onClick={() => handleClickOpenModal(user)}
                                  >
                                    {index}
                                  </td>
                                  <td
                                    className="whitespace-nowrap px-6 py-4"
                                    onClick={() => handleClickOpenModal(user)}
                                  >
                                    {user.fkUserId.username}
                                  </td>
                                  <td
                                    className="whitespace-nowrap px-6 py-4"
                                    onClick={() => handleClickOpenModal(user)}
                                  >
                                    {user.fkUserId.email}
                                  </td>
                                  <td
                                    className="whitespace-nowrap px-6 py-4"
                                    onClick={() => handleClickOpenModal(user)}
                                  >
                                    {user.fkUserId.fkChurchId.name}
                                  </td>
                                  <td className="whitespace-nowrap px-6 py-4 flex justify-center items-center">
                                    <button
                                      onClick={() =>
                                        handleClickViewReferralLetter(
                                          user.fkReferenceLetterId
                                        )
                                      }
                                      className="pt-2 pb-2 pl-3 pr-3 bg-gray-400 shadow-lg text-xs text-white rounded-lg hover:scale-105 hover:bg-gray-700 ease-in-out flex items-center justify-center"
                                    >
                                      <SlEnvolopeLetter className="text-base" />
                                    </button>
                                  </td>
                                  <td
                                    className="whitespace-nowrap px-6 py-4"
                                    onClick={() => handleClickOpenModal(user)}
                                  >
                                    {user.fkUserId.createdAt}
                                  </td>
                                </tr>
                              )
                          )}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
