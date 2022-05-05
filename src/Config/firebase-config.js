import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8SO20N7AZkrHoHshEoDSeVsV__pxKNiU",
  authDomain: "attendance-management-335d5.firebaseapp.com",
  projectId: "attendance-management-335d5",
  storageBucket: "attendance-management-335d5.appspot.com",
  messagingSenderId: "42368404081",
  appId: "1:42368404081:web:610573d80d68e9c81ba9d0",
  measurementId: "G-SLZNB52D23",
};

// Initializing Firebase
export const app = firebase.initializeApp(firebaseConfig);

// Initializing Firestore Database
export const db = firebase.firestore();

// setting db settings
db.settings({ timestampsInSnapshots: true });
