import { recurringTaskList } from "../../data/RecurringTaskData.js";

export function listenCheckbox(checkbox) {
    checkbox.addEventListener('change', () => {
        const id = checkbox.dataset.id;
        const taskItem = recurringTaskList.getItem(id);

        if (checkbox.checked) {
            taskItem.completedDate = dayjs().format("YYYY-MM-DD");
        }

        else {
            taskItem.completedDate = '';
        }

        recurringTaskList.editItem(id, taskItem);

        window.location.reload();
    })
}