// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDgqhL9D4ALlHJHqKCH69gAw_V3NvfDjR0",
  authDomain: "react-native-apps-d8f3b.firebaseapp.com",
  projectId: "react-native-apps-d8f3b",
  storageBucket: "react-native-apps-d8f3b.appspot.com",
  messagingSenderId: "1097558980376",
  appId: "1:1097558980376:web:a6330d43cb9c918682106d",
  measurementId: "G-WCWZ2LRW0D"
};

// Initialize Firebase
 export const app = initializeApp(firebaseConfig);
 export const db = getFirestore(app);
 export const storage = getStorage(app);