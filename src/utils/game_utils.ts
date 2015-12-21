///<reference path="../interfaces/interfaces.d.ts" />

import * as CONST from "../constants/chess";
import { Modal } from "../components/modal";

function displayModal(text) {
  var modal = new Modal({ text : text });
  render(modal, document.getElementById("modal"));
  $(".modal").modal();
}

function guid() {
  function s4() {
    return Math.floor((1 + Math.random()) * 0x10000)
      .toString(16)
      .substring(1);
  }
  return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
    s4() + '-' + s4() + s4() + s4();
}

function isValidGuid(guid : string) {
  var patt = /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  return patt.test(guid);
}

function getGameID() : string {
  var hash = window.location.hash.replace("#","");
  if(hash === "") {
    return null;
  }
  else if(isValidGuid(hash)) {
    return hash;
  }
  throw new Error("Game id must be a valid GUID");
}

function initGame(lobbyRef) {
  var gameID = getGameID();
  if(gameID === null) {

    // new game
    var gameID = guid();
    var player1ID = guid();
    window.location.hash = gameID;
    lobbyRef.child(gameID).set({
      player1 : player1ID,
      player2 : "null"
    });
    displayModal(`Invite a friend to join by sharing the following link: ${window.location.href}`);
    return { gameID : gameID, playerID : player1ID, playerColor : CONST.WHITE };
  }
  else {

    // Join game
    var player2ID = guid();
    lobbyRef.child(gameID).update({
      player2 : player2ID
    });
    displayModal(`You have successfully joined a game!`);
    return { gameID : gameID, playerID : player2ID, playerColor : CONST.BLACK };
  }
}

function render(component, selector) {
  selector.innerHTML = component.render();
  component.initEvents();
}

export { guid, render, getGameID, initGame };
