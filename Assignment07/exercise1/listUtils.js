"use strict";

export function addToList(id, value, list, done = false){
    list.appendChild(createListItem(id, value, done));
}

function createListItem(id, value, done){
    let listItem = document.createElement("li");
    listItem.setAttribute("id", id);
    listItem.textContent = value;
    if (done){
        listItem.classList.toggle("done");
    }
    return listItem;
}