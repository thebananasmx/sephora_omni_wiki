import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// IMPORTANT: Replace with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAIvQf-2PJQcCxxt_HRsfB43bVLhqyaVhA",
  authDomain: "sephora-omni-wiki.firebaseapp.com",
  projectId: "sephora-omni-wiki",
  storageBucket: "sephora-omni-wiki.firebasestorage.app",
  messagingSenderId: "528079796755",
  appId: "1:528079796755:web:1fb897a2e87fb14495dde6",
  measurementId: "G-ZC5SZGQSV5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);