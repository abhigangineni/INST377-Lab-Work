const grid = document.querySelector(".grid");
const squares = Array.from(document.querySelectorAll(".grid div"));
const ScoreDisplay = document.querySelector("#score");
const StartBtn = document.querySelector("#start-button");
const width = 10;

// Tetrominos
const lTetromino = [
  [1, width + 1, width * 2 + 1, 2],
  [width, width + 1, width + 2, width * 2 + 2],
  [1, width + 1, width * 2 + 1, width * 2],
  [width, width * 2, width * 2 + 1, width * 2 + 2],
];

const zTetromino = [
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
];

const tTetromino = [
  [1, width, width + 1, width + 2],
  [1, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width + 2, width * 2 + 1],
  [1, width, width + 1, width * 2 + 1],
];

const oTetromino = [
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
];

const iTetromino = [
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
];

const theTetrominos = [
  lTetromino,
  zTetromino,
  tTetromino,
  iTetromino,
  oTetromino,
];

let currentPosition = 4;
let currentRotation = 0;

// randomly choose a tetromino
let random = Math.floor(Math.random()*theTetrominos.length);
console.log(random);
let current = theTetrominos[random][currentRotation];

// draw first rotation of first tetromino
function draw() {
  current.forEach((index) => {
    squares[currentPosition + index].classList.add("tetromino");
  });
}

function undraw() {
  current.forEach((index) => {
    squares[currentPosition + index].classList.remove('tetromino');
  });
}

draw();
