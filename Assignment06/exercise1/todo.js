"use strict";

import { getToDoButton, getToDoInputTextBox, getToDoList, getForm } from "./getters.js";
import { addToList } from "./listUtils.js";

let form = getForm();
let button = getToDoButton();
let inputTextBox = getToDoInputTextBox();
let todoList = getToDoList();

button.setAttribute("type", "submit");

form.onsubmit = (event) => {
    event.preventDefault();
    let value = inputTextBox.value;
    if (value !== ""){
        addToList(value, todoList);
        inputTextBox.value = "";
    }
}

todoList.onclick = (event) => {
    let item = event.target;
    item.classList.toggle("done");
};

todoList.ondblclick = (event) => {
    let item = event.target;
    item.remove();
}