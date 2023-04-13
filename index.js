let board = [];

const player1 = "O";
const player2 = "X";

let chance = 1;

let player1Moves = [];
let player2Moves = [];

const winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

const cells = document.querySelectorAll(".cell");

function startGame() {
    board = [0, 1, 2, 3, 4, 5, 6, 7, 8];
    cells.forEach((x) => {
        x.style.cursor = "pointer";
        x.style.backgroundColor = "";
        x.textContent ="";

        x.addEventListener("click", turn);
        player1Moves = [];
        player2Moves = [];
        chance = 1;
    });
}

/*
 arry = [1,2,3,4]
 arry[2]


*/

function availSpace() {
    // code
    const totalMoves = [];
    for (let i = 0; i < player1Moves.length; i++) {
        totalMoves.push(player1Moves[i]);
    }
    for (let i = 0; i < player2Moves.length; i++) {
        totalMoves.push(player2Moves[i]);
    }

    return board.filter(x => !totalMoves.includes(x) )
}

function checkCombo(playerMoves) {
    for(const move of winCombos) {
        const result = move.every(x => playerMoves.includes(x));
        if(result)
        return true;
    }
    return false;
}

function win() {
    const space = availSpace();
        if(checkCombo(player1Moves)) {
            return 1;
        }
        else if(checkCombo(player2Moves)) {
            return 2;
        }
        else if(!space.length) {
            return 0;
        }
        else {
            return -1;
        }
}

function turn(e) {
    console.log(chance);
  if(chance== 1) {
    const target = e.target;
    const id = Number(target.id);
    cells[id].textContent = player1;
    cells[id].removeEventListener('click', turn)
    chance = 2;
    cells[id].style.cursor = "default";
    player1Moves.push(id);
  } else {
    chance = 1;
    const target = e.target;
    const id = Number(target.id);
     cells[id].textContent = player2;
     cells[id].removeEventListener("click", turn);
     cells[id].style.cursor = "default";
         player2Moves.push(id);
  }
const w = win();
if(w ==  1) {
    setTimeout(() => {
    alert("player 1 wins");
    startGame();
    },1000);
}
else if( w == 2) {
    setTimeout(() => {
        alert("player 2 wins");
        startGame();
    }, 1000);
} else if( w == 0) {
 setTimeout(() => {
     alert("game tie");
     startGame();
 }, 1000);
} 
}

document.addEventListener('DOMContentLoaded' , () => {
    startGame();
})