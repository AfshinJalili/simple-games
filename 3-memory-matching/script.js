const gameBoard = document.getElementById('game-board');
const timeElement = document.getElementById('timer');
const resetButton = document.getElementById('reset');
const notificationElement = document.getElementById('notification');
const notificationMessage = document.getElementById('notification-message');
const closeNotificationButton = document.getElementById('close-notification');

let timer;
let time = 0;
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let matchedPairs = 0;
const cardsArray = ['🚀', '⚡', '🎮', '🌟', '🔥', '💎'];

function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function startTimer() {
  time = 0;
  timeElement.textContent = `time: ${time}s`;
  clearInterval(timer);
  timer = setInterval(() => {
    time++;
    timeElement.textContent = `time: ${time}s`;
  }, 1000);
}

function resetGame() {
  gameBoard.innerHTML = '';
  firstCard = null;
  secondCard = null;
  lockBoard = false;
  matchedPairs = 0;
  startTimer();
  createCards();
  hideNotificaiton();
}

function createCards() {
  const shuffledCards = shuffleArray([...cardsArray, ...cardsArray]);
  shuffledCards.forEach((value) => {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.value = value;
    const front = document.createElement('div');
    front.classList.add('card-face', 'front');
    front.textContent = value;

    const back = document.createElement('div');
    back.classList.add('card-face', 'back');
    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', handleCardClick);
    gameBoard.appendChild(card);
  });
}

function handleCardClick() {
  if (lockBoard || this === firstCard || this.classList.contains('flip'))
    return;
  this.classList.add('flip');

  if (!firstCard) {
    firstCard = this;
    return;
  }

  secondCard = this;
  checkForMatch();
}

function checkForMatch() {
  const isMatch = firstCard.dataset.value === secondCard.dataset.value;
  if (isMatch) {
    disbaleCards();
    matchedPairs++;

    if (matchedPairs === cardsArray.length) {
      clearInterval(timer);
      setTimeout(
        () =>
          showNotification(
            `Congratulations! You completed the game in ${time}s`
          ),
        500
      );
    }
  } else {
    unflipCards();
  }
}

function disbaleCards() {
  firstCard.removeEventListener('click', handleCardClick);
  secondCard.removeEventListener('click', handleCardClick);
  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove('flip');
    secondCard.classList.remove('flip');

    resetBoard();
  }, 1000);
}

function resetBoard() {
  [firstCard, secondCard, lockBoard] = [null, null, false];
}

function showNotification(message) {
  notificationMessage.textContent = message;
  notificationElement.classList.remove('hidden');
  notificationElement.style.display = 'block';
}

function hideNotificaiton() {
  notificationElement.classList.add('hidden');
  notificationElement.style.display = 'none';
}

closeNotificationButton.addEventListener('click', hideNotificaiton);

resetButton.addEventListener('click', resetGame);

resetGame();
