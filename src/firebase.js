import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBKCu32DOA43PngW1CTrMaIugHyMJbQ_1I",
  authDomain: "react-blog-8a8df.firebaseapp.com",
  projectId: "react-blog-8a8df",
  storageBucket: "react-blog-8a8df.firebasestorage.app",
  messagingSenderId: "251730130457",
  appId: "1:251730130457:web:e7e826b49815133bdb9c88",
  measurementId: "G-XB4JET66P3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app
export const db = getFirestore(app)