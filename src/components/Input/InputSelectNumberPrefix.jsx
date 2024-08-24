import { useState } from "react";
import Select from "react-select";
import { useTranslation } from "react-i18next";
import "flag-icons/css/flag-icons.min.css";
import prefixes from "../../../utils/country_prefixes.json";
import FloatingLabelInput from "../Input/FloatingLabelnput";
import PropTypes from "prop-types";

const DEFAULT_PREFIX_NUMBER = "+39";

const PhoneNumberInput = ({ formData, handleChange, errors }) => {
  const [selectedOption, setSelectedOption] = useState({
    value: DEFAULT_PREFIX_NUMBER,
    label: (
      <div className="flex items-center">
        <span className="fi fi-it mr-2"></span>
        {DEFAULT_PREFIX_NUMBER}
      </div>
    ),
    country: "italy",
  });
  const { t } = useTranslation();

  const options = Object.keys(prefixes).map((country) => ({
    value: prefixes[country].prefix,
    label: (
      <div className="flex items-center">
        <span
          className={`fi fi-${prefixes[country].name.toLowerCase()} mr-2`}
        ></span>
        {prefixes[country].prefix}
      </div>
    ),
    country: country,
  }));

  const handlePrefixChange = (selectedOption) => {
    const numberWithPrefix = { id: "prefix", value: selectedOption.value };
    handleChange({ target: numberWithPrefix });
    setSelectedOption(selectedOption);
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "1px solid #ccc",
      boxShadow: "none",
      "&:hover": {
        borderColor: "#888",
      },
    }),
    menu: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      zIndex: 9999,
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused
        ? "rgba(0, 0, 0, 0.5)"
        : "rgba(255, 255, 255, 0.8)",
      color: "inherit",
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "inherit",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: "inherit",
    }),
    indicatorSeparator: (provided) => ({
      ...provided,
      display: "none",
    }),
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center space-x-2">
        <Select
          value={selectedOption}
          onChange={handlePrefixChange}
          options={options}
          styles={customStyles}
          className="w-1/3"
        />

        <FloatingLabelInput
          id="number"
          type="number"
          label={t("src.components.stepper.step1.placeholderNumber")}
          value={formData?.userInfo?.number || ""}
          onChange={handleChange}
          error={errors.number}
        />
      </div>
    </div>
  );
};

PhoneNumberInput.propTypes = {
  formData: PropTypes.object,
  handleChange: PropTypes.func,
  errors: PropTypes.object,
};

export default PhoneNumberInput;
