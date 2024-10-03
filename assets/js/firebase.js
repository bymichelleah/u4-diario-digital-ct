// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
//Autenticación
import { getAuth } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCuvybP8B3eWkh0y12U5zuGFo_7ElHLSlc",
  authDomain: "diario-digital-9cd11.firebaseapp.com",
  projectId: "diario-digital-9cd11",
  storageBucket: "diario-digital-9cd11.appspot.com",
  messagingSenderId: "306927218870",
  appId: "1:306927218870:web:d37345888f3149a517b617",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
