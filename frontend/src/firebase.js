import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCgqhgB_0esH2P1LYVvGUWVFe2Nh9Dm5i8",
  authDomain: "proyectofinal-eee09.firebaseapp.com",
  projectId: "proyectofinal-eee09",
  storageBucket: "proyectofinal-eee09.appspot.com",
  messagingSenderId: "215682732959",
  appId: "1:215682732959:web:ba65f3ff9d3cb7fe87e3aa",
  measurementId: "G-JGEWT1WWD6",
});

const db = firebaseApp.firestore();

export { db };
