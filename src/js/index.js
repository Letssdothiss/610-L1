/**
 * The main script file of the application.
 *
 * @author  Emil Jonasson Östvall <ej224jt@student.lnu.se>
 * @version 1.0.0
 */

import './greeting/greeting-component.js'

// Create a new instance of the greeting component.
const greeting = document.createElement('greeting-component')

// Append component to the DOM.
document.body.appendChild(greeting)
