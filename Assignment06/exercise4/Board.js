"use strict";

export class Board {
    constructor(rowsNumber, columnsNumber) {
        this.rowsNumber = rowsNumber;
        this.columnsNumber = columnsNumber;
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
    getTile(position) {
        return this.table.rows[position[0]].cells[position[1]];
    }
}