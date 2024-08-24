// redux/language/languageSlice.js
import { createSlice } from "@reduxjs/toolkit";
import { Cookies } from "react-cookie";

const cookies = new Cookies();
const initialLanguage = cookies.get("i18n-locale") || "en";

const languageSlice = createSlice({
  name: "language",
  initialState: {
    language: initialLanguage,
  },
  reducers: {
    setLanguage: (state, action) => {
      state.language = action.payload;
      cookies.set("i18n-locale", action.payload, {
        path: "/",
        maxAge: 365 * 24 * 60 * 60,
      });
    },
  },
});

export const { setLanguage } = languageSlice.actions;
export default languageSlice.reducer;
