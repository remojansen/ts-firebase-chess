///<reference path="../interfaces/interfaces.d.ts" />

import { Store } from "../core/store";
import { chessReducer } from "../reducers/chess_reducer";

var store = new Store(chessReducer);

export { store };
