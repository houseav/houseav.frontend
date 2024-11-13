import React, { useState, useEffect, useRef } from "react";
import SelectOptions from "../../components/SelectOptions";
import { BsFillHouseAddFill } from "react-icons/bs";
import { BASE_URL } from "../../../utils/constants";
import { useSelector } from "react-redux";
import BadgeOps from "../../components/BadgeOps";

export default function AdminChurchModal({ user, currentUser }) {
  const [selectedOption, setSelectedOption] = useState();
  const [churchesViewAdmin, setChurchesViewAdmin] = useState([]);
  const [churchViewAdminDelete, setChurchesViewAdminDelete] = useState({});
  const [errors, setErrors] = useState({});
  const [errorLabels, setErrorLabels] = useState({});
  const prevDeletedChurchRef = useRef(null);
 
  //Flush errors
  useEffect(() => {
    if(selectedOption){
      setErrorLabels((prev) => ({
        ...prev,
        addAdminError: null,
      }));
    }
  }, [selectedOption])


  const handleAddChurchViewAdmin = (church) => {
    async function addData(){
      if(!selectedOption){
        setErrorLabels({ ...errorLabels, addAdminError: 'You need to select a church first'})
        return;
      }       
      try {
        const res = await fetch(
          `${BASE_URL}/user/admin-viewer-from-user/${selectedOption.id}/${user.id}`,
          {
            method: "PATCH",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${currentUser.access_token}`,
            },
          }
        );
        const acceptableStatusCodes = [200, 201, 202];
        if (acceptableStatusCodes.includes(res.status)) {
          const data = await res.json();
          if(data.status == 403){
            setErrorLabels((prev) => ({
              ...prev,
              duplicateChurchToAdd: data.message,
            }));
            return;
          }
          if (data.status !== 404) {
            setErrorLabels((prev) => ({
              ...prev,
              duplicateChurchToAdd: null,
            }));
            await getChurchesViewAdmin(user.id);
          } else {
            setErrors(data);
          }
        }
      } catch (error) {
        console.log('Error while adding admin-viewer-from-user, ', error);
      }
    }
    addData()
  }

  useEffect(() => {
    if (!churchViewAdminDelete || Object.keys(churchViewAdminDelete).length === 0) return;
    if (prevDeletedChurchRef.current && prevDeletedChurchRef.current === churchViewAdminDelete) {
    return;
  } else {
      prevDeletedChurchRef.current = churchViewAdminDelete;
      const churchId = churchViewAdminDelete.id ?? 0;
      async function fetchData() {
        try {
          const res = await fetch(
            `${BASE_URL}/user/admin-viewer-from-user/${churchId}/${user.id}`,
            {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${currentUser.access_token}`,
              },
            }
          );
          const acceptableStatusCodes = [200, 201, 202];
          if (acceptableStatusCodes.includes(res.status)) {
            const data = await res.json();
            if (data.status !== 404) {
              await getChurchesViewAdmin(user.id);
            } else {
              setErrors(data);
            }
          }
        } catch (error) {
          console.log('Error while deleting admin-viewer-from-user, ',error);
        }
      }  
      fetchData();
    }  
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
      const churchesView = await getChurchesViewAdmin(user.id);
      if (churchesView && churchesView.error == 401) {
        setErrors(churchesView.message);
        return;
      } else if (!churchesView) {
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
        if(data.status !== 404){
          setChurchesViewAdmin(data);
        } else {
          setChurchesViewAdmin([]);
        }
        return data;
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="p-3">
      <div className="space-y-4">
        {churchesViewAdmin.length < 50 ? (
          <>
            <p className="ml-10">Select church to add: </p>
            {errorLabels?.addAdminError && (<p className="text-red-600 font-semibold text-sm ml-10">{errorLabels.addAdminError}</p>)}
            {errorLabels?.duplicateChurchToAdd && (<p className="text-red-600 font-semibold text-sm ml-10">{errorLabels.duplicateChurchToAdd}</p>)}            
            <SelectOptions
              type="churches"
              uri="/church"
              onSelectedOption={setSelectedOption}
              error={errors.selectedOption}
            />
            <button className="ml-10 mt-4 text-blue-500 hover:scale-105 opacity-65 flex items-center gap-2 bg-white rounded-xl p-5 border border-cyan-400 shadow-lg" onClick={handleAddChurchViewAdmin}>
              <BsFillHouseAddFill />
            </button>
            <div className="border-t border-gray-300 my-6"></div>
            <div className="flex flex-col gap-2 items-start ml-10">
            <p className="text-lg font-bold">Actual Churches Views</p>
            <div className="flex flex-wrap gap-2 items-center">
            {churchesViewAdmin.length == 0 ? (
              <p className="text-base">No churches for this user yet..</p>
            ) : (
              churchesViewAdmin.map((church) => (
                <BadgeOps
                  styleType="blue"
                  key={church.id}
                  setObject={setChurchesViewAdminDelete}
                  object={church}
                  className="w-1/5"
                />
              ))
            )}
            </div>
          </div>
          </>
        ) : (
          <div className="flex flex-col gap-y-4 items-start ml-10 ">
            <p className="text-lg font-bold">You see all churches</p>
            <BadgeOps
              styleType="red"
              className="w-1/5"
              id="ALL"
              object={{ name: 'all churches' }}
              setObject={setChurchesViewAdminDelete}
            />
          </div>
        )}
      </div>
    </div>
  );
  
}
