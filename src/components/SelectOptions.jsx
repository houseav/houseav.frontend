import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { TbHomeHeart } from "react-icons/tb";
import FloatingLabelInput from "./Input/FloatingLabelnput";
import PropTypes from "prop-types";
import { BASE_URL } from "../../utils/constants";

export default function SelectOptions({ uri, onSelectedOption, type, error }) {
  const { t } = useTranslation();
  const [options, setOptions] = useState([]);
  const [otherOption, setOtherOption] = useState(false);
  const [dataOtherOption, setDataOtherOption] = useState({});
  const [selectedOptionComponent, setSelectedOptionComponent] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${BASE_URL}${uri}`);
        const acceptableStatusCodes = [200, 201, 202];
        if (!acceptableStatusCodes.includes(res.status)) {
          console.error("Error while deleting this house");
          return;
        }
        const data = await res.json();
        setOptions(data);
      } catch (error) {
        console.error("Error while retrieving select options data:", error);
      }
    };
    fetchData();
  }, [uri]);

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
          {t(`src.components.selectOptions.${type}.option1`)}
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
      {otherOption && (
        <div className="mt-4 p-1 space-y-2">
          <div className="flex space-x-1 items-center text-gray-600">
            <TbHomeHeart />
            <p className="p-3">Inserisci dati chiesa</p>
          </div>
          <FloatingLabelInput
            id="name"
            label="Name"
            value={dataOtherOption.name || ""}
            onChange={handleChange}
          />
          <FloatingLabelInput
            id="address"
            label="Address"
            value={dataOtherOption.address || ""}
            onChange={handleChange}
          />
        </div>
      )}
      {error && (
        <p id={`error`} className="mt-2 ml-1 text-xs text-red-500">
          {error}
        </p>
      )}
    </div>
  );
}

SelectOptions.propTypes = {
  uri: PropTypes.string.isRequired,
  onSelectedOption: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  error: PropTypes.string,
};
