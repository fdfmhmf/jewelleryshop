// js/firebase.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.7.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBvQgm3un6m67VHU7TAW05NZUpk_C3mnQ4",
  authDomain: "she-s-style.firebaseapp.com",
  projectId: "she-s-style",
  storageBucket: "she-s-style.appspot.com",
  messagingSenderId: "326287686768",
  appId: "1:326287686768:web:3e5a373d314832b1a108b5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Export for use in other files
export const auth = getAuth(app);
export const db = getFirestore(app);