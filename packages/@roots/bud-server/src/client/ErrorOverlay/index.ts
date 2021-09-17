import {Component} from './Component'
import {Inner} from './Inner'
import {Message} from './Message'
import {template} from './template'

/**
 * Client controller for ErrorOverlay component
 *
 * @public
 */
const client = {
  /**
   * Initialize component
   *
   * @public
   */
  init() {
    customElements.define('bud-overlay', Component)
    customElements.define('bud-inner', Inner)
    customElements.define('bud-message', Message)

    this.node = document.createElement('div')

    return this
  },

  /**
   * Render errors to DOM
   *
   * @public
   */
  showProblems(type: string, lines: string[]): void {
    this.node.innerHTML = template(
      lines.reduce(
        (all: string, current: string) => `
        ${all}${current.trimStart().trimEnd()}
      `,
        ``,
      ),
    )

    document.body && document.body.appendChild(this.node)
  },

  /**
   * Clear component
   *
   * @public
   */
  clear() {
    document.body &&
      this.node.parentNode &&
      document.body.removeChild(this.node)
  },
}

export const overlay = client.init()
