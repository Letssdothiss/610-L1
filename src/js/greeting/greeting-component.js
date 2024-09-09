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
  <p id="quoteText">And here is a quote to inspire you!</p>
  <p id="quote"></p>
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
     * 
     */
    async fetchFoxImage () {
      try {

      } catch (error) {

      }
    }

    /**
     * Fetch a quote from the Quotable API.
     *
     * @returns {string} The quote or a default message.
     */
    async fetchQuote () {
      try {
        const response = await fetch('https://api.quotable.io/random')
        const data = await response.json()
        return data.content
      } catch (error) {
        console.error('Error fetching quote: ', error)
        return 'Have a great day!'
      }
    }

    /**
     * Hide the name-form.
     */
    hideForm () {
      this.shadowRoot.querySelector('#name-form').style.display = 'none'
    }

    /**
     * Display a greeting message and a random quote.
     */
    async greeting () {
      // Get the name from the input field.
      const name = this.shadowRoot.querySelector('#name').value

      // Hide the name-form.
      this.hideForm()

      // Fetch greeting and quote.
      const foxImage = await this.fetchFoxImage()
      const quote = await this.fetchQuote()

      // Display greeting and quote.
      this.shadowRoot.querySelector('#greeting-message').textContent = `Hello, ${name}!`
      this.shadowRoot.querySelector('#quote').textContent = quote
      this.shadowRoot.querySelector('#greeting-container').style.display = 'block'
    }
  }
)
