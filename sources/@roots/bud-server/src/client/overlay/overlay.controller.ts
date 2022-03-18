import {Component} from './overlay.web-component'

/**
 * Activity overlay controller
 *
 * @public
 */
export class OverlayController {
  /**
   * DOM node
   *
   * @public
   */
  public node = null

  /**
   * Active WHM payload
   *
   * @public
   */
  public payload = null

  /**
   * Class constructor
   *
   * @public
   */
  public constructor() {
    customElements.define('bud-overlay', Component)

    this.node = document.createElement('bud-overlay')
    document.body && document.body.appendChild(this.node)
  }

  /**
   * Render errors to DOM
   *
   * @public
   */
  public update(payload): void {
    this.payload = payload
    this.node.payload = payload
    this.node.setAttribute('hash', payload.hash)
  }
}
