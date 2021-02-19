import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";

// Set the configuration for your app
// TODO: Replace with your app's config object
var firebaseConfig = {
  apiKey: process.env.apiKey,
  authDomain: process.env.authDomain,
  databaseURL: process.env.databaseURL,
  storageBucket: process.env.storageBucket,
};
firebase.initializeApp(firebaseConfig);

// Get a reference to the storage service, which is used to create references in your storage bucket
var storage = firebase.storage();

// Create a storage reference from our storage service
var storageRef = storage.ref();

// Create a child reference
var imagesRef = storageRef.child("images");
// imagesRef now points to 'images'

// Child references can also take paths delimited by '/'
var spaceRef = storageRef.child("images/space.jpg");
