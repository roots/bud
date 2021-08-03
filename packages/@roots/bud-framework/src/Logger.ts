import {Signale} from 'signale'

import {Bootstrapper, Framework} from '.'

/**
 * Logging service
 *
 * @public
 */
abstract class Logger extends Bootstrapper {
  /** {@inheritDoc Service.name} */
  public name: string = 'logger'

  /**
   * Logger instance
   *
   * @readonly
   * @hidden
   */
  public _instance: Signale

  /**
   * Logger instance get accessor
   */
  public get instance(): Signale {
    return this._instance
  }

  /**
   * Logger instance set accessor
   */
  public set instance(instance: Signale) {
    this._instance = instance
  }

  /**
   * Class constructor
   */
  public constructor(app: Framework) {
    super(app)
  }
}

export {Logger}
