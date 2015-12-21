///<reference path="../interfaces/interfaces.d.ts" />

import { Component } from "../core/component";

class Modal extends Component<any> {

  public constructor(props) {
    super(props);
  }

  public initEvents() : void {

  }

  public killEvents() : void {

  }

  public render() : string {
    return `<div class="modal fade in" tabindex="-1" role="dialog">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                    <h4 class="modal-title">Please note</h4>
                  </div>
                  <div class="modal-body">
                    <p>${this.props.text}</p>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-default" data-dismiss="modal">OK</button>
                  </div>
                </div>
              </div>
            </div>`;
  }
}

export { Modal };
