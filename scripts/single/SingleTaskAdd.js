import { singleTaskList, statusOptions } from "../../data/SingleTaskData.js";

function listenAddTaskButton() {
    const addTaskButton = document.querySelector('.js-add-task-button');

    addTaskButton.addEventListener('click', () => {
        showAddTaskPopup();
    });
}

function listenClosePopupButton() {
    const closePopupButton = document.querySelector('.js-close-popup-button');

    closePopupButton.addEventListener('click', () => {
        hideAddTaskPopup();
    });
}

function listenSubmitFormButton() {
    const addTaskElement = document.querySelector('.js-add-task');

    addTaskElement.addEventListener('submit', (event) => {
        event.preventDefault();

        const taskItem = {
            title: event.target.title.value,
            description: event.target.description.value,
            status: event.target.status.value,
            createdDate: event.target.createdDate.value,
            dueDate: event.target.dueDate.value
        }

        singleTaskList.addItem(taskItem);

        window.location.reload();
    });
}

function renderAddTaskHTML() {
    const addTaskElement = document.querySelector('.js-add-task');

    const addTaskHTML = `
        <div class="popup">
            <div class="popup-header">
                <h2>Add Task</h2>
                <button class="js-close-popup-button">
                    <img src="images/close-icon.svg" alt="x"/>
                </button>
            </div>
            <form>
                <label for="title">Title:</label>
                <input type="text" id="title" name="title" required>

                <label for="description">Description:</label>
                <textarea id="description" name="description" required></textarea>

                <label for="status">Status:</label>
                <select id="status" name="status">
                    ${statusOptions.map((statusOption) => {
                        return `<option value="${statusOption}">${statusOption}</option>`;
                    }).join(' ')}
                </select>

                <label for="createdDate">Created Date:</label>
                <input type="date" id="createdDate" name="createdDate" value=${dayjs().format("YYYY-MM-DD")} required>

                <label for="dueDate">Due Date:</label>
                <input type="date" id="dueDate" name="dueDate" value=${dayjs().add(1, 'day').format("YYYY-MM-DD")} required>

                <button type="submit">Add Task</button>
            </form>
        </div>
    `;

    addTaskElement.innerHTML = addTaskHTML;
}

function showAddTaskPopup() {
    const addTaskElement = document.querySelector('.js-add-task');
    addTaskElement.style.display = 'flex';
}

function hideAddTaskPopup() {
    const addTaskElement = document.querySelector('.js-add-task');
    addTaskElement.style.display = 'none';
}

renderAddTaskHTML();
listenAddTaskButton();
listenClosePopupButton();
listenSubmitFormButton();