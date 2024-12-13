import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6hr1cv3unPq-7x3kk74RzdXJMUrZphlk",
  authDomain: "react-blog-ac47a.firebaseapp.com",
  projectId: "react-blog-ac47a",
  storageBucket: "react-blog-ac47a.firebasestorage.app",
  messagingSenderId: "881937031394",
  appId: "1:881937031394:web:93ea72aeb93bff8d7b3ebb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export default app
export const db = getFirestore(app)