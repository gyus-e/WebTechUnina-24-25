"use strict";

export function addToList(value, list){
    list.appendChild(createListItem(value));
}

function createListItem(value){
    let listItem = document.createElement("li");
    listItem.textContent = value;
    return listItem;
}