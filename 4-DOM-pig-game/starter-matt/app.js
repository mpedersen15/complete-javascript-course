/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// DOM elements
var rollDiceBtn,
  diceImg,
  roundScoreElements,
  playerPanelElements,
  holdBtn,
  scoreElements,
  newGameBtn,
  playerNameElements;

rollDiceBtn = document.querySelector(".btn-roll");
diceImg = document.querySelector("img.dice");
roundScoreElements = [
  document.getElementById("current-0"),
  document.getElementById("current-1")
];

playerPanelElements = [
  document.querySelector(".player-0-panel"),
  document.querySelector(".player-1-panel")
];

holdBtn = document.querySelector(".btn-hold");

scoreElements = [
  document.getElementById("score-0"),
  document.getElementById("score-1")
];

newGameBtn = document.querySelector(".btn-new");

playerNameElements = [
  document.getElementById("name-0"),
  document.getElementById("name-1")
];

// App State
var appState = {
  scores: [0, 0], // Player 1 and Player 2 scores, respectively
  currentPlayer: 0,
  roundScore: 0,
  reset: function() {
    this.scores = [0, 0];
    this.currentPlayer = 0;
    this.roundScore = 0;
  }
};

// Callback functions
function rollDice() {
  var roll = Math.floor(Math.random() * 6) + 1;
  diceImg.style.display = "none";
  setTimeout(function() {
    diceImg.src = "dice-" + roll + ".png";
    diceImg.style.display = "block";
  }, 100);

  if (roll === 1) {
    changeActivePlayer();
  } else {
    appState.roundScore += roll;
    updateRoundScoreElement();
  }
}

function updateRoundScoreElement() {
  roundScoreElements[appState.currentPlayer].textContent = appState.roundScore;
}

function updateCurrentPlayerStyling() {
  playerPanelElements[0].classList.toggle("active");
  playerPanelElements[1].classList.toggle("active");
}

function hold() {
  appState.scores[appState.currentPlayer] += appState.roundScore;
  scoreElements[appState.currentPlayer].textContent =
    appState.scores[appState.currentPlayer];

  if (appState.scores[appState.currentPlayer] >= 15) {
    playerPanelElements[appState.currentPlayer].classList.remove("active");
    playerPanelElements[appState.currentPlayer].classList.add("winner");
    playerNameElements[appState.currentPlayer].textContent = "Winner!";
    diceImg.style.display = "none";
    rollDiceBtn.style.display = "none";
    holdBtn.style.display = "none";
  } else {
    changeActivePlayer();
  }
}

function changeActivePlayer() {
  appState.roundScore = 0;
  updateRoundScoreElement();
  appState.currentPlayer = appState.currentPlayer ? 0 : 1;
  updateCurrentPlayerStyling();
  setTimeout(function() {
    diceImg.style.display = "none";
  }, 150);
}

function startNewGame() {
  appState.reset();
  scoreElements[0].textContent = 0;
  scoreElements[1].textContent = 0;
  roundScoreElements[0].textContent = 0;
  roundScoreElements[1].textContent = 0;
  diceImg.style.display = "none";
  playerPanelElements[0].classList.remove("winner", "active");
  playerPanelElements[1].classList.remove("winner", "active");
  playerPanelElements[0].classList.add("active");
  playerNameElements[0].textContent = "Player 1";
  playerNameElements[1].textContent = "Player 2";
  rollDiceBtn.style.display = "block";
  holdBtn.style.display = "block";
}

// Attach Event Listeners
rollDiceBtn.addEventListener("click", rollDice);
holdBtn.addEventListener("click", hold);
newGameBtn.addEventListener("click", startNewGame);

// Start initial game
startNewGame();
