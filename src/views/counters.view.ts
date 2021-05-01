import {LitElement, html, customElement, property, css} from 'lit-element';
import {classMap} from "lit-html/directives/class-map";
import {CounterChange} from "../components/counter.component";

@customElement('counters-view')
export class CountersView extends LitElement {

  //language=css
  static styles = css`
  `;

  @property({type: Number}) sharedValue = 10;


  constructor() {
      super();
  }

  render() {
      return html`
              <my-counter @value-changed="${(event: CustomEvent<CounterChange>) => this.sharedValue = event.detail.value}" value="${this.sharedValue}">
                <span slot="content">Hello <strong>world !</strong> ${this.sharedValue}</span>
              </my-counter>
              <my-counter @value-changed="${(event: CustomEvent<CounterChange>) => this.sharedValue = event.detail.value}" value="${this.sharedValue}"></my-counter>
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
