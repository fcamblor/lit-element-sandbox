import { LitElement, html, customElement } from 'lit-element'
import {lazyload} from "../utilities/lazyload";
import {repeat} from 'lit-html/directives/repeat'

@customElement('hello-listing')
export class ListingComponent extends LitElement {
    counterValues: { val: number, id: number }[] = [];

    protected firstUpdated() {
        setTimeout(() => {
            const countersCount = 1000;
            this.counterValues = Array(countersCount).fill(0).map((_, idx) => ({
                val: Math.floor(Math.random() * 20),
                id: idx
            }));
            this.requestUpdate('counterValues');
        }, 1500)
    }

    render() {
        return lazyload(
            import('./counter.component'),
            html`
          <ul>
            ${repeat(this.counterValues, cv => cv.id, (counterVal) => html`
              <li>
                <hello-counter .value="${counterVal.val}" max="20"></hello-counter>
                <button @click="${() => this.removeCounter(counterVal.id)}">delete</button>
              </li>
            `)}
          </ul>
        `);
    }

    removeCounter(id: number) {
        this.counterValues.splice(this.counterValues.findIndex(cv => cv.id === id), 1);
        console.time("remove timing");
        this.requestUpdate("counterValues").then(() => {
            console.timeEnd("remove timing");
        });
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'hello-listing': ListingComponent
    }
    interface HTMLElementEventMap {
    }
}
