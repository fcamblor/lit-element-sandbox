import { LitElement, html, customElement, property } from 'lit-element'

@customElement('hello-counter')
export class CounterComponent extends LitElement {
    @property({ type: Number }) set value(val: number) {
        const newVal = Math.min(val, this.max);
        if(this._value !== newVal) {
            this._value = newVal;
            this.requestUpdate('value');
            this.dispatchEvent(new CustomEvent('value-changed', {
                detail: {
                    value: newVal
                }
            }));
        }
    };
    get value(){ return this._value; }
    private _value = 1;

    @property({type: Number}) max = Infinity;

    render() {
        return html`
            <div>
              Counter : 
              <button @click="${() => this.value++}">+</button>
              ${this.value}
              <button @click="${() => this.value--}">-</button>
              <slot name="content"></slot>
            </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'hello-counter': CounterComponent
    }
    interface HTMLElementEventMap {
        'value-changed': CustomEvent<{ value: number }>
    }
}
