import firebase from "firebase";
require('firebase/auth')

// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDQt0WAXuPYYxPKknlw8QI7U63ytK11578",
  authDomain: "aidexchange-bf872.firebaseapp.com",
  projectId: "aidexchange-bf872",
  storageBucket: "aidexchange-bf872.appspot.com",
  messagingSenderId: "485723049370",
  appId: "1:485723049370:web:2009b6adabecfd96ccbe23",
};

try {
  firebase.initializeApp(firebaseConfig);
} catch (err) {
  if (!/already exists/.test(err.message)) {
    console.error('Firebase initialization error', err.stack);
  }
}
const fire = firebase;
export default fire;