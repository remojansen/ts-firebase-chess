///<reference path="../interfaces/interfaces.d.ts" />

import { Component } from "../core/component";

class Header extends Component<any> {

  public constructor() {
    super({});
  }

  public initEvents() : void {

  }

  public killEvents() : void {

  }

  public render() : string {
    return `<nav class="navbar navbar-default navbar-static-top">
              <div class="container">
                <div class="navbar-header">
                  <a class="navbar-brand" href="#">
                    <img alt="Brand" src="./assets/knight_w.png">&nbsp;TypeScript Chess
                  </a>
                </div>
              </div>
            </nav>`;
  }
}

export { Header };
