import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: 'my-poetry-app.firebaseapp.com',
    databaseURL: 'https://my-poetry-app.firebaseio.com',
    projectId: 'my-poetry-app',
    storageBucket: 'my-poetry-app.appspot.com',
    messagingSenderId: '341809310539',
};
firebase.initializeApp(config);


export const auth = firebase.auth;
export const firestore = firebase.firestore;
export const storage = firebase.storage;