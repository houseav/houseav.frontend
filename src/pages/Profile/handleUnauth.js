import { BASE_URL } from "../../../utils/constants";
import {refreshTknSuccess, refreshTknFailure, refreshTknStart} from "../../redux/user/userSlice";

export const handleUnauthLogic = async (dispatch, currentUser) => {
    try {
      dispatch(refreshTknStart());
      const res = await fetch(`${BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${currentUser.refresh_token}`,
        },
      });
      const acceptableStatusCodes = [200, 201, 202];
      if (!acceptableStatusCodes.includes(res.status)) {
        console.log('Error while handleUnauthLogic,',res);
        dispatch(refreshTknFailure("Error while deleting this house"));
        return null;
      }
      dispatch(refreshTknSuccess(res));
    } catch (error) {
      dispatch(refreshTknFailure(error.message));
    }
  };