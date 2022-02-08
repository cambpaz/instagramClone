// import { seedDatabase } from "../seed";

import Firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyDw5rec3lUrFIEJWk798v0GQVbwlFwNcp0",
    authDomain: "instagram-clone-1f4b2.firebaseapp.com",
    databaseURL: "https://instagram-clone-1f4b2-default-rtdb.firebaseio.com",
    projectId: "instagram-clone-1f4b2",
    storageBucket: "instagram-clone-1f4b2.appspot.com",
    messagingSenderId: "479924889614",
    appId: "1:479924889614:web:3fe04c93c34d25881e345f"
};

const firebase = Firebase.initializeApp(firebaseConfig);
const { FieldValue } = Firebase.firestore;
// seedDatabase(firebase)

export { firebase, FieldValue };


