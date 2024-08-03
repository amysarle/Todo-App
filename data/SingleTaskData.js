class SingleTask {
    constructor(itemInfo) {
        this.id = itemInfo.id,
        this.title = itemInfo.title,
        this.description = itemInfo.description,
        this.status = itemInfo.status,
        this.createdDate = itemInfo.createdDate,
        this.dueDate = itemInfo.dueDate,
        this.priority = itemInfo.priority
    }
}

class SingleTaskList {
    constructor() {
        this.items = []
        this.loadItemsFromLocalStorage();
    }

    loadItemsFromLocalStorage() {
        const tmp = JSON.parse(localStorage.getItem("SingleTaskList"));

        this.items = tmp.map((item) => {
            return new SingleTask(item);
        });
    }

    saveItemsToLocalStorage() {
        localStorage.setItem("SingleTaskList", JSON.stringify(this.items));
    }
}

export const singleTaskList = new SingleTaskList();
export const statusOptions = ["Not Started", "In Progress", "Completed"];
export const priorityOptions = ["Low", "Medium", "High"];