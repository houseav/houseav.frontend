import { useState } from "react";
import { GoQuestion } from "react-icons/go";
import FloatingLabelInput from "./FloatingLabelnput";
import PropTypes from "prop-types";

export default function InputToolTip({
  id,
  formData,
  placeholder,
  setFormData,
  toolTipMessage,
  label,
  type = "text",
  nameobject,
  error,
  ...props
}) {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleChange = (e) => {
    const { id, value } = e.target;

    // Update formData using the nameobject key in order to handle object inside objects update
    setFormData((prevData) => ({
      ...prevData,
      [nameobject]: {
        ...prevData[nameobject],
        [id]: value,
      },
    }));
  };

  return (
    <div className="flex flex-col items-center justify-center w-full">
      {label && (
        <div className="w-full flex justify-center mt-1 mb-3">
          <p className="text-md text-gray-500">{label}</p>
        </div>
      )}

      <div className="flex items-center justify-center space-x-3 w-full">
        <div
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
        >
          <GoQuestion className="text-2xl text-gray-400 hover:scale-115 hover:text-gray-600 transition duration-300 ease-in-out" />
        </div>

        <div className="w-full max-w-lg">
          {" "}
          <FloatingLabelInput
            id={id}
            type={type}
            label={placeholder}
            value={formData[nameobject] ? formData[nameobject][id] || "" : ""}
            onChange={handleChange}
            error={error}
            {...props}
          />
        </div>
      </div>

      {showTooltip && (
        <div className="flex mt-3 mb-3 mr-3 ml-6 bg-gray-500 text-white text-sm rounded pt-3 pb-3 py-1 px-2 shadow-lg transition-opacity duration-300 ease-in-out opacity-100">
          {toolTipMessage}
        </div>
      )}
    </div>
  );
}

InputToolTip.propTypes = {
  id: PropTypes.string.isRequired,
  toolTipMessage: PropTypes.string,
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  nameobject: PropTypes.string,
  error: PropTypes.string,
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
};
