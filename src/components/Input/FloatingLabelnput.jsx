import "./FloatingLabelInput.css";
import PropTypes from "prop-types";
import React from "react";

function FloatingLabelInput({
  id,
  label,
  value,
  onChange,
  error,
  type = "text",
  wFull = "",
}) {
  return (
    <div className={`relative ${wFull}`}>
      <input
        type={type}
        id={id}
        value={value}
        onChange={onChange}
        className={`block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-500 bg-transparent rounded-lg border ${
          error ? "border-red-500" : "border-gray-300"
        } appearance-none dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none focus:ring-0 focus:border-blue-600 peer`}
        placeholder=" "
        aria-invalid={error ? "true" : "false"}
        aria-describedby={error ? `${id}-error` : undefined}
      />
      <label
        htmlFor={id}
        className={`absolute text-xs md:text-sm ${
          error ? "text-red-500" : "text-gray-500"
        } duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-[0] bg-custom-gray pl-1 pr-2 peer-focus:px-2 peer-focus:text-gray-400  peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4`}
      >
        {label}
      </label>
      {error && (
        <p id={`${id}-error`} className="mt-2 ml-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

FloatingLabelInput.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.string,
  type: PropTypes.string,
  defaultValue: PropTypes.string,
  wFull: PropTypes.string,
};

export default FloatingLabelInput;
