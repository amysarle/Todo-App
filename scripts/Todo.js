import { todoItems } from "../data/todoData.js"

function renderTodoHTML() {
    const todoTable = document.querySelector(".js-todo-table");

    let todoHTML = '';

    todoHTML += `
        <tr>
            <th>Name</th>
            <th>Created Date</th>
            <th>Due Date</th>
            <th>Status</th>
        </tr>
        `;

    todoItems.forEach((todoItem) => {
        todoHTML += `
            <tr>
                <td>${todoItem.name}</td>
                <td>${todoItem.createdDate}</td>
                <td>${todoItem.dueDate}</td>
                <td>${todoItem.status}</td>
            </tr>
        `;
    });

    todoTable.innerHTML = todoHTML;
}

renderTodoHTML();
