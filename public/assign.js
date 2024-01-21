import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-auth.js";
import { getDatabase, ref, get, set, remove, push } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-database.js";

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


document.addEventListener("DOMContentLoaded", function () {
    auth.onAuthStateChanged(function (user) {
        if (user) {
            const email = user.email;
            document.getElementById("user-email").textContent = "User Email: " + email;
            displayUserProjects(email);
        } else {
            window.location.href = 'index.html';
        }
        document.getElementById('logout').addEventListener("click", function () {
            logout();
        });
    });

    
    document.querySelector(".project-details").addEventListener("click", function (event) {
        if (event.target.classList.contains("complete-button")) {
            const projectId = event.target.getAttribute("data-project-id");
            moveProject(projectId);
            location.reload();
        }
    });
});



function displayUserProjects(userEmail) {
    const projectsRef = ref(database, 'projects');

    get(projectsRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const projectData = snapshot.val();
                let projectsHTML = "";

                for (const projectId in projectData) {
                    const project = projectData[projectId];
                    if (project.assignUser === userEmail) {
                        projectsHTML += `
                            <p>Project Name: ${project.projectName}</p>
                            <p>Task: ${project.assignTask}</p>
                            <p>Priority: ${project.priority}</p>
                            <button class="complete-button" data-project-id="${projectId}">Complete</button>
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
        })
        .catch((error) => {
            console.error("Error fetching project data: " + error.message);
        });
}

document.querySelector(".project-details").addEventListener("click", function (event) {
        if (event.target.classList.contains("complete-button")) {
            const projectId = event.target.getAttribute("data-project-id");
            // Update the project status to "completed" in the database
            markProjectAsCompleted(projectId);
        }
    });

function markProjectAsCompleted(projectId) {
    const projectRef = ref(database, `projects/${projectId}`);
    
    // Update the 'status' field in the project to 'completed'
    set(projectRef, {
        status: 'completed'
    }, { merge: true })
    .then(() => {
        // Display a success message or update the UI as needed
        console.log(`Project marked as completed: ${projectId}`);
    })
    .catch((error) => {
        console.error("Error updating project status: " + error.message);
    });
}
function moveProject(projectId) {
console.log(`Moving project with ID ${projectId}`);
}
function logout() {
    auth.signOut().then(function () {
        document.getElementById("user-email").textContent = "User Email: Loading...";
        window.location.href = 'index.html';
    }).catch(function (error) {
        console.error("Error logging out: " + error.message);
    });
}

