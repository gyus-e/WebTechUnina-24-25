"use strict";

import { Board } from "./Board.js";
import { Food } from "./Food.js";
import { Div } from "./Div.js";

const UP = [-1, 0];
const DOWN = [1, 0];
const LEFT = [0, -1];
const RIGHT = [0, 1];

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
        this.enlarge = false;
        this.digestionTime = new Array();
        this.body = new Array();
        this.body[0] = new HeadTile([X, Y]);
        this.body[1] = new BodyTile([X, Y-1]);
        this.body[2] = new BodyTile([X, Y-2]);
        this.spawn(board);
    }


    move(direction, board) {
        const head = this.body[0];
        const newPosition = [head.position[0] + direction[0], head.position[1] + direction[1]];
        if(this.dead(newPosition, board)){
            alert("Game Over");
            clearInterval(intervalID);
            return;
        }
        this.body.unshift(new HeadTile(newPosition));
        this.body[1].setClass("snake-body");
        if (!this.enlarge) {
            let trash = this.body.pop();
            let X = trash.position[0];
            let Y = trash.position[1];
            let cell = board.getTile([X, Y]);
            cell.removeChild(trash.div);
        } else {
            this.enlarge = false;
            this.length++;
            this.checkVictory(board);
        }
        this.spawn(board);
    }

    digestFood() {
        if (this.digestionTime.length > 0 && this.digestionTime[0] >= 0) {
            this.digestionTime[0]--;
            if (this.digestionTime[0] === 0) {
                this.enlarge = true;
                this.digestionTime.shift();
            }
        }
    }

    spawn(board) {
        for (let tile of this.body){
            board.getTile(tile.position).appendChild(tile.div);
        }
    }

    dead(newPosition, board){
        let newTile = board.getTile(newPosition);
        if (newTile.children.length > 0 && newTile.firstChild.className !== "food"){
            return true;
        }
        return newPosition[0] < 0 || newPosition[0] >= board.table.rows.length ||
            newPosition[1] < 0 || newPosition[1] >= board.table.rows[0].cells.length;
    }

    checkVictory(board){
        if (this.length === board.table.rows.length * board.table.rows[0].cells.length - 1){
            alert("You win!");
            clearInterval(intervalID);
        }
    }
}

const board = new Board(10, 10);
const  container = document.getElementById("snake-container");
container.appendChild(board.table);
let direction = RIGHT;
let time_interval = 400;
let validMove = true;
let pause = false;
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
    } else if (event.key === " "){
        pause = !pause;
    }
    validMove = false;
});

const intervalID = setInterval(myCallback, time_interval);

function myCallback() {
    if (pause){
        validMove = true; 
        return;
    }
    snake.move(direction, board);
    
    validMove = true;

    let head = snake.body[0];
    let currentTile = board.getTile(head.position);
    if (currentTile.firstChild.className === "food") {
        snake.digestionTime.push(snake.length);

        currentTile.removeChild(food.div);
        food = new Food(board);

        updateSpeed();
    }
    snake.digestFood();    
    
}

function updateSpeed(){
    if (snake.length > 5){
        time_interval = 200;
    }
    if (snake.length > 10){
        time_interval = 100;
    }
}