import { initializeApp, getApps, getApp } from "firebase/app"
import { getFirestore } from "firebase/firestore"
import withFirebaseAuth from 'react-with-firebase-auth';
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth"


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCDvUeJIxBa1Q97gYwB3F6Je71R4q1GX6Y",
  authDomain: "trends-final-dfea1.firebaseapp.com",
  projectId: "trends-final-dfea1",
  storageBucket: "trends-final-dfea1.appspot.com",
  messagingSenderId: "734792483226",
  appId: "1:734792483226:web:ae7f4c17775188a0bd7a23"
};




// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app);

const providers = {
  googleProvider: new GoogleAuthProvider(),
};

const createComponentWithAuth = withFirebaseAuth({
  providers,
  firebaseAppAuth: auth,
});

const signInWithGoogle = () => {
  signInWithPopup(auth, providers.googleProvider);
};

const signOutFirebase = () => {
  signOut(auth);
};

export {
  db,
  auth,
  createComponentWithAuth,
  signInWithGoogle,
  signOutFirebase as signOut,
};