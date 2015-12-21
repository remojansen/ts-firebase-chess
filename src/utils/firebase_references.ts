///<reference path="../interfaces/interfaces.d.ts" />

import * as Firebase from "firebase";

var ref = new Firebase('https://boiling-torch-2871.firebaseio.com/');
var lobbyRef = ref.child("lobby");

export { ref, lobbyRef };
