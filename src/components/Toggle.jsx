import { useState, useEffect } from "react";
import PropTypes from "prop-types";

export default function Toggle({ verified, onVerifiedChange }) {
  const [isChecked, setIsChecked] = useState(verified);
  console.log("toggle:verified:props", verified);
  useEffect(() => {
    const checkbox = document.getElementById("toggle");
    setIsChecked(checkbox.checked);
    return () => {
      checkbox.removeEventListener("change", handleChange);
    };
  }, []);

  const handleChange = (e) => {
    setIsChecked(e.target.checked);
    onVerifiedChange(e.target.checked);
    console.log("Toggle:VERIFIED:::", e.target.checked);
  };

  return (
    <div>
      <div className="flex items-center justify-center">
        <input
          type="checkbox"
          id="toggle"
          className="sr-only"
          checked={isChecked}
          onChange={handleChange}
        />
        <label
          htmlFor="toggle"
          className={`relative block w-10 h-6 rounded-full cursor-pointer ${
            isChecked ? "bg-green-500" : "bg-gray-300"
          }`}
        >
          <span
            className={
              "block shadow-md rounded-full w-5 h-5 bg-white absolute top-0 left-0 mt-0.5 ml-0.5 transition-transform duration-300 ease-in-out" +
              (isChecked ? " transform translate-x-full" : "")
            }
          ></span>
        </label>
      </div>
    </div>
  );
}

Toggle.propTypes = {
  verified: PropTypes.bool.isRequired,
  onVerifiedChange: PropTypes.func.isRequired,
};
