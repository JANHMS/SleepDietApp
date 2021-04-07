import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

// Replace the following with the config for your own Firebase project
// https://firebase.google.com/docs/web/setup#config-object
const firebaseConfig = {
  apiKey: "AIzaSyDPiA83YCRp0XKCrcJR0n_Fe_JyUqyDVJ8",
  authDomain: "sleepdiet-74fcb.firebaseapp.com",
  projectId: "sleepdiet-74fcb",
  storageBucket: "sleepdiet-74fcb.appspot.com",
  messagingSenderId: "315523495030",
  appId: "1:315523495030:web:141e255a664ecb867e9b57",
  measurementId: "G-DPNHJM8M2E"
};

const app = firebase.initializeApp(firebaseConfig);
export const auth = app.auth();
export const firestore = app.firestore();
export const storage = app.storage();
const { Timestamp } = firebase.firestore
export { Timestamp }