function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
  }
  var modal = document.getElementById("id01");
  
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
  
  var modal = document.getElementById("id02");
  
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
  document.addEventListener("DOMContentLoaded", function() {
  var modal = document.getElementById("id03");
  
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
});
  
function moveProjectToNewLocation(projectId, userEmail) {
    const projectsRef = ref(database, 'projects');
    const completedProjectsRef = ref(database, 'completedProjects');

    get(projectsRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                const projectData = snapshot.val();

                if (projectData[projectId].assignUser === userEmail) {
                    const projectToMove = projectData[projectId];
                    projectToMove.completedTimestamp = Date.now();

                    const newProjectRef = push(completedProjectsRef);
                    set(newProjectRef, projectToMove);

                    remove(ref(projectsRef, projectId));
                }
            }
        })
        .catch((error) => {
            console.error("Error moving project: " + error.message);
        });
}

// function moveProject(projectId) {
//   const userEmail = auth.currentUser.email;
//   moveProjectToNewLocation(projectId, userEmail);
// }


  