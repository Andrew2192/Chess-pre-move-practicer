import { Chess } from 'https://unpkg.com/chess.js@1.4.0/dist/esm/chess.js'


const board = document.querySelector('chess-board');
const game = new Chess('8/k7/8/2K5/1Q6/8/8/8 w - - 0 1');
const statusElement = document.querySelector('#status');
const fenElement = document.querySelector('#fen');
const pgnElement = document.querySelector('#pgn');

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

board.addEventListener('drop', (e) => {
  const {source, target, setAction} = e.detail;
  let move = null;
  // see if the move is legal
  try {
    move = game.move({
    from: source,
    to: target,
    promotion: 'q' // NOTE: always promote to a queen for example simplicity
  });
  } catch (err) {
    //drop handler?
    setAction('snapback');
  }
  

  // illegal move
  /*
  if (move === null) {
    setAction('snapback');
  }
   */

  updateStatus();
});

// update the board position after the piece snap
// for castling, en passant, pawn promotion
board.addEventListener('snap-end', (e) => {
  board.setPosition(game.fen());
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