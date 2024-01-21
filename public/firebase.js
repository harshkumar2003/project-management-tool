import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyBqyYXndru5uVI60tp6eu3A1A7Jho-1Fys",
    authDomain: "login-auth-7a8b9.firebaseapp.com",
    databaseURL: "https://login-auth-7a8b9-default-rtdb.firebaseio.com",
    projectId: "login-auth-7a8b9",
    storageBucket: "login-auth-7a8b9.appspot.com",
    messagingSenderId: "786370328154",
    appId: "1:786370328154:web:75193de1d672e27e700a63"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

export { app, auth, database };
