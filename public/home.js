
// Import Firebase SDK modules
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { getDatabase, ref, push, set, get } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

// Firebase configuration
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
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

document.addEventListener("DOMContentLoaded", function () {
    auth.onAuthStateChanged(function (user) {
        if (user) {
            const email = user.email;
            document.getElementById("user-email").textContent = "User Email: " + email;
            setupProjectForm(user);
        } else {
            // Redirect to the login page if the user is not authenticated.
            window.location.href = 'index.html';
        }
    });

    document.getElementById('logout').addEventListener("click", function () {
        logout();
    });
});

function setupProjectForm(user) {
    const projectForm = document.getElementById("project-form");
    projectForm.addEventListener("submit", function (e) {
        e.preventDefault();
        const assignedUserEmail = projectForm.elements.assign.value.trim();
        verifyAssignedUser(assignedUserEmail, user, projectForm);
    });
}

// Function to verify the assigned user and submit the project
function verifyAssignedUser(email, user, projectForm) {
    if (!user) {
        console.error("User is not authenticated.");
        return;
    }
    const usersRef = ref(database, 'users');
    get(usersRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const userData = snapshot.val();
                if (userData) {
                    let userExists = false;
                    // Check if the email exists in the userData
                    for (const uid in userData) {
                        if (userData[uid].email === email) {
                            userExists = true;
                            break;
                        }
                    }
                    if (userExists) {
                        // The user exists, proceed with submitting the project.
                        const projectName = projectForm.elements.project.value;
                        const assignTask = projectForm.elements.assigntask.value;
                        const priority = projectForm.querySelector('input[name="priority"]:checked').value;
                        const projectsRef = ref(database, 'projects');
                        const newProjectRef = push(projectsRef);
                        set(newProjectRef, {
                            projectName: projectName,
                            assignUser: email,
                            assignTask: assignTask,
                            priority: priority
                        })
                            .then(() => {
                                alert("Project data added to the database!");
                                projectForm.reset();
                            })
                            .catch((error) => {
                                console.error("Error storing data: " + error.message);
                            });
                    } else {
                        alert("Invalid assigned user. Please enter a valid user.");
                    }
                } else {
                    console.error("User data does not exist.");
                }
            } else {
                console.error("Snapshot does not exist.");
            }
        })
        .catch((error) => {
            console.error("Error fetching user data: " + error.message);
        });
}

function displayUserProjects(userEmail) {
    const projectsRef = ref(database, 'projects');

    get(projectsRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const projectData = snapshot.val();
                if (projectData) {
                    let projectsHTML = "";

                    for (const projectId in projectData) {
                        const project = projectData[projectId];
                        if (project.assignUser === userEmail) {
                            projectsHTML += `
                                <p>Project Name: ${project.projectName}</p>
                                <p>Priority: ${project.priority}</p>
                                <p>Assigned Task: ${project.assignTask}</p>
                                <hr>
                            `;
                        }
                    }

                    if (projectsHTML !== "") {
                        document.querySelector(".project-details").innerHTML = projectsHTML;
                    } else {
                        document.querySelector(".project-details").innerHTML = "No projects found for this user.";
                    }
                } else {
                    document.querySelector(".project-details").innerHTML = "No projects found for this user.";
                }
            } else {
                document.querySelector(".project-details").innerHTML = "No projects found for this user.";
            }
        })
        .catch((error) => {
            console.error("Error fetching project data: " + error.message);
        });
}

// Function to log out
function logout() {
    auth.signOut().then(function () {
        document.getElementById("user-email").textContent = "User Email: Loading...";
        window.location.href = 'index.html';
    }).catch(function (error) {
        console.error("Error logging out: " + error.message);
    });
}
