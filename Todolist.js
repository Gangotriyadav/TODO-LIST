document.addEventListener('DOMContentLoaded', function() {
    const addTaskButton = document.getElementById('addTaskButton');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const clearButton = document.getElementById('clearButton'); 

    function saveData() {
        localStorage.setItem("data", taskList.innerHTML);
    }

    function setTaskItemListeners(taskItem) {
        taskItem.querySelector('.checkmark').addEventListener('click', function() {
            taskItem.classList.toggle('completed');
            saveData();
        });

        taskItem.querySelector('.editButton').addEventListener('click', function() {
            const taskContent = taskItem.querySelector('span');
            const newTaskText = prompt('Edit your task:', taskContent.textContent);
            if (newTaskText !== null && newTaskText.trim() !== '') {
                taskContent.textContent = newTaskText.trim();
                saveData();
            }
        });

        taskItem.querySelector('button:last-child').addEventListener('click', function() {
            taskItem.remove();
            saveData();
        });
    }

    function showTasks() {
        const savedTasks = localStorage.getItem("data");
        if (savedTasks) {
            taskList.innerHTML = savedTasks;
            taskList.querySelectorAll('.taskItem').forEach(function(taskItem) {
                setTaskItemListeners(taskItem);
            });
        }
    }

    addTaskButton.addEventListener('click', function() {
        const taskText = taskInput.value.trim();
        if (taskText !== '') {
            const taskItem = document.createElement('div');
            taskItem.className = 'taskItem';

            const checkmark = document.createElement('div');
            checkmark.className = 'checkmark';

            const taskContent = document.createElement('span');
            taskContent.textContent = taskText;

            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.className = 'editButton';

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';

            taskItem.appendChild(checkmark);
            taskItem.appendChild(taskContent);
            taskItem.appendChild(editButton);
            taskItem.appendChild(deleteButton);

            taskList.appendChild(taskItem);

            setTaskItemListeners(taskItem);

            taskInput.value = '';
            saveData();
        }
    });

    taskInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTaskButton.click();
        }
    });

    clearButton.addEventListener('click', function() {
        taskList.innerHTML = ''; 
        localStorage.removeItem("data"); 
    });

    showTasks();
});




