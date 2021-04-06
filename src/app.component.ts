import {LitElement, html, customElement, property, css} from 'lit-element';
import {CounterChange} from "./counter.component";
import {Router, ViewName} from "./Router";

@customElement('my-app')
export class MyAppComponent extends LitElement {

    //language=css
    static styles = css`
      :host {
        display: block;
      }
      .grid-container {
        display: grid;
        grid-template-columns: 0.4fr 1.6fr;
        grid-template-rows: 1fr;
        gap: 0px 0px;
        grid-template-areas: "left main";
      }
    `;

    @property({type: Number}) sharedValue = 10;
    @property({type: String}) viewName: ViewName|undefined = 'home';

    constructor() {
        super();

        Router.installRoutes((viewName, context) => {
            console.log(`View changed to ${viewName}`);
            this.viewName = viewName;
            if(context.params['value']) {
                this.sharedValue = Number(context.params['value']);
            }
        })
    }

    render() {
        return html`
          <div class="grid-container">
            <div class="left">
              <my-nav-menu currentView="${this.viewName}"></my-nav-menu>
            </div>
            <div class="main">
              ${this._renderView()}
            </div>
          </div>
        `;
    }

    connectedCallback() {
        super.connectedCallback();
        // console.log("connected callback")
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        // console.log("disconnected callback")
    }

    private _renderView() {
        switch (this.viewName) {
            case 'home': return html`Welcome !`;
            case 'counters': return html`
              <my-counter value="${this.sharedValue}" @value-changed="${(event: CustomEvent<CounterChange>) => this.sharedValue = event.detail.value}">
                <span slot="test">Hello <strong>world !</strong> (${this.sharedValue})</span>
              </my-counter>
              <my-counter value="${this.sharedValue}" @value-changed="${(event: CustomEvent<CounterChange>) => this.sharedValue = event.detail.value}"></my-counter>
            `
            case 'list': return html`<my-list></my-list>`
        }
        throw new Error(`View not handled : ${this.viewName}`);
    }
}
