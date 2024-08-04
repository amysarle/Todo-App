import { recurringTaskList, frequencyOptions } from "../../data/RecurringTaskData.js";

function renderRecurringTaskList() {
    const recurringTaskListContainer = document.querySelector('.container');

    let recurringTaskListContainerHTML = '';

    frequencyOptions.forEach((frequencyOption, index) => {
        recurringTaskListContainerHTML += `<div class="column js-frequency-${index}"><h2>${frequencyOption}</h2></div>`;
    })

    recurringTaskListContainer.innerHTML = recurringTaskListContainerHTML;
    recurringTaskListContainer.style.gridTemplateColumns = `repeat(${frequencyOptions.length}, 1fr)`;

    recurringTaskList.items.forEach((recurringTaskItem) => {
        const recurringTaskListColumn = document.querySelector(`.js-frequency-${frequencyOptions.indexOf(recurringTaskItem.frequency)}`);

        let recurringTaskListCardHTML = `
            <div class="task">
                <input type="checkbox">
                <div class="card">
                    <div class="card-header">
                        <h3>${recurringTaskItem.title}</h3>
                        <div class="card-header-icons">
                            <img src="images/edit-icon.svg" alt="Edit" class="card-header-icon"/>
                            <img src="images/delete-icon.svg" alt="Delete" class="card-header-icon"/>
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
    })
}

renderRecurringTaskList();