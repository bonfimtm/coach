// Import our custom CSS
import '../scss/styles.scss';

import * as modernizr from './modernizr-custom';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDkjfzNWZx43WRzWC0jjtMavyqAsV-u-H4",
    authDomain: "nb-centro-de-estudos.firebaseapp.com",
    projectId: "nb-centro-de-estudos",
    storageBucket: "nb-centro-de-estudos.appspot.com",
    messagingSenderId: "490729826545",
    appId: "1:490729826545:web:88ebe82cffd6df7baf2150",
    measurementId: "G-2SN8PVMWRN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
