import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDXUGA_ptsTdkuDeHVmP_mRzWQjAnP50TI",
  authDomain: "learnmate-29e74.firebaseapp.com",
  projectId: "learnmate-29e74",
  storageBucket: "learnmate-29e74.firebasestorage.app",
  messagingSenderId: "654995937589",
  appId: "1:654995937589:web:1cd886671b0d220a7bd47c"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
