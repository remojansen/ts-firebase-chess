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

    var figures = (this.props.playerColor === CONST.WHITE) ? this.props.player1Figures : this.props.player2Figures;
    var figure = figures.filter((f) => { return f.id === guid })[0];
    figure = (<any>Object).assign({}, figure);
    figure.position = position;
    figure.hasMoved = true;

    var moveAction = actions.postMoveFigure(
      this.props.gameID, figure
    );
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

    var renderCell = (cell, cellIndex) => {

      var classes = "";
      var figureId = "";
      var playerColor = this.props.playerColor;
      var lastMove = this.props.lastMove;

      if(cell.figure !== null && cell.figure.alive === true) {
        classes += `${cell.figure.type}_${cell.figure.color}`;
        figureId = cell.figure.id;
        if(cell.figure.color === playerColor && lastMove !== playerColor) {
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

    var renderRow = (row, rowIndex) => {
      var cellsHtml = row.map(function(cell, cellIndex) {
        return renderCell(cell, cellIndex);
      }).join("\n");
      return `<div class="board-row" data-index="${rowIndex}">${cellsHtml}</div>`;
    };

    var renderNextTrun = () => {
      if(this.props.playerColor === this.props.lastMove) {
        return `Plase wait...`
      }
      else {
        return `Plase move...`;
      }
    }

    var renderBoard = (board) => {
      var rowsHtml = board.map(function(row, rowIndex, rows) {
        return renderRow(row, rowIndex);
      }).join("\n");

      var turn = renderNextTrun()

      return `<div class="turn">${turn}</div>
              <div class="board-border shadow2">
                <div class="board shadow">
                  ${rowsHtml}
                </div>
              </div>`;
    };

    return renderBoard(this.props.board);
  }
}

export { ChessGame };
