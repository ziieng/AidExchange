//firebase api
require("dotenv").config();

const apiKey = process.env.FIRE_API;
// Your web app's Firebase configuration

var firebaseConfig = {
  apiKey: apiKey,
  authDomain: "aidexchange-bf872.firebaseapp.com",
  projectId: "aidexchange-bf872",
  storageBucket: "aidexchange-bf872.appspot.com",
  messagingSenderId: process.env.messagingSenderId,
  appId: process.env.appId,
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
