class RecurringTask {
    constructor(itemInfo) {
        this.id = itemInfo.id,
        this.title = itemInfo.title,
        this.description = itemInfo.description,
        this.frequency = itemInfo.frequency,
        this.startDate = itemInfo.startDate,
        this.completedDate = itemInfo.completedDate
    }
}

class RecurringTaskList {
    constructor() {
        this.items = [];
        this.loadItemsFromLocalStorage();
    }

    loadItemsFromLocalStorage() {
        const tmp = JSON.parse(localStorage.getItem("RecurringTaskList"));

        this.items = tmp.map((item) => {
            return new RecurringTask(item);
        });
    }

    saveItemsToLocalStorage() {
        localStorage.setItem("RecurringTaskList", JSON.stringify(this.items));
    }
}

export const recurringTaskList = new RecurringTaskList();
export const frequencyOptions = ["Daily", "Weekly", "Monthly"];