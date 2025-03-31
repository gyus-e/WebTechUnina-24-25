"use strict";
import { Div } from "./Div.js";

export class Food extends Div {
    constructor(board){
        super();
        this.setClass("food");
        this.spawn(board);   
    }

    spawn(board) {
        const rows = board.table.rows.length;
        const cols = board.table.rows[0].cells.length;
        do {
            const x = Math.floor(Math.random() * rows);
            const y = Math.floor(Math.random() * cols);
            const cell = board.getTile([x, y]);
            if (cell.children.length === 0) {
                cell.appendChild(this.div);
                break;
            }
        } while (true);
    }
}
