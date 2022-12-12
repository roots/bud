import chalk from '@roots/bud-support/chalk'
import {bind} from '@roots/bud-support/decorators'
import {isEqual} from '@roots/bud-support/lodash-es'
import * as Signale from '@roots/bud-support/signale'

import type {Bud} from '../bud.js'
import * as config from './config.js'

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
  public instance: Signale.Instance

  public get level() {
    return this.app.context.args?.level
      ? config.level[this.app.context.args.level - 1]
      : this.app.context.args?.log
      ? config.level[2]
      : config.level[1]
  }

  public scope: Array<string>

  /**
   * Class constructor
   * @public
   */
  public constructor(_app: Bud) {
    this._app = () => _app
    this.scope = [this.app.label]
    this.instance = this.makeInstance()
  }

  @bind
  public makeInstance(
    constructorOverrides: Signale.Options = {},
    overrides: Signale.Config = {},
  ) {
    const instance = new Signale.default({
      logLevel: this.level,
      disabled: isEqual(this.app.context.args.log, false),
      scope: this.app.label ?? this.app.context.bud.label,
      stream: this.app.context.stdout as any,
      types: config.types,
      ...constructorOverrides,
    })

    instance.config({...config.defaults, ...overrides})

    return instance.scope(...this.scope)
  }

  /**
   * Format logger messages
   *
   * @param messages - any
   * @public
   * @decorator `@bind`
   */
  @bind
  public format(...messages: Array<unknown>) {
    return messages.map(message => {
      if (typeof message !== `string`) return message

      return message
        ?.replaceAll(this.app.commonPath, `.`)
        .replaceAll(/(.*)\s(.*)\/node_modules\/(.*)/g, `$1 $3`)
        .replaceAll(/file:\/\/~/g, `~`)
        .replaceAll(/file\:\/\/([/^(\s|')]*)/g, chalk.blue(`file://$1`))
        .replaceAll(/'([^(\s|')]*)'/g, chalk.blue(`'$1'`))
        .replaceAll(/\.\.\/([^(\s|')]*)/g, chalk.blue(`../$1`))
        .replaceAll(/~\/([^(\s|')]*)/g, chalk.blue(`~/$1`))
        .replaceAll(/ \/([^(\s|')]*)/g, chalk.blue(` /$1`))
    })
  }
}
