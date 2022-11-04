/** Connect Four
 *
 * Player 1 and 2 alternate turns. On each turn, a piece is dropped down a
 * column until a player gets four-in-a-row (horiz, vert, or diag) or until
 * board fills (tie)
 */

const WIDTH = 7;
const HEIGHT = 6;

let currPlayer = 1; // active player: 1 or 2
let board = []; // array of rows, each row is array of cells  (board[y][x])

let totalMoves = 0

function makeBoard() {
  board = []
  for (let y = 0; y < HEIGHT; y++) {
    board.push([])
    for (let x = 0; x < WIDTH; x++) {
      board[y].push(0)
    }
  }
}

function makeHtmlBoard() {
  let htmlBoard = document.getElementById("board")
  // Clickable Top
  const top = document.createElement("tr");
  top.setAttribute("id", "column-top");
  top.addEventListener("click", handleClick);

  for (var x = 0; x < WIDTH; x++) {
    var headCell = document.createElement("td");
    headCell.setAttribute("id", x);
    top.append(headCell);
  }
  htmlBoard.append(top);

  // Cell creation
  for (var y = 0; y < HEIGHT; y++) {
    const row = document.createElement("tr");
    for (var x = 0; x < WIDTH; x++) {
      const cell = document.createElement("td");
      cell.setAttribute("id", `${y}-${x}`);
      row.append(cell);
    }
    htmlBoard.append(row);
  }
}

function findSpotForCol(x) {
 let y=5;
  let cell = document.getElementById (`${y}-${x}`)
  if(cell.hasChildNodes() === true){
    y -= 1;
    let cell = document.getElementById (`${y}-${x}`)
    if(cell.hasChildNodes() === true){
      y -= 1;
      let cell = document.getElementById (`${y}-${x}`)
      if(cell.hasChildNodes() === true){
        y -= 1;
        let cell = document.getElementById (`${y}-${x}`)
        if(cell.hasChildNodes() === true){
          y -= 1;
          let cell = document.getElementById (`${y}-${x}`)
          if(cell.hasChildNodes() === true){
            y -= 1;
            let cell = document.getElementById (`${y}-${x}`)
            if(cell.hasChildNodes() === true){
              return null; 
            }else if(cell.hasChildNodes() === false)return y;
          }else if(cell.hasChildNodes() === false)return y;
        }else if(cell.hasChildNodes() === false)return y;
      }else if(cell.hasChildNodes() === false)return y;
    }else if(cell.hasChildNodes() === false)return y;
  }else if(cell.hasChildNodes() === false)return y;
}

function placeInTable(y, x) {
  let piece = document.createElement("div")
  let cell = document.getElementById(`${y}-${x}`)
  
  piece.setAttribute("class", "piece")
    if(currPlayer == 1){
      
      piece.classList.add("red-piece")
      currPlayer += 1
    }else {
      piece.classList.add("blue-piece")
      currPlayer -= 1
  }
  cell.append(piece)
  board[y][x] = currPlayer
}

/** endGame: announce game end */

function endGame(msg) {
  setTimeout(() => {
   return alert(msg)
  }, 0);
  window.location.reload();
}

/** handleClick: handle click of column top to play piece */

function handleClick(evt) {

  let x = +evt.target.id;
  // get next spot in column (if none, ignore click)
  let y = findSpotForCol(x);
  console.log(`Y = ${y}; X = ${x}`)
  if (y === null) {
    return;
  }
  totalMoves +=1
  placeInTable(y, x);
  // check for win
  console.log(`After placing in table; Y = ${y}; X = ${x}; board player = ${board[y][x]}`)
  if (checkForWin()) {
    return endGame(`Player ${currPlayer} won!`);
   }  
   else if (
    totalMoves === 42
    ){return endGame("Tie")
    }
  // TODO: check if all cells in board are filled; if so call, call endGame 
}

/** checkForWin: check board cell-by-cell for "does a win start here?" */

function checkForWin() {
  function _win(cells) {
    // Check four cells to see if they're all color of current player
    //  - cells: list of four (y, x) cells
    //  - returns true if all are legal coordinates & all match currPlayer

    return cells.every(
      ([y, x]) =>
        y >= 0 &&
        y < HEIGHT &&
        x >= 0 &&
        x < WIDTH &&
        board[y][x] === currPlayer
    );
  }

  // Win conditions

  for (var y = 0; y < HEIGHT; y++) {
    for (var x = 0; x < WIDTH; x++) {
      var horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
      var vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
      var diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
      var diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];

      if (_win(horiz) 
      || _win(vert) 
      || _win(diagDR) 
      || _win(diagDL)) {
        return true;
      }
    }
  }
}

makeBoard();
makeHtmlBoard();
