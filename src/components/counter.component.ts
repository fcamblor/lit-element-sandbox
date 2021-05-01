import {LitElement, html, customElement, property, css} from 'lit-element';
import {classMap} from "lit-html/directives/class-map";

export type CounterChange = { value: number };

@customElement('my-counter')
export class CounterComponent extends LitElement {

    //language=css
    static styles = css`
    `;

    @property({type: Number}) set value(myValue: number) {
        if(this._value !== myValue) {
            this._value = myValue;
            this.requestUpdate('value');
            this.dispatchEvent(new CustomEvent<CounterChange>('value-changed', {
                detail: {
                    value: myValue
                }
            }));
        }
    }
    get value() { return this._value; }
    private _value = 0;

    constructor() {
        super();
    }

    render() {
        return html`
          <button @click="${() => this.value--}">-</button>
          ${this.value}
          <slot name="content"></slot>
          <button @click="${() => this.value++}">+</button>
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
