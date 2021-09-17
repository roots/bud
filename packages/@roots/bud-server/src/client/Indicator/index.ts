import {Indicator} from './Indicator'

/**
 * Activity indicator controller
 *
 * @public
 */
export const indicator = {
  /**
   * DOM node
   *
   * @public
   */
  node: null,

  /**
   * Active WHM payload
   *
   * @public
   */
  payload: null,

  /**
   * Initialization
   *
   * @public
   */
  init() {
    customElements.define('bud-activity-indicator', Indicator)

    this.node = document.createElement('bud-activity-indicator')

    document.body && document.body.appendChild(this.node)

    return this
  },

  /**
   * Update activity indicator
   *
   * @public
   */
  update({payload, complete, pending, hasWarnings, hasErrors}) {
    this.payload = payload

    this.node.setAttribute('action', payload.action)
    this.node.setAttribute('has-warnings', hasWarnings)
    this.node.setAttribute('has-errors', hasErrors)
  },
}
