///<reference path="../interfaces/interfaces.d.ts" />

import * as ACTIONS from "../constants/actions";
import * as firebaseReferences from "../utils/firebase_references";

function initGame() {
  return {
    type : ACTIONS.INIT_GAME
  };
}

function joinGame(player1Figures, player2Figures) {
  return {
    type : ACTIONS.JOIN_GAME,
    player1Figures : player1Figures,
    player2Figures : player2Figures
  };
}

function selectFigure(guid : string) {
  return {
    type : ACTIONS.SELECT_FIGURE,
    guid : guid
  };
}

function moveFigure(figure : IFigure) {
  return {
    type : ACTIONS.MOVE_FIGURE,
    figure : figure
  };
}

function postMoveFigure(gameID, figure : IFigure) {
  var gameRef = firebaseReferences.ref.child(`game-${gameID}`);
  gameRef.push(figure);
  return {
    type : ACTIONS.POST_MOVE_FIGURE
  };
}

export { initGame, joinGame, selectFigure, moveFigure, postMoveFigure };
