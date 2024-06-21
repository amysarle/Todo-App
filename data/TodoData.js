class TodoItem {
    name;
    createdDate;
    dueDate;
    status;

    constructor(todoItem) {
        this.name = todoItem.name;
        this.createdDate = todoItem.createdDate;
        this.dueDate = todoItem.dueDate;
        this.status = todoItem.status;
    }
}

const tmpData = [{
    name: "Wash Dishes",
    createdDate: Date(),
    dueDate: Date(),
    status: "Not Started"
},{
    name: "Do Laundry",
    createdDate: Date(),
    dueDate: Date(),
    status: "In Progress"
},{
    name: "Vacuum Floor",
    createdDate: Date(),
    dueDate: Date(),
    status: "Completed"
}];

export const todoItems = tmpData.map((todoItem) => {
    return new TodoItem(todoItem);
});