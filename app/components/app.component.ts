import {customElement, html, LitElement} from "lit-element";

@customElement('hello-app')
class AppComponent extends LitElement {
    render() {
        return html`
          <hello-counter value="10" max="20">
            <p slot="content">Hello <strong>world</strong> !</p>
          </hello-counter>
          <hello-counter value="10" max="20"></hello-counter>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'hello-app': AppComponent
    }
}
