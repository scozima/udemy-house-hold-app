// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1_nXLsHZBaspDZ3XU2y0rkGdgLxBq4sc",
  authDomain: "householdtypescript-719b2.firebaseapp.com",
  projectId: "householdtypescript-719b2",
  storageBucket: "householdtypescript-719b2.firebasestorage.app",
  messagingSenderId: "962532833619",
  appId: "1:962532833619:web:64c9834162ce9d522849a6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
