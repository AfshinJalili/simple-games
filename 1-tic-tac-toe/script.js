const grid = document.getElementById('grid');
const resetButton = document.getElementById('reset');
const cells = [];

let currentPlayer = 'X';
let gameActive = true;

const winningCombination = [
  [0, 1, 2],
  [3, 4, 6],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function createGrid() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    cell.addEventListener('click', () => handleCellClick(i));
    grid.appendChild(cell);
    cells.push(cell);
  }
}

function handleCellClick(index) {
  if (!gameActive || cells[index].textContent) return;
  cells[index].textContent = currentPlayer;
  cells[index].classList.add('disabled');

  if (checkWin()) {
    highlightWinningCells();
    gameActive = false;
    return;
  }

  if (checkDraw()) {
    alert("It's a draw!");
    return;
  }

  currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

  if (currentPlayer === 'O') {
    pcMove();
  }
}

function pcMove() {
  const bestMove = getBestMove();
  if (bestMove !== null) {
    cells[bestMove].textContent = 'O';
    cells[bestMove].classList.add('disabled');
    if (checkWin()) {
      highlightWinningCells();
      gameActive = false;
      return;
    }

    if (checkDraw()) {
      alert("It's a draw!");
      return;
    }

    currentPlayer = 'X';
  }
}

function getBestMove() {
  for (let combination of winningCombination) {
    const [a, b, c] = combination;
    if (
      cells[a].textContent === 'O' &&
      cells[b].textContent === 'O' &&
      !cells[c].textContent
    ) {
      return c;
    }

    if (
      cells[a].textContent === 'O' &&
      cells[c].textContent === 'O' &&
      !cells[b].textContent
    ) {
      return b;
    }

    if (
      cells[b].textContent === 'O' &&
      cells[c].textContent === 'O' &&
      !cells[a].textContent
    ) {
      return a;
    }

    if (
      cells[a].textContent === 'X' &&
      cells[b].textContent === 'X' &&
      !cells[c].textContent
    ) {
      return c;
    }

    if (
      cells[a].textContent === 'X' &&
      cells[c].textContent === 'X' &&
      !cells[b].textContent
    ) {
      return b;
    }

    if (
      cells[b].textContent === 'X' &&
      cells[c].textContent === 'X' &&
      !cells[a].textContent
    ) {
      return a;
    }

    if (!cells[4].textContent) {
      return 4;
    }

    const corners = [0, 2, 6, 8].filter((i) => !cells[i].textContent);

    if (corners.length > 0) {
      return corners[Math.floor(Math.random(corners.length))];
    }

    const availableCells = cells
      .map((cell, i) => (!cell.textContent ? i : null))
      .filter((i) => i !== null);

    return availableCells.cells.length > 0
      ? Math.floor(Math.random * availableCells.length)
      : null;
  }
}

function checkWin() {
  return winningCombination.some((combination) => {
    const [a, b, c] = combination;
    return (
      cells[a].textContent === currentPlayer &&
      cells[a].textContent === cells[b].textContent &&
      cells[b].textContent === cells[c].textContent
    );
  });
}

function highlightWinningCells() {
  return winningCombination.forEach((combination) => {
    const [a, b, c] = combination;
    if (
      cells[a].textContent === currentPlayer &&
      cells[a].textContent === cells[b].textContent &&
      cells[b].textContent === cells[c].textContent
    ) {
      cells[a].classList.add('winner');
      cells[b].classList.add('winner');
      cells[c].classList.add('winner');
    }
  });
}

function checkDraw() {
  return cells.every((cell) => cell.textContent);
}

function resetGame() {
  cells.forEach((cell) => {
    cell.textContent = '';
    cell.classList.remove('winner', 'disabled');
  });

  currentPlayer = 'X';
  gameActive = true;
}

resetButton.addEventListener('click', resetGame);

createGrid();
