// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBEx6L79wQRBlrwMBcXjsq2XyXli2u_ddg",
  authDomain: "piiss-website.firebaseapp.com",
  databaseURL: "https://piiss-website-default-rtdb.firebaseio.com",
  projectId: "piiss-website",
  storageBucket: "piiss-website.appspot.com",
  messagingSenderId: "299241453395",
  appId: "1:299241453395:web:c23d6d9875a1a5ab6e53a6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
