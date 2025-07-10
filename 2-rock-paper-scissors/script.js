const playerScoreElement = document.getElementById('player-score');
const computerScoreElement = document.getElementById('computer-score');
const resultElement = document.getElementById('result');
const computerChoiceElement = document.getElementById('computer-choice');
const resetButton = document.getElementById('reset');
const choices = document.querySelectorAll('.choice');

const notificationElement = document.getElementById('notification');
const roundIndicator = document.getElementById('round-indicator');

let playerScore = 0;
let computerScore = 0;

const choicesArray = ['rock', 'paper', 'scissors'];

choices.forEach((choice) => {
  choice.addEventListener('click', () => {
    const playerChoice = choice.getAttribute('data-choice');

    const computerChoice = Math.floor(Math.random() * choicesArray.length);
    computerChoiceElement.textContent = `Computer Chose ${choicesArray[computerChoice]}`;

    playRound(playerChoice, choicesArray[computerChoice]);
  });
});

resetButton.addEventListener('click', resetScores);

function playRound(playerChoice, computerChoice) {
  let resultMessage;

  if (playerChoice === computerChoice) {
    resultMessage = `It's a draw! Both chose ${playerChoice}`;
  } else {
    const winningConditions = {
      rock: 'scissors',
      paper: 'rock',
      scissors: 'paper',
    };

    if (winningConditions[playerChoice] === computerChoice) {
      playerScore++;
      playerScoreElement.textContent = `Player: ${playerScore}`;

      resultMessage = `You Win! ${playerChoice} beats ${computerChoice}`;
    } else {
      computerScore++;
      computerScoreElement.textContent = `Computer: ${computerScore}`;
      resultMessage = `You Lose! ${computerChoice} beats ${playerChoice}`;
    }
  }

  showNotification(resultMessage);

  setTimeout(() => {
    resultElement.textContent = resultMessage;
    showRoundIndicator();
  }, 2000);
}

function resetScores() {
  playerScore = 0;
  computerScore = 0;

  playerScoreElement.textContent = `Player: ${playerScore}`;
  computerScoreElement.textContent = `Computer: ${computerScore}`;

  resultElement.textContent = `Make your move!`;

  computerChoiceElement.textContent = '';

  notificationElement.classList.add('hidden');
  roundIndicator.classList.remove('visible');
}

function showNotification(message) {
  notificationElement.textContent = message;
  notificationElement.classList.remove('hidden');

  setTimeout(() => {
    notificationElement.classList.add('hidden');
  }, 2000);
}

function showRoundIndicator() {
  roundIndicator.textContent = `New Round!`;

  roundIndicator.classList.add('visible');

  setTimeout(() => {
    roundIndicator.classList.remove('visible');
  }, 1000);
}
