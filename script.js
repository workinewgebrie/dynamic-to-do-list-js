// document.addEventListener('DOMContentLoaded', function () {
//     const addButton = document.getElementById('add-task-btn');
//     const taskInput = document.getElementById('task-input');
//     const taskList = document.getElementById('task-list');

//     // Function to add a task
//     function addTask() {
//         const taskText = taskInput.value.trim();

//         if (taskText === '') {
//             alert('Please enter a task.');
//             return;
//         }

//         // Create list item and set its text
//         const li = document.createElement('li');
//         li.textContent = taskText;

//         // Create remove button
//         const removeBtn = document.createElement('button');
//         removeBtn.textContent = 'Remove';
//         removeBtn.classList.add('remove-btn'); // <-- This line is required

//         // Add event to remove task
//         removeBtn.onclick = function () {
//             taskList.removeChild(li);
//         };

//         // Append button to list item, and list item to task list
//         li.appendChild(removeBtn);
//         taskList.appendChild(li);

//         // Clear input
//         taskInput.value = '';
//     }

//     // Add task on button click
//     addButton.addEventListener('click', addTask);

//     // Add task on pressing Enter key
//     taskInput.addEventListener('keypress', function (event) {
//         if (event.key === 'Enter') {
//             addTask();
//         }
//     });
// });
document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Load tasks from local storage when the page loads
    loadTasks();

    // Function to load tasks from local storage
    function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.forEach(taskText => addTask(taskText, false)); // false = don't double save
    }

    // Function to save tasks array to local storage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#task-list li').forEach(li => {
            tasks.push(li.firstChild.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    // Function to add a task
    function addTask(taskText, save = true) {
        if (!taskText || taskText.trim() === '') {
            alert('Please enter a task');
            return;
        }

        const li = document.createElement('li');
        li.textContent = taskText;

        const removeBtn = document.createElement('button');
        removeBtn.textContent = 'Remove';
        removeBtn.classList.add('remove-btn');

        removeBtn.onclick = () => {
            li.remove();
            saveTasks(); // update storage on removal
        };

        li.appendChild(removeBtn);
        taskList.appendChild(li);
        taskInput.value = '';

        if (save) {
            saveTasks(); // update storage on addition
        }
    }

    // Add task on button click
    addButton.addEventListener('click', () => {
        addTask(taskInput.value);
    });

    // Add task on "Enter" key press
    taskInput.addEventListener('keypress', event => {
        if (event.key === 'Enter') {
            addTask(taskInput.value);
        }
    });
});
