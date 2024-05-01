import firebase from 'firebase/';
import 'firebase/auth';
import 'firebase/database';
// Add other Firebase services as needed

const firebaseConfig = {
  // Your Firebase config here
  apiKey: "",
    authDomain: "",
   // databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

firebase.initializeApp(firebaseConfig);

export default firebase;
