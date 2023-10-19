// Create a data structure to store the tasks and their hierarchy
const tasks = [];

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();

    if (taskText === "") {
        return;
    }

    const taskList = document.getElementById("taskList");
    const li = document.createElement("li");
    li.innerHTML = `
        <input type="checkbox">
        <span>${taskText}</span>
        <button class="subtask" onclick="addSubtask(this)">Add Sub Topic</button>
    `;

    taskList.appendChild(li);

    // Create a task object and add it to the tasks array
    const taskObject = {
        text: taskText,
        subtasks: [],
    };
    tasks.push(taskObject);

    taskInput.value = "";
}

function toggleCompleted(button) {
    button.classList.toggle("completed");
}

function addSubtask(button) {
    const parentTask = button.parentElement;
    const parentTaskText = parentTask.querySelector("span").textContent;

    const subtaskText = prompt("Enter subtask:");

    if (subtaskText === null || subtaskText.trim() === "") {
        return;
    }

    // Find the corresponding task in the tasks array and add the subtask
    const taskObject = tasks.find(task => task.text === parentTaskText);
    taskObject.subtasks.push(subtaskText);

    const ul = document.createElement("ul");
    ul.innerHTML = `    <li><input type="checkbox" class="done"><span>${subtaskText}</span></li>`;

    parentTask.appendChild(ul);
}

document.getElementById("taskInput").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addTask();
    }
});
