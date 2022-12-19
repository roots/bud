import commonPath from '@roots/bud-support/common-path'
import {bind} from '@roots/bud-support/decorators'
import {resolve} from '@roots/bud-support/import-meta-resolve'
import prettyFormat from '@roots/bud-support/pretty-format'
import Signale, {Instance, Options} from '@roots/bud-support/signale'

import {flag} from '../context/argv.js'
import * as defaults from './options.js'

export class Logger {
  public commonPath: string = ``

  public declare instance: Instance

  public constructor(options: Options = {}) {
    options = {...defaults, ...options}
    if (flag(`no-log`)) options.disabled = true
    if (flag(`log`)) options.logLevel = `info`
    if (flag(`verbose`)) options.logLevel = `log`
    if (!flag(`log`) && !flag(`no-log`)) options.logLevel = `warn`

    this.instance = new Signale(options)
  }

  @bind
  public make(...scope: Array<string>) {
    const logger = new Logger().scope(...scope)
    return logger
  }

  @bind
  public async setCommonPath(path: string) {
    const sharedModulePath = await resolve(`webpack`, import.meta.url)
    this.commonPath = commonPath([path, sharedModulePath]).commonDir
    return this
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
    messages = messages.map(message => {
      if (typeof message !== `string`) {
        try {
          return prettyFormat(message, {
            highlight: false,
            maxDepth: 3,
            printFunctionName: false,
            printBasicPrototype: false,
          })
        } catch (e) {
          return message
        }
      }

      return message
        ?.replaceAll(/(.*)\s(.*)\/node_modules\/(.*)/g, `$1 $3`)
        .replaceAll(/file:\/\/~/g, `~`)
        .replaceAll(new RegExp(this.commonPath, `g`), ``)
        .replaceAll(new RegExp(process.cwd(), `g`), `@project`)
    })

    return messages
  }

  @bind
  public log(...messages: Array<unknown>) {
    this.instance.log(...this.format(...messages))
    return this
  }
  @bind
  public time(label: string) {
    this.instance.time(label)
    return this
  }
  @bind
  public timeEnd(label: string) {
    this.instance.timeEnd(label)
    return this
  }
  @bind
  public success(...messages: Array<unknown>) {
    this.instance.success(...this.format(...messages))
    return this
  }
  @bind
  public info(...messages: Array<unknown>) {
    if (!flag(`verbose`)) return this
    this.instance.info(...this.format(...messages))
    return this
  }
  @bind
  public warn(...messages: Array<unknown>) {
    this.instance.warn(...this.format(...messages))
    return this
  }
  @bind
  public error(...messages: Array<unknown>) {
    this.instance.error(...this.format(...messages))
    return this
  }
  @bind
  public fatal(...messages: Array<unknown>) {
    this.instance.error(...this.format(...messages))
    return this
  }
  @bind
  public debug(...messages: Array<unknown>) {
    if (!flag(`debug`)) return this
    this.instance.debug(...this.format(...messages))
    return this
  }
  @bind
  public fav(...messages: Array<unknown>) {
    this.instance.fav(...this.format(...messages))
    return this
  }
  @bind
  public pending(...messages: Array<unknown>) {
    this.instance.pending(...this.format(...messages))
    return this
  }
  @bind
  public star(...messages: Array<unknown>) {
    this.instance.star(...this.format(...messages))
    return this
  }
  @bind
  public await(...messages: Array<unknown>) {
    this.instance.await(...this.format(...messages))
    return this
  }
  @bind
  public scope(...scopes: Array<string>) {
    this.instance = this.instance.scope(...scopes)
    return this
  }
}
