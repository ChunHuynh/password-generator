/* Checkbox template from https://getcssscan.com/css-checkboxes-examples */
const checkboxTemplate = document.createElement("template");
checkboxTemplate.innerHTML = `
    <div class="checkbox-wrapper-33">
    <label class="checkbox">
        <input class="checkbox__trigger visuallyhidden" type="checkbox" checked>
        <span class="checkbox__symbol">
            <svg aria-hidden="true" class="icon-checkbox" width="28px" height="28px" viewBox="0 0 28 28" version="1"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M4 14l8 7L24 7"></path>
            </svg>
        </span>
        <p class="checkbox__textwrapper"></p>
    </label>
    </div>

    <style>
    .checkbox-wrapper-33 {
        --s-xsmall: 0.625em;
        --s-small: 1.2em;
        --border-width: 1px;
        --c-primary: #FF3F00;
        --c-primary-20-percent-opacity: rgb(255 63 0 / 20%);
        --c-primary-10-percent-opacity: rgb(255 63 0 / 10%);
        --t-base: 0.4s;
        --t-fast: 0.2s;
        --e-in: ease-in;
        --e-out: cubic-bezier(.11,.29,.18,.98);
      }
    
      .checkbox-wrapper-33 .visuallyhidden {
        border: 0;
        clip: rect(0 0 0 0);
        height: 1px;
        margin: -1px;
        overflow: hidden;
        padding: 0;
        position: absolute;
        width: 1px;
      }
    
      .checkbox-wrapper-33 .checkbox {
        display: flex;
        align-items: center;
        justify-content: flex-start;
      }
      .checkbox-wrapper-33 .checkbox + .checkbox {
        margin-top: var(--s-small);
      }
      .checkbox-wrapper-33 .checkbox__symbol {
        display: inline-block;
        display: flex;
        margin-right: calc(var(--s-small) * 0.7);
        border: var(--border-width) solid var(--c-primary);
        position: relative;
        border-radius: 0.6em;
        width: 2.25em;
        height: 2.25em;
        transition: box-shadow var(--t-base) var(--e-out), background-color var(--t-base);
        box-shadow: 0 0 0 0 var(--c-primary-10-percent-opacity);
      }
      .checkbox-wrapper-33 .checkbox__symbol:after {
        content: "";
        position: absolute;
        top: 1em;
        left: 1em;
        width: 0.25em;
        height: 0.25em;
        background-color: var(--c-primary-20-percent-opacity);
        opacity: 0;
        border-radius: 3em;
        transform: scale(1);
        transform-origin: 50% 50%;
      }
      .checkbox-wrapper-33 .checkbox .icon-checkbox {
        width: 1.5em;
        height: 1.5em;
        margin: auto;
        fill: none;
        stroke-width: 4;
        stroke: currentColor;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-miterlimit: 10;
        color: var(--c-primary);
        display: inline-block;
      }
      .checkbox-wrapper-33 .checkbox .icon-checkbox path {
        transition: stroke-dashoffset var(--t-fast) var(--e-in);
        stroke-dasharray: 30px, 31px;
        stroke-dashoffset: 31px;
      }
      .checkbox-wrapper-33 .checkbox__textwrapper {
        margin: 0;
      }
      .checkbox-wrapper-33 .checkbox__trigger:checked + .checkbox__symbol:after {
        -webkit-animation: ripple-33 1.5s var(--e-out);
                animation: ripple-33 1.5s var(--e-out);
      }
      .checkbox-wrapper-33 .checkbox__trigger:checked + .checkbox__symbol .icon-checkbox path {
        transition: stroke-dashoffset var(--t-base) var(--e-out);
        stroke-dashoffset: 0px;
      }
      .checkbox-wrapper-33 .checkbox__trigger:focus + .checkbox__symbol {
        box-shadow: 0 0 0 0.25em var(--c-primary-20-percent-opacity);
      }
    
      @-webkit-keyframes ripple-33 {
        from {
          transform: scale(0);
          opacity: 1;
        }
        to {
          opacity: 0;
          transform: scale(20);
        }
      }
    
      @keyframes ripple-33 {
        from {
          transform: scale(0);
          opacity: 1;
        }
        to {
          opacity: 0;
          transform: scale(20);
        }
      }
    </style>
`;

class CustomCheckbox extends HTMLElement {
  static get observedAttributes() {
    return ['value'];
  }
  
  constructor() {
    super();
    this.DEFAULT_VALUE = 'label';

    if (!this.hasAttribute('value')) {
        throw new Error('Attribute "value" of <custom-checkbox> not defined');
    }

    this.attachShadow({ mode: 'open' });

    this.shadowRoot.appendChild(checkboxTemplate.content.cloneNode(true));

    this.checkbox = this.shadowRoot.querySelector('.checkbox__trigger');
    this.checkboxLabel = this.shadowRoot.querySelector('.checkbox__textwrapper');
  }

  connectedCallback() {
    const value = this.getAttribute('value');
    this.checkbox.setAttribute('value', (value) ? value : this.DEFAULT_VALUE);
    this.checkboxLabel.textContent = (value) ? value : this.DEFAULT_VALUE;

    this.checkbox.addEventListener('input', this.handleChange.bind(this));
  }

  disconnectedCallback() {
    this.checkbox.addEventListener('input', this.handleChange.bind(this));
  }

  adoptedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {}

  handleChange() {
    const checkboxList = Array.from(document.querySelectorAll('custom-checkbox'))
      .map(host => host.shadowRoot.querySelector('input[type=checkbox]'));
    const checked = checkboxList.filter(checkbox => checkbox.checked);
    if (checked.length === 0) {
      this.checkbox.checked = true;
    }
  }
}

customElements.define('custom-checkbox', CustomCheckbox);