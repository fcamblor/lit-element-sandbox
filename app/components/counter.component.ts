import { LitElement, html, customElement, property } from 'lit-element'

@customElement('hello-counter')
export class CounterComponent extends LitElement {
    @property({ type: Number }) value = 1;
    @property({type: Number}) max = Infinity;

    render() {
        return html`
            <div>
              Counter : 
              <button @click="${this.increment}">+</button>
              ${this.value}
              <button @click="${this.decrement}">-</button>
            </div>
        `;
    }

    increment() { this.value = Math.min(this.value+1, this.max); }
    decrement() { this.value--; }
}

declare global {
    interface HTMLElementTagNameMap {
        'hello-counter': CounterComponent
    }
}
