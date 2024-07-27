import { addTodoItem } from "../data/TodoData.js";
import { renderTodoListHTML } from "./TodoList.js";
import { statusOptions } from "../data/EnvData.js";

let showAddTodo = false;

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
                ${statusOptions.map((statusOption) => {
                    return `<option value="${statusOption}">${statusOption}</option>`;
                }).join(' ')}
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

listenAddTodoButton();