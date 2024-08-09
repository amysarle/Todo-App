import { recurringTaskList, frequencyOptions } from "../../data/RecurringTaskData.js";
import { listenEditTaskButton } from "./RecurringTaskEdit.js";
import { listenDeleteTaskButton } from "./RecurringTaskDelete.js";

function renderRecurringTaskList() {
    const recurringTaskListContainer = document.querySelector('.js-task-list');

    let recurringTaskListContainerHTML = '';

    frequencyOptions.forEach((frequencyOption, index) => {
        recurringTaskListContainerHTML += `<div class="column" id="js-frequency-${index}"><h2>${frequencyOption}</h2></div>`;
    });

    recurringTaskListContainer.innerHTML = recurringTaskListContainerHTML;
    recurringTaskListContainer.style.gridTemplateColumns = `repeat(${frequencyOptions.length}, 1fr)`;

    recurringTaskList.items.forEach((recurringTaskItem) => {
        const recurringTaskListColumn = document.getElementById(`js-frequency-${frequencyOptions.indexOf(recurringTaskItem.frequency)}`);

        let recurringTaskListCardHTML = `
            <div class="task">
                <input type="checkbox">
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
                        <span>Created: ${recurringTaskItem.startDate}</span>
                        <span>Due: ${recurringTaskItem.completedDate}</span>
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
}

renderRecurringTaskList();