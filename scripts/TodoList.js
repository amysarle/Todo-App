import { todoItems } from "../data/TodoData.js";
import { listenEditTodoButton } from "./TodoEdit.js";
import { listenDeleteTodoButton } from "./TodoDelete.js";
import { statusOptions } from "../data/EnvData.js";

export function renderTodoListHTML() {
    const todoList = document.querySelector('.js-todo-list');

    let todoListHTML = '';

    statusOptions.forEach((statusOption) => {
        todoListHTML += `<div class="js-todo-status-section-${statusOptions.indexOf(statusOption)}">${statusOption}</div>`;
    })

    todoList.innerHTML = todoListHTML;
    todoList.style.gridTemplateColumns = `repeat(${statusOptions.length}, 1fr)`;

    todoItems.forEach((todoItem) => {
        const todoListStatus = document.querySelector(`.js-todo-status-section-${statusOptions.indexOf(todoItem.status)}`);

        let todoListStatusHTML = `
            <div class="todo-item">
                <p>${todoItem.name}</p>
                <p>${todoItem.createdDate}</p>
                <p>${todoItem.dueDate}</p>
                <p>${todoItem.status}</p>
                <button class=js-todo-edit-button data-todo-id=${todoItem.id}>Edit</button>
                <button class=js-todo-delete-button data-todo-id=${todoItem.id}>Delete</button>
            </div>
        `;

        todoListStatus.innerHTML += todoListStatusHTML;

    })



    /*todoHTML += `
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
    });*/

    const editButtons = document.querySelectorAll('.js-todo-edit-button');
    editButtons.forEach((editButton) => {
        listenEditTodoButton(editButton);
    })

    const deleteButtons = document.querySelectorAll('.js-todo-delete-button');
    deleteButtons.forEach((deleteButton) => {
        listenDeleteTodoButton(deleteButton)
    })
}

renderTodoListHTML();