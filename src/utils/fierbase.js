// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase configuration from your Firebase Console
const firebaseConfig = {
  apiKey: "AIzaSyDqnX2_RJBdMx560QaRDadwQiwgOE4CHR4",
  authDomain: "capital-craft-21851.firebaseapp.com",
  projectId: "capital-craft-21851",
  storageBucket: "capital-craft-21851.firebasestorage.app",
  messagingSenderId: "793374999956",
  appId: "1:793374999956:web:9a184c032a7e3c49c2bb81",
  measurementId: "G-PMV0M8F0V4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
