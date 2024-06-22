class TodoItem {
    constructor(todoItem) {
        this.id = todoItem.id;
        this.name = todoItem.name;
        this.createdDate = todoItem.createdDate;
        this.dueDate = todoItem.dueDate;
        this.status = todoItem.status;
    }
}

export let todoItems;

function loadTodoItems() {
    todoItems = JSON.parse(localStorage.getItem('todoItems'));

    todoItems = todoItems.map((todoItem) => {
        return new TodoItem(todoItem);
    });

    if(todoItems.length == 0) {
        todoItems = tmpData.map((todoItem) => {
            return new TodoItem(todoItem);
        });
    }
}

function saveTodoItems() {
    localStorage.setItem('todoItems', 
        JSON.stringify(todoItems)
    )
}

export function getTodoItem(todoItemId) {
    let matchingTodoItem;

    todoItems.forEach((todoItem) => {
        if(todoItem.id == todoItemId) {
            matchingTodoItem = todoItem;
        }
    })

    return matchingTodoItem;
}

export function addTodoItem(todoItem) {
    //TODO: Add id creation UUID
    const id = 4;
    todoItem.id = id;

    todoItems.push(new TodoItem(todoItem));
    saveTodoItems();
}

export function editTodoItem(todoItem) {
    todoItems = todoItems.map((todoItemTmp) => {
        if(todoItem.id == todoItemTmp.id) {
            return todoItem;
        } else {
            return todoItemTmp;
        }
    });
    saveTodoItems();
}

export function deleteTodoItem(todoItemId) {
    todoItems = todoItems.filter((todoItem) => {
        if(todoItem.id == todoItemId){
            return false;
        }
        return true;
    });
    saveTodoItems();
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

loadTodoItems();