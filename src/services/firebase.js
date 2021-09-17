import firebase from 'firebase/app';
import 'firebase/database';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: 'https://learn-the-words-b22b5-default-rtdb.europe-west1.firebasedatabase.app',
    projectId: 'learn-the-words-b22b5',
    storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

firebase.initializeApp(firebaseConfig);
export const fire = firebase;
const database = firebase.database();
export default database;


