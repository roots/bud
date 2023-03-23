import {bind} from 'helpful-decorators'
import Signale from 'signale'

import args from './args.js'

class Logger {
  public instance: Signale.Signale

  public constructor() {
    let options: Record<string, any> = {}
    if (args.log === false) options.disabled = true
    options.logLevel = args.verbose ? `info` : args.log ? `log` : `error`
    this.instance = new Signale.Signale(options)
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
    if (!(`verbose` in args)) return this
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
    if (!(`verbose` in args)) return this
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
  @bind
  public unscope() {
    this.instance.unscope()
    return this
  }
}

const logger = new Logger()

export default logger
export {Logger, logger as instance}
