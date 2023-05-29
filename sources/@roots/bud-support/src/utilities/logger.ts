/* eslint-disable n/no-process-env */
import type {SignaleOptions} from 'signale'
import Signale from 'signale'

import {bind} from '../decorators/bind.js'
import isUndefined from '../lodash/isUndefined/index.js'
import args from './args.js'

class Logger {
  public instance: Signale.Signale

  public constructor() {
    let options: SignaleOptions = {}

    if (args.log === false) options.disabled = true
    options.logLevel = args.verbose ? `info` : args.log ? `log` : `warn`

    if (process.env) {
      options.secrets = Object.entries(process.env)
        .filter(
          (
            entry: [string, string | undefined],
          ): entry is [string, string] =>
            !isUndefined(entry[1]) && entry[0].includes(`SECRET`),
        )
        .map(([k, v]): string => v)
    }

    this.instance = new Signale.Signale(options)
    this.instance.config({displayLabel: false})
    if (args.silent && !args.log && !args.verbose) {
      this.instance.disable()
    }
  }

  @bind
  public log(...messages: Array<unknown>) {
    this.instance.log(...messages)
    return this
  }

  @bind
  public time(label: string = `default`) {
    this.instance.time(label)
    return this
  }

  @bind
  public timeEnd(label: string = `default`) {
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
    if (scopes.length === 0) return this
    this.instance = this.instance.scope(
      ...(scopes.filter(Boolean) ?? [`bud.js`]),
    )
    return this
  }

  @bind
  public unscope() {
    this.instance.unscope()
    return this
  }
}

let instance = undefined

export const initialize = () => {
  instance = new Logger()
  instance.log(`logger initialized`)
  return instance
}

export default instance ?? initialize()
export {Logger, instance}
