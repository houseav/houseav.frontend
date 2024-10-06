import React, { useEffect, useState } from "react";
import { BASE_URL } from "../../../utils/constants";

export default function AddUsersAsAdmin() {
  const [users, setUsers] = useState([]);
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
    <div className="flex justify-center p-10 m-5">
      <div className="p-3">
        <p className="text-2xl">Add users ad admin</p>
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
            </tr>
          </thead>
          <tbody>
            {users &&
              users.length > 0 &&
              users.map((user, index) => (
                <tr key={user.id}>
                  <th scope="col" className="px-6 py-4">
                    {index}
                  </th>
                  <td className="whitespace-nowrap px-6 py-4">
                    {user.username}
                  </td>
                  <td className="whitespace-nowrap px-6 py-4">{user.email}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
