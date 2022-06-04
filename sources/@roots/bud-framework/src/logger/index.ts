import {bind} from 'helpful-decorators'
import Signale from 'signale'

import type {Bud} from '../bud.js'
import {LEVEL, types} from './logger.constants.js'

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
    if (!this.app.context.args.log) return LEVEL.ERROR
    if (!this.app.context.args.verbose) return LEVEL.STANDARD
    return LEVEL.VERBOSE
  }

  public get interactive() {
    return this.level === LEVEL.ERROR
  }

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(_app: Bud) {
    this._app = () => _app
    this.instance = this.makeInstance()
  }

  @bind
  public makeInstance(constructorOverrides = {}, configOverrides = {}) {
    let instance = new Signale.Signale({
      interactive: this.interactive,
      // secrets: [this.app.context.projectDir, this.app.context.cwd],
      logLevel: this.level,
      types: types(this.app),
      scope: this.app.name ?? this.app.context.application.label,
      ...constructorOverrides,
    })

    instance.config({
      displayScope: true,
      displayBadge: true,
      displayDate: false,
      displayFilename: false,
      displayLabel: false,
      displayTimestamp: false,
      underlineLabel: false,
      underlineMessage: false,
      underlinePrefix: false,
      underlineSuffix: false,
      uppercaseLabel: false,
      ...configOverrides,
    })

    return instance.scope(
      `${this.app.context.application.label}@${this.app.context.application.version}`,
      this.app.name,
    )
  }
}
