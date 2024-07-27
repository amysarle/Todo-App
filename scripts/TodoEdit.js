import { editTodoItem, getTodoItem } from "../data/TodoData.js";
import { renderTodoListHTML } from "./TodoList.js";
import { statusOptions } from "../data/EnvData.js";

let showEditTodo = false;
let currentEditId = '';

export function listenEditTodoButton(editButton) {
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
                ${statusOptions.map((statusOption) => {
                    return (`<option value="${statusOption}" ${todoItem.status != statusOption || "selected"}>${statusOption}</option>`);
                })}
            </select><br>

            <input type="submit" value="Submit" name="submit" data-todo-id=${todoItem.id}>

            <input type="button" value="Cancel" class="js-edit-todo-cancel-button">
        </fieldset>
    `;

    if(showEditTodo) {
        editTodoElement.innerHTML = editTodoHTML;

        editTodoElement.addEventListener('submit', listenSubmitEditTodoButton);

        const editTodoCancelButton = document.querySelector('.js-edit-todo-cancel-button');
        editTodoCancelButton.addEventListener('click', () => {
            showEditTodo = !showEditTodo;
            renderEditTodoHTML({});
        });
    } else {
        editTodoElement.innerHTML = '';
    } 
}