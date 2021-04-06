import {LitElement, html, customElement, property, css} from 'lit-element';

@customElement('my-counter')
export class CounterComponent extends LitElement {

    //language=css
    static styles = css`
    `;

    @property({type: Number}) value = 10;

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
