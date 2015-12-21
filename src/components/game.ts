///<reference path="../interfaces/interfaces.d.ts" />

import * as CONST from "../constants/chess";
import { Component } from "../core/component";
import { store } from "../store/store";
import * as actions from "../actions/chess_game_actions";

class ChessGame extends Component<IChessGameProps> {

  public constructor(props : IChessGameProps) {
    super(props);
  }

  private handleSelect($cell) {
    var guid = $cell.data("guid");
    var selectAction = actions.selectFigure(guid);
    store.publish(selectAction);
  }

  private handleMove(guid, $cell) {
    var position = {
      x : $cell.data("index"),
      y : $cell.parent().data("index")
    };
    var moveAction = actions.moveFigure(guid, position);
    store.publish(moveAction);
  }

  public initEvents() : void {
    $(".figure").on("click", (e) => {
      var $cell = $(e.currentTarget);
      this.handleSelect($cell);
    });
    $(".available").on("click", (e) => {
      var $cell = $(e.currentTarget);
      var guid = $(".selected").data("guid");
      this.handleMove(guid, $cell);
    });
  }

  public killEvents() : void {
    $(".figure").off("click");
  }

  public render() : string {

    var renderCell = (playerColor, cell, cellIndex) => {
      var classes = "";
      var figureId = "";
      if(cell.figure !== null && cell.figure.alive === true) {
        classes += `${cell.figure.type}_${cell.figure.color}`;
        figureId = cell.figure.id;
        if(cell.figure.color === playerColor) {
          classes += " figure";
        }
        if(cell.figure.selected === true) {
          classes += " selected";
        }
      }
      if(cell.available === true) {
        classes += " available";
      }
      return `<div class="cell ${cell.color} ${classes}"
                   data-guid="${figureId}" data-index="${cellIndex}">
             </div>`;
    };

    var renderRow = (playerColor, row, rowIndex) => {
      var cellsHtml = row.map(function(cell, cellIndex) {
        return renderCell(playerColor, cell, cellIndex);
      }).join("\n");
      return `<div class="board-row" data-index="${rowIndex}">${cellsHtml}</div>`;
    };

    var renderBoard = (playerColor, board) => {
      var rowsHtml = board.map(function(row, rowIndex, rows) {
        return renderRow(playerColor, row, rowIndex);
      }).join("\n");
      return `<div class="board-border shadow2">
                <div class="board shadow">
                  ${rowsHtml}
                </div>
              </div>`;
    };

    // Player one is black
    var playerColor = this.props.isPlayerOne ? CONST.WHITE : CONST.BLACK;
    return renderBoard(playerColor, this.props.board);
  }
}

export { ChessGame };
