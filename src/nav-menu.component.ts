import {LitElement, html, customElement, property, css} from 'lit-element';
import {classMap} from "lit-html/directives/class-map";
import {ViewName} from "./Router";

@customElement('my-nav-menu')
export class MyNavMenuComponent extends LitElement {

    //language=css
    static styles = css`
        .selected {
          font-weight: bold;
        }
    `;

    @property({type: String}) currentView: ViewName|undefined = undefined;

    constructor() {
        super();
    }

    render() {
        return html`
            Current view : ${this.currentView}
            <ul>
                <li><a href="/home" class="${classMap({ selected: this.currentView==='home' })}">Home</a></li>
                <li><a href="/counters" class="${classMap({ selected: this.currentView==='counters' })}">Counters</a></li>
                <li><a href="/counters/42">Counters 42</a></li>
            </ul>
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
