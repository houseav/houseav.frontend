import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";

import Spinner from "../components/Spinner";
import FloatingLabelInput from "../components/Input/FloatingLabelnput";
import { firebaseApp } from "../firebase";
import { BASE_URL } from "../../utils/constants";

export default function SignIn() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({});
  const { loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(signInFailure(null));
  }, []);

  const checkFormaData = (formData) => {
    let newErrors = {};
    let isValid = true;
    if (!formData?.email) {
      newErrors.email = "Email is required";
      isValid = false;
    }
    if (!formData?.password) {
      newErrors.password = "Password is required";
      isValid = false;
    }
    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (event) => {
    const { id, value } = event.target;
    const newState = {
      ...formData,
      [id]: value,
    };

    setFormData(newState);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    let isValidFormData = checkFormaData(formData);
    if (!isValidFormData) return;
    try {
      dispatch(signInStart());
      console.log("home: ", BASE_URL);
      const res = await fetch(`${BASE_URL}/auth/sign-in`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      const acceptableStatusCodes = [200, 201, 202];
      if (!acceptableStatusCodes.includes(res.status)) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  };

  return (
    <div className="p-3 mt-14 max-w-lg mx-auto h-screen">
      <h1 className="text-3xl text-center font-semibold my-7">Welcome back</h1>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <FloatingLabelInput
          id="email"
          label="Email"
          onChange={handleChange}
          error={errors.email}
        />

        <FloatingLabelInput
          type="password"
          id="password"
          label="password"
          onChange={handleChange}
          error={errors.password}
        />

        <button
          disabled={loading}
          className="w-full text-center mt-4 justify-center text-gray-900 py-3 px-6 bg-gray-400 bg-opacity-50 rounded-lg shadow-md hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300 ease-in-out flex items-center gap-3"
        >
          {loading ? <Spinner /> : t("src.pages.signin.buttonSignIn")}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <div className="flex gap-2">
          <p>{t("src.pages.signin.account")}</p>
          <Link to={"/sign-up"}>
            <span className="text-blue-600">
              {t("src.pages.signin.buttonSignUp")}
            </span>
          </Link>
        </div>
        <div className="flex gap-2">
          <Link to={"/forgot-password-request"}>
            <span className="text-blue-500/50 hover:text-blue-600/50 hover:scale-105">
              Forgot Password?
            </span>
          </Link>
        </div>
      </div>

      {error && <span className="text-xl text-red-600">{error}</span>}
    </div>
  );
}
