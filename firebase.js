// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBjO0eRP9e6le1Dn0KKTaPQsTKvkddtics",
  authDomain: "travelnomad-45147.firebaseapp.com",
  projectId: "travelnomad-45147",
  storageBucket: "travelnomad-45147.appspot.com",
  messagingSenderId: "334881820733",
  appId: "1:334881820733:web:ded02dd2c24c37f879da54",
  measurementId: "G-GRFH8RW9R6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);