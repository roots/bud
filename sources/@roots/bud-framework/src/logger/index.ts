import {bind} from '@roots/bud-support/decorators'
import {isEqual} from '@roots/bud-support/lodash-es'
import Signale, {SignaleConfig, SignaleOptions} from 'signale'

import type {Bud} from '../bud.js'
import {configDefaults, LEVEL, types} from './logger.constants.js'

/**
 * Logger service
 *
 * @public
 */
export class Logger {
  protected _app: () => Bud

  public get app() {
    return this._app()
  }

  /**
   * Logger instance
   *
   * @public
   */
  public instance: Signale.Signale

  public get level() {
    switch (this.app.context.args.level?.length) {
      case 1:
        return LEVEL[`v`]
      case 2:
        return LEVEL[`vv`]
      case 3:
        return LEVEL[`vvv`]
      case 4:
        return LEVEL[`vvvv`]
      default:
      // fallthrough
    }

    if (this.app.context.args.log === true) {
      return LEVEL[`vvv`]
    }

    return LEVEL[`vv`]
  }

  public scope: Array<string>

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(_app: Bud) {
    this._app = () => _app
    this.scope = [
      `${this.app.context.bud.label}@${this.app.context.bud.version}`,
      this.app.label,
    ]
    this.instance = this.makeInstance()
  }

  @bind
  public makeInstance(
    constructorOverrides: SignaleOptions = {},
    configOverrides: SignaleConfig = {},
  ) {
    let instance = new Signale.Signale({
      logLevel: this.level,
      disabled: isEqual(this.app.context.args.log, false),
      scope: this.app.label ?? this.app.context.bud.label,
      stream: this.app.context.stdout as any,
      types,
      ...constructorOverrides,
    })

    instance.config({
      ...configDefaults,
      ...configOverrides,
    })

    return instance.scope(...this.scope)
  }
}
