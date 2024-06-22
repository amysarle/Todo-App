class TodoItem {
    constructor(todoItem) {
        this.id = todoItem.id;
        this.name = todoItem.name;
        this.createdDate = todoItem.createdDate;
        this.dueDate = todoItem.dueDate;
        this.status = todoItem.status;
    }
}

const tmpData = [{
    id: 1,
    name: "Wash Dishes",
    createdDate: dayjs("06/15/24"),
    dueDate: dayjs("06/25/24"),
    status: "Not Started"
},{
    id: 2,
    name: "Do Laundry",
    createdDate: dayjs("06/13/24"),
    dueDate: dayjs("06/25/24"),
    status: "In Progress"
},{
    id: 3,
    name: "Vacuum Floor",
    createdDate: dayjs("06/21/24"),
    dueDate: dayjs("06/26/24"),
    status: "Completed"
}];

export let todoItems;

function loadTodoItems() {
    todoItems = tmpData.map((todoItem) => {
        return new TodoItem(todoItem);
    });
}

loadTodoItems();

/*function saveTodoItems() {

}*/

export function addTodoItem(todoItem) {
    todoItems.push(new TodoItem(todoItem));
}

export function deleteTodoItem(todoItemId) {
    todoItems = todoItems.filter((todoItem) => {
        if(todoItem.id == todoItemId){
            return false;
        }
        return true;
    });
}