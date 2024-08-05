import { statusOptions } from "../../data/SingleTaskData.js";

function listenAddTaskButton() {
    const addTaskButton = document.querySelector('.js-add-task-button');

    addTaskButton.addEventListener('click', () => {
        showAddTaskPopup();
    })
}

function renderAddTaskHTML() {
    const addTaskElement = document.querySelector('.js-add-task');

    const addTaskHTML = `
        <div class="popup">
            <div class="popup-header">
                <h2>Add Task</h2>
                <img src="images/close-icon.svg" alt="x" class="close-btn js-close-popup-button"/>
            </div>
            <form id="addTaskForm">
                <label for="taskTitle">Title:</label>
                <input type="text" id="taskTitle" name="taskTitle" required>

                <label for="taskDescription">Description:</label>
                <textarea id="taskDescription" name="taskDescription" required></textarea>

                <label for="taskStatus">Status:</label>
                <select id="taskStatus" name="taskStatus">
                    ${statusOptions.map((statusOption) => {
                        return `<option value="${statusOption}">${statusOption}</option>`;
                    }).join(' ')}
                </select>

                <label for="taskCreatedDate">Created Date:</label>
                <input type="date" id="createdDate" name="createdDate" value=${dayjs().format("YYYY-MM-DD")} required>

                <label for="taskDueDate">Due Date:</label>
                <input type="date" id="dueDate" name="dueDate" value=${dayjs().add(1, 'day').format("YYYY-MM-DD")} required>

                <button type="submit">Add Task</button>
            </form>
        </div>
    `;

    addTaskElement.innerHTML = addTaskHTML;

    const closePopupButton = document.querySelector('.js-close-popup-button');
    closePopupButton.addEventListener('click', () => {
        hideAddTaskPopup();
    })
}

function showAddTaskPopup() {
    const addTaskElement = document.querySelector('.js-add-task');
    addTaskElement.style.display = 'flex';
}

function hideAddTaskPopup() {
    const addTaskElement = document.querySelector('.js-add-task');
    addTaskElement.style.display = 'none';
}

listenAddTaskButton();
renderAddTaskHTML();