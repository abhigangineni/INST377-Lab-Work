const grid = document.querySelector('.grid');
const squares = Array.from(document.querySelectorAll('.grid div'));
const ScoreDisplay = document.querySelector('#score');
const StartBtn = document.querySelector('#start-button');
const width = 10;
let nextRandom = 0;

// Tetrominos
const lTetromino = [
  [1, width + 1, width * 2 + 1, 2],
  [width, width + 1, width + 2, width * 2 + 2],
  [1, width + 1, width * 2 + 1, width * 2],
  [width, width * 2, width * 2 + 1, width * 2 + 2]
];

const zTetromino = [
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1],
  [0, width, width + 1, width * 2 + 1],
  [width + 1, width + 2, width * 2, width * 2 + 1]
];

const tTetromino = [
  [1, width, width + 1, width + 2],
  [1, width + 1, width + 2, width * 2 + 1],
  [width, width + 1, width + 2, width * 2 + 1],
  [1, width, width + 1, width * 2 + 1]
];

const oTetromino = [
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1],
  [0, 1, width, width + 1]
];

const iTetromino = [
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3],
  [1, width + 1, width * 2 + 1, width * 3 + 1],
  [width, width + 1, width + 2, width + 3]
];

const theTetrominos = [
  lTetromino,
  zTetromino,
  tTetromino,
  iTetromino,
  oTetromino
];

let currentPosition = 4;
let currentRotation = 0;

// randomly choose a tetromino
let random = Math.floor(Math.random() * theTetrominos.length);
let current = theTetrominos[random][currentRotation];

// draw first rotation of first tetromino
function draw() {
  current.forEach((index) => {
    squares[currentPosition + index].classList.add('tetromino');
  });
}

function undraw() {
  current.forEach((index) => {
    squares[currentPosition + index].classList.remove('tetromino');
  });
}

// show up next tetromino in mini display
const displaySquares = document.querySelectorAll('mini-grid div');
const displayWidth = 4;
let displayIndex = 0;

// the tetramino without rotations
const upNextTetramino = [
  [1, width + 1, width * 2 + 1, 2],
  [0, width, width + 1, width * 2 + 1],
  [1, width, width + 1, width + 2],
  [0, 1, width, width + 1],
  [1, width + 1, width * 2 + 1, width * 3 + 1]
];

// display shape in mini grid display
function displayShape() {
  displaySquares.forEach((square) => {
    square.classList.remove('tetramino');
  });
  upNextTetramino[nextRandom].forEach((index) => {
    displaySquares[displayIndex + index].classList.add('tetramino');
  });
}

// freeze function
function freeze() {
  if (current.some((index) => squares[currentPosition + index + width].classList.contains('taken'))) {
    current.forEach((index) => squares[currentPosition + index].classList.add('taken'));
    // Start a new tetromino falling
    newRandom = Math.floor(Math.random() * theTetrominos.length);
    random = newRandom;
    current = theTetrominos[random][currentRotation];
    currentPosition = 4;
    draw();
    displayShape();
  }
}

// move down function
function moveDown() {
  undraw();
  currentPosition += width;
  draw();
  freeze();
}

// move tetromino to the left unless hits edge or blockage
function moveLeft() {
  undraw();
  const isAtLeftEdge = current.some((index) => (currentPosition + index) % width === 0);

  if (!isAtLeftEdge) currentPosition -= 1;

  if (current.some((index) => squares[currentPosition + index].classList.contains('taken'))) {
    currentPosition += 1;
  }

  draw();
}

// move tetromino to the right unless hits edge or blockage
function moveRight() {
  undraw();
  const isAtRightEdge = current.some(
    (index) => (currentPosition + index) % width === width-1
  );

  if (!isAtRightEdge) currentPosition += 1;

  if (current.some((index) => squares[currentPosition + index].classList.contains('taken'))) {
    currentPosition -= 1;
  }
  draw();
}

// rotate the tetramino
function rotate() {
  undraw();
  currentRotation += 1;
  console.log(current);
  if (currentRotation === current.length) {
    currentRotation = 0;
  }
  current = theTetrominos[random][currentRotation];
  draw();
}

// Make the tetrominos move down every second
timerId = setInterval(moveDown, 1000);

// assign functions to keycodes
function control(e) {
  if (e.keyCode === 37) {
    moveLeft();
  } else if (e.keyCode === 38) {
    rotate();
  } else if (e.keyCode === 39) {
    moveRight();
  } else if (e.keyCode === 40) {
    moveDown();
  }
}
document.addEventListener('keyup', control);