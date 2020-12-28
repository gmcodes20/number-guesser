/*
GAME FUNCTIONS:
    - Player must guess a number between a min and a max
    - Player gets a certain amount of guesses
    - Notify Player of guesses remaining
    - Notify player of teh correct answer if loose
    - Let player choose to play again.
 */

//  Game value

let min = 5, max = 50, winningNum = getWinningNumber(min, max), guessesLeft = 4;

// UI Elements
const game = document.querySelector('#game'),
  minNUm = document.querySelector('.min-num'),
  maxNum = document.querySelector('.max-num'),
  guessBtn = document.querySelector('#guess-btn'),
  guessInput = document.querySelector('#guess-input'),
  message = document.querySelector('.message');

//  Assign UI min and max
minNUm.textContent = min;
maxNum.textContent = max;

// Listen for play again 
game.addEventListener('mousedown', function (e) {
  if (e.target.className === 'play-again') {
    window.location.reload();
  }
})
// Listen for Guess
guessBtn.addEventListener('click', function () {
  let guess = parseInt(guessInput.value);

  //validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a number between ${min} and ${max}`, `red `);

  }

  //check if won
  else if (guess === winningNum) {
    gameOver(true, `${winningNum} is correct, YOU WIN!`)
  }

  // check is lossing 
  else {
    guessesLeft -= 1;
    if (guessesLeft == 0) {
      gameOver(false, `Game Over! You lost. ${winningNum} was the correct number`)
    } else {
      // Game continue, answer wrong
      guessInput.style.borderColor = 'red'
      // Clear input
      guessInput.value = "";
      setMessage(`${guess} is NOT correct,  ${guessesLeft} guess left`, 'red');

    }
  }
})

// function set message 
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;

}

function gameOver(won, msg) {
  won === true ? color = 'green' : color = 'red'
  guessInput.disabled = true;
  guessInput.value = "";
  guessInput.style.borderColor = color;
  message.style.color = color;
  message.textContent = msg;
  guessBtn.value = 'Try Again';
  guessBtn.className += 'play-again'
}

function getWinningNumber(min, max) {
  return (Math.floor(Math.random() * (max - min + 1) + min))

}