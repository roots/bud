import {Component} from './Component'
import {Inner} from './Inner'
import {Message} from './Message'
import {template} from './template'

const client = {
  init() {
    customElements.define('bud-overlay', Component)
    customElements.define('bud-inner', Inner)
    customElements.define('bud-message', Message)

    this.node = document.createElement('div')

    return this
  },

  showProblems(type, lines) {
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

  clear() {
    document.body &&
      this.node.parentNode &&
      document.body.removeChild(this.node)
  },
}

export const overlay = client.init()
