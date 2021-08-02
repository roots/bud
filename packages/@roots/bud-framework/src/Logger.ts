/**
 * @module @roots/bud-framework
 */

import {Signale} from 'signale'

import {Bootstrapper, Framework} from '.'

/**
 * Service: Logger
 *
 * @noInheritDoc
 */
export abstract class Logger extends Bootstrapper<null> {
  /**
   * @property {string} name
   */
  public name: string = 'logger'

  /**
   * @property {Signale} _instance
   * @hidden
   */
  public _instance: Signale

  /**
   * @property {Signale} instance
   */
  public get instance() {
    return this._instance
  }

  /**
   * @property {Signale} instance
   */
  public set instance(instance) {
    this._instance = instance
  }

  /**
   * @constructor
   */
  public constructor(app: Framework) {
    super(app)
  }
}
