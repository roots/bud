import {Indicator} from './Indicator'

const activity = {
  node: null,

  payload: null,

  init() {
    customElements.define('bud-activity-indicator', Indicator)

    this.node = document.createElement('bud-activity-indicator')

    document.body && document.body.appendChild(this.node)

    return this
  },

  update({payload, complete, pending, hasWarnings, hasErrors}) {
    this.payload = payload

    this.node.setAttribute('action', payload.action)
    this.node.setAttribute('has-warnings', hasWarnings)
    this.node.setAttribute('has-errors', hasErrors)
  },
}

export const indicator = activity
