'use strict';

let player_0 = document.querySelector('player--0');
let player_1 = document.querySelector('.player--1');
let score_0 = document.getElementById('score--0');
let score_1 = document.getElementById('score--1');
let currentScore_0 = document.getElementById('current--0');
let currentScore_1 = document.getElementById('current--1');
let btnRoll = document.querySelector('.btn--roll');
let btnHold = document.querySelector('.btn--hold');
let btnNew = document.querySelector('.btn--new');
let diceImg = document.querySelector('.dice');

let currentScore = 0;
let activePlayer = 0;

let randomNumber;
let score = [0, 0];

//Btn roll logic

const btnRollLogic = function () {
  diceImg.classList.remove('hidden');
  randomNumber = Math.trunc(Math.random() * 6) + 1;
  diceImg.src = ` dice-${randomNumber}.png`;
  //Cheking if the number is not 1
  if (randomNumber !== 1) {
    currentScore += randomNumber;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
    //if its 1 , switch player
  } else {
    currentScore = 0;
    switchPlayer();
  }
};

//Start Parameters

const init = function () {
  diceImg.classList.add('hidden');
  currentScore_0.textContent = 0;
  currentScore_1.textContent = 0;
  score_0.textContent = 0;
  score_1.textContent = 0;
  score = [0, 0];
  currentScore = 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');
  btnRoll.addEventListener('click', btnRollLogic);
  activePlayer = activePlayer === 0 ? 1 : 0;
};
init();

//Active Player Switch function
let switchPlayer = () => {
  score[activePlayer] += currentScore;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--activeNow');
  document.getElementById(`score--${activePlayer}`).textContent =
    score[activePlayer];
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;
  activePlayer = activePlayer === 0 ? 1 : 0;
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--activeNow');
};

//Roll Dice button
btnRoll.addEventListener('click', btnRollLogic);

//Hold button --check win -- else switch player
btnHold.addEventListener('click', function () {
  if (score[activePlayer] + currentScore >= 50) {
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer] + currentScore;
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    btnRoll.removeEventListener('click', btnRollLogic);
  } else {
    switchPlayer();
  }
});

btnNew.addEventListener('click', init);
