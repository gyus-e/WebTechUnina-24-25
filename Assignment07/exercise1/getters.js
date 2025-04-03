"use strict";

export function getToDoButton(){
    let button = document.getElementById("todo-add-button");
    checkNotNull(button, "No button found with id 'todo-add-button'");
    return button;
}

export function getToDoInputTextBox(){
    let input = document.getElementById("todo-input");
    checkNotNull(input, "No input text box found with id 'todo-input'");
    return input
}

export function getToDoList(){
    let todoList = document.getElementById("todo-list");
    checkNotNull(todoList, "No list found with id 'todo-list'");
    return todoList;
}

export function getForm(){
    let form = document.querySelector("form");
    checkNotNull(form, "No form found");
    return form;
}

function checkNotNull(item, errorMessage){
    if (item === null){
        throw new Error(errorMessage);
    }
}