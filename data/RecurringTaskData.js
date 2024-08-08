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

    sortItems() {
        this.items = this.items.sort((a, b) => dayjs(a.dueDate) - dayjs(b.dueDate));
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

    getItem(id) {
        let matchingItem;
    
        this.items.forEach((item) => {
            if(item.id == id) {
                matchingItem = item;
            }
        })
    
        return matchingItem;
    }
    
    addItem(item) {
        const id = uuidv4();
    
        if(this.getItem(id)) {
            this.addItem(item);
        }
        else {
            item.id = id;
            this.items.push(new RecurringTask(item));

            this.sortItems();
            this.saveItemsToLocalStorage();
        }
    }
    
    editItem(id, item) {
        this.getItem(id) = new RecurringTask(item);

        this.sortItems();
        this.saveItemsToLocalStorage();
    }
    
    deleteItem(id) {
        this.items = this.items.filter((item) => {
            if(item.id == id){
                return false;
            }
            return true;
        });

        this.sortItems();
        this.saveItemsToLocalStorage();
    }
}

export const recurringTaskList = new RecurringTaskList();
export const frequencyOptions = ["Daily", "Weekly", "Monthly"];