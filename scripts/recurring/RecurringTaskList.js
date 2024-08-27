import { recurringTaskList, frequencyOptions } from "../../data/RecurringTaskData.js";
import { listenEditTaskButton } from "./RecurringTaskEdit.js";
import { listenDeleteTaskButton } from "./RecurringTaskDelete.js";
import { listenCheckbox } from "./RecurringTaskCheckbox.js";

function renderRecurringTaskList() {
    const recurringTaskListContainer = document.querySelector('.js-task-list');

    let recurringTaskListContainerHTML = '';

    frequencyOptions.forEach((frequencyOption, index) => {
        recurringTaskListContainerHTML += `<div class="column" id="js-frequency-${index}"><h2>${frequencyOption}</h2></div>`;
    });

    recurringTaskListContainer.innerHTML = recurringTaskListContainerHTML;

    recurringTaskList.items.forEach((recurringTaskItem) => {
        const recurringTaskListColumn = document.getElementById(`js-frequency-${frequencyOptions.indexOf(recurringTaskItem.frequency)}`);

        let recurringTaskListCardHTML = `
            <div class="task">
                <input class="js-completed-checkbox" data-id=${recurringTaskItem.id} type="checkbox" ${recurringTaskItem.completedDate ? 'checked' : ''}>
                <div class="card">
                    <div class="card-header">
                        <h3>${recurringTaskItem.title}</h3>
                        <div class="card-header-icons">
                            <button class="js-edit-task-button" data-id=${recurringTaskItem.id}>
                                <img src="images/edit-icon.svg" alt="Edit" class="card-header-icon"/>
                            </button>
                            <button class="js-delete-task-button" data-id=${recurringTaskItem.id}>
                                <img src="images/delete-icon.svg" alt="Delete" class="card-header-icon"/>
                            </button>
                        </div>
                    </div>
                    <p class="card-description">${recurringTaskItem.description}</p>
                    <div class="card-info">
                        <span>Start: ${recurringTaskItem.startDate}</span>
                        <span>Completed: ${recurringTaskItem.completedDate}</span>
                    </div>
                </div>
            </div>
        `;

        recurringTaskListColumn.innerHTML += recurringTaskListCardHTML;
    });

    const editButtons = document.querySelectorAll('.js-edit-task-button');
    editButtons.forEach((editButton) => {
        listenEditTaskButton(editButton);
    });

    const deleteButtons = document.querySelectorAll('.js-delete-task-button');
    deleteButtons.forEach((deleteButton) => {
        listenDeleteTaskButton(deleteButton);
    });

    const checkboxes = document.querySelectorAll(".js-completed-checkbox");
    checkboxes.forEach((checkbox) => {
        listenCheckbox(checkbox);
    });
}

renderRecurringTaskList();