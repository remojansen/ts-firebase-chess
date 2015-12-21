///<reference path="./cell.d.ts" />
///<reference path="./figure.d.ts" />

interface IChessGameProps {
  gameID : string,
  playerID : string,
  isPlayerOne : boolean,
  board : ICell[][],
  player1Figures : IFigure[],
  player2Figures : IFigure[]
}
