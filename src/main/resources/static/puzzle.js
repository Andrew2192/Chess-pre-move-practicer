import { Chess } from 'https://unpkg.com/chess.js@1.4.0/dist/esm/chess.js'

const startButton = document.querySelector('#startButton');

const fenString = 'k7/7R/2K5/8/8/8/8/8 w - - 0 1'
const board = document.querySelector('chess-board');
const game = new Chess(fenString);
const statusElement = document.querySelector('#status');
const fenElement = document.querySelector('#fen');
const pgnElement = document.querySelector('#pgn');
const result = document.querySelector('#result');
const reset = document.querySelector('#reset');
const settingsButton = document.querySelector('#settingsButton');
const closeSettings = document.querySelector('#closeSettings');
const soundToggle = document.querySelector('#soundToggle');

const queue = [];

function showResult(text) {
  result.textContent = text;
  result.hidden = false;
}

function playSound() {
  if (soundToggle.checked) {
    let sound = new Audio('move.mp3');
    sound.play();
  }
}

function countdown(n, callback) {
  if (n === 0 || n < 0) {
    console.log('moved');
    callback();
    return;
  }
  console.log(n);
  setTimeout(() => countdown(n - 1, callback), 1000);
}

settingsButton.addEventListener('click', () => {
  settingsContainer.style.display = 'block';
});

closeSettings.addEventListener('click', () => {
  settingsContainer.style.display = 'none';
});



startButton.addEventListener('click', () => {
  board.setPosition(game.fen());
  console.log('Start button pressed');
  let i = 0;
  function playNextMove() {
    if (i >= queue.length) {
      //showResult("Queue over");
      return;
    }
  
    let move = null;
  try {
      move = game.move({
      from: queue[i].source,
      to: queue[i].target,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
      });
      
      
      console.log("Place successful");
      board.setPosition(game.fen());
      playSound();
    } catch (err) {
      console.error(err.message);
      showResult(err.message);
      return;
    }

    updateStatus();

    countdown(1, () => {
      makeRandomMove();
      updateStatus();

      i++;

      countdown(1, playNextMove);
    });
  }

  countdown(1, playNextMove);

});

reset.addEventListener('click', () => {
  console.log('Reset button pressed');
  // Reset game to FEN
  game.load(fenString);

  // Clear queue 
  queue.length = 0;
  
  //clear board
  board.setPosition(game.fen());

  // Clear game over message
  result.hidden = true;

  updateStatus();
  
});




board.addEventListener('drag-start', (e) => {
  const {source, piece, position, orientation} = e.detail;

  // do not pick up pieces if the game is over
  if (game.isGameOver()) {
    e.preventDefault();
    return;
  }

  // only pick up pieces for the side to move
  if ((game.turn() === 'w' && piece.search(/^b/) !== -1) ||
      (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
    e.preventDefault();
    return;
  }
});

function makeRandomMove () {
  let possibleMoves = game.moves();

  // game over
  if (possibleMoves.length === 0) {
    return;
  }

  const randomIdx = Math.floor(Math.random() * possibleMoves.length);
  game.move(possibleMoves[randomIdx]);
  board.setPosition(game.fen());
  playSound();
}

board.addEventListener('drop', (e) => {
  const {source, target, setAction} = e.detail;
  console.log("DEBUG");
  console.log("DEBUG");
  console.log("DEBUG");
  console.log(e.detail);

  queue.push({
    source: source, 
    target: target
  });

  console.log(queue);
});

function updateStatus () {
  let status = '';

  let moveColor = 'White';
  if (game.turn() === 'b') {
    moveColor = 'Black';
  }

  if (game.isCheckmate()) {
    // checkmate?
    status = `Game over, ${moveColor} is in checkmate.`;
  } else if (game.isDraw()) {
    // draw?
    status = 'Game over, drawn position';
  } else {
    // game still on
    status = `${moveColor} to move`;
    // check?
    if (game.inCheck()) {
      status += `, ${moveColor} is in check`;
    }
  }

  statusElement.innerHTML = status;
  fenElement.innerHTML = game.fen();
  pgnElement.innerHTML = game.pgn();
}

updateStatus();