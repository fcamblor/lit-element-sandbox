import {LitElement, html, customElement, property, css} from 'lit-element';
import {classMap} from "lit-html/directives/class-map";
import {Router} from "../Router";

@customElement('my-nav-menu')
export class MyNavMenuComponent extends LitElement {

    //language=css
    static styles = css`
        .selected {
          font-weight: bold;
        }
    `;

    @property() path: string|undefined = undefined;

    constructor() {
        super();

        Router.onViewChanged((templateResult, path) => {
            this.path = path;
        })
    }

    render() {
        return html`
            <ul>
                <li><a href="/home" class="${classMap({ selected: this.path === '/home' })}">Home</a></li>
                <li><a href="/counters" class="${classMap({ selected: this.path === '/counters' })}">Counters</a></li>
                <li><a href="/list" class="${classMap({ selected: this.path === '/list' })}">List</a></li>
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
