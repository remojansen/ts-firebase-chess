///<reference path="../interfaces/interfaces.d.ts" />

import * as ACTIONS from "../constants/actions";

function initGame() {
  return {
    type : ACTIONS.INIT_GAME
  };
}

function selectFigure(guid : string) {
  return {
    type : ACTIONS.SELECT_FIGURE,
    guid : guid
  };
}

function moveFigure(guid : string, position : IPosition) {
  return {
    type : ACTIONS.MOVE_FIGURE,
    guid : guid,
    position : position
  };
}

export { initGame, selectFigure, moveFigure };
