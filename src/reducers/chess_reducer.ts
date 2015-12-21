///<reference path="../interfaces/interfaces.d.ts" />

import * as CONST from "../constants/chess";
import * as ACTIONS from "../constants/actions";
import * as gameUtils from "../utils/game_utils";
import * as chessUtils from "../utils/chess_utils";
import * as firebaseReferences from "../utils/firebase_references";

// *****************************************************************************
// CREATE DEFAULT STATE
// *****************************************************************************

// init game
var { gameID, playerID, playerColor } = gameUtils.initGame(firebaseReferences.lobbyRef);

// Create new board
var board = chessUtils.newBoard();

// Get default figures
var player1Figures = chessUtils.getDefaultWhiteFigures();
var player2Figures = chessUtils.getDefaultBlackFigures();

// Place figures in board
chessUtils.positionFigures(board, player1Figures);
chessUtils.positionFigures(board, player2Figures);

// declare default state
var defaultState : IChessGameProps = {
  lastMove : CONST.BLACK,
  gameID : gameID,
  playerID : playerID,
  playerColor : playerColor,
  board : board,
  player1Figures : player1Figures,
  player2Figures : player2Figures
};

// *****************************************************************************
// CREATE STORE
// *****************************************************************************
function chessReducer(state, action) {
  switch(action.type) {
    case ACTIONS.SELECT_FIGURE:
      return chessUtils.selectFigure(state, action);
    case ACTIONS.POST_MOVE_FIGURE:
        return state;
    case ACTIONS.MOVE_FIGURE:
      return chessUtils.moveFigure(state, action);
    case ACTIONS.RESTORE_FIGURE:
      return state;
    case ACTIONS.JOIN_GAME:
      // Create new board
      var board = chessUtils.newBoard();

      // Place figures in board
      chessUtils.positionFigures(board, action.player1Figures);
      chessUtils.positionFigures(board, action.player2Figures);

      return {
        lastMove : state.lastMove,
        gameID : state.gameID,
        playerID : state.playerID,
        playerColor : state.playerColor,
        board : board,
        player1Figures : action.player1Figures,
        player2Figures : action.player2Figures
      };
    case ACTIONS.INIT_GAME:
    default:
      return defaultState;
  }
}

export { chessReducer };
