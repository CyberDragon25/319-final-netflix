// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIuBOW2NYRnb6WXsw3UoQqeDorb6xu0CU",
  authDomain: "react-netflix-clone-6169f.firebaseapp.com",
  projectId: "react-netflix-clone-6169f",
  storageBucket: "react-netflix-clone-6169f.appspot.com",
  messagingSenderId: "8003531070",
  appId: "1:8003531070:web:d00dd77a5978c07853fc6f",
  measurementId: "G-KCBMJ5F4WE",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firebaseAuth = getAuth(app);

