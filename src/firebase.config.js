// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCoe9Qa48LZ0CJleL2HDNGBIgWcZQIKpuM",
  authDomain: "test-demo-login-2f942.firebaseapp.com",
  projectId: "test-demo-login-2f942",
  storageBucket: "test-demo-login-2f942.appspot.com",
  messagingSenderId: "82878941875",
  appId: "1:82878941875:web:d3ff9a97685550bc61fec6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const auth = getAuth(app);
 export const db = getFirestore(app);
 export const storage = getStorage(app);

 export default app