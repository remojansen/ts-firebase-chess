///<reference path="../interfaces/interfaces.d.ts" />

import { Component } from "../core/component";

class Footer extends Component<any> {

  public constructor() {
    super({});
  }

  public initEvents() : void {

  }

  public killEvents() : void {

  }

  public render() : string {
    return `<div class="copyright">
              <p> Create with &hearts; by <a href="http://www.remojansen.com/">Remo H. Jansen</a></p>
            </div>`;
  }
}

export { Footer };
