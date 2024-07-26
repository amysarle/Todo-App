import { deleteTodoItem } from "../data/TodoData.js";
import { renderTodoListHTML } from "./TodoList.js";

export function listenDeleteTodoButton(deleteButton) {
    deleteButton.addEventListener('click', () => {
        const todoId = deleteButton.dataset.todoId;
        deleteTodoItem(todoId);
        renderTodoListHTML();
    })
}