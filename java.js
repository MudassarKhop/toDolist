window.onload = loadTasks;

document.querySelector("form").addEventListener("submit", (e) => {
	e.preventDefault();
	addTask();
});

function loadTasks() {
	let tasks = Array.from(JSON.parse( localStorage.getItem("tasks"))) ?
            JSON.parse( localStorage.getItem("tasks")) : [
    {
        id: 1,
        item: 'TV Stand',
        createdDate: new Date()
    }
];

	tasks.forEach((task) => {
		const list = document.querySelector("ul");
		const li = document.createElement("li");
		li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check" ${
			task.completed ? "checked" : ""
		}>
          <input type="text" value="${task.task}" class="task ${
			task.completed ? "completed" : ""
		}" onfocus="getCurrentTask(this)" onblur="editTask(this)">
          <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
		list.insertBefore(li, list.children[0]);
	});
}

function addTask() {
	const task = document.querySelector("form input");
	const list = document.querySelector("ul");
	if (task.value === "") {
		alert("Please add some task!");
		return false;
	}
	if (document.querySelector(`input[value="${task.value}"]`)) {
		alert("Task already exist!");
		return false;
	}
	localStorage.setItem(
		"tasks",
		JSON.stringify([
			...JSON.parse(localStorage.getItem("tasks") || "[]"),
			{ task: task.value, completed: false },
		])
	);
	const li = document.createElement("li");
	li.innerHTML = `<input type="checkbox" onclick="taskComplete(this)" class="check">
      <input type="text" value="${task.value}" class="task" onfocus="getCurrentTask(this)" onblur="editTask(this)">
      <i class="fa fa-trash" onclick="removeTask(this)"></i>`;
	list.insertBefore(li, list.children[0]);
	task.value = "";
}

function taskComplete(event) {
	let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
	tasks.forEach((task) => {
		if (task.task === event.nextElementSibling.value) {
			task.completed = !task.completed;
		}
	});
	localStorage.setItem("tasks", JSON.stringify(tasks));
	event.nextElementSibling.classList.toggle("completed");
}

function removeTask(event) {
	let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
	tasks.forEach((task) => {
		if (task.task === event.parentNode.children[1].value) {
			tasks.splice(tasks.indexOf(task), 1);
		}
	});
	localStorage.setItem("tasks", JSON.stringify(tasks));
	event.parentElement.remove();
}

let currentTask = null;

function getCurrentTask(event) {
	currentTask = event.value;
}

function editTask(event) {
	let tasks = Array.from(JSON.parse(localStorage.getItem("tasks")));
	if (event.value === "") {
		alert("Task is empty!");
		event.value = currentTask;
		return;
	}
	tasks.forEach((task) => {
		if (task.task === event.value) {
			alert("Task already exist!");
			event.value = currentTask;
			return;
		}
	});
	tasks.forEach((task) => {
		if (task.task === currentTask) {
			task.task = event.value;
		}
	});
	localStorage.setItem("tasks", JSON.stringify(tasks));
}

function sortList() {
	let list, i, switching, b, shouldSwitch;
	list = document.getElementById("id01");
	switching = true;
	while (switching) {
		switching = false;
		b = list.getElementsByTagName("LI");
		for (i = 0; i < b.length - 1; i++) {
			shouldSwitch = false;
			if (b[i].innerHTML.toLowerCase() > b[i + 1].innerHTML.toLowerCase()) {
				shouldSwitch = true;
				break;
			}
		}
		if (shouldSwitch) {
			b[i].parentNode.insertBefore(b[i + 1], b[i]);
			switching = true;
		}
	}
}
