let computerMove;

let score = JSON.parse(localStorage.getItem("score"));

if (score === null) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
}
updateScore();

let isAutoPlaying = true;
let playerMove, intervalId;
function autoPlay() {
  if (isAutoPlaying) {
    intervalId = setInterval(() => {
      playerMove = pickComputerMove();
      playGame(playerMove)
    }, 1000);
    isAutoPlaying = false;
  } else {
    clearInterval(intervalId);
    isAutoPlaying = true;
  }
}

document.querySelector('.js-rock-button')
  .addEventListener('click', () => {
    playGame('Rock');
  });

document.querySelector('.js-paper-button')
  .addEventListener('click', () => {
    playGame('Paper');
  });

document.querySelector('.js-scissors-button')
  .addEventListener('click', () => {
    playGame('Scissor');
  });

document.body.addEventListener('keydown', (event) => {
  if (event.key === 'r') {
    playGame('Rock');
  } else if (event.key === 'p') {
    playGame('Paper');
  } else if (event.key === 's') {
    playGame('Scissor');
  }
});

function playGame(playerMove) {
  computerMove = pickComputerMove();

  let result;

  if (playerMove === "Scissor") {
    if (computerMove === "Rock") {
      result = "You lose";
    } else if (computerMove === "Paper") {
      result = "You win";
    } else if (computerMove === "Scissor") {
      result = "Tie";
    }
  } else if (playerMove === "Paper") {
    if (computerMove === "Rock") {
      result = "You win";
    } else if (computerMove === "Paper") {
      result = "Tie";
    } else if (computerMove === "Scissor") {
      result = "You lose";
    }
  } else if (playerMove === "Rock") {
    if (computerMove === "Rock") {
      result = "Tie";
    } else if (computerMove === "Paper") {
      result = "You lose";
    } else if (computerMove === "Scissor") {
      result = "You win";
    }
  }

  if (result === "You win") {
    score.wins += 1;
  } else if (result === "You lose") {
    score.losses += 1;
  } else if (result === "Tie") {
    score.ties += 1;
  }

  localStorage.setItem("score", JSON.stringify(score));

  document.querySelector(".result").innerHTML = result;

  document.querySelector(
    ".moves-player"
  ).innerHTML = `You ${playerMove}`;
  
  document.querySelector('.moves-comp').innerHTML = `${computerMove} Computer`;

  updateScore();
}

function updateScore() {
  document.querySelector(
    ".score-board"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

function pickComputerMove() {
  const randomNum = Math.random();

  if (randomNum <= 1 / 3) {
    computerMove = "Rock";
  } else if (randomNum > 1 / 3 && randomNum <= 2 / 3) {
    computerMove = "Paper";
  } else {
    computerMove = "Scissor";
  }

  return computerMove;
}