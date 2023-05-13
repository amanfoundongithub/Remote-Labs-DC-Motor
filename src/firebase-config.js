import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCq7obtbEllZmGW_8VE9f2sfwHCmtwZeQk",
    authDomain: "dc-motor-1a512.firebaseapp.com",
    projectId: "dc-motor-1a512",
    storageBucket: "dc-motor-1a512.appspot.com",
    messagingSenderId: "167571167210",
    appId: "1:167571167210:web:69bd98b584b89f5dde8493",
    measurementId: "G-XR38EEGB2M"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
