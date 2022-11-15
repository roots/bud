import chalk from '@roots/bud-support/chalk'
import cleanStack from '@roots/bud-support/clean-stack'
import {bind} from '@roots/bud-support/decorators'
import {isEqual} from '@roots/bud-support/lodash-es'
import * as Signale from '@roots/bud-support/signale'

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
  public instance: Signale.Instance

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
    constructorOverrides: Signale.Options = {},
    configOverrides: Signale.Config = {},
  ) {
    let instance = new Signale.default({
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

  /**
   * Format logger messages
   *
   * @param messages - Literally anything or an array of anything
   * @public
   * @decorator `@bind` - to ensure `this` is bound to the instance
   */
  @bind
  public format(
    messages:
      | {error?: string; message?: string}
      | string
      | Error
      | Array<{error?: string; message?: string} | Error | string>,
  ) {
    const format = (message: string) => {
      return message
        ?.replaceAll(this.app.commonPath, `.`)
        .replaceAll(/(.*)\s(.*)\/node_modules\/(.*)/g, `$1 $3`)
        .replaceAll(/file:\/\/~/g, `~`)
        .replaceAll(/file\:\/\/([/^(\s|')]*)/g, chalk.blue(`file://$1`))
        .replaceAll(/'([^(\s|')]*)'/g, chalk.blue(`'$1'`))
        .replaceAll(/\.\.\/([^(\s|')]*)/g, chalk.blue(`../$1`))
        .replaceAll(/~\/([^(\s|')]*)/g, chalk.blue(`~/$1`))
        .replaceAll(/ \/([^(\s|')]*)/g, chalk.blue(` /$1`))
    }

    const extractString = (
      message: Error | {error?: string; message?: string} | string,
    ): string => {
      if (message instanceof Error) {
        return message.stack
          ? cleanStack(message.stack, {
              basePath: this.app.commonPath,
              pretty: true,
            })
          : message.message
      }

      if (typeof message === `string`) return format(message)

      if (message?.error) {
        return cleanStack(message.error, {
          basePath: this.app.commonPath,
          pretty: true,
        })
      }

      if (message?.message) {
        return format(message.message)
      }
    }

    return (Array.isArray(messages) ? messages : [messages])
      .map(extractString)
      .join(` `)
      .split(`   at`)
      .shift()
      .trim()
  }
}
