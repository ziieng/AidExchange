import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

// Set the configuration for your app
var firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  storageBucket: process.env.storageBucket,
};
firebase.initializeApp(firebaseConfig);
