import { singleTaskList, statusOptions } from "../../data/SingleTaskData.js";
import { listenEditTaskButton } from "./SingleTaskEdit.js";

function renderSingleTaskList() {
    const singleTaskListContainer = document.querySelector('.js-task-list');

    let singleTaskListContainerHTML = '';

    statusOptions.forEach((statusOption, index) => {
        singleTaskListContainerHTML += `<div class="column js-status-${index}"><h2>${statusOption}</h2></div>`;
    })

    singleTaskListContainer.innerHTML = singleTaskListContainerHTML;
    singleTaskListContainer.style.gridTemplateColumns = `repeat(${statusOptions.length}, 1fr)`;

    singleTaskList.items.forEach((singleTaskItem) => {
        const singleTaskListColumn = document.querySelector(`.js-status-${statusOptions.indexOf(singleTaskItem.status)}`);

        let singleTaskListCardHTML = `
            <div class="card">
                <div class="card-header">
                    <h3>${singleTaskItem.title}</h3>
                    <div class="card-header-icons">
                        <button class="js-edit-task-button" data-task-id=${singleTaskItem.id}>
                            <img src="images/edit-icon.svg" alt="Edit" class="card-header-icon"/>
                        </button>
                        <button>
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
    })

    const editButtons = document.querySelectorAll('.js-edit-task-button');
    editButtons.forEach((editButton) => {
        listenEditTaskButton(editButton);
    })
}

renderSingleTaskList();