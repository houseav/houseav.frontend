export const checkIfIsAdmin = (currentUser, setAdmin) => {
  try {

    if (
      currentUser.user.fkRoleId.name == "admin" ||
      currentUser.user.fkRoleId.name == "super-admin"
    ) {
      setAdmin(true);
      return;
    }
  } catch (error) {
    console.log(error);
  }
};

export const formattedDate = (dateInput) => {
  try {
    if (!dateInput) {
      throw new Error("Invalid date input");
    }
    const date = new Date(dateInput);
    if (isNaN(date.getTime())) {
      throw new Error("Invalid date");
    }

    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    month = month.toString().padStart(2, "0");
    let day = date.getDate();
    day = day.toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  } catch (error) {
    console.log(error);
    return ""; // Return an empty string or handle the error as needed
  }
};

/** @deprecated */
// export const formattedDate = (dateInput) => {
//   try {
//     if (!dateInput) {
//       throw new Error("Invalid date input");
//     }

//     // If the input is a Date object, convert it to an ISO string
//     const date = new Date(
//       dateInput instanceof Date ? dateInput.toISOString() : dateInput
//     );
//     if (isNaN(date.getTime())) {
//       throw new Error("Invalid date");
//     }

//     // Adjust to UTC to avoid timezone issues
//     const year = date.getUTCFullYear();
//     const month = String(date.getUTCMonth() + 1).padStart(2, "0"); // Months are zero-indexed
//     const day = String(date.getUTCDate()).padStart(2, "0");

//     return `${year}-${month}-${day}`;
//   } catch (error) {
//     console.log(error);
//     return ""; // Return an empty string or handle the error as needed
//   }
// };

// lib/utils.ts
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(...inputs));
}
