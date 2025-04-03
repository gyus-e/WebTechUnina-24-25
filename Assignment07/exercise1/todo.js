"use strict";

import { getToDoButton, getToDoInputTextBox, getToDoList, getForm } from "./getters.js";
import { addToList } from "./listUtils.js";

let form = getForm();
let button = getToDoButton();
let inputTextBox = getToDoInputTextBox();
let todoList = getToDoList();
let i = 0;

button.setAttribute("type", "submit");

form.onsubmit = (event) => {
    event.preventDefault();
    let value = inputTextBox.value;
    if (value !== ""){
        addToList(todoList, i, value);
        localStorage.setItem(i, JSON.stringify({"value": value, "done": false}));
        inputTextBox.value = "";
        i++;
    }
}

todoList.onclick = (event) => {
    let target = event.target;
    target.classList.toggle("done");
    localStorage.setItem(target.id, JSON.stringify({"value": target.textContent, "done": target.classList.contains("done")}));
};

todoList.ondblclick = (event) => {
    let target = event.target;
    target.remove();
    localStorage.removeItem(target.id);
}

for (let object in localStorage){
    let item = JSON.parse(localStorage[object]);
    addToList(todoList, object, item.value, item.done);
    i++;
}
