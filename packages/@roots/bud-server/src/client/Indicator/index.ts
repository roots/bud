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
  update(payload) {
    this.node.payload = payload

    this.node.setAttribute(
      'has-warnings',
      payload.errors?.length,
    )

    this.node.setAttribute(
      'has-errors',
      payload.warnings?.length,
    )
  },
}
