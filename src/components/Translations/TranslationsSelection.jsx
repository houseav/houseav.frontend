/* eslint-disable no-unused-vars */
import { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import PropTypes from "prop-types";

import { setLanguage } from "../../redux/language/languageSlice";
import { languages_list } from "../../i18n/i18n";
import i18n from "../../i18n/i18n";

import { HiLanguage } from "react-icons/hi2";
import "/node_modules/flag-icons/css/flag-icons.min.css";

export default function TranslationsSelection({ isLogged }) {
  const [showSelect, setShowSelect] = useState(false);
  const [cookies, setCookie] = useCookies(["i18n-locale"]);
  const timeoutRef = useRef(null);
  const dispatch = useDispatch();
  const language = useSelector((state) => state.language.language);

  const toggleSelect = () => {
    setShowSelect(!showSelect);

    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (!showSelect) {
      timeoutRef.current = setTimeout(() => {
        setShowSelect(false);
      }, 4000);
    }
  };

  const handleLanguageChange = (event) => {
    setShowSelect(!showSelect);
    const selectedLanguage = event.target.getAttribute("value");
    dispatch(setLanguage(selectedLanguage));
    i18n.changeLanguage(selectedLanguage); // Change language instantly
    setCookie("i18n-locale", selectedLanguage, {
      path: "/",
      maxAge: 365 * 24 * 60 * 60,
    });
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="relative">
      <div
        className="sm:inline text-slate-600 hover:text-slate-500 hover:scale-105 transition duration-300 justify-center items-center cursor-pointer"
        onClick={toggleSelect}
      >
        <HiLanguage className="text-xl" />
      </div>
      {showSelect && (
        <span
          className={`absolute mt-2 p-2 border rounded bg-white shadow-lg text-slate-600 z-50 ${
            isLogged ? "right-[-38px]" : "right-[-25px]"
          }`}
          style={{ top: "100%" }}
          onChange={handleLanguageChange}
        >
          {languages_list &&
            languages_list.map((language, index) => (
              <p
                key={index}
                value={language.value}
                className="cursor-pointer hover:bg-slate-100 p-2"
                onClick={handleLanguageChange}
              >
                {language.name}
              </p>
            ))}
        </span>
      )}
    </div>
  );
}

TranslationsSelection.propTypes = {
  isLogged: PropTypes.bool,
};
