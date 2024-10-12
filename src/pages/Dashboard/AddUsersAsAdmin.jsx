import React, { useEffect, useState } from "react";
import SelectOptionsStatic from "../../components/SelectOptionsStatic";
import { BASE_URL } from "../../../utils/constants";

export default function AddUsersAsAdmin() {
  const rolesUser = [
    { id: 1, name: "user" },
    { id: 2, name: "admin" },
    { id: 3, name: "super-admin" },
  ];
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const id = 6;
        const res = await fetch(
          `${BASE_URL}/user/get-users-admin-viewers/${id}`
        );
        const acceptableStatusCodes = [200, 201, 202];
        if (!acceptableStatusCodes.includes(res.status)) {
          setError(true);
          setLoading(false);
          return;
        }
        const data = await res.json();
        setUsers(data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="flex justify-center p-10 m-5 md:m-20 h-screen">
      <div className="p-3 w-full max-w-6xl">
        {/* Limit max-width for larger screens */}
        <p className="text-2xl mb-4 text-center">Add users as admin</p>
        <div className="overflow-x-auto">
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
                  Role
                </th>
                <th scope="col" className="px-6 py-4">
                  Queue
                </th>
                <th scope="col" className="px-6 py-4">
                  Church Views
                </th>
              </tr>
            </thead>
            <tbody>
              {users &&
                users.length > 0 &&
                users.map((user, index) => (
                  <tr key={user.id}>
                    <th scope="col" className="px-6 py-4">
                      {index + 1}
                    </th>
                    <td className="whitespace-nowrap px-6 py-4">
                      {user.username}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {user.email}
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      {user.fkRoleId.name}
                    </td>
                    <td className="whitespace-nowrap py-4">
                      <SelectOptionsStatic
                        onSelectedOption={setSelectedOption}
                        error={errors.selectedOption}
                        type="type_user"
                        data={rolesUser}
                        floatingLabelInputId="type_user"
                        floatingLabelInputLabel="type_user"
                      />
                    </td>
                    <td className="whitespace-nowrap px-6 py-4">
                      Add Churches
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
