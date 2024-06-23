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
    const id = uuidv4();

    if(getTodoItem(id)) {
        addTodoItem(todoItem);
    }

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

loadTodoItems();