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

// Get initial state
var state = store.getState();

if(state.playerColor === CONST.WHITE) {

  // Send default figures to server
  state.player1Figures.forEach((p1f) => {
    var moveAction = actions.postMoveFigure(
      state.gameID, p1f
    );
    store.publish(moveAction);
  });

  state.player2Figures.forEach((p2f) => {
    var moveAction = actions.postMoveFigure(
      state.gameID, p2f
    );
    store.publish(moveAction);
  });

}
else {

  // Read default figures from server
  var URL = `https://boiling-torch-2871.firebaseio.com/game-${state.gameID}.json`
  $.getJSON(URL, function (data) {
    var player1Figures = [];
    var player2Figures = [];
    var keys = Object.keys(data);
    keys.forEach((key) => {
      var item = data[key];
      if(item.color === CONST.WHITE) {
        player1Figures.push(item);
      }
      else {
        player2Figures.push(item);
      }
    });
    var joinGameAction = actions.joinGame(player1Figures, player2Figures);
    store.publish(joinGameAction);
  });
}

// Change state when updates arrive from firebase
var gameRef = firebaseReferences.ref.child(`game-${state.gameID}`);
gameRef.on('child_added', function(child) {
  var obj = child.val();
  if(obj !== null) {
    var moveAction = actions.moveFigure(obj);
    store.publish(moveAction);
  }
});
