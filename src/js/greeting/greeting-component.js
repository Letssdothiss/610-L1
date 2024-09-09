/**
 * The greeting module.
 *
 * @author Emil Jonasson Östvall <ej224jt@student.lnu.se>
 * @version 1.0.0
 */
/**
 * Define the template.
 */
const template = document.createElement('template')
template.innerHTML = `
<style>
  #greeting-container {
    display: none;
    text-align: center;
    margin-top: 20px;
  }

  #name-form {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
  }

  #name {
    padding: 10px;
    margin-bottom: 10px;
    border: 1px solid rgba(204, 204, 204, 1);
    border-radius: 5px;
    width: 200px;
  }

  #greet-button {
    padding: 10px 20px;
    background-color: rgba(255, 126, 95, 1);
    border: none;
    border-radius: 5px;
    color: white;
    cursor: pointer;
  }

  #greet-button:hover {
    background-color: rgba(254, 180, 123, 1);
  }

  #foxImg {
    max-width: 100%;
    height: auto;
    margin-top: 20px;
  }

  p {
    font-weight: bold;
  }
</style>
  <form id="name-form">
    <h2>Hello!</h2>
    <p>Please enter your name so I can greet you properly.</p>
    <input type="text" id="name" placeholder="Your name goes here!">
    <button type="button" id="greet-button">Greet me!</button>
  </form>
<div id="greeting-container">
  <p id="greeting-message"></p>
  <p id="imageText">Here is an image of a fox to brighten your day!</p>
  <img id="foxImg" src="" alt="Fox image">
  <p>Isn't it cute?</p>
  <p>Have a great day!</p>
</div>
`

customElements.define('greeting-component',
/**
 * Represents the greeting component.
 */
  class extends HTMLElement {
    /**
     * Creates an instance of the greeting component.
     */
    constructor () {
      super()

      this.attachShadow({ mode: 'open' })
        .appendChild(template.content.cloneNode(true))
    }

    /**
     * Called when the component is connected to the DOM.
     */
    connectedCallback () {
      this.shadowRoot.querySelector('#greet-button').addEventListener('click', () => this.greeting())
    }

    /**
     * Called when the component is disconnected from the DOM.
     */
    disconnectedCallback () {
      this.shadowRoot.querySelector('#greet-button').removeEventListener('click', () => this.greeting())
    }

    /**
     * Fetch an image of a fox using the randomFox API.
     *
     * @returns {string} The URL of the image or an empty string.
     */
    async fetchFoxImage () {
      try {
        const response = await fetch('https://randomfox.ca/floof/')
        const data = await response.json()
        return data.image
      } catch (error) {
        console.error('Error fetching fox image: ', error)
        return ''
      }
    }

    /**
     * Hide the name-form.
     */
    hideForm () {
      this.shadowRoot.querySelector('#name-form').style.display = 'none'
    }

    /**
     * Display a greeting message and fox image.
     */
    async greeting () {
      // Get the name from the input field.
      const name = this.shadowRoot.querySelector('#name').value

      // Hide the name-form.
      this.hideForm()

      // Fetch fox image.
      const foxImage = await this.fetchFoxImage()

      // Display greeting and fox image.
      this.shadowRoot.querySelector('#greeting-message').textContent = `Hello, ${name}!`
      this.shadowRoot.querySelector('#foxImg').src = foxImage
      this.shadowRoot.querySelector('#greeting-container').style.display = 'block'
    }
  }
)
