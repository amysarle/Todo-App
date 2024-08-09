import { singleTaskList, statusOptions } from "../../data/SingleTaskData.js";

export function listenEditTaskButton(editTaskButton) {
    editTaskButton.addEventListener('click', () => {
        const id = editTaskButton.dataset.id;

        const taskItem = singleTaskList.getItem(id);

        document.getElementById("id").value = taskItem.id;
        document.getElementById("title").value = taskItem.title;
        document.getElementById("description").value = taskItem.description;
        document.getElementById("status").value = taskItem.status;
        document.getElementById("createdDate").value = taskItem.createdDate;
        document.getElementById("dueDate").value = taskItem.dueDate;

        showEditTaskPopup();
    });
}

function listenClosePopupButton() {
    const closePopupButton = document.querySelector('.js-close-popup-button');

    closePopupButton.addEventListener('click', () => {
        hideEditTaskPopup();
    });
}

function listenSubmitFormButton() {
    const editTaskElement = document.querySelector('.js-edit-task-popup');

    editTaskElement.addEventListener('submit', (event) => {
        event.preventDefault();

        const taskItem = {
            id: event.target.id.value,
            title: event.target.title.value,
            description: event.target.description.value,
            status: event.target.status.value,
            createdDate: event.target.createdDate.value,
            dueDate: event.target.dueDate.value
        }

        singleTaskList.editItem(event.target.id.value, taskItem);

        window.location.reload();
    });
}

function renderEditTaskHTML() {
    const editTaskElement = document.querySelector('.js-edit-task-popup');

    const editTaskHTML = `
        <div class="popup-container">
            <div class="popup-header">
                <h2>Edit Task</h2>
                <button class="js-close-popup-button">
                    <img src="images/close-icon.svg" alt="x"/>
                </button>
            </div>
            <form>
                <input type="hidden" id="id" name="id" required>

                <label for="title">Title: *</label>
                <input type="text" id="title" name="title" value="" required>

                <label for="description">Description:</label>
                <textarea id="description" name="description"></textarea>

                <label for="status">Status: *</label>
                <select id="status" name="status" required>
                    ${statusOptions.map((statusOption) => {
                        return `<option value="${statusOption}">${statusOption}</option>`;
                    }).join(' ')}
                </select>

                <label for="createdDate">Created Date: *</label>
                <input type="date" id="createdDate" name="createdDate" required>

                <label for="dueDate">Due Date: *</label>
                <input type="date" id="dueDate" name="dueDate" required>

                <button type="submit">Edit Task</button>
            </form>
        </div>
    `;

    editTaskElement.innerHTML = editTaskHTML;
}

function showEditTaskPopup() {
    const editTaskElement = document.querySelector('.js-edit-task-popup');
    editTaskElement.style.display = 'flex';
}

function hideEditTaskPopup() {
    const editTaskElement = document.querySelector('.js-edit-task-popup');
    editTaskElement.style.display = 'none';
}

renderEditTaskHTML();
listenClosePopupButton();
listenSubmitFormButton();