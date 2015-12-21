///<reference path="../interfaces/interfaces.d.ts" />

abstract class Component<T> {

  public props : T;

  public constructor(props : T) {
    this.props = props;
  }

  abstract initEvents() : void;
  abstract killEvents() : void;
  abstract render() : string;
}

export { Component };
