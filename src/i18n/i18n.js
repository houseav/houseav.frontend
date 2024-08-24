import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import lngEng from "./locales/en/common.json";
import lngIt from "./locales/it/common.json";
import lngFr from "./locales/fr/common.json";
import lngEs from "./locales/es/common.json";
import lngPt from "./locales/pt/common.json";
import { Cookies } from "react-cookie";

const cookies = new Cookies();
const userLanguage = cookies.get("i18n-locale") || "en";
export const languages_list = [
  { name: "English", value: "en" },
  { name: "Italian", value: "it" },
  { name: "French", value: "fr" },
  { name: "Spanish", value: "es" },
  { name: "Portuguese", value: "pt" },
];
const resources = {
  it: {
    translation: lngIt,
  },
  en: {
    translation: lngEng,
  },
  fr: {
    translation: lngFr,
  },
  es: {
    translation: lngEs,
  },
  pt: {
    translation: lngPt,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: userLanguage,
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
