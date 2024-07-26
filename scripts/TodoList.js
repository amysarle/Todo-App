import { todoItems } from "../data/TodoData.js";
import { listenEditTodoButton } from "./TodoEdit.js";
import { listenDeleteTodoButton } from "./TodoDelete.js";

export function renderTodoListHTML() {
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
        listenEditTodoButton(editButton);
    })

    const deleteButtons = document.querySelectorAll('.js-todo-delete-button');
    deleteButtons.forEach((deleteButton) => {
        listenDeleteTodoButton(deleteButton)
    })
}

renderTodoListHTML();