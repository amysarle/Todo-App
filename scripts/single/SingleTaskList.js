import { singleTaskList, statusOptions } from "../../data/SingleTaskData.js";
import { listenEditTaskButton } from "./SingleTaskEdit.js";
import { listenDeleteTaskButton } from "./SingleTaskDelete.js";

function renderSingleTaskList() {
    const singleTaskListContainer = document.querySelector('.js-task-list');

    let singleTaskListContainerHTML = '';

    statusOptions.forEach((statusOption, index) => {
        singleTaskListContainerHTML += `<div class="column js-drop-element" id="js-status-${index}"><h2>${statusOption}</h2></div>`;
    });

    singleTaskListContainer.innerHTML = singleTaskListContainerHTML;

    singleTaskList.items.forEach((singleTaskItem) => {
        const singleTaskListColumn = document.getElementById(`js-status-${statusOptions.indexOf(singleTaskItem.status)}`);

        let singleTaskListCardHTML = `
            <div class="card js-drag-element" draggable="true" data-id=${singleTaskItem.id}>
                <div class="card-header">
                    <h3>${singleTaskItem.title}</h3>
                    <div class="card-header-icons">
                        <button class="js-edit-task-button" data-id=${singleTaskItem.id}>
                            <img src="images/edit-icon.svg" alt="Edit" class="card-header-icon"/>
                        </button>
                        <button  class="js-delete-task-button" data-id=${singleTaskItem.id}>
                            <img src="images/delete-icon.svg" alt="Delete" class="card-header-icon"/>
                        </button>
                    </div>
                </div>
                <p class="card-description">${singleTaskItem.description}</p>
                <div class="card-info">
                    <span>Created: ${singleTaskItem.createdDate}</span>
                    <span>Due: ${singleTaskItem.dueDate}</span>
                </div>
            </div>
        `;

        singleTaskListColumn.innerHTML += singleTaskListCardHTML;
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

renderSingleTaskList();