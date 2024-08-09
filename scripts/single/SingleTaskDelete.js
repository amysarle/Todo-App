import { singleTaskList } from "../../data/SingleTaskData.js";

export function listenDeleteTaskButton(deleteButton) {
    deleteButton.addEventListener('click', () => {
        const id = deleteButton.dataset.id;

        singleTaskList.deleteItem(id);
        
        window.location.reload();
    });
}