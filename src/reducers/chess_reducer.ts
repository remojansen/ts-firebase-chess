///<reference path="../interfaces/interfaces.d.ts" />

import * as ACTIONS from "../constants/actions";
import * as gameUtils from "../utils/game_utils";
import * as chessUtils from "../utils/chess_utils";
import * as firebaseReferences from "../utils/firebase_references";

// *****************************************************************************
// CREATE DEFAULT STATE
// *****************************************************************************

// Create new board
var board = chessUtils.newBoard();

// Get default figures
var player1Figures = chessUtils.getDefaultWhiteFigures();
var player2Figures = chessUtils.getDefaultBlackFigures();

// Place figures in board
chessUtils.positionFigures(board, player1Figures);
chessUtils.positionFigures(board, player2Figures);

// init game
var { gameID, playerID, isPlayerOne } = gameUtils.initGame(firebaseReferences.lobbyRef);

// declare default state
var defaultState : IChessGameProps = {
  gameID : gameID,
  playerID : playerID,
  isPlayerOne : isPlayerOne,
  board : board,
  player1Figures : player1Figures,
  player2Figures : player2Figures
};

// *****************************************************************************
// CREATE STORE
// *****************************************************************************
function chessReducer(state, action) {
  switch(action.type) {
    case ACTIONS.JOIN_GAME:
      return state;
    case ACTIONS.LEAVE_GAME:
      return state;
    case ACTIONS.SELECT_FIGURE:
      return chessUtils.selectFigure(state, action);
    case ACTIONS.MOVE_FIGURE:
      return chessUtils.moveFigure(state, action);
    case ACTIONS.RESTORE_FIGURE:
      return state;
    case ACTIONS.INIT_GAME:
    default:
      return defaultState;
  }
}

export { chessReducer };
