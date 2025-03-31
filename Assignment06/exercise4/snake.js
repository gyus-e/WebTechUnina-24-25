"use strict";

import { Board } from "./Board.js";
import { Food } from "./Food.js";
import { Div } from "./Div.js";

class HeadTile extends Div {
    constructor(position) {
        super(position);
        this.setClass("snake-head");
    }
}

class BodyTile extends Div {
    constructor(position) {
        super(position);
        this.setClass("snake-body");
    }
}

class Snake {
    constructor(board) {
        const X = Math.floor(board.table.rows.length / 2);
        const Y = Math.floor(board.table.rows[0].cells.length / 2);

        this.length = 3;
        this.body = new Array();
        this.body[0] = new HeadTile([X, Y]);
        this.body[1] = new BodyTile([X, Y-1]);
        this.body[2] = new BodyTile([X, Y-2]);
        this.spawn(board);
    }

    enlarge() {
        const lastTile = this.body[this.body.length - 1];   
        this.body.push(new BodyTile(lastTile.position));
        this.length++;
    }

    move(direction, board) {
        const head = this.body[0];
        const newPosition = [head.position[0] + direction[0], head.position[1] + direction[1]];
        if(this.gameOver(newPosition, board)){
            alert("Game Over");
            clearInterval(intervalID);
            return;
        }
        this.body.unshift(new HeadTile(newPosition));
        this.body[1].setClass("snake-body");
        
        let trash = this.body.pop();
        let X = trash.position[0];
        let Y = trash.position[1];
        const cell = board.getTile([X, Y]);
        cell.removeChild(trash.div);

        this.spawn(board);
    }

    spawn(board) {
        for (let tile of this.body){
            board.getTile(tile.position).appendChild(tile.div);
        }
    }

    gameOver(newPosition, board){
        let newTile = board.getTile(newPosition);
        if (newTile.children.length > 0 && newTile.firstChild.className !== "food"){
            return true;
        }
        return newPosition[0] < 0 || newPosition[0] >= board.table.rows.length ||
            newPosition[1] < 0 || newPosition[1] >= board.table.rows[0].cells.length;
    }
}

const UP = [-1, 0];
const DOWN = [1, 0];
const LEFT = [0, -1];
const RIGHT = [0, 1];

const board = new Board(15, 20);
const  container = document.getElementById("snake-container");
container.appendChild(board.table);

let direction = RIGHT;
let time_interval = 500;
let validMove = true;

let snake = new Snake(board);
let food = new Food(board);

document.addEventListener("keydown", (event) => {
    if (!validMove){
        return;
    }
    if (event.key === "ArrowUp" && direction !== DOWN){
        direction = UP;
    } else if (event.key === "ArrowDown" && direction !== UP){
        direction = DOWN;
    } else if (event.key === "ArrowLeft" && direction !== RIGHT){
        direction = LEFT;
    } else if (event.key === "ArrowRight" && direction !== LEFT){
        direction = RIGHT;
    }
    validMove = false;
});

const intervalID = setInterval(myCallback, time_interval);

function myCallback() {
    snake.move(direction, board);
    validMove = true;

    let head = snake.body[0];
    let currentTile = board.getTile(head.position);
    if (currentTile.firstChild.className === "food") {
        currentTile.removeChild(food.div);
        food = new Food(board);
        snake.enlarge();
        updateSpeed();
    }
}

function updateSpeed(){
    if (snake.length > 5){
        time_interval = 200;
    }
    if (snake.length > 10){
        time_interval = 100;
    }
}