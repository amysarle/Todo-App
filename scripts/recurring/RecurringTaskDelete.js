import { recurringTaskList } from "../../data/RecurringTaskData.js";

export function listenDeleteTaskButton(deleteButton) {
    deleteButton.addEventListener('click', () => {
        const id = deleteButton.dataset.id;

        recurringTaskList.deleteItem(id);
        
        window.location.reload();
    });
}