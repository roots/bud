import type {Payload} from '../../hmr'

/**
 * Activity indicator controller
 * @public
 */
export class Controller {
  /**
   * DOM node
   * @public
   */
  public node: HTMLElement

  /**
   * Active WHM payload
   * @public
   */
  public payload = null

  /**
   * Timer handler
   * @public
   */
  public timer: NodeJS.Timeout

  /**
   * Initialization
   * @public
   */
  public constructor() {
    this.node = document.createElement('bud-activity-indicator')
    this.update = this.update.bind(this)
  }

  /**
   * Append `bud-error` element to the DOM
   *
   * @public
   */
  public addNode() {
    if (document.body.querySelector('bud-activity-indicator')) {
      if (typeof this.timer.unref === 'function') this.timer.unref()
      this.removeNode()
    }

    document.body?.appendChild(this.node)
    this.timer = setTimeout(this.removeNode, 3000)
  }

  /**
   * Remove `bud-error` element from the DOM (if present)
   *
   * @public
   */
  public removeNode() {
    document.body.querySelector('bud-activity-indicator')?.remove()
  }

  /**
   * Update activity indicator
   * @public
   */
  public update(payload: Payload) {
    this.node.toggleAttribute(
      'has-errors',
      payload.errors?.length ? true : false,
    )

    this.node.toggleAttribute(
      'has-warnings',
      payload.warnings?.length ? true : false,
    )

    this.node.setAttribute('action', payload.action)

    this.addNode()
  }
}
