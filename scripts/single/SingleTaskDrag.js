import { singleTaskList, statusOptions } from "../../data/SingleTaskData.js";

function listenDragElements() {
    const dragElements = document.querySelectorAll(".js-drag-element");

    dragElements.forEach((dragElement) => {
        dragElement.addEventListener('dragstart', (event) => {
            const id = dragElement.dataset.id;

            event.dataTransfer.setData("id", id);
        });
    });
}

function listenDropElements() {
    const dropElements = document.querySelectorAll(".js-drop-element");

    dropElements.forEach((dropElement) => {
        dropElement.addEventListener('dragover', (event) => {
            event.preventDefault();

            dropElement.classList.add('column-dragover');
        });
    });

    dropElements.forEach((dropElement) => {
        dropElement.addEventListener('dragleave', (event) => {
            dropElement.classList.remove('column-dragover');
        });
    });

    dropElements.forEach((dropElement) => {
        dropElement.addEventListener('drop', (event) => {
            event.preventDefault();

            const id = event.dataTransfer.getData("id");
            const taskItem = singleTaskList.getItem(id);

            const closestDropElement = event.target.closest(".js-drop-element");
            const status = statusOptions[closestDropElement.id.split('-')[2]];
            taskItem.status = status;

            singleTaskList.editItem(id, taskItem);

            window.location.reload();
        });
    });
}

listenDragElements();
listenDropElements();