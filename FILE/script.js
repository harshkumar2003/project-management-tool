

/ Your web app's Firebase configuration/
const firebaseConfig = {
  apiKey: "AIzaSyBqyYXndru5uVI60tp6eu3A1A7Jho-1Fys",
  authDomain: "login-auth-7a8b9.firebaseapp.com",
  databaseURL: "https://login-auth-7a8b9-default-rtdb.firebaseio.com",
  projectId: "login-auth-7a8b9",
  storageBucket: "login-auth-7a8b9.appspot.com",
  messagingSenderId: "786370328154",
  appId: "1:786370328154:web:75193de1d672e27e700a63"
};
// Initialize Firebase
//firebase.initializeApp(firebaseConfig);
// Initialize variables



// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

// Set up our register function
function register() {
  // Get all our input fields
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;
 // const full_name = document.getElementById('full_name').value; // Capture full_name field

  // Validate input fields
  if (validate_email(email) === false || validate_password(password) === false) {
    alert('Email or Password is Outta Line!!');
    return;
  }
  // if (validate_field(full_name) === false) {
  //   alert('Full Name is Outta Line!!');
  //   return;
  // }

  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
    .then(function (userCredential) {
      // Declare user variable
      var user = userCredential.user;

      // Add this user to Firebase Database
      var database_ref = database.ref();

      // Create User data
      var user_data = {
        email: email,
        full_name: full_name, // Include full_name in user data
        last_login: Date.now()
      };

      // Push to Firebase Database
      database_ref.child('users/' + user.uid).set(user_data);

      // Done
      alert('User Created!!');
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message);
    });
}

// Set up our login function
function login() {
  // Get all our input fields
  const login_email = document.getElementById('login_email').value;
  const login_password = document.getElementById('login_password').value;

  // Validate input fields
  if (validate_email(login_email) === false || validate_password(login_password) === false) {
    alert('Email or Password is Outta Line!!');
    return;
  }

  auth.signInWithEmailAndPassword(login_email, login_password)
    .then(function () {
      // Declare user variable
      var user = auth.currentUser;

      // Add this user to Firebase Database
      var database_ref = database.ref();

      // Create User data
      var user_data = {
        last_login: Date.now()
      };

      // Push to Firebase Database
      database_ref.child('users/' + user.uid).update(user_data);

      // Done
      alert('User Logged In!!');
    })
    .catch(function (error) {
      // Firebase will use this to alert of its errors
      var error_code = error.code;
      var error_message = error.message;

      alert(error_message);
    });
}
