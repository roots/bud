import {bind} from '@roots/bud-support/decorators'
import Signale, {
  Instance,
  Options as SignaleOptions,
} from '@roots/bud-support/signale'

import * as argv from '../context/argv.js'
import * as defaults from './options.js'

interface Options extends SignaleOptions {
  logLevel?: `log` | `info` | `warn`
}

/**
 * Logger
 */
export class Logger {
  /**
   * Logger instance
   */
  public declare instance: Instance

  /**
   * Class constructor
   */
  public constructor(options: Options = {}) {
    options = {...defaults, ...options}

    if (argv.has(`no-log`)) {
      options.disabled = true
    } else {
      options.logLevel = `warn`
      if (argv.has(`verbose`)) options.logLevel = `info`
      if (argv.has(`log`)) options.logLevel = `log`
    }

    this.instance = new Signale(options)
  }

  /**
   * Make scoped logger instance
   */
  @bind
  public make(...scope: Array<string>) {
    const logger = new Logger().scope(...scope)
    return logger
  }

  @bind
  public log(...messages: Array<unknown>) {
    this.instance.log(...messages)
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
    this.instance.success(...messages)
    return this
  }

  @bind
  public info(...messages: Array<unknown>) {
    if (!argv.has(`verbose`)) return this
    this.instance.info(...messages)
    return this
  }

  @bind
  public warn(...messages: Array<unknown>) {
    this.instance.warn(...messages)
    return this
  }

  @bind
  public error(...messages: Array<unknown>) {
    this.instance.error(...messages)
    return this
  }

  @bind
  public debug(...messages: Array<unknown>) {
    if (!argv.has(`verbose`)) return this
    this.instance.debug(...messages)
    return this
  }

  @bind
  public await(...messages: Array<unknown>) {
    this.instance.await(...messages)
    return this
  }
  @bind
  public scope(...scopes: Array<string>) {
    this.instance = this.instance.scope(...scopes)
    return this
  }
}
