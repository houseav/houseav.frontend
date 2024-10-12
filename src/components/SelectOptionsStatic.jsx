import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { TbHomeHeart } from "react-icons/tb";
import FloatingLabelInput from "./Input/FloatingLabelnput";
import PropTypes from "prop-types";
import { BASE_URL } from "../../utils/constants";

export default function SelectOptionsStatic({
  uri,
  onSelectedOption,
  type,
  error,
  data,
  floatingLabelInputId,
  floatingLabelInputLabel,
}) {
  const { t } = useTranslation();
  const [options, setOptions] = useState(data);
  const [otherOption, setOtherOption] = useState(false);
  const [dataOtherOption, setDataOtherOption] = useState({});
  const [selectedOptionComponent, setSelectedOptionComponent] = useState("");

  const handleChange = (event) => {
    const { id, value } = event.target;
    const newState = {
      ...dataOtherOption,
      [id]: value,
      id: "altro",
    };
    setDataOtherOption(newState);
    onSelectedOption(newState);
  };

  const handleSelectChange = (event) => {
    setSelectedOptionComponent(event.target.value);
    const selectedOptionId = event.target.value;
    const selectedOption = options.find(
      (option) => option.id.toString() === selectedOptionId
    );
    if (selectedOptionId === "altro") {
      setOtherOption(true);
    } else {
      setOtherOption(false);
      onSelectedOption(selectedOption);
    }
  };

  return (
    <div className="w-full max-w-xs mx-auto">
      <select
        value={selectedOptionComponent}
        onChange={handleSelectChange}
        className="h-10 w-full rounded border-r-8 bg-transparent px-4 text-sm outline outline-neutral-400"
      >
        <option value="" disabled>
          Select option
        </option>
        <option value="altro" className="text-gray-400">
          Altro
        </option>
        {options &&
          options.map((option) => (
            <option key={option.id} value={option.id} className="text-gray-400">
              {option.name}
            </option>
          ))}
      </select>
      {error && (
        <p id={`error`} className="mt-2 ml-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

SelectOptionsStatic.propTypes = {
  onSelectedOption: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  error: PropTypes.string,
  floatingLabelInputId: PropTypes.string,
  floatingLabelInputLabel: PropTypes.string,
};
