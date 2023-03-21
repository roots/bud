import {bind} from 'helpful-decorators'
import Signale from 'signale'

import args from './args.js'

class Logger {
  public logger: Signale.Signale

  public constructor() {
    let options: Record<string, any> = {scope: `bud.js`}
    if (args[`no-log`]) options.disabled = true
    if (args[`log`]) options.logLevel = `log`
    if (args[`verbose`]) options.logLevel = `info`
    if (!args[`log`] && !args[`no-log`]) options.logLevel = `error`

    this.logger = new Signale.Signale(options)
  }

  @bind
  public make(...scope: Array<string>) {
    const logger = new Logger()
    logger.scope(...scope)
    return logger
  }
  @bind
  public log(...messages: Array<unknown>) {
    this.logger.log(...messages)
    return this
  }
  @bind
  public time(label: string) {
    this.logger.time(label)
    return this
  }
  @bind
  public timeEnd(label: string) {
    this.logger.timeEnd(label)
    return this
  }
  @bind
  public success(...messages: Array<unknown>) {
    this.logger.success(...messages)
    return this
  }
  @bind
  public info(...messages: Array<unknown>) {
    if (!(`verbose` in args)) return this
    this.logger.info(...messages)
    return this
  }
  @bind
  public warn(...messages: Array<unknown>) {
    this.logger.warn(...messages)
    return this
  }
  @bind
  public error(...messages: Array<unknown>) {
    this.logger.error(...messages)
    return this
  }
  @bind
  public debug(...messages: Array<unknown>) {
    if (!(`verbose` in args)) return this
    this.logger.debug(...messages)
    return this
  }
  @bind
  public await(...messages: Array<unknown>) {
    this.logger.await(...messages)
    return this
  }
  @bind
  public scope(...scopes: Array<string>) {
    this.logger = this.logger.scope(...scopes)
    return this
  }
  @bind
  public unscope() {
    this.logger.unscope()
    return this
  }
}

const logger = new Logger()

export default logger
export {Logger, logger as instance}
