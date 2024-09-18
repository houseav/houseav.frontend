import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import PropTypes from "prop-types";
import "./stepper.css";

import { TiTick } from "react-icons/ti";
import { FaUser } from "react-icons/fa";
import { IoIosMail } from "react-icons/io";
import {
  IoCaretBackOutline,
  IoSend,
  IoCaretForwardOutline,
} from "react-icons/io5";
import { AiFillSafetyCertificate } from "react-icons/ai";

import RippleButton from "../Button/RippleButton";
import SelectOptions from "../SelectOptions";
import InputToolTip from "../Input/InputToolTip";
import PhoneNumberInput from "../Input/InputSelectNumberPrefix";
import FloatingLabelInput from "../Input/FloatingLabelnput";
import { validateStep1, validateStep2 } from "./validations";

const Stepper = ({ formData, setFormData, handleSubmit }) => {
  const { t } = useTranslation();
  const steps = [
    { key: "step1", icon: <FaUser /> },
    { key: "step2", icon: <IoIosMail /> },
    { key: "step3", icon: <AiFillSafetyCertificate /> },
  ];
  const [currentStep, setCurrentStep] = useState(1);
  const [complete, setComplete] = useState(false);
  const [validation, setValidation] = useState("");
  const [selectedOption, setSelectedOption] = useState();
  console.log(formData?.userInfo?.selectedOption);
  const [isPresentCustode, setIsPresentCustode] = useState(false);
  const [isBaptized, setIsBaptized] = useState(false);
  const [acceptPolicy, setAcceptPolicy] = useState(false);
  const [errors, setErrors] = useState({});

  const handleBackClick = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const checkPassword = () => {
    if (formData.password !== formData["password-confirm"]) {
      setValidation("Passwords do not match");
      return false;
    }
    setValidation("");
    return true;
  };

  const checkFormData = () => {
    if (!checkPassword()) return;

    let isValid = true;
    let newErrors = {};

    if (currentStep === 1) {
      isValid = validateStep1(
        formData,
        setValidation,
        setFormData,
        selectedOption,
        newErrors,
        isValid
      );
    }

    if (currentStep == 2) {
      isValid = validateStep2(formData, setValidation, newErrors, isValid);
    }

    if (currentStep === 3) {
      if (!acceptPolicy) {
        setValidation("Please accept the terms and conditions");
        isValid = false;
      }
    }
    setErrors(newErrors);
    setValidation("");
    return isValid;
  };

  const handleNextClick = () => {
    if (!checkFormData()) return;
    if (currentStep === steps.length) {
      setComplete(true);
      handleSubmit();
    } else {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    if (currentStep === 1) {
      setFormData((prevState) => ({
        ...prevState,
        userInfo: {
          ...prevState.userInfo,
          [id]: value,
        },
      }));
    }

    if (currentStep === 2) {
      setFormData((prevState) => ({
        ...prevState,
        referenceLetter: {
          ...prevState.referenceLetter,
          [id]: value,
        },
      }));
    }
  };

  const userInfoStep = (
    <div>
      <div className="flex flex-col gap-4">
        <FloatingLabelInput
          id="username"
          label="Username"
          value={formData.userInfo?.username || ""}
          onChange={handleChange}
          error={errors.username}
        />
        <FloatingLabelInput
          id="email"
          label="Email"
          value={formData.userInfo?.email || ""}
          onChange={handleChange}
          error={errors.email}
        />
        <PhoneNumberInput
          id="user-number"
          errors={errors}
          formData={formData}
          handleChange={handleChange}
        />
        <FloatingLabelInput
          id="password"
          type="password"
          label="Password"
          value={formData.userInfo?.password || ""}
          onChange={handleChange}
          error={errors.password}
        />
        <FloatingLabelInput
          id="confirmPassword"
          type="password"
          label={t("src.components.stepper.step1.placeholderConfirmPassword")}
          value={formData.userInfo?.confirmPassword || ""}
          onChange={handleChange}
          error={errors.passwordConfirm}
        />

        <div className="self-start">
          <SelectOptions
            type="churches"
            uri="/church"
            onSelectedOption={setSelectedOption}
            error={errors.selectedOption}
          />
        </div>
      </div>
    </div>
  );

  const referenceLetterStep = (
    <>
      <h2 className="text-xl font-semibold mt-5 mb-8 text-center">
        {t("src.components.stepper.step2.title")}
      </h2>
      <div className="w-[100%] md:w-[70%] flex justify-center pl-1 md:pl-16">
        <div className="w-full max-w-3xl">
          <div className="flex flex-col gap-4 w-[100%] md:w-[80%]">
            <InputToolTip
              id="namePastorLeader"
              formData={formData}
              placeholder={t(
                "src.components.stepper.step2.NamePastorplaceholder"
              )}
              setFormData={setFormData}
              toolTipMessage={t(
                "src.components.stepper.step2.NamePastorToolTip"
              )}
              nameobject={"referenceLetter"}
              error={errors.namePastorLeader}
            />

            <InputToolTip
              id="surnamePastorLeader"
              formData={formData}
              placeholder={t(
                "src.components.stepper.step2.SurnamePastorplaceholder"
              )}
              setFormData={setFormData}
              toolTipMessage={t(
                "src.components.stepper.step2.SurnamePastorToolTip"
              )}
              nameobject={"referenceLetter"}
              error={errors.surnamePastorLeader}
            />

            <InputToolTip
              id="numberPastorLeader"
              formData={formData}
              placeholder={t(
                "src.components.stepper.step2.NumberPastorplaceholder"
              )}
              setFormData={setFormData}
              toolTipMessage={t(
                "src.components.stepper.step2.NumberPastorToolTip"
              )}
              type="number"
              nameobject={"referenceLetter"}
              error={errors.numberPastorLeader}
            />

            <InputToolTip
              id="timeInChurch"
              formData={formData}
              setFormData={setFormData}
              toolTipMessage={t(
                "src.components.stepper.step2.TimeInChurchToolTip"
              )}
              type="Date"
              label={t("src.components.stepper.step2.TimeInChurchLabel")}
              nameobject={"referenceLetter"}
              error={errors.timeInChurch}
            />

            <div className="flex flex-col items-center justify-center space-y-4 mt-2">
              <label className="flex items-center space-x-2">
                <span className="text-gray-700">
                  {t("src.components.stepper.step2.isBaptizedQuestion")}
                </span>
                <input
                  type="checkbox"
                  checked={isBaptized}
                  onChange={() => setIsBaptized(!isBaptized)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
              </label>
              {isBaptized && (
                <div className="space-y-3 w-full flex flex-col items-center">
                  <InputToolTip
                    id="dateBaptism"
                    formData={formData}
                    setFormData={setFormData}
                    toolTipMessage={t(
                      "src.components.stepper.step2.isBaptizedToolTip"
                    )}
                    type="Date"
                    label={t("src.components.stepper.step2.isBaptizedLabel")}
                    nameobject={"referenceLetter"}
                  />
                </div>
              )}
            </div>
            <div className="flex flex-col items-center justify-center space-y-4 mt-2">
              <label className="flex items-center space-x-2">
                <span className="text-gray-700">
                  {t("src.components.stepper.step2.guardianQuestion")}
                </span>
                <input
                  type="checkbox"
                  checked={isPresentCustode}
                  onChange={() => setIsPresentCustode(!isPresentCustode)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
              </label>
              {isPresentCustode && (
                <div className="space-y-3 w-full flex flex-col items-center">
                  <InputToolTip
                    id="nameGuardian"
                    formData={formData}
                    placeholder={t(
                      "src.components.stepper.step2.gurdianNamePlaceHolder"
                    )}
                    setFormData={setFormData}
                    toolTipMessage={t(
                      "src.components.stepper.step2.guardianNameToolTip"
                    )}
                    nameobject={"referenceLetter"}
                  />
                  <InputToolTip
                    id="numberGuardian"
                    formData={formData}
                    placeholder={t(
                      "src.components.stepper.step2.guardianNumberPlaceHolder"
                    )}
                    setFormData={setFormData}
                    toolTipMessage={t(
                      "src.components.stepper.step2.guardianNumberToolTip"
                    )}
                    type="number"
                    nameobject={"referenceLetter"}
                  />
                </div>
              )}
            </div>
            <InputToolTip
              id="numberChurch"
              formData={formData}
              setFormData={setFormData}
              placeholder={t(
                "src.components.stepper.step2.churchNumberPlaceHolder"
              )}
              toolTipMessage={t(
                "src.components.stepper.step2.churchNumberToolTip"
              )}
              nameobject={"referenceLetter"}
              error={errors.numberChurch}
            />
          </div>
        </div>
      </div>
      <label className="flex flex-col w-full">
        <p className="mb-2 text-center text-gray-400">
          {t("src.components.stepper.step2.referenceDetails")}
        </p>
        <textarea
          placeholder={t(
            "src.components.stepper.step2.referenceDetailsPlaceHolder"
          )}
          className="border p-3 rounded-lg bg-transparent  w-full md:w-[60%] mx-auto h-[200px] resize-none appearance-none dark:border-gray-600 dark:focus:border-gray-400 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          id="referenceDetails"
          value={formData.referenceLetter?.referenceDetails}
          onChange={(e) => {
            const { id, value } = e.target;
            setFormData((prevData) => ({
              ...prevData,
              referenceLetter: {
                ...prevData.referenceLetter,
                [id]: value,
              },
            }));
          }}
        />
      </label>
    </>
  );

  const termsAndConditionsStep = (
    <div className="flex flex-col justify-center items-center space-y-4">
      <h2 className="text-md text-gray-500 hover:text-gray-700 hover:scale-105">
        {t("src.components.stepper.step3.termsAndConditionsStep.title")}
      </h2>
      <div className="space-y-3">
        <div>
          {t("src.components.stepper.step3.termsAndConditionsStep.section1")}
        </div>
        <div>
          {t("src.components.stepper.step3.termsAndConditionsStep.section2")}
          <a
            href="https://gdpr-info.eu/art-5-gdpr/"
            className="text-blue-500 underline"
          >
            {t(
              "src.components.stepper.step3.termsAndConditionsStep.gdprRegulation"
            )}
          </a>
          ).
        </div>
        <div>
          {t("src.components.stepper.step3.termsAndConditionsStep.section3")}
          <a
            href="https://gdpr-info.eu/chapter-3/"
            className="text-blue-500 underline"
          >
            {t(
              "src.components.stepper.step3.termsAndConditionsStep.articles13to22"
            )}
          </a>
          .
        </div>
        <div>
          {t("src.components.stepper.step3.termsAndConditionsStep.section4")}
          <a
            href="https://gdpr-info.eu/art-5-gdpr/"
            className="text-blue-500 underline"
          >
            {t("src.components.stepper.step3.termsAndConditionsStep.article5")}
          </a>
          {t("src.components.stepper.step3.termsAndConditionsStep.section5")}
        </div>
        <div>
          {t("src.components.stepper.step3.termsAndConditionsStep.section6")}
        </div>
        <div>
          {t("src.components.stepper.step3.termsAndConditionsStep.section7")}
          <ul>
            <li>
              {t("src.components.stepper.step3.termsAndConditionsStep.bullet1")}
            </li>
            <li>
              {t("src.components.stepper.step3.termsAndConditionsStep.bullet2")}
            </li>
          </ul>
        </div>
        <div>
          {t("src.components.stepper.step3.termsAndConditionsStep.section8")}
        </div>
        <div>
          {t("src.components.stepper.step3.termsAndConditionsStep.section9")}
          <a
            href="https://gdpr-info.eu/art-6-gdpr/"
            className="text-blue-500 underline"
          >
            {t("src.components.stepper.step3.termsAndConditionsStep.article6")}
          </a>
          {t("src.components.stepper.step3.termsAndConditionsStep.section10")}
          <a
            href="https://gdpr-info.eu/chapter-5/"
            className="text-blue-500 underline"
          >
            {t(
              "src.components.stepper.step3.termsAndConditionsStep.articles44to50"
            )}
          </a>
          .
        </div>
        <div>
          {t("src.components.stepper.step3.termsAndConditionsStep.section11")}
          <a
            href="https://gdpr-info.eu/art-6-gdpr/"
            className="text-blue-500 underline"
          >
            {t("src.components.stepper.step3.termsAndConditionsStep.articles6")}
          </a>
          {t("src.components.stepper.step3.termsAndConditionsStep.and")}
          <a
            href="https://gdpr-info.eu/art-7-gdpr/"
            className="text-blue-500 underline"
          >
            {t("src.components.stepper.step3.termsAndConditionsStep.article7")}
          </a>
          {t("src.components.stepper.step3.termsAndConditionsStep.section12")}
          <a
            href="https://gdpr-info.eu/art-7-gdpr/"
            className="text-blue-500 underline"
          >
            {t("src.components.stepper.step3.termsAndConditionsStep.article73")}
          </a>
          .
        </div>
      </div>

      <a className="text-blue-500 underline">
        {t("src.components.stepper.step3.termsAndConditionsStep.cookiePolicy")}
      </a>
      <div className="flex m-5">
        <p className="m-3 ">
          {t("src.components.stepper.step3.termsAndConditionsStep.accept")}
        </p>
        <input
          type="checkbox"
          checked={acceptPolicy}
          onChange={() => setAcceptPolicy(!acceptPolicy)}
        />
      </div>
    </div>
  );

  return (
    <div className="stepper-container">
      <div className="flex justify-between p-3 m-3">
        {steps.map((step, i) => (
          <div
            key={i}
            className={`step-item ${currentStep === i + 1 && "active"} ${
              (i + 1 < currentStep || complete) && "complete"
            }`}
          >
            <div className="m-2 step hover:bg-slate-300 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out">
              {i + 1 < currentStep || complete ? <TiTick size={24} /> : i + 1}
            </div>
            <p className="text-gray-500">{step.icon}</p>
          </div>
        ))}
      </div>

      <div className="flex flex-col space-y-4 justify-center items-center pt-5 ">
        {validation && (
          <p className="flex text-sm text-red-500 hover:scale-115 hover:text-red-400">
            {validation}
          </p>
        )}
        {currentStep === 1 && userInfoStep}
        {currentStep === 2 && referenceLetterStep}
        {currentStep === 3 && termsAndConditionsStep}
      </div>

      {!complete && (
        <div className="flex justify-between m-3 p-1">
          <button
            className="btn-outline flex items-center space-x-2 bg-slate-400 hover:bg-slate-300 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out rounded-md pt-1 pb-1 pl-1 pr-2"
            onClick={handleBackClick}
            disabled={currentStep === 1}
          >
            <IoCaretBackOutline size={24} />
            <p className="hover:text-slate-300"> Back</p>
          </button>
          <RippleButton onClick={handleNextClick}>
            {currentStep === steps.length ? (
              <>
                <p>Send</p>
                <IoSend className="text-base" />
              </>
            ) : (
              <>
                <p className="hover:text-slate-300/40">Next</p>
                <IoCaretForwardOutline size={24} />
              </>
            )}
          </RippleButton>
        </div>
      )}
    </div>
  );
};

Stepper.propTypes = {
  formData: PropTypes.object.isRequired,
  setFormData: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default Stepper;
