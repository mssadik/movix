// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDD-RjraFBA24qFMBz7Wh7PW2op1wzOUdI",
  authDomain: "moviex-c40fb.firebaseapp.com",
  projectId: "moviex-c40fb",
  storageBucket: "moviex-c40fb.appspot.com",
  messagingSenderId: "476366941466",
  appId: "1:476366941466:web:85aeeb763c00efe4d390a3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)