// Constants and variables
let isAnimationRunning = false;

const button = document.getElementById('start');
const continueButton = document.getElementById("continue");
const newGameButton = document.getElementById("new-game");
const exitButton = document.getElementById("exit");
const winnerMessage = document.getElementById("winner-message");
const playerForm = document.getElementById('player-form');
const playerNameInputs = document.querySelectorAll('.player-name');
const scoreboard = document.getElementById('scoreboard');
const rounds = 3;
const players = [];
let currentRound = 0;
let currentPlayerIndex = 0;

// Elements for animation
const gameElements = {
    gamePigBrown: document.getElementById('gamePigBrown'),
    gamePigPink: document.getElementById('gamePigPink'),
    goBrown: document.querySelector('.go-brown-ani'),
    goPink: document.querySelector('.go-pink-ani'),
    pigBrown: document.querySelector('.body-brown-ani'),
    pigPink: document.querySelector('.body-pink-ani'),
    earLeftBrown: document.querySelector('.ear-left-brown-ani'),
    earLeftPink: document.querySelector('.ear-left-pink-ani'),
    earRightBrown: document.querySelector('.ear-right-brown-ani'),
    earRightPink: document.querySelector('.ear-right-pink-ani'),
    legLeftBrown: document.querySelector('.leg-back-brown-ani'),
    legLeftPink: document.querySelector('.leg-back-pink-ani'),
    legRightBrown: document.querySelector('.leg-front-brown-ani'),
    legRightPink: document.querySelector('.leg-front-pink-ani'),
    splash: document.querySelector('.splash')
  }

// Main function for pig animation
function startPigAnimation() {
  if (isAnimationRunning) return;
  isAnimationRunning = true;

  button.removeEventListener("click", startPigAnimation);

  // Start pig animation
  animatePigs(gameElements);

  // Call the cloneOneElement function after 7 seconds
  setTimeout(() => {
    cloneOneElement(currentPlayerIndex);
  }, 7200);

  // Reset pig animations and show the player message after 7.3 seconds
  setTimeout(() => {
    resetPigAnimations(gameElements);
    isAnimationRunning = false;
  }, 7300);
}

// Animate pigs
function animatePigs(gameElements) {
    gameElements.gamePigBrown.style.visibility = "visible";
    gameElements.gamePigPink.style.visibility = "visible";
    gameElements.goBrown.style.animation = "move 7.3s linear";
    gameElements.goPink.style.animation = "move-two 7.3s linear 0.3s";
    gameElements.pigBrown.style.animation = "bounce 0.5s 0s 9, jump 3.2s 4.2s 1";
    gameElements.pigPink.style.animation = "bounce-two 0.5s 0s 9, jump-two 3.2s 4.2s 1";
    gameElements.earLeftBrown.style.animation = "running-ear-left 0.5s 10";
    gameElements.earLeftPink.style.animation = "running-ear-left 0.5s 10";
    gameElements.earRightBrown.style.animation = "running-ear-right 0.5s 10";
    gameElements.earRightPink.style.animation = "running-ear-right 0.5s 10";
    gameElements.legLeftBrown.style.animation = "run-left 0.5s 10";
    gameElements.legLeftPink.style.animation = "run-left 0.5s 10";
    gameElements.legRightBrown.style.animation = "run-right 0.5s 10";
    gameElements.legRightPink.style.animation = "run-right 0.5s 10";
    gameElements.splash.style.animation = "fadeInOut 2.2s 6.8s";
  }

// Reset pig animations
function resetPigAnimations(gameElements) {
    gameElements.gamePigBrown.style.visibility = 'hidden';
    gameElements.gamePigPink.style.visibility = 'hidden';
    gameElements.goBrown.style = "none";
    gameElements.goPink.style = "none";
    gameElements.pigBrown.style = "";
    gameElements.pigPink.style = "";
    gameElements.earLeftBrown.style = "";
    gameElements.earLeftPink.style = "";
    gameElements.earRightBrown.style = "";
    gameElements.earRightPink.style = "";
    gameElements.legLeftBrown.style = "";
    gameElements.legLeftPink.style = "";
    gameElements.legRightBrown.style = "";
    gameElements.legRightPink.style = "";

  //Splash disappears after 2s
  setTimeout(() => {
    gameElements.splash.style.animation = '';
  }, 1000);

  setTimeout(() => {
    if (currentRound < rounds) {
      button.addEventListener("click", startPigAnimation);
      document.getElementById("game-modal").style.display = "block";
      document.getElementById("continue").style.display = "block";
    }
  }, 6000);
}


// Clone pink and brown pig elements from clone.html
function cloneOneElement(currentPlayerIndex) {
  console.log('cloneOneElement called');
  fetch('points.html')
    .then(response => response.text())
    .then(data => {
      var parser = new DOMParser();
      var doc = parser.parseFromString(data, "text/html");

      // Select the elements to be cloned from the fetched HTML content
      var originalPigBrown = doc.querySelectorAll('.col-3-brown');
      var originalPigPink = doc.querySelectorAll('.col-3-pink');

      // Convert the NodeList to an array so we can use the array methods
      originalPigBrown = Array.from(originalPigBrown);
      originalPigPink = Array.from(originalPigPink);

      // Choose a random pig from the array of original pigs
      let randomIndexBrown = Math.floor(Math.random() * originalPigBrown.length);
      let randomIndexPink = Math.floor(Math.random() * originalPigPink.length);
      let randomPigBrown = originalPigBrown[randomIndexBrown];
      let randomPigPink = originalPigPink[randomIndexPink];

      // Clone the random pigs
      let clonedPigBrown = randomPigBrown.cloneNode(true);
      let clonedPigPink = randomPigPink.cloneNode(true);

      clonedPigBrown.style.margin = '-1em 0 0 7em';
      document.querySelector('.mud-two').appendChild(clonedPigBrown);

      clonedPigPink.style.margin = '-3em 0 0 16em';
      document.querySelector('.mud-two').appendChild(clonedPigPink);


      // Get the points from points.html
      let brownPoints = parseInt(clonedPigBrown.querySelector('.points').textContent);
      let pinkPoints = parseInt(clonedPigPink.querySelector('.points').textContent);

      const points = brownPoints + pinkPoints;
      updatePlayerScore(currentPlayerIndex, points);

      getNextPlayer();

      // Make cloned Pigs disappear after 6 seconds
      setTimeout(function() {
        clonedPigBrown.remove();
        clonedPigPink.remove();
      }, 5500);
    })
    .catch(error => console.error('Fetch error:', error));
}

function addPlayer(name) {
  players.push({name, score: 0});
}


function startGame() {
  playerForm.style.display = 'none';
  scoreboard.style.display = 'block';
  document.getElementById("continue").style.display = "block";
  document.getElementById("game-modal").style.display = "none";
  document.getElementById("modal-message").style.display = "none";
  updateScoreboard();
  button.addEventListener("click", startPigAnimation);
  playRound();
}


function playRound() {
  if (currentRound < rounds) {
    startPigAnimation();
    } else {
      announceWinner();
  }
}

function getNextPlayer() {
  currentPlayerIndex++;
  if (currentPlayerIndex >= players.length) {
    currentPlayerIndex = 0;
    currentRound++;
  }

  if (currentRound < rounds) {
    const nextPlayerIndex = currentPlayerIndex;
    const nextPlayerName = players[nextPlayerIndex].name;
    document.getElementById("player-message").innerHTML = `<strong>${nextPlayerName}</strong>, du bist dran.<br> Drücke auf Weiter um deine Runde zu starten`;
  } else {
    document.getElementById("player-message").innerHTML = "";
    continueButton.style.display = "none";
    announceWinner();
  }
}

function updateScoreboard() {
  scoreboard.innerHTML = players
  .map((player, index) => `<p>${player.name}: ${player.score} Punkte</p>`)
  .join('');
}


function updatePlayerScore(playerIndex, points) {
  players[playerIndex].score += points;
  updateScoreboard();
}


function announceWinner() {
  const winner = players.reduce((max, player) =>
    player.score > max.score ? player : max
  );
  setTimeout(() => {
    winnerMessage.innerHTML = `<strong>${winner.name} gewinnt mit ${winner.score} Punkten!</strong> `;
    document.getElementById("game-modal").style.display = "block";
    document.getElementById("player-message").style.display = "none";
    newGameButton.style.display = "block";
    exitButton.style.display = "block";
  }, 2000);
}


playerForm.addEventListener('submit', (e) => {
  e.preventDefault();

  playerNameInputs.forEach((input) => {
    if (input.value.trim()) {
      addPlayer(input.value.trim());
    }
  });

  if (players.length > 0) {
    startGame();
  } else {
    const modalMessage = document.getElementById('modal-message');
    modalMessage.style.display = 'block';
    modalMessage.textContent = 'Bitte gib mindestens einen Namen ein.';
  }
});

// Event listeners
continueButton.addEventListener("click", () => {
  document.getElementById("game-modal").style.display = "none";
  playRound();
});

newGameButton.addEventListener("click", () => {
  location.reload();
});

exitButton.addEventListener("click", () => {
  location.href = "index.html";
});


