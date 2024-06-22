import { todoItems, addTodoItem, deleteTodoItem } from "../data/todoData.js"

let showAddTodo = false;

function listenAddTodoButton() {
    showAddTodo = !showAddTodo;
    renderAddTodoHTML();
}

function listenSubmitAddTodoButton(event) {
    event.preventDefault();
    console.log('submitted');
}

function renderAddTodoHTML() {
    const addTodoButton = document.querySelector('.js-add-todo-button');

    addTodoButton.addEventListener('click', listenAddTodoButton);

    const addTodoElement = document.querySelector('.js-add-todo');

    const addTodoHTML = `
        <label for="name">Name:</label><br>
        <input type="text" id="name" name="name"><br>

        <label for="createdDate">Created Date:</label><br>
        <input type="date" id="createdDate" name="createdDate" value=${dayjs().format("YYYY-MM-DD")}><br>

        <label for="dueDate">Due Date:</label><br>
        <input type="date" id="dueDate" name="dueDate" value=${dayjs().add(1, 'day').format("YYYY-MM-DD")}><br>

        <label for="status">Status:</label><br>
        <select name="status" id="status">
            <option value="Not Started" selected>Not Started</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
        </select><br>

        <input type="submit" value="Submit">
    `;

    if (showAddTodo) {
        addTodoElement.innerHTML = addTodoHTML;

        addTodoElement.addEventListener('submit', listenSubmitAddTodoButton);
    } else {
        addTodoElement.innerHTML = '';
    }
}

function renderTodoListHTML() {
    const todoTable = document.querySelector('.js-todo-table');

    let todoHTML = '';

    todoHTML += `
        <tr>
            <th>Name</th>
            <th>Created Date</th>
            <th>Due Date</th>
            <th>Status</th>
            <th>Edit</th>
            <th>Delete</th>
        </tr>
        `;

    todoItems.forEach((todoItem) => {
        todoHTML += `
            <tr class=js-todo-item-${todoItem.id}>
                <td>${todoItem.name}</td>
                <td>${dayjs(todoItem.createdDate).format('MM/DD/YY')}</td>
                <td>${dayjs(todoItem.dueDate).format('MM/DD/YY')}</td>
                <td>${todoItem.status}</td>
                <td><button>Edit</button></td>
                <td><button class=js-todo-delete-button data-todo-id=${todoItem.id}>Delete</button></td>
            </tr>
        `;
    });

    todoTable.innerHTML = todoHTML;

    const deleteButtons = document.querySelectorAll('.js-todo-delete-button');

    deleteButtons.forEach((deleteButton) => {
        deleteButton.addEventListener('click', () => {
            const todoId = deleteButton.dataset.todoId;
            deleteTodoItem(todoId);
            renderTodoListHTML();
        })
    })
}

renderAddTodoHTML();
renderTodoListHTML();

/*
<input list="statuses" name="status" value="Not Started">
        <datalist id="statuses">
            <option value="Not Started">
            <option value="In Progress">
            <option value="Completed">
        </datalist>
*/