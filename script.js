'use strict';
// Selecting elements of players
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

// Scoping
let scores, currentScore, activePlayer, playing;

// Reseting game
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

init();

// Next player function (Switch to next player)
const switchPlayer = function () {
  // Switching to next player
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  // Once we roll 1, current score reset
  currentScore = 0;
  // Changing value of active player
  activePlayer = activePlayer === 0 ? 1 : 0;
  // Visual background for current player, setting for both player will ensure that one side will be active no matter what
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Rolling dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    // Generating random roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // Switching to next player
    if (dice != 1) {
      // Adding dice score to current player
      currentScore += dice;
      // Dynamically selecting a player
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // adding current score of active player
    scores[activePlayer] += currentScore;

    //Dynamic selection
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // check if player score is >= 100
    if (scores[activePlayer] >= 100) {
      // Finish game
      diceEl.classList.add('hidden');
      playing = false;
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
    } else {
      // Switch to next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
