/* eslint-disable no-console */

import {bind} from 'helpful-decorators'

import {Options} from '../../options'
import {Controller} from '../controller'
import {Events} from '../events'
import {Payload} from '../interface'

/**
 * Client
 *
 * @public
 * @decorator `@bind`
 */
export class Client {
  /**
   * HMR.Controller
   *
   * @public
   */
  public controller: Controller

  /**
   * HMR.Events
   *
   * @public
   */
  public events: Events

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(public options: Options) {
    this.controller = new Controller(this.options)

    window[`__bud`] = window[`__bud`] ?? {}

    if (!window[`__bud`][this.options.path]) {
      window[`__bud`][this.options.path] = new Events(this.options)
    }

    this.events = window[`__bud`][this.options.path]
  }

  /**
   * Process update
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public process(obj: Payload) {
    this.controller.update(obj)
  }
}
