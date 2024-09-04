import { initializeApp } from "firebase/app";
// import { getEnvVariables } from "../vite.config";

console.log(` VITE_FIREBASE_API_KEY: ${VITE_FIREBASE_API_KEY}`);
// const env = getEnvVariables("production");
// console.log("ENV:", env);

// You can now directly use these constants
const firebaseConfig = {
  apiKey: VITE_FIREBASE_API_KEY,
  authDomain: VITE_FIREBASE_AUTHDOMAIN,
  projectId: VITE_FIREBASE_PROJECT_ID,
  storageBucket: VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: VITE_FIREBASE_APP_ID,
};

console.log('FIREBASECONFIG:', firebaseConfig); // This should log your Firebase configuration with correct values.

export const firebaseApp = initializeApp(firebaseConfig);
