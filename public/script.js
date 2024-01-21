import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { ref, set, get } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";
import { app, auth, database } from './firebase.js';

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("register").addEventListener("click", function () {
        var email = document.getElementById("email").value;
        var password = document.getElementById("password").value;

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
                const usersRef = ref(database, 'users/' + user.uid);
                set(usersRef, {
                    email: user.email,
                }).then(() => {
                    console.log('Data saved successfully!');
                    window.location.href = "home.html";
                }).catch((error) => {
                    console.error('Error writing document: ', error);
                });

                alert("Registration successful!!");
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
                alert(errorMessage);
            });
    });

    document.getElementById("login1").addEventListener("click", function () {
        var email = document.getElementById("login_email").value;
        var password = document.getElementById("login_password").value;

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                alert(user.email + " Login successful!!!");
                window.location.href = "home.html";
                const dt = new Date();
                const userRef = ref(database, 'users/' + user.uid);

                get(userRef).then((snapshot) => {
                    if (snapshot.exists()) {
                        const userData = snapshot.val();
                        userData.last_login = dt;
                        console.log('User Data:', userData);
                        set(userRef, userData); // Update last login time
                    }
                });
            })
            .catch((error) => {
                const errorMessage = error.message;
                console.log(errorMessage);
                alert(errorMessage);
            });
    });
});
