// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getDatabase,
  onValue,
  ref,
  update,
  connectDatabaseEmulator,
} from "firebase/database";
import { useEffect, useState, useCallback } from "react";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  connectAuthEmulator,
  signInWithCredential,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBg1alr48f1tOvxWwqWVvNQibRY3DzTP04",
  authDomain: "restroomradar.firebaseapp.com",
  databaseURL: "https://restroomradar-default-rtdb.firebaseio.com",
  projectId: "restroomradar",
  storageBucket: "restroomradar.appspot.com",
  messagingSenderId: "14177380893",
  appId: "1:14177380893:web:d2ad2a801b453af90d34f4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);

const auth = getAuth(app);

export const useDbData = (path) => {
  const [data, setData] = useState();
  const [error, setError] = useState(null);

  useEffect(
    () =>
      onValue(
        ref(database, path),
        (snapshot) => {
          setData(snapshot.val());
        },
        (error) => {
          setError(error);
        }
      ),
    [path]
  );

  return [data, error];
};

export const useDbUpdate = (path) => {
  const [result, setResult] = useState();
  const updateData = useCallback(
    (value) => {
      update(ref(database, path), value)
        .then(() => setResult(makeResult()))
        .catch((error) => setResult(makeResult(error)));
    },
    [database, path]
  );

  return [updateData, result];
};

const makeResult = (error) => {
  const timestamp = Date.now();
  const message =
    error?.message || `Updated: ${new Date(timestamp).toLocaleString()}`;
  return { timestamp, error, message };
};

const DatabasePaths = {
  USERS: "/users/",
  RESTROOMS: "/restrooms/",
  REVIEWS: "/reviews",
};

const provider = new GoogleAuthProvider();
export const FirebaseSignIn = async () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      // ...
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
      console.log(error);
    });
};

export const FirebaseSignOut = () => signOut(auth);

export const useAuth = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser();
      }
    });
  }, []);

  return [user];
};

export const getRating = (restroomId) => {
  const [restroomReviews, error] = useDbData(`/reviews/${restroomId}`);

  if (!restroomReviews) {
    return 0;
  }

  console.log("mom", restroomReviews);
};
