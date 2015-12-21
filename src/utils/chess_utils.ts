///<reference path="../interfaces/interfaces.d.ts" />

import * as CONST from "../constants/chess";
import * as gameUtils from "./game_utils";

export function newBoard() : ICell[][] {
  var board = [];
  for(var i = 0; i < CONST.BOARD_LENGTH; i++) {
    var row = [];
    for(var j = 0; j < CONST.BOARD_LENGTH; j++) {
      if(i % 2 === 0) {
        row.push({
          figure : null,
          color : (j % 2 === 0) ? CONST.WHITE : CONST.BLACK,
          available : false
        });
      }
      else {
        row.push({
          figure : null,
          color : (j % 2 !== 0) ? CONST.WHITE : CONST.BLACK,
          available : false
        });
      }
    }
    board.push(row);
  }
  return board;
}

export function getDefaultFigures(areBlack) : IFigure[] {

  var color = areBlack ? CONST.BLACK : CONST.WHITE;
  var firstRow = areBlack ? CONST.BLACK_FIGURES_FIRST_ROW : CONST.WHITE_FIGURES_FIRST_ROW;
  var secondRow = areBlack ? CONST.BLACK_FIGURES_SECOND_ROW : CONST.WHITE_FIGURES_SECOND_ROW;

  var figures : IFigure[] = [];

  for(var i = 0; i < CONST.BOARD_LENGTH; i ++) {
    figures.push({
      id : gameUtils.guid(),
      color: color,
      type : CONST.FIGURE_PAWN,
      position : {
        y : secondRow,
        x : i
      },
      alive : true,
      selected : false,
      hasMoved : false
    });
  }

  figures.push({ id : gameUtils.guid(), color: color, type : CONST.FIGURE_KING,
    position : { y : firstRow, x : CONST.KING_FIGURE_INITIAL_COLUMN },
    alive : true, selected : false, hasMoved : false });

  figures.push({ id : gameUtils.guid(), color: color, type : CONST.FIGURE_QUEEN,
    position : { y : firstRow, x : CONST.QUEEN_FIGURE_INITIAL_COLUMN },
    alive : true, selected : false, hasMoved : false });

  figures.push({ id : gameUtils.guid(), color: color, type : CONST.FIGURE_BISHOP,
    position : { y : firstRow, x : CONST.BISHOP_LEFT_FIGURE_INITIAL_COLUMN },
    alive : true, selected : false, hasMoved : false });

  figures.push({ id : gameUtils.guid(), color: color, type : CONST.FIGURE_BISHOP,
    position : { y : firstRow, x : CONST.BISHOP_RIGHT_FIGURE_INITIAL_COLUMN },
    alive : true, selected : false, hasMoved : false });

  figures.push({ id : gameUtils.guid(), color: color, type : CONST.FIGURE_KNIGHT,
    position : { y : firstRow, x : CONST.KNIGHT_LEFT_FIGURE_INITIAL_COLUMN },
    alive : true, selected : false, hasMoved : false });

  figures.push({ id : gameUtils.guid(), color: color, type : CONST.FIGURE_KNIGHT,
    position : { y : firstRow, x : CONST.KNIGHT_RIGHT_FIGURE_INITIAL_COLUMN },
    alive : true, selected : false, hasMoved : false });

  figures.push({ id : gameUtils.guid(), color: color, type : CONST.FIGURE_TOWER,
    position : { y : firstRow, x : CONST.TOWER_LEFT_FIGURE_INITIAL_COLUMN },
    alive : true, selected : false, hasMoved : false });

  figures.push({ id : gameUtils.guid(), color: color, type : CONST.FIGURE_TOWER,
    position : { y : firstRow, x : CONST.TOWER_RIGHT_FIGURE_INITIAL_COLUMN },
    alive : true, selected : false, hasMoved : false });

  return figures;
}

export function getDefaultWhiteFigures() : IFigure[] {
  return getDefaultFigures(false);
}

export function getDefaultBlackFigures() : IFigure[] {
  return getDefaultFigures(true);
}

export function selectFigure(state : IChessGameProps, action) {

  var figures = (state.isPlayerOne) ? state.player1Figures : state.player2Figures;
  var figure = figures.filter((f) => { return f.id === action.guid })[0];
  var alreadySelected = figure.selected;

  // stop displaying available moves in board
  var player1Figures = state.player1Figures.map((figure) => {
    figure.selected = false; return figure;
  });

  var player2Figures = state.player2Figures.map((figure) => {
    figure.selected = false; return figure;
  });

  // create new board
  var board = newBoard();

  if(alreadySelected === false) {
    if(state.isPlayerOne) {
      player1Figures = player1Figures.map((f) => {
        if(f.id === action.guid) {
          f.selected = true;
        }
        return f;
      });
    }
    else {
      player2Figures = player2Figures.map((f) => {
        if(f.id === action.guid) {
          f.selected = true;
        }
        return f;
      });
    }
  }

  // add
  board = positionFigures(board, player1Figures);
  board = positionFigures(board, player2Figures);
  board = flagAvailableCells(board, player1Figures.concat(player2Figures));

  return {
    gameID : state.gameID,
    playerID : state.playerID,
    isPlayerOne : state.isPlayerOne,
    board : board,
    player1Figures : player1Figures,
    player2Figures : player2Figures
  };
}

export function positionFigures(board, figures) {

  for(var y = 0; y < CONST.BOARD_LENGTH; y++) {
    for(var x = 0; x < CONST.BOARD_LENGTH; x++) {
      var matches = figures.filter(function(figure) {
        return figure.position.x === x && figure.position.y === y;
      });
      if(matches.length !== 0) {
        var figure = matches[0];
        if(figure.alive == true) board[y][x].figure = figure;
      }
    }
  }
  return board;
}

export function flagAvailableCells(board, figures) {

  var selectedFigure = figures.filter(function(figure){
    return figure.selected === true;
  })[0] || null;

  var selectedFigureMoves = getFigureAvailableMoves(selectedFigure, board);

  for(var y = 0; y < CONST.BOARD_LENGTH; y++) {
    for(var x = 0; x < CONST.BOARD_LENGTH; x++) {
      if(selectedFigure !== null) {
        var matchedMoves = selectedFigureMoves.filter((move) => {
          return move.x === x && move.y === y;
        });
        if(matchedMoves.length !== 0) {
          board[y][x].available = true;
        }
      }
    }
  }
  return board;
}

function cellContainsFigure(position : IPosition, board : ICell[][]) {
  if(position.y < 0 || position.y > 7 || position.x < 0 || position.y > 7) return false;
  var cell = board[position.y][position.x];
  return (cell.figure !== null && cell.figure.alive !== false);
}

function cellContainsEnemyFigure(color: string, position : IPosition, board : ICell[][]) {
  if(position.y < 0 || position.y > 7 || position.x < 0 || position.y > 7) return false;
  if (cellContainsFigure(position, board) === false) return false;
  var cell = board[position.y][position.x];
  return (cell.figure !== null && cell.figure.color !== color && cell.figure.alive !== false);
}

export function getFigureAvailableMoves(figure : IFigure, board : ICell[][]) : IPosition[] {

  if(figure === null) return [];

  var negative = -1;
  var positive = 1;
  var yMovement = (figure.color === CONST.WHITE) ? negative : positive;
  var moves : IPosition[] = [];

  switch(figure.type) {
    case CONST.FIGURE_KING:
      break;
    case CONST.FIGURE_QUEEN:
      break;
    case CONST.FIGURE_BISHOP:
      break;
    case CONST.FIGURE_KNIGHT:
      break;
    case CONST.FIGURE_TOWER:
      break;
    case CONST.FIGURE_PAWN:
      // pawn can move two cells foward if first move
      if(figure.hasMoved === false) {
        moves.push({ x : figure.position.x, y : figure.position.y + (yMovement * 1) });
        moves.push({ x : figure.position.x, y : figure.position.y + (yMovement * 2) });
      }
      // pawn can move only one step foward if not already in use
      else {
        let p = { x : figure.position.x, y : figure.position.y + (yMovement * 1) };
        if(cellContainsFigure(p, board) === false) moves.push(p);
      }
      // pawn can move one step diagonally to kill an enemy
      let pl = { x : (figure.position.x - 1), y : figure.position.y + (yMovement * 1) };
      let pr = { x : (figure.position.x + 1), y : figure.position.y + (yMovement * 1) };
      if(cellContainsEnemyFigure(figure.color, pl, board) === true) moves.push(pl);
      if(cellContainsEnemyFigure(figure.color, pr, board) === true) moves.push(pr);
      break;
    default:
      moves = [];
  }
  return moves;
}

export function moveFigure(state : IChessGameProps, action) {

    var playerFigures = (state.isPlayerOne) ? state.player1Figures : state.player2Figures;
    var selectedFigure = playerFigures.filter((f) => { return f.id === action.guid })[0];

    // stop displaying available moves in board
    var player1Figures = state.player1Figures.map((figure) => {
      figure.selected = false; return figure;
    });

    var player2Figures = state.player2Figures.map((figure) => {
      figure.selected = false; return figure;
    });

    // create new board
    var board = newBoard();

    // move figure
    if(state.isPlayerOne) {
      player1Figures = player1Figures.map((f) => {
        if(f.id === action.guid) {
          f.position = action.position;
          f.hasMoved = true;
        }
        return f;
      });
      // kill figure
      player2Figures = player2Figures.map((f) => {
        if(f.position.x === action.position.x && f.position.y === action.position.y) {
          f.alive = false;
        }
        return f;
      });
    }
    else {
      player2Figures = player2Figures.map((f) => {
        if(f.id === action.guid) {
          f.position = action.position;
          f.hasMoved = true;
        }
        return f;
      });
      // kill figure
      player1Figures = player1Figures.map((f) => {
        if(f.position.x === action.position.x && f.position.y === action.position.y) {
          f.alive = false;
        }
        return f;
      });
    }

    // add
    board = positionFigures(board, player1Figures);
    board = positionFigures(board, player2Figures);

    return {
      gameID : state.gameID,
      playerID : state.playerID,
      isPlayerOne : state.isPlayerOne,
      board : board,
      player1Figures : player1Figures,
      player2Figures : player2Figures
    };
}
