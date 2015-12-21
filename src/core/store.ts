class Store {

  private _state;
  private _rootReducer;
  private _subscribers;

  public constructor(rootReducer) {
    this._rootReducer = rootReducer;
    this._state = {};
    this._subscribers = [];
  }

  public getState() : any {
    // return current state or default state
    return this._state;
  }

  public setState(newState) {
    this._state = newState;
  }

  public publish(action) {

    // update state
    this._state = this._rootReducer(this._state, action);

    // call subscribers
    this._subscribers.forEach((handler) => {
        handler();
    });
  }

  public subscribe(handler : Function) {
    this._subscribers.push(handler);
  }

}

export { Store };
