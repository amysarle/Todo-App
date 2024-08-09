import { recurringTaskList, frequencyOptions } from "../../data/RecurringTaskData.js";

export function listenEditTaskButton(editTaskButton) {
    editTaskButton.addEventListener('click', () => {
        const id = editTaskButton.dataset.id;

        const taskItem = recurringTaskList.getItem(id);

        document.getElementById("id").value = taskItem.id;
        document.getElementById("title").value = taskItem.title;
        document.getElementById("description").value = taskItem.description;
        document.getElementById("frequency").value = taskItem.frequency;
        document.getElementById("startDate").value = taskItem.startDate;
        document.getElementById("completedDate").value = taskItem.completedDate;

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
            frequency: event.target.frequency.value,
            startDate: event.target.startDate.value,
            completedDate: event.target.completedDate.value
        }

        recurringTaskList.editItem(event.target.id.value, taskItem);

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

                <label for="frequency">Frequency: *</label>
                <select id="frequency" name="frequency" required>
                    ${frequencyOptions.map((frequencyOption) => {
                        return `<option value="${frequencyOption}">${frequencyOption}</option>`;
                    }).join(' ')}
                </select>

                <label for="startDate">Start Date: *</label>
                <input type="date" id="startDate" name="startDate" required>

                <label for="completedDate">Completed Date:</label>
                <input type="date" id="completedDate" name="completedDate">

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