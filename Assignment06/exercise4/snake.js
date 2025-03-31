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
        const X = Math.floor(board.rowsNumber / 2);
        const Y = Math.floor(board.columnsNumber / 2);

        this.enlarge = false;
        this.digestionTime = new Array();
        this.body = new Array();

        this.body[0] = new HeadTile([X, Y]);
        this.body[1] = new BodyTile([X, Y-1]);
        this.body[2] = new BodyTile([X, Y-2]);
        this.spawn(board);
    }

    head(){
        return this.body[0];
    }

    move(direction, board) {
        const newPosition = [this.head().position[0] + direction[0], this.head().position[1] + direction[1]];

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

    isDead(newPosition, board){
        let newTile = board.getTile(newPosition);
        
        if (newPosition[0] < 0 || 
            newPosition[0] >= board.rowsNumber ||
            newPosition[1] < 0 || 
            newPosition[1] >= board.columnsNumber){
            return true;
        }

        if (newTile.children.length > 0 && 
            newTile.firstChild.className !== "food"){
            return true;
        }       
    }

    hasWon(board){
        return this.body.length === board.rowsNumber * board.columnsNumber - 1;
    }
}

const board = new Board(10, 10);
const  container = document.getElementById("snake-container");
container.appendChild(board.table);
let direction = RIGHT;
let time_interval = 200;
let validMove = true;
let pause = false;
let intervalID = setInterval(myCallback, time_interval);

let snake = new Snake(board);
let food = new Food(board);

function myCallback() {
    if (pause){
        validMove = true; 
        return;
    }

    let newPosition = [snake.head().position[0] + direction[0], snake.head().position[1] + direction[1]];

    if(snake.isDead(newPosition, board)){
        gameOver("You lost");
        return;
    }
    if (snake.hasWon(board)){
        gameOver("You won");
        return;
    }

    snake.move(direction, board);

    validMove = true;

    let currentTile = board.getTile(snake.head().position);
    if (currentTile.firstChild.className === "food") {
        snake.digestionTime.push(snake.body.length);

        currentTile.removeChild(food.div);
        food = new Food(board);

        updateSpeed();
    }
    snake.digestFood(); 
}

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

function updateSpeed(){
    if (snake.body.length % 5 === 0 && time_interval > 50){
        time_interval *= 0.8;
        clearInterval(intervalID);
        intervalID = setInterval(myCallback, time_interval);
    }
}

function gameOver(msg) {
    alert(msg);
    clearInterval(intervalID);
}