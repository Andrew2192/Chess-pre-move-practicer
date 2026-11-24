import { Chess } from 'https://unpkg.com/chess.js@1.4.0/dist/esm/chess.js'

const startButton = document.querySelector('#startButton');

function countdown(n, callback) {
  if (n === 0 || n < 0) {
    console.log('moved');
    callback();
    return;
  }
  console.log(n);
  setTimeout(() => countdown(n - 1, callback), 1000);
}

startButton.addEventListener('click', () => {
  //reset board
  board.setPosition(game.fen());
  // 
  console.log('Start button pressed');

  let i = 0;
  
  function playNextMove() {
    if (i >= queue.length) {
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
    } catch (err) {
      console.error(err.message);
      i++;
      playNextMove();
      return;
    }

    updateStatus();

    countdown(3, () => {
      makeRandomMove();
      updateStatus();

      i++;

      countdown(3, playNextMove);
    });
  }

  playNextMove();

  /*
  for (const q of queue) {
    let move = null;
    // see if the move is legal
    try {
      move = game.move({
      from: q.source,
      to: q.target,
      promotion: 'q' // NOTE: always promote to a queen for example simplicity
      });
      
      
      console.log("Place successful");
    } catch (err) {
      console.error(err.message);
    }

    updateStatus();
    window.setTimeout(makeRandomMove, 250);
  } */
  

});


const board = document.querySelector('chess-board');
const game = new Chess('k7/7R/2K5/8/8/8/8/8 w - - 0 1');
const statusElement = document.querySelector('#status');
const fenElement = document.querySelector('#fen');
const pgnElement = document.querySelector('#pgn');

const queue = [];





/*const line = [];
line.push('Ana');
line.push('Ben');
const next = line.shift(); // 'Ana'; line is now ['Ben'] */

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
  /*

  let move = null;
  // see if the move is legal
  try {
    move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });
    console.log("Place successful");
  } catch (err) {
    console.error(err.message);
      setAction('snapback');
  }

  updateStatus();
  window.setTimeout(makeRandomMove, 250);
  */
});

// update the board position after the piece snap
// for castling, en passant, pawn promotion
/*
board.addEventListener('snap-end', (e) => {
  board.setPosition(game.fen());
});
*/



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