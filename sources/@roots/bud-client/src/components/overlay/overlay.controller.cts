import {bind} from 'helpful-decorators'
import stripAnsi = require('strip-ansi')
import Webpack = require('webpack')

interface Payload {
  hash: string
  errors: Array<Webpack.StatsError>
}

/**
 * Overlay controller
 * @public
 */
export class Controller {
  /**
   * Element
   * @public
   */
  public element: HTMLElement

  /**
   * HMR update
   * @public
   */
  public payload: Payload

  /**
   * Formatted error message
   * @public
   */
  public get message(): string {
    return this.payload.errors?.reduce(
      (a, c) => `${a}
        <div>
          <span>${c?.title ?? 'Compilation error'}</span>
          <pre>${stripAnsi.default(c?.message) ?? ''}</pre>
        </div>`,
      ``,
    )
  }

  /**
   * Class constructor
   * @public
   */
  public constructor() {
    this.element = document.createElement('bud-error')
    document.body && document.body.appendChild(this.element)
  }

  /**
   * Update element
   * @public
   */
  @bind
  public update(payload: Payload): void {
    this.payload = payload
    this.element.setAttribute('message', this.message ?? ``)
  }
}
