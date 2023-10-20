/* eslint-disable n/no-process-env */
import type {SignaleOptions} from 'signale'

import {stdout} from 'node:process'

import {bind} from '@roots/bud-support/decorators/bind'
import isUndefined from '@roots/bud-support/lodash/isUndefined'
import args from '@roots/bud-support/utilities/args'
import Signale from 'signale'

/**
 * Logger
 */
class Logger {
  /**
   * Enabled
   */
  public enabled: boolean = false

  /**
   * Logger instance
   */
  public instance: Signale.Signale

  /**
   * Verbose
   */
  public verbose: boolean = false

  /**
   * Class constructor
   */
  public constructor(public options: SignaleOptions = {}) {
    if (!args.silent) {
      if (args.log) this.enabled = true
      if (
        this.options.logLevel &&
        [`info`, `log`].includes(this.options.logLevel)
      )
        this.enabled = true
    }

    if (args.verbose) {
      this.verbose = true
      this.options.logLevel === `info`
    }

    const secretEnv = Object.entries(global.process.env)
      .filter(([k, v]) => !isUndefined(v) && k.includes(`SECRET`))
      .map(([_, value]) => `${value}`)

    secretEnv.push(process.cwd())

    this.options.secrets = this.options.secrets
      ? [...this.options.secrets, ...secretEnv]
      : secretEnv

    this.instance = new Signale.Signale(this.options)
    this.instance.config({displayBadge: true, displayLabel: false})
  }

  @bind
  public await(...messages: Array<unknown>) {
    if (!this.enabled) return this
    this.instance.await(...messages)
    return this
  }

  @bind
  public debug(...messages: Array<unknown>) {
    if (!this.verbose) return this
    this.instance.debug(...messages)
    return this
  }

  @bind
  public error(...messages: Array<unknown>) {
    this.instance.error(...messages)
    return this
  }

  @bind
  public info(...messages: Array<unknown>) {
    if (!this.verbose) return this
    this.instance.info(...messages)
    return this
  }

  @bind
  public log(...messages: Array<unknown>) {
    if (!this.enabled) return this
    this.instance.log(...messages)
    return this
  }

  @bind
  public scope(...scopes: Array<string>) {
    if (scopes.length === 0) return this
    this.instance = this.instance.scope(...scopes)

    return this
  }

  @bind
  public success(...messages: Array<unknown>) {
    if (!this.enabled) return this
    this.instance.success(...messages)
    return this
  }

  @bind
  public time(label: string = `default`) {
    if (!this.verbose) return this
    this.instance.time(label)
    return this
  }

  @bind
  public timeEnd(label: string = `default`) {
    if (!this.verbose) return this
    this.instance.timeEnd(label)
    return this
  }

  @bind
  public unscope() {
    this.instance.unscope()
    return this
  }

  @bind
  public warn(...messages: Array<unknown>) {
    this.instance.warn(...messages)
    return this
  }
}

let instance: Logger = new Logger({
  stream: [stdout],
})

export const initialize = (options: SignaleOptions) => {
  instance = new Logger(options)
  instance.log(`logger initialized`)
  return instance
}

export {instance as default, Logger}
