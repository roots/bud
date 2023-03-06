import commonPath from '@roots/bud-support/common-path'
import {bind} from '@roots/bud-support/decorators'
import {resolve} from '@roots/bud-support/import-meta-resolve'
import Signale, {
  Instance,
  Options as SignaleOptions,
} from '@roots/bud-support/signale'

import * as argv from '../context/argv.js'
import * as defaults from './options.js'

interface Options extends SignaleOptions {
  logLevel?: `log` | `info` | `warn`
}

export class Logger {
  public commonPath: string = ``

  public declare instance: Instance

  public constructor(options: Options = {}) {
    options = {...defaults, ...options}
    if (argv.has(`no-log`)) options.disabled = true
    if (argv.has(`log`)) options.logLevel = `log`
    if (argv.has(`verbose`)) options.logLevel = `info`
    if (!argv.has(`log`) && !argv.has(`no-log`)) options.logLevel = `warn`

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
