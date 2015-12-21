///<reference path="./position.d.ts" />

interface IFigure {
  id : string,
  color: string,
  type : string,
  position : IPosition,
  alive : boolean,
  selected : boolean,
  hasMoved : boolean
}
