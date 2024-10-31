import React, { useState, useEffect } from "react";
import SelectOptions from "../../components/SelectOptions";
import { BsFillHouseAddFill } from "react-icons/bs";
import { BASE_URL } from "../../../utils/constants";
import { useSelector } from "react-redux";
import BadgeOps from "../../components/BadgeOps";

export default function AdminChurchModal({ user, currentUser }) {
  const [selectedOption, setSelectedOption] = useState([]);
  const [churchesViewAdmin, setChurchesViewAdmin] = useState([]);
  const [churchViewAdminDelete, setChurchesViewAdminDelete] = useState({});
  const [errors, setErrors] = useState({});
  // console.log('[MODAL] CurrentUser: ', currentUser);
  // console.log('[MODAL] user , ',user);


  useEffect(() => {
    console.log('[USEEFFECT] DELETE SOMEONE, ',churchViewAdminDelete);
  }, [churchViewAdminDelete]);

  useEffect(() => {
    
    async function fetchData() {
      if(!currentUser){
        console.log('Could not retrieve currentUser');
        return;
      }
      if(!user || user.length == 0){
        console.log('Could not retrieve user');
        return;
      }
      console.log('[MODAL] useEffect')
      console.log('[MODAL] user clicked, ',user);
      const churchesView = await getChurchesViewAdmin(user.id);
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
  }, [user.id]);

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
    <div className="p-3">
      <div className=" space-y-4">
        <p className="ml-10">Select church to add: </p>
        <SelectOptions
          type="churches"
          uri="/church"
          onSelectedOption={setSelectedOption}
          error={errors.selectedOption}
        />
        <button className="ml-10 mt-4 text-blue-500 hover:scale-105 opacity-65 flex items-center gap-2 bg-white rounded-xl p-5 border border-cyan-400 shadow-lg">
          <BsFillHouseAddFill />
        </button>
        <div className="border-t border-gray-300 my-6"></div>
        <p className="ml-10 text-lg font-bold">Actual Churches Views</p>
        <div className="flex flex-wrap gap-2 items-center">
          {churchesViewAdmin.length < 50 ? (
            churchesViewAdmin.map((church) => (
                <BadgeOps
                  styleType="blue"
                  key={church.id}
                  setObject={setChurchesViewAdminDelete}
                  object={church}
                  className="w-1/5"
                />
            ))
          ) : (
            <BadgeOps styleType="red" className="w-1/5" id="ALL" object={{ name: 'all churches' }} setObject={setChurchesViewAdminDelete} />
          )}
        </div>
      </div>
    </div>
  );
}
