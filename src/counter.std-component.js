
class CounterComponent extends HTMLElement {
    static get observedAttributes() {
        return ['value'];
    }

    constructor(props) {
        super(props);

        this.attachShadow({mode: 'open'});

        const div = document.createElement('div');
        div.innerHTML = `
            <button decrementBtn>-</button>
            <span displayedValue></span>
            <button incrementBtn>+</button>
        `;
        this.shadowRoot.appendChild(div);

        this.$displayedValue = this.shadowRoot.querySelector("[displayedValue]")
        this.$decrementBtn = this.shadowRoot.querySelector("[decrementBtn]")
    }

    attributeChangedCallback(name, oldValue, newValue) {
        console.log(`element attribute updated: ${JSON.stringify({name, oldValue, newValue})}`);
        this.$displayedValue.textContent = this.getAttribute("value");
    }

    connectedCallback() {
        console.log("connected callback")
        if(!this.hasAttribute('value')) {
            this.setAttribute('value', "0");
        }
        this.$decrementBtn.addEventListener('click', () => {
            this.setAttribute("value", Number(this.getAttribute("value"))-1)
        })
    }

    disconnectedCallback() {
        console.log("disconnected callback")
    }
}

customElements.define('my-counter', CounterComponent)
