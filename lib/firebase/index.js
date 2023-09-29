// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCG_RnXYpY6cLZ1Cj5HgSbXWsPvUjfO-nk",
  authDomain: "organiza-3c2a0.firebaseapp.com",
  projectId: "organiza-3c2a0",
  storageBucket: "organiza-3c2a0.appspot.com",
  messagingSenderId: "798933083362",
  appId: "1:798933083362:web:ba6b7c9a5499fd57fa6abb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export {app, db}