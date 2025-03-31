"use strict";

export class Div {
    constructor(position) {
        this.div = document.createElement("div");
        this.div.style.width = "100%";
        this.div.style.height = "100%";
        this.position = position;
    }

    setClass(className) {
        this.div.setAttribute("class", className);
    }
}