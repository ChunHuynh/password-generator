const sliderTemplate = document.createElement("template");
sliderTemplate.innerHTML = `
  <div class="slider-container">
      <input type="range" class="slider">
      <output class="bubble"></output>
  </div>
  <style>
      .slider-container {
        position: relative;
        line-height: 10px;
      }

      .slider {
        -webkit-appearance: none;
        width: 100%;
        margin: 0;
        border-radius: 25px;
        height: 10px;
      }

      .slider::-webkit-slider-runnable-track {
        width: 100%;
        height: 10px;
        cursor: pointer;
        border-radius: 25px;
      }

      .slider::-moz-range-track {
        width: 100%;
        height: 100%;
        cursor: pointer;
        background: var(--slider-track, #EAEAEA);
        border-radius: 25px;
      }

      .slider::-webkit-slider-thumb {
        transform: translateY(calc(-28px + 5px));
        -webkit-appearance: none;
        appearance: none;
        background-color: var(--white01);
        outline: 1px solid var(--orange);
        width: 56px;
        height: 56px;
        border-radius: 50%;
        cursor: pointer;
      }

      .slider::-moz-range-thumb {
        -moz-appearance: none;
        appearance: none;
        background-color: var(--white01);
        outline: 1px solid var(--orange);
        width: 56px;
        height: 56px;
        border: none;
        border-radius: 50%;
        cursor: pointer;
      }

      .slider::-moz-range-progress {
        background-color: var(--orange);
        height: 100%;
        border-radius: 25px;
      }

      .bubble {
        color: var(--orange);
        position: absolute;
        user-select: none;
        pointer-events: none;
      }
  </style>
`;


class CustomSlider extends HTMLElement {
  static get observedAttributes() {
    return ['min', 'max', 'value'];
  }

  constructor() {
    super();
    this.DEFAULT_MIN = 8;
    this.DEFAULT_MAX = 50;
    this.DEFAULT_VALUE = 12;

    this.attachShadow({ mode: 'open' });

    this.shadowRoot.appendChild(sliderTemplate.content.cloneNode(true));

    this.slider = this.shadowRoot.querySelector('.slider');
    this.bubble = this.shadowRoot.querySelector('.bubble');
  }

  connectedCallback() {
    const min = this.getAttribute('min'),
          max = this.getAttribute('max'),
          value = this.getAttribute('value');

    // Set custom attribute if exist or else default
    this.slider.setAttribute('min', (min) ? min : this.DEFAULT_MIN);
    this.slider.setAttribute('max', (max) ? max : this.DEFAULT_MAX);
    this.slider.setAttribute('value', (value) ? value : this.DEFAULT_VALUE);
    
    // Events
    this.updateBubble();
    this.updateProgressBar();
    this.slider.addEventListener('input', this.updateBubble.bind(this));
    this.slider.addEventListener('input', this.updateProgressBar.bind(this));
  }

  disconnectedCallback() {
    this.slider.removeEventListener('input', this.updateBubble.bind(this));
    this.slider.removeEventListener('input', this.updateProgressBar.bind(this));
  }

  adoptedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {}

  // Function used to update the bubble position and slider value
  updateBubble() {
    this.bubble.textContent = this.slider.value;
    const newValue = Number(((this.slider.value - this.slider.min) * 100) / (this.slider.max - this.slider.min)),
          newPosition = 28 - (this.bubble.clientWidth / 2) - (newValue * 0.55); // Adjust 28 to half your thumb size (56px) and tweak 0.55 until satisfied
    
    this.bubble.style.left = `calc(${newValue}% + (${newPosition}px))`;
  }

  // Function used to update the slider progress bar
  updateProgressBar() {
    const percent = Number(((this.slider.value - this.slider.min) * 100) / (this.slider.max - this.slider.min));

    this.slider.style.background = `
      linear-gradient(to right,
      var(--orange) 0%,
      var(--orange) ${percent}%,
      var(--slider-track, #EAEAEA) ${percent}%,
      var(--slider-track, #EAEAEA) 100%)`;
  }
}

customElements.define('custom-slider', CustomSlider);
