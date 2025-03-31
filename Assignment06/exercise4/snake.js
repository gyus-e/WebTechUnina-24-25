"use strict";

class Board {
    constructor(rowsNumber, columnsNumber) {
        this.table = document.createElement("table");
        for (let i = 0; i < rowsNumber; i++) {
            const row = document.createElement("tr");
            this.table.appendChild(row);
            for (let j = 0; j < columnsNumber; j++) {
                const cell = document.createElement("td");
                row.appendChild(cell);
            }
        }
    }
}

class Div {
    constructor() {
        this.div = document.createElement("div");
        this.div.style.width = "100%";
        this.div.style.height = "100%";
    }

    setClass(className) {
        this.div.setAttribute("class", className);
    }

    appendTo(parent) {
        parent.appendChild(this.div);
    }
}

class Food extends Div {
    constructor(){
        super();
        this.setClass("food");   
    }

    spawn(board) {
        const rows = board.table.rows.length;
        const cols = board.table.rows[0].cells.length;
        do {
            const x = Math.floor(Math.random() * rows);
            const y = Math.floor(Math.random() * cols);
            const cell = board.table.rows[x].cells[y];
            if (cell.children.length === 0) {
                cell.appendChild(this.div);
                break;
            }
        } while (true);
    }
}

class Snake {
    constructor() {
        this.length = 3;
        this.head = this.createHead();
        this.body = this.createBody(this.length - 1);
        this.queue = this.getStartingPositions();
    }
    
    createHead() {
        const head = new Div();
        head.setClass("snake-head");
        return head;
    }

    createBody(bodyLength) {
        const body = new Array();
        for (let i = 0; i < bodyLength; i++) {
            const bodyPart = new Div();
            bodyPart.setClass("snake-body");
            body.push(bodyPart);
        }
        return body;
    }

    getStartingPositions() {
        let queue = new Array();
        const startingX = Math.floor(board.table.rows.length / 2);
        const startingY = Math.floor(board.table.rows[0].cells.length / 2);
        queue.push([startingX, startingY]);
        queue.push([startingX, startingY - 1]);
        queue.push([startingX, startingY - 2]);
        return queue;
    }

    spawn(board){
        for (let i = 0; i < this.length; i++) {
            const pos = this.queue.shift();
            const cell = board.table.rows[pos[0]].cells[pos[1]];
            if (i === 0) {
                this.head.appendTo(cell);
            } else {
                this.body[i - 1].appendTo(cell);
            }
        }
    }
}


const  container = document.getElementById("snake-container");
const board = new Board(15, 20);
container.appendChild(board.table);

let snake = new Snake();
snake.spawn(board);

let food = new Food();
food.spawn(board);

const intervalID = setInterval(myCallback, 100);

function myCallback() {
    // food.spawn(board);
}