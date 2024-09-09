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
<h2>Hello!</h2>
<p>Please enter your name so I can greet you properly.</p>
<input type="text" id="name" placeholder="Your name goes here!">
<button id="greet-button">Greet me!</button>
<div id="greeting-container">
  <h2 id="greeting-message"></h2>
  <p id="quote"></p>
</div>
`

customElements.define('my-component',
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
     * Fetch a greeting message from the Fun Translations API.
     *
     * @param {string} name - The name to greet.
     * @returns {String} The translated greeting or the default greeting.
     */
    async fetchGreeting (name) {
      try {
        const response = await fetch(`https://api.funtranslations.com/translate/greetings.json?text=Hello, ${name}!`)
        const data = await response.json()
        return data.contents.translated
      } catch (error) {
        console.error('Error fetching greeting: ', error)
        return `Hello, ${name}!`
      }
    }

    /**
     * Fetch a quote from the Quotable API.
     *
     * @returns {String} The quote or a default message.
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
     * Display a greeting message and a random quote.
     */
    greeting () {
      const name = this.shadowRoot.querySelector('#name').value
    }
  }
)
