import {css, customElement, html, LitElement, property} from "lit-element";
import {classMap} from "lit-html/directives/class-map";
import page from "page";


@customElement('hello-nav-menu')
class AppNavMenuComponent extends LitElement {
    @property() selected = "home";

    // language=css
    static styles = css`
        .selected {
          font-weight: bold;
        }
    `

    render() {
        return html`
            <ul>
              <li class="${classMap({selected: this.selected==='home'})}" @click="${() => page('/home')}">Home</li>
              <li class="${classMap({selected: this.selected==='counters'})}" @click="${() => page('/counters')}">Counters</li>
              <li class="${classMap({selected: this.selected==='counters-with-value'})}" @click="${() => page('/counters/13')}">Counters with 13</li>
              <li class="${classMap({selected: this.selected==='listing'})}" @click="${() => page('/listing')}">Listing</li>
            </ul>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'hello-nav-menu': AppNavMenuComponent
    }
}
