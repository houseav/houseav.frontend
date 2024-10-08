import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { firebaseApp } from "../../firebase";
import {
  deleteUserFailure,
  deleteUserSuccess,
  deleteUserStart,
  signOutUserFailure,
  signOutUserSuccess,
  signOutUserStart,
} from "../../redux/user/userSlice";
import { BASE_URL } from "../../../utils/constants";

export const handleFileUploadLogic = async (
  file,
  setFileProgression,
  setFileUploadError,
  setFormDataUserUpdate,
  formDataUserUpdate
) => {
  const storage = getStorage(firebaseApp);
  const filenameOfNewEntry = new Date().getTime() + file.name;
  const storageRef = ref(storage, filenameOfNewEntry);
  const uploadTask = uploadBytesResumable(storageRef, file); //progress watch

  uploadTask.on(
    "state_changed",
    (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setFileProgression(Math.round(progress));
    },

    (error) => {
      console.error("Error while uploading file", error);
      setFileUploadError(true);
    },

    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => {
        setFormDataUserUpdate({ ...formDataUserUpdate, avatar: downloadUrl });
      });
    }
  );
};

export const handleShowListingsLogic = async (
  id,
  setShowListingsError,
  setUserListings,
  currentUser
) => {
  try {
    setShowListingsError(false);
    const res = await fetch(`${BASE_URL}/house/user/${id}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${currentUser.access_token}`,
      },
    });
    const data = await res.json();
    const acceptableStatusCodes = [200, 201, 202];
    if (!acceptableStatusCodes.includes(res.status)) {
      setShowListingsError(true);
      return;
    }
    const housesVerified = data.filter(
      (house) => house.fkQueueHouseRegistrationId.verified === true
    );
    setUserListings(housesVerified);
  } catch (error) {
    setShowListingsError(true);
  }
};

export const handleSignOutLogic = async (dispatch) => {
  try {
    dispatch(signOutUserStart());
    const res = await fetch(`${BASE_URL}/auth/sign-out`);
    const data = await res.json();
    const acceptableStatusCodes = [200, 201, 202];
    if (!acceptableStatusCodes.includes(res.status)) {
      dispatch(deleteUserFailure(data.message));
      return;
    }
    dispatch(signOutUserSuccess(data));
  } catch (error) {
    dispatch(signOutUserFailure(error.message));
  }
};

export const handleDeleteUserLogic = async (dispatch, currentUser) => {
  try {
    dispatch(deleteUserStart());
    const res = await fetch(`${BASE_URL}/house/${currentUser.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${currentUser.access_token}`,
      },
    });
    const acceptableStatusCodes = [200, 201, 202];
    if (!acceptableStatusCodes.includes(res.status)) {
      dispatch(deleteUserFailure("Error while deleting this house"));
      return;
    }
    dispatch(deleteUserSuccess(res));
  } catch (error) {
    dispatch(deleteUserFailure(error.message));
  }
};

export const handleUpdateSingleProfileVerified = async (access_token) => {
  try {
    // TODO Check
    const res = await fetch(`${BASE_URL}/`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    const acceptableStatusCodes = [200, 201, 202];
    if (!acceptableStatusCodes.includes(res.status)) {
      console.log("Error while verify user");
      return;
    }
  } catch (error) {
    console.error("Error while verify user..");
  }
};
