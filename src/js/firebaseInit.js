import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBnFxL2GJ4s4eaGhy85oYhi7QX5JUNIaDU",
  authDomain: "culinovo-db.firebaseapp.com",
  databaseURL:
    "https://culinovo-db-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "culinovo-db",
  storageBucket: "culinovo-db.appspot.com",
  messagingSenderId: "1024457193458",
  appId: "1:1024457193458:web:4cd1bd3bab642f7d181d6b",
  measurementId: "G-FBS28XC3MY",
};
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export default app;
