
/*
   Array to store all tasks.
   Loads previously saved tasks from browser storage.
*/
let tasks = JSON.parse(localStorage.getItem("studyTasks")) || [];


// FUNCTION 1: SAVE TASKS
function saveTasks() {

    localStorage.setItem("studyTasks", JSON.stringify(tasks));

}


// FUNCTION 2: ADD TASK
function addTask() {

    let taskName = document.getElementById("taskInput").value.trim();

    let subject = document.getElementById("subjectInput").value;

    let date = document.getElementById("dateInput").value;


    // Checks whether any field is empty
    if (taskName === "" || subject === "" || date === "") {

        alert("Please fill all the fields!");

        return;
    }


    // Creates a new task object
    let task = {

        name: taskName,
        subject: subject,
        date: date,
        completed: false

    };


    // Adds task to array
    tasks.push(task);


    // Saves tasks in browser storage
    saveTasks();


    // Clears input fields
    document.getElementById("taskInput").value = "";
    document.getElementById("subjectInput").value = "";
    document.getElementById("dateInput").value = "";


    // Displays updated tasks
    displayTasks();
}



// FUNCTION 3: DISPLAY TASKS
function displayTasks() {

    let taskList = document.getElementById("taskList");

    taskList.innerHTML = "";


    tasks.forEach(function(task, index) {

        let li = document.createElement("li");


        li.className = task.completed
            ? "task completed"
            : "task";


        li.innerHTML = `
            <div class="task-name">${escapeHTML(task.name)}</div>

            <div class="task-info">
                Subject: ${escapeHTML(task.subject)} <br>
                Deadline: ${escapeHTML(task.date)}
            </div>

            <button onclick="completeTask(${index})">
                ${task.completed ? "Undo" : "Complete"}
            </button>

            <button class="delete-btn"
                    onclick="deleteTask(${index})">
                Delete
            </button>
        `;


        taskList.appendChild(li);

    });


    updateStats();
}



// FUNCTION 4: ESCAPE HTML
function escapeHTML(value) {

    return String(value).replace(/[&<>"']/g, function(character) {

        return {
            "&": "&amp;",
            "<": "&lt;",
            ">": "&gt;",
            '"': "&quot;",
            "'": "&#39;"
        }[character];

    });

}



// FUNCTION 5: COMPLETE TASK
function completeTask(index) {

    tasks[index].completed = !tasks[index].completed;

    saveTasks();

    displayTasks();

}



// FUNCTION 6: DELETE TASK
function deleteTask(index) {

    tasks.splice(index, 1);

    saveTasks();

    displayTasks();

}



// FUNCTION 7: UPDATE STATISTICS
function updateStats() {

    let total = tasks.length;


    let completed = tasks.filter(function(task) {

        return task.completed;

    }).length;


    let pending = total - completed;


    document.getElementById("totalTasks").innerText = total;

    document.getElementById("completedTasks").innerText = completed;

    document.getElementById("pendingTasks").innerText = pending;

}



// LOAD SAVED TASKS WHEN PAGE OPENS
displayTasks();
