import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';



const firebaseConfig = {
    apiKey: "AIzaSyC72qAJT6alYf2ftzQzmYbJ_E837ipUg7A",
    authDomain: "e-learning-f4254.firebaseapp.com",
    projectId: "e-learning-f4254",
    storageBucket: "e-learning-f4254.appspot.com",
    messagingSenderId: "800537261167",
    appId: "1:800537261167:web:647a6ed40686403730499a",
    measurementId: "G-SR6SEWPY6B"
  };

let app;

if (firebase.apps.length === 0){
    app = firebase.initializeApp(firebaseConfig);
}
else {
    app = firebase.app();

}

const db = app.firestore();
const auth = firebase.auth();

export {db, auth}