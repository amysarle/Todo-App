import { todoItems, addTodoItem, deleteTodoItem } from "../data/todoData.js"

function renderTodoHTML() {
    const todoTable = document.querySelector(".js-todo-table");

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
            renderTodoHTML();
        })
    })
}

renderTodoHTML();