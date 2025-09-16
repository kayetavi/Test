import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Updated Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyAEWP0LKsZ_SO4FZ9KP7THVILztzFxcquQ",
  authDomain: "api-damage-438cb.firebaseapp.com",
  projectId: "api-damage-438cb",
  storageBucket: "api-damage-438cb.appspot.com",
  messagingSenderId: "255366494533",
  appId: "1:255366494533:web:ed628a7e255b472b55262c"
};

// Initialize Firebase App
const app = initializeApp(firebaseConfig);

// Export Auth & Firestore
export const auth = getAuth(app);
export const db = getFirestore(app);
