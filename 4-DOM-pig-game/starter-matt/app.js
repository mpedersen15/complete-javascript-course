/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

// DOM elements
var rollDiceBtn, diceImg, roundScoreElements, playerPanelElements;

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

// App State
var appState = {
  scores: [0, 0], // Player 1 and Player 2 scores, respectively
  currentPlayer: 0,
  roundScore: 0
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
    appState.roundScore = 0;
    updateRoundScoreElement();
    appState.currentPlayer = appState.currentPlayer ? 0 : 1;
    updateCurrentPlayerStyling();
  } else {
    appState.roundScore += roll;
    updateRoundScoreElement();
  }
}

function updateRoundScoreElement() {
  roundScoreElements[appState.currentPlayer].textContent = appState.roundScore;
}

function updateCurrentPlayerStyling() {
  var inactivePlayer = appState.currentPlayer ? 0 : 1;
  playerPanelElements[inactivePlayer].className = playerPanelElements[
    inactivePlayer
  ].className.replace(" active", "");
  playerPanelElements[appState.currentPlayer].className += " active";
}

// Attach Event Listeners
rollDiceBtn.addEventListener("click", rollDice);
