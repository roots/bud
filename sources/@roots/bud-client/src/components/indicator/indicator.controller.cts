/**
 * Activity indicator controller
 * @public
 */
export class Controller {
  /**
   * DOM node
   * @public
   */
  public node = null

  /**
   * Active WHM payload
   * @public
   */
  public payload = null

  /**
   * Initialization
   * @public
   */
  public constructor() {
    this.node = document.createElement(`bud-activity-indicator`)
    document.body && document.body.appendChild(this.node)
    this.update = this.update.bind(this)
  }

  /**
   * Update activity indicator
   * @public
   */
  public update(payload) {
    this.node.payload = payload
    this.node.setAttribute(`has-warnings`, payload.errors?.length)
    this.node.setAttribute(`has-errors`, payload.warnings?.length)
  }
}
