import {LitElement, html, customElement, property, css} from 'lit-element';

export type CounterChange = { value: number };

@customElement('my-counter')
export class CounterComponent extends LitElement {

    //language=css
    static styles = css`
    `;

    @property({type: Number}) set value(val: number) {
        if(val !== this._value) {
            this._value = val;
            this.requestUpdate('value');
            this.dispatchEvent(new CustomEvent<CounterChange>('value-changed', {
                detail: {
                    value: val
                }
            }));
        }
    }
    get value() { return this._value; }
    private _value: number = 10;

    constructor() {
        super();
    }

    render() {
        return html`
          <button @click="${() => this.value--}">-</button>
          ${this.value}
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
