"use strict";

function renderDOM(element_id, list_id){
    let container = document.getElementById(element_id);
    let list = document.getElementById(list_id);
    dfs(container, list);
}

function dfs(element, list){
    add(element, list)
    for (let child of element.childNodes){
        let sublist = document.createElement("ul");
        dfs(child, sublist);
        list.appendChild(sublist);        
    }
}

function add(element, list){
    let li = document.createElement("li");

    if (element.nodeType === 1){
        li.setAttribute("class", "element");
        li.textContent = element.tagName;
    } else if (element.nodeType === 3 && element.textContent !== "\n\t") {
        li.setAttribute("class", "text");
        li.textContent = element.textContent;
    } else if (element.nodeType === 8) {
        li.setAttribute("class", "comment");
        li.textContent = element.textContent;
    }
    if (li.textContent.trim().length > 0){
        list.appendChild(li);
    }
}