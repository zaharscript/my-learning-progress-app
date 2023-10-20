// Create a data structure to store the tasks and their hierarchy
const myCourse = [];

function addCourse() {
    const courseName = document.getElementById("courseName");
    const course = courseName.value.trim();

    if (course === "") {
        return;
    }

    const courseList = document.getElementById("courseList");
    const li = document.createElement("li");
    li.innerHTML = `
    <div class="topic">
        <span>${course}</span>
        <input type="checkbox">
        <button class="subtask" onclick="addSubTopic(this)">Add Topic</button>
    </div>
    `;

    courseList.appendChild(li);

    // Create a task object and add it to the tasks array
    const courseObject = {
        text: course,
        subTopic: [],
    };
    myCourse.push(courseObject);

    courseName.value = "";
}

function toggleCompleted(button) {
    button.classList.toggle("completed");
}

function addSubTopic(button) {
    const parentCourse = button.parentElement;
    const parentTaskText = parentCourse.querySelector("span").textContent;

    const subTopicText = prompt("Enter Topic:");

    if (subTopicText === null || subTopicText.trim() === "") {
        return;
    }

    // Find the corresponding task in the tasks array and add the subtask
    const taskObject = myCourse.find(task => task.text === parentTaskText);
    taskObject.subTopic.push(subTopicText);

    const ul = document.createElement("ul");
    ul.innerHTML = `    <li><span>${subTopicText}</span><input type="checkbox" class="done"></li>`;

    parentCourse.appendChild(ul);
}

document.getElementById("courseName").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        addCourse();
    }
});
