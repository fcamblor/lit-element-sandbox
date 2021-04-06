import {LitElement, html, customElement, property, css} from 'lit-element';
import {CounterChange} from "./counter.component";

@customElement('my-app')
export class MyAppComponent extends LitElement {

    //language=css
    static styles = css`
    `;

    @property({type: Number}) sharedValue = 10;

    constructor() {
        super();
    }

    render() {
        return html`
              <my-counter value="${this.sharedValue}" @value-changed="${(event: CustomEvent<CounterChange>) => this.sharedValue = event.detail.value}"></my-counter>
              <my-counter value="${this.sharedValue}" @value-changed="${(event: CustomEvent<CounterChange>) => this.sharedValue = event.detail.value}"></my-counter>
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
