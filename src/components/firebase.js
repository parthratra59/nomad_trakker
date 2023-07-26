// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCX26JsJWcUV9YF16EnnmvmgO0VCjLTlK4",
  authDomain: "nomadtrakker-2532f.firebaseapp.com",
  projectId: "nomadtrakker-2532f",
  storageBucket: "nomadtrakker-2532f.appspot.com",
  messagingSenderId: "257894314859",
  appId: "1:257894314859:web:1ddd93a602f2e5c541d22e",
  measurementId: "G-J2Z8R27G7D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);