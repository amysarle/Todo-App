class SingleTask {
    constructor(itemInfo) {
        this.id = itemInfo.id,
        this.title = itemInfo.title,
        this.description = itemInfo.description,
        this.status = itemInfo.status,
        this.createdDate = itemInfo.createdDate,
        this.dueDate = itemInfo.dueDate
    }
}

class SingleTaskList {
    constructor() {
        this.items = [];
        this.loadItemsFromLocalStorage();
    }

    sortItems() {
        this.items = this.items.sort((a, b) => dayjs(a.dueDate) - dayjs(b.dueDate));
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
            this.items.push(new SingleTask(item));

            this.sortItems();
            this.saveItemsToLocalStorage();
        }
    }
    
    editItem(id, item) {
        this.getItem(id) = new SingleTask(item);

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

export const singleTaskList = new SingleTaskList();
export const statusOptions = ["Not Started", "In Progress", "Completed"];