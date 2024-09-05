import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Stepper from "../components/Stepper/Stepper";
import { useTranslation } from "react-i18next";
import { BASE_URL } from "../../utils/constants";

export default function SignUp() {
  const { t } = useTranslation();
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setLoading(true);
    const res = await fetch(`${BASE_URL}/auth/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    const acceptableStatusCodes = [200, 201, 202];
    if (!acceptableStatusCodes.includes(res.status)) {
      setLoading(false);
      return;
    }
    setError(null);
    setLoading(false);
    navigate("/sign-in");
  };

  return (
    <>
      <div className="p-3 mt-14 w-full mx-auto h-screen">
        <h1 className="text-3xl text-center font-semibold my-7">
          {t("src.pages.signup.title")}
        </h1>

        <Stepper
          formData={formData}
          setFormData={setFormData}
          handleSubmit={handleSubmit}
          loading={loading}
        />

        <div className="flex justify-center items-center gap-2 mt-5 ">
          <p>{t("src.pages.signup.account")}</p>

          <Link to={"/sign-in"}>
            <span className="text-blue-600">
              {t("src.pages.signup.buttonSignIn")}
            </span>
          </Link>
        </div>
        {error && <span className="text-xl text-red-600">{error}</span>}
      </div>
    </>
  );
}
