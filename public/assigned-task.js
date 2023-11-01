// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyBqyYXndru5uVI60tp6eu3A1A7Jho-1Fys",
    authDomain: "login-auth-7a8b9.firebaseapp.com",
    databaseURL: "https://login-auth-7a8b9-default-rtdb.firebaseio.com",
    projectId: "login-auth-7a8b9",
    storageBucket: "login-auth-7a8b9.appspot.com",
    messagingSenderId: "786370328154",
    appId: "1:786370328154:web:75193de1d672e27e700a63"
};

const app = firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Function to fetch and display assigned tasks
function fetchAssignedTasks() {
    const user = firebase.auth().currentUser;

    if (user !== null) {
        const uid = user.uid;
        const assignedTasksRef = database.ref(`assignedTasks/${uid}`);

        assignedTasksRef.once("value", (snapshot) => {
            const taskList = document.getElementById("task-list");
            taskList.innerHTML = ''; // Clear the task list

            if (snapshot.exists()) {
                const data = snapshot.val();

                for (const taskId in data) {
                    const task = data[taskId];
                    const listItem = document.createElement("li");
                    listItem.textContent = `Task: ${task.taskName}, Priority: ${task.priority}`;
                    taskList.appendChild(listItem);
                }
            } else {
                const message = document.createElement("p");
                message.textContent = "No assigned tasks found.";
                taskList.appendChild(message);
            }
        }).catch((error) => {
            console.error("Error fetching assigned tasks: " + error.message);
        });
    }
}

// Call the function to fetch and display assigned tasks when the page loads
window.addEventListener("load", fetchAssignedTasks);
