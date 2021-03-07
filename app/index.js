import { LitElement, html } from 'https://unpkg.com/lit-element@2.4.0/lit-element.js?module';


class CounterComponent extends LitElement {
    static get properties() {
        return {
            value: {type: Number},
            max: {type: Number}
        };
    }

    constructor() {
        super();

        this.max = Infinity;
        this.value = 1;
    }

    render() {
        return html`
            <div>
              Counter : <button @click="${this.increment}">+</button>${this.value}</span><button @click="${this.decrement}">-</button>
              <slot name="content"></slot>
            </div>
        `;
    }

    connectedCallback() {
        super.connectedCallback();
        console.log("connected callback")
    }

    increment(event) {
        this.value = Math.min(this.value+1, this.max);
    }
    decrement(event) {
        this.value--;
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        console.log("disconnected callback")
    }
}

customElements.define('hello-counter', CounterComponent)
