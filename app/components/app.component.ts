import {customElement, html, LitElement, property} from "lit-element";

@customElement('hello-app')
class AppComponent extends LitElement {
    @property({type: Number}) value = 2;

    render() {
        return html`
          <hello-counter .value="${this.value}" @value-changed="${(e: HTMLElementEventMap['value-changed']) => this.value = e.detail.value }" max="20">
            <p slot="content">Hello <strong>world</strong> !</p>
          </hello-counter>
          <hello-counter .value="${this.value}" @value-changed="${(e: HTMLElementEventMap['value-changed']) => this.value = e.detail.value }" max="10"></hello-counter>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'hello-app': AppComponent
    }
}
