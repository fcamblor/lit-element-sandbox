
const template = document.createElement(`template`);
template.innerHTML = `
    <div>
      Counter : <button increment>+</button><span displayedVal></span><button decrement>-</button>
      <slot name="content"></slot>
    </div>
`;

class CounterComponent extends HTMLElement {
    static get observedAttributes() {
        return ['value','max'];
    }

    constructor(props) {
        super(props);

        this.attachShadow({mode: 'open'});
        this.shadowRoot.appendChild(template.content.cloneNode(true));

        this.incrementBtn = this.shadowRoot.querySelector("[increment]")
        this.decrementBtn = this.shadowRoot.querySelector("[decrement]")
        this.displayedValue = this.shadowRoot.querySelector("[displayedVal]")
    }

    connectedCallback() {
        console.log("connected callback")
        this.incrementBtn.addEventListener('click', () => {
            this.setAttribute('value', Math.min(this.#getValue()+1, Number(this.getAttribute('max'))))
        })
        this.decrementBtn.addEventListener('click', () => {
            this.setAttribute('value', this.#getValue()-1);
        })
        if(!this.hasAttribute('max')) {
            this.setAttribute('max', Infinity);
        }
        if(!this.hasAttribute('value')) {
            this.setAttribute('value', 1);
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log('hello-world element attributes changed.');
        this.displayedValue.innerText = this.#getValue();
    }

    disconnectedCallback() {
        console.log("disconnected callback")
        this.incrementBtn.removeEventListener('click')
        this.decrementBtn.removeEventListener('click')
    }

    #getValue() {
        // getAttribute() always stores attribute as a stringified one, meaning that we need to
        // convert it to non-string when needed
        return Number(this.getAttribute('value'));
    }
}

customElements.define('hello-counter', CounterComponent)
