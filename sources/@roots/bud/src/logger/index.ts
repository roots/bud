import {bind} from '@roots/bud-support/decorators'
import {make} from '@roots/bud-support/logger'

import * as argv from '../context/argv.js'

export class Logger {
  public declare instance: ReturnType<typeof make>

  public constructor(public stdout?: NodeJS.WriteStream) {
    if (!this.stdout) this.stdout = process.stdout

    let options: any = {
      stream: this.stdout,
    }

    if (argv.has(`no-log`)) options.disabled = true
    if (argv.has(`log`)) options.logLevel = `log`
    else if (argv.has(`verbose`)) options.logLevel = `info`
    else options.logLevel = `warn`

    this.instance = make(options, `@roots/bud`)
  }

  @bind
  public make(...scope: Array<string>) {
    const logger = new Logger(this.stdout).scope(...scope)
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
  public fatal(...messages: Array<unknown>) {
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
  public fav(...messages: Array<unknown>) {
    this.instance.fav(...messages)
    return this
  }
  @bind
  public pending(...messages: Array<unknown>) {
    this.instance.pending(...messages)
    return this
  }
  @bind
  public star(...messages: Array<unknown>) {
    this.instance.star(...messages)
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
