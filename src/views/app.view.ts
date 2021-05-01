import {LitElement, html, customElement, property, css} from 'lit-element';
import {classMap} from "lit-html/directives/class-map";
import {CounterChange} from "../components/counter.component";
import {Router} from "../Router";
import {TemplateResult} from "lit-html";

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

    @property({type: Object}) subView: TemplateResult|undefined = undefined;

    constructor() {
        super();

        Router.installRoutes((templateResult, path) => {
            this.subView = templateResult;
        });
    }

    render() {
        return html`
          <div class="grid-container">
            <div class="left">
              <my-nav-menu></my-nav-menu>
            </div>
            <div class="main">
              ${this.subView}
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
}
