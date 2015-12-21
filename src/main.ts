///<reference path="./interfaces/interfaces.d.ts" />

import * as CONST from "./constants/chess";
import { Header } from "./components/header";
import { Footer } from "./components/footer";
import { ChessGame } from "./components/game";
import * as gameUtils from "./utils/game_utils";
import * as firebaseReferences from "./utils/firebase_references";
import * as actions from "./actions/chess_game_actions";
import { store } from "./store/store";

// Render layout
var header = new Header();
var footer = new Footer();
gameUtils.render(header, document.getElementById("header"));
gameUtils.render(footer, document.getElementById("footer"));

// Change state when updates arrive from firebase
var state = store.getState();
var gameRef = firebaseReferences.ref.child(`game-${state.gameID}`);
gameRef.on('child_added', function(child) {
  debugger;
  var guid = "";
  var position = { x : 1, y : 1 };
  var moveAction = actions.moveFigure(guid, position);
  store.publish(moveAction);
});

// Render game board when state changes
function refresh() {
  // get state
  var state = store.getState();
  // create component
  var chessGame = new ChessGame(state);
  // render component
  gameUtils.render(chessGame, document.getElementById("app"));
}
store.subscribe(refresh);

// Launch game
store.publish(actions.initGame());
