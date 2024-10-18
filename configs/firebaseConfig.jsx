// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "fundaai.firebaseapp.com",
  projectId: "fundaai",
  storageBucket: "fundaai.appspot.com",
  messagingSenderId: "37623268119",
  appId: "1:37623268119:web:417187fdb94404b2002d52",
  measurementId: "G-Q09X71EXFX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const storage=getStorage(app);