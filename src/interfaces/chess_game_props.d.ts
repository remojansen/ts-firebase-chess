///<reference path="./cell.d.ts" />
///<reference path="./figure.d.ts" />

interface IChessGameProps {
  lastMove : string,
  gameID : string,
  playerID : string,
  playerColor : string,
  board : ICell[][],
  player1Figures : IFigure[],
  player2Figures : IFigure[]
}
