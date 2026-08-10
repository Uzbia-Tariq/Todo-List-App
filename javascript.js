"use strict";
// @ts-nocheck
// Select Elements
const taskInput = document.getElementById("taskInput");
const addButton = document.getElementById("addButton");
const taskContainer = document.getElementById("taskContainer");
const deleteAllButton = document.getElementById("deleteAllButton");
const taskCounter = document.getElementById("taskCounter");
const emptyState = document.getElementById("emptyState");
// Local Storage Key
const STORAGE_KEY = "todo_tasks";
// Tasks Array
let taskList = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
// Save Tasks
function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(taskList));
}
// Update Counter
function updateCounter() {
    taskCounter.textContent = taskList.length;
}
// Show / Hide Empty State
function updateEmptyState() {
    if (taskList.length === 0) {
        emptyState.classList.remove("hidden");
    }
    else {
        emptyState.classList.add("hidden");
    }
}
// Clear Input
function clearInput() {
    taskInput.value = "";
    taskInput.focus();
}
// Create Task Card
function createTaskCard(taskObject) {
    // Main Card
    const taskCard = document.createElement("div");
    taskCard.style.opacity = "0";
    taskCard.style.transform = "translateY(20px)";
    taskCard.className =
        "bg-white border border-slate-200 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 p-4 flex justify-between items-center gap-4";
    // Task Text
    const taskText = document.createElement("p");
    taskText.className =
        "task-text flex-1 text-slate-700 text-lg";
    taskText.textContent = taskObject.text;
    // Completed Task
    if (taskObject.completed) {
        taskText.classList.add("completed");
    }
    // Buttons Container
    const buttonContainer = document.createElement("div");
    buttonContainer.className =
        "flex gap-2";
    // Done Button
    const doneButton = document.createElement("button");
    doneButton.className =
        "done-btn bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl transition duration-300 shadow";
    if (taskObject.completed) {
        doneButton.innerHTML =
            '<i class="fa-solid fa-circle-check"></i> Done';
        doneButton.classList.replace("bg-green-500", "bg-emerald-700");
    }
    else {
        doneButton.innerHTML =
            '<i class="fa-solid fa-check"></i> Done';
    }
    // Delete Button
    const deleteButton = document.createElement("button");
    deleteButton.className =
        "delete-btn bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-xl transition duration-300 shadow";
    deleteButton.innerHTML =
        '<i class="fa-solid fa-trash"></i> Delete';
    // Add Buttons
    buttonContainer.appendChild(doneButton);
    buttonContainer.appendChild(deleteButton);
    taskCard.appendChild(taskText);
    taskCard.appendChild(buttonContainer);
    taskContainer.appendChild(taskCard);
    setTimeout(function () {
        taskCard.style.transition = "0.3s";
        taskCard.style.opacity = "1";
        taskCard.style.transform = "translateY(0)";
    }, 50);
}
// Add Task
function addTask() {
    const taskValue = taskInput.value.trim();
    if (taskValue === "") {
        alert("Please enter a task!");
        taskInput.focus();
        return;
    }
    const newTask = {
        text: taskValue,
        completed: false
    };
    taskList.push(newTask);
    saveTasks();
    renderTasks();
    clearInput();
}
// Toggle Task Status
taskContainer.addEventListener("click", function (event) {
    const doneButton = event.target.closest(".done-btn");
    if (!doneButton)
        return;
    const taskCard = doneButton.parentElement.parentElement;
    const taskText = taskCard.querySelector("p");
    const taskIndex = [...taskContainer.children].indexOf(taskCard);
    taskList[taskIndex].completed = !taskList[taskIndex].completed;
    if (taskList[taskIndex].completed) {
        taskText.classList.add("completed");
        doneButton.classList.remove("bg-green-500");
        doneButton.classList.add("bg-emerald-700");
        doneButton.innerHTML =
            '<i class="fa-solid fa-circle-check"></i> Done';
    }
    else {
        taskText.classList.remove("completed");
        doneButton.classList.remove("bg-emerald-700");
        doneButton.classList.add("bg-green-500");
        doneButton.innerHTML =
            '<i class="fa-solid fa-check"></i> Done';
    }
    saveTasks();
});
// Delete Single Task
taskContainer.addEventListener("click", function (event) {
    const deleteButton = event.target.closest(".delete-btn");
    if (!deleteButton)
        return;
    const taskCard = deleteButton.parentElement.parentElement;
    const taskIndex = [...taskContainer.children].indexOf(taskCard);
    taskList.splice(taskIndex, 1);
    saveTasks();
    taskCard.style.opacity = "0";
    taskCard.style.transform = "translateX(100px)";
    setTimeout(function () {
        taskCard.remove();
        updateCounter();
        updateEmptyState();
    }, 300);
});
// Delete All Tasks
function deleteAllTasks() {
    if (taskList.length === 0) {
        alert("No tasks available.");
        return;
    }
    const confirmation = confirm("Are you sure you want to delete all tasks?");
    if (!confirmation)
        return;
    taskList = [];
    saveTasks();
    taskContainer.innerHTML = "";
    updateCounter();
    updateEmptyState();
}
// Render All Tasks
function renderTasks() {
    taskContainer.innerHTML = "";
    taskList.forEach(function (task) {
        createTaskCard(task);
    });
    updateCounter();
    updateEmptyState();
}
// Load Existing Tasks
renderTasks();
// Add Button
addButton.addEventListener("click", addTask);
// Enter Key
taskInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        addTask();
    }
});
// Delete All Button
deleteAllButton.addEventListener("click", deleteAllTasks);
// Auto Focus
taskInput.focus();
//# sourceMappingURL=javascript.js.map