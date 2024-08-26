export const frequencyOptions = ["Daily", "Weekly", "Monthly"];
const frequencyUpdate = ['day', 'week', 'month'];

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

    updateItemList() {
        this.refreshItems();
        this.sortItems();
        this.saveItemsToLocalStorage();
    }

    refreshItems() {
        this.items.forEach((item) => {
            let unit = frequencyUpdate[frequencyOptions.indexOf(item.frequency)];
            let currentDate = dayjs();
            let endDate = dayjs(item.startDate).add(1, unit);
            while (endDate.isBefore(currentDate)) {
                item.startDate = endDate.format("YYYY-MM-DD");
                endDate = dayjs(item.startDate).add(1, unit);
                item.completedDate = '';
            }
        });
    }

    sortItems() {
        this.items = this.items.sort((a, b) => dayjs(a.startDate) - dayjs(b.startDate));
    }

    loadItemsFromLocalStorage() {
        const tmp = JSON.parse(localStorage.getItem("RecurringTaskList"));

        if (tmp) {
            this.items = tmp.map((item) => {
                return new RecurringTask(item);
            });
        }

        else {
            this.items = []
        }

        this.updateItemList();
    }

    saveItemsToLocalStorage() {
        localStorage.setItem("RecurringTaskList", JSON.stringify(this.items));
    }

    getItem(id) {
        let matchingItem;

        this.items.forEach((item) => {
            if (item.id == id) {
                matchingItem = item;
            }
        });

        return matchingItem;
    }

    addItem(item) {
        const id = uuidv4();

        if (this.getItem(id)) {
            this.addItem(item);
        }

        else {
            item.id = id;
            this.items.push(new RecurringTask(item));

            this.updateItemList();
        }
    }

    editItem(id, item) {
        const tmp = this.getItem(id);

        Object.keys(tmp).forEach((key) => {
            tmp[key] = item[key];
        });

        this.updateItemList();
    }

    deleteItem(id) {
        this.items = this.items.filter((item) => {
            if (item.id == id) {
                return false;
            }
            return true;
        });

        this.updateItemList();
    }
}

export const recurringTaskList = new RecurringTaskList();
