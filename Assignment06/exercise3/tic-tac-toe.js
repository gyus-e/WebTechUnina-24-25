const label = document.createElement('div');
const table = document.createElement('table');
const tbody = document.createElement('tbody');
const tr = new Array();
const td_matrix = new Array();

const X = '❌';
const O = '⭕';

const winningCombinations = [
    // Rows
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    // Columns
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    // Diagonals
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
];

let currentPlayer = X;
let gameover = false;
let draw = true;
let movecount = 0;

function setupGame(containerId){
    let container = document.getElementById(containerId);
    container.appendChild(label);
    updateLabel();
    let board = createBoard();
    container.appendChild(board);

    board.addEventListener("click", (event) => {
        let cell = event.target;
        if (cell.textContent !== "" || gameover) {
            return;
        }
        cell.textContent = currentPlayer;
        movecount++;
        checkWinner();
        if (gameover){
            updateLabel();
        } else {
            switchCurrentPlayer();
        }
    });
}

function checkWinner(){    for (let combination of winningCombinations) {
        const [a, b, c] = combination;
        const cellA = td_matrix[a[0]][a[1]].textContent;
        const cellB = td_matrix[b[0]][b[1]].textContent;
        const cellC = td_matrix[c[0]][c[1]].textContent;

        if (cellA !== "" && cellA === cellB && cellB === cellC) {
            gameover = true;
            draw = false;
            return;
        }
    }
    
    if (movecount === 9){
        gameover = true;
        return;
    }
}

function updateLabel(){
    if (!gameover){
        label.textContent = `Current move: ${currentPlayer}`;
    } else if (draw){
        label.textContent = `It's a draw! Reload the page to play again!`;
    } else {
        label.textContent = `Player ${currentPlayer} wins! Reload the page to play again!`;
    }
}

function switchCurrentPlayer(){
    if (currentPlayer === X){
        currentPlayer = O;
    } else if (currentPlayer === O){
        currentPlayer = X;
    } else {
        throw new Error('Invalid player');
    }
    updateLabel();
}

function createBoard(){
    table.appendChild(tbody);

    for (let i = 0; i < 3; i++){
        tr[i] = document.createElement('tr');
        tbody.appendChild(tr[i]);
    }

    for (let i = 0; i < 3; i++){
        td_matrix[i] = new Array();
        for (let j = 0; j < 3; j++){
            td_matrix[i][j] = document.createElement('td');
            tr[i].appendChild(td_matrix[i][j]);
        }
    }

    return table;
}