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
     * Fetch a greeting message from the Fun Translations API.
     */
    fetchGreeting () {}

    /**
     * Fetch a quote from the Quotable API.
     */
    fetchQuote () {}

    /**
     * Display a greeting message and a random quote.
     */
    greeting () {}
  }
)
