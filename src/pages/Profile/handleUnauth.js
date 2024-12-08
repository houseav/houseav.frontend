import { BASE_URL } from "../../../utils/constants";
import {refreshTknSuccess, refreshTknFailure, refreshTknStart} from "../../redux/user/userSlice";

export const handleUnauthLogic = async (dispatch, currentUser) => {
    try {
      dispatch(refreshTknStart());
      const res = await fetch(`${BASE_URL}/auth/refresh`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${currentUser.refresh_token}`,
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ refreshToken: currentUser.refresh_token })
      });
      const acceptableStatusCodes = [200, 201, 202];
      if (!acceptableStatusCodes.includes(res.status)) {
        console.log('Error while handleUnauthLogic,',res);
        dispatch(refreshTknFailure("Error while get refresh token, user unAuth"));
        return null;
      }
      const data = await res.json();
      dispatch(refreshTknSuccess(data));
      return res.ok;
    } catch (error) {
      dispatch(refreshTknFailure(error.message));
    }
  };