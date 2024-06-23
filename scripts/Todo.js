import { todoItems, getTodoItem, addTodoItem, editTodoItem, deleteTodoItem } from "../data/todoData.js"

let showAddTodo = false;
let showEditTodo = false;
let currentEditId = '';

function listenAddTodoButton() {
    const addTodoButton = document.querySelector('.js-add-todo-button');

    addTodoButton.addEventListener('click', () => {
        showAddTodo = !showAddTodo;
        renderAddTodoHTML();
    });
}

function listenSubmitAddTodoButton(event) {
    event.preventDefault();
    
    const todoItem = {
        name: event.target.name.value,
        createdDate: event.target.createdDate.value,
        dueDate: event.target.dueDate.value,
        status: event.target.status.value
    }

    addTodoItem(todoItem);

    showAddTodo = false;
    renderAddTodoHTML();

    renderTodoListHTML();
}

function listenSubmitEditTodoButton(event) {
    event.preventDefault();

    const todoItem = {
        id: event.target.submit.dataset.todoId,
        name: event.target.name.value,
        createdDate: event.target.createdDate.value,
        dueDate: event.target.dueDate.value,
        status: event.target.status.value
    }

    editTodoItem(todoItem);

    showEditTodo = false;
    currentEditId = '';
    renderEditTodoHTML({});

    renderTodoListHTML();
}

function renderAddTodoHTML() {
    const addTodoElement = document.querySelector('.js-add-todo');

    const addTodoHTML = `
        <fieldset>
            <legend>Add Todo</legend>
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
            <input type="button" value="Cancel" class="js-add-todo-cancel-button">
        </fieldset>
    `;

    if (showAddTodo) {
        addTodoElement.innerHTML = addTodoHTML;

        addTodoElement.addEventListener('submit', listenSubmitAddTodoButton);

        const addTodoCancelButton = document.querySelector('.js-add-todo-cancel-button');
        addTodoCancelButton.addEventListener('click', () => {
            showAddTodo = !showAddTodo;
            renderAddTodoHTML();
        });
    } else {
        addTodoElement.innerHTML = '';
    }
}

function renderEditTodoHTML(todoItem) {
    const editTodoElement = document.querySelector('.js-edit-todo');

    const editTodoHTML = `
        <fieldset>
            <legend>Edit Todo</legend>
            <label for="name">Name:</label><br>
            <input type="text" id="name" name="name" value="${todoItem.name}"><br>

            <label for="createdDate">Created Date:</label><br>
            <input type="date" id="createdDate" name="createdDate" value=${dayjs(todoItem.createdDate).format("YYYY-MM-DD")}><br>

            <label for="dueDate">Due Date:</label><br>
            <input type="date" id="dueDate" name="dueDate" value=${dayjs(todoItem.dueDate).format("YYYY-MM-DD")}><br>

            <label for="status">Status:</label><br>
            <select name="status" id="status">
                <option value="Not Started" ${todoItem.status != "Not Started" || "selected"}>Not Started</option>
                <option value="In Progress" ${todoItem.status != "In Progress" || "selected"}>In Progress</option>
                <option value="Completed" ${todoItem.status != "Completed" || "selected"}>Completed</option>
            </select><br>

            <input type="submit" value="Submit" name="submit" data-todo-id=${todoItem.id}>
        </fieldset>
    `;

    if(showEditTodo) {
        editTodoElement.innerHTML = editTodoHTML;

        editTodoElement.addEventListener('submit', listenSubmitEditTodoButton);
    } else {
        editTodoElement.innerHTML = '';
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
                <td><button class=js-todo-edit-button data-todo-id=${todoItem.id}>Edit</button></td>
                <td><button class=js-todo-delete-button data-todo-id=${todoItem.id}>Delete</button></td>
            </tr>
        `;
    });

    todoTable.innerHTML = todoHTML;

    const editButtons = document.querySelectorAll('.js-todo-edit-button');

    editButtons.forEach((editButton) => {
        editButton.addEventListener('click', () => {
            const todoId = editButton.dataset.todoId;

            const todoItem = getTodoItem(todoId);

            if (currentEditId == todoId) {
                showEditTodo = false;
                currentEditId = '';
            } else {
                showEditTodo = true;
                currentEditId = todoId;
            }
            renderEditTodoHTML(todoItem);
        })
    })

    const deleteButtons = document.querySelectorAll('.js-todo-delete-button');

    deleteButtons.forEach((deleteButton) => {
        deleteButton.addEventListener('click', () => {
            const todoId = deleteButton.dataset.todoId;
            deleteTodoItem(todoId);
            renderTodoListHTML();
        })
    })
}

listenAddTodoButton();
renderTodoListHTML();