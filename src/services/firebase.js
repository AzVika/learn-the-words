import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FB_API_KEY,
    authDomain: process.env.REACT_APP_FB_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FB_DATABASE_URL,
    projectId: process.env.REACT_APP_FB_PPOJECT_ID,
    storageBucket: process.env.REACT_APP_FB_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_FB_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_FB_APP_ID,
};

class Firebase {
    constructor() {
        firebase.initializeApp(firebaseConfig);

        this.auth = firebase.auth();
        this.database = firebase.database();

        this.userUid = null;
    }

    setUserUid = (uid) => this.userUid = uid;

    signWithEmail = (email, password) => this.auth.signInWithEmailAndPassword(email, password);

    // signOut = this.auth.signOut();

    getUserCardRef = (uid) => this.database.ref(`/cards/${this.userUid}`);

    getUserCurrentCardRef = (id) => this.database.ref(`/cards/${this.userUid}/${id}`);
}

// export const fire = firebase;
// const database = firebase.database();
export default Firebase;


