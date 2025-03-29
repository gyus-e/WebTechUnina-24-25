const X = '❌';
const O = '⭕';

let currentPlayer = X;
let label = document.createElement('div');
let gameover = false;
let draw = false;

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
        checkWinner();
        if (gameover){
            updateLabel();
        } else {
            switchCurrentPlayer();
        }
    });
}

function checkWinner(){
    //TODO    
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
    let table = document.createElement('table');
    let tbody = document.createElement('tbody');
    let tr = new Array();
    let td_matrix = new Array();

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