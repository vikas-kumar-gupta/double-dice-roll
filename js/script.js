var scores, roundScore, activePlayer;
let isPlaying;

init();

document.querySelector('.btn--roll').addEventListener('click', function () {
    if (isPlaying) {
        //  RANDOM NUMBER GENERATOR
        var dice1 = Math.floor(Math.random() * 6) + 1;
        var dice2 = Math.floor(Math.random() * 6) + 1;

        //  DISPLAY THE RESULT
        document.getElementById('dice-1').style.display = 'block';
        document.getElementById('dice-2').style.display = 'block';

        document.getElementById('dice-1').src = 'img/dice-' + dice1 + '.png';
        document.getElementById('dice-2').src = 'img/dice-' + dice2 + '.png';

        if (dice1 !== 1 && dice2 !== 1) {
            roundScore += dice1 + dice2;
            document.getElementById('current--' + activePlayer).textContent = roundScore;
        } else {
            nextPlayer();
        }
    }

});

document.querySelector('.btn--hold').addEventListener('click', function () {
    if (isPlaying) {
        //  ADD CURENT SCORE TO GLOBAL SCORE
        scores[activePlayer] += roundScore;

        //  UPDATE THE UI
        document.getElementById('score--' + activePlayer).textContent = scores[activePlayer];
        var input = document.querySelector('.final-score').value;
        var winningScore;
        if (input) {
            winningScore = input;
        } else {
            winningScore = 100;
        }
        //  CHECK IF PLAYER WON THE GAME
        if (scores[activePlayer] >= winningScore) {
            document.querySelector('#name--' + activePlayer).textContent = 'Winner';
            document.getElementById('dice-1').style.display = 'none';
            document.getElementById('dice-2').style.display = 'none';
            document.querySelector('.player--' + activePlayer).classList.add('player--winner');
            document.querySelector('.player--' + activePlayer).classList.remove('player--active');
            isPlaying = false;
        } else {
            //  NEXT PLAYER 
            nextPlayer();
        }
    }

});

document.querySelector('.btn--new').addEventListener('click', init);

function nextPlayer() {
    activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
    roundScore = 0;

    document.getElementById('current--0').textContent = 0;
    document.getElementById('current--1').textContent = 0;

    document.querySelector('.player--0').classList.toggle('player--active');
    document.querySelector('.player--1').classList.toggle('player--active');

    diceDOM.style.display = 'none';
}

function init() {

    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0;
    isPlaying = true;

    document.getElementById('score--0').textContent = '0';
    document.getElementById('current--0').textContent = '0';
    document.getElementById('score--1').textContent = '0';
    document.getElementById('current--1').textContent = '0';
    document.querySelector('#name--0').textContent = 'Player 1';
    document.querySelector('#name--1').textContent = 'Player 2';
    document.querySelector('.player--0').classList.remove('player--winner');
    document.querySelector('.player--1').classList.remove('player--winner');
    document.querySelector('.player--0').classList.remove('player--active');
    document.querySelector('.player--1').classList.remove('player--active');
    document.querySelector('.player--0').classList.add('player--active');

    document.getElementById('dice-1').style.display = 'none';
    document.getElementById('dice-2').style.display = 'none';
}