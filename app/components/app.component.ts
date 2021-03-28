import {css, customElement, html, LitElement, property} from "lit-element";
import page from "page";
import Context = PageJS.Context;
import {lazyload} from "../utilities/lazyload";

@customElement('hello-app')
class AppComponent extends LitElement {
    // language=css
    static styles = css`
        :host {
          display: block;
        }
        .grid-container {
          display: grid;
          grid-template-columns: 0.4fr 1.6fr;
          grid-template-rows: 1fr;
          gap: 0px 0px;
          grid-template-areas: "left main";
        }
  `;

    @property({type: Number}) value = 2;
    @property() currentView: "home"|"counters"|"counters-with-value" = "home";

    constructor() {
        super();
        this._installRoutes();
    }

    private _installRoutes() {
        page.redirect('/', '/home');
        page.redirect('/index.html', '/home');
        page('/home', () => this._homeRoute());
        page('/counters', (context) => this._countersRoute(context));
        page('/counters/:value', (context) => this._countersRoute(context));
        page('*', () => this._notFoundRoute());
        page();
    }

    private _homeRoute() {
        this.currentView = "home";
    }

    private _countersRoute(context: Context) {
        if(context.params['value']) {
            this.currentView = "counters-with-value";
            this.value = Number(context.params['value']);
        } else {
            this.currentView = "counters";
            this.value = 2;
        }
    }

    private _notFoundRoute() {
        console.error("no page found !");
    }

    private _renderCurrentView() {
        switch(this.currentView) {
            case 'home': return html`
              Hello <strong>world</strong> !
            `;
            case 'counters': case 'counters-with-value':
                return lazyload(import('./counter.component'), html`
                  <hello-counter .value="${this.value}" @value-changed="${(e: HTMLElementEventMap['value-changed']) => this.value = e.detail.value }" max="20">
                    <p slot="content">Hello <strong>world</strong> !</p>
                  </hello-counter>
                  <hello-counter .value="${this.value}" @value-changed="${(e: HTMLElementEventMap['value-changed']) => this.value = e.detail.value }" max="10"></hello-counter>
                `);
        }
    }

    render() {
        return html`
          <div class="grid-container">
            <div class="left">
              <hello-nav-menu .selected="${this.currentView}"></hello-nav-menu>
            </div>
            <div class="main">
              ${this._renderCurrentView()}
            </div>
          </div>
        `;
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'hello-app': AppComponent
    }
}
