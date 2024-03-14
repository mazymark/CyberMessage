import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDxR0tUBPeA9nQa2-OF3x8R0fVne7oWvJs",
  authDomain: "cybermessaging-7a158.firebaseapp.com",
  projectId: "cybermessaging-7a158",
  storageBucket: "cybermessaging-7a158.appspot.com",
  messagingSenderId: "795691923106",
  appId: "1:795691923106:web:4ee5027f36cf0b1939c9fb",
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);
