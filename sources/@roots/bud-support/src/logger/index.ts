/* eslint-disable no-console -- the logger hasn't booted yet */
import type {SignaleOptions} from 'signale'

import {argv} from 'node:process'

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
    this.log = this.log.bind(this)
    this.error = this.error.bind(this)
    this.info = this.info.bind(this)
    this.success = this.success.bind(this)
    this.warn = this.warn.bind(this)
    this.debug = this.debug.bind(this)
    this.scope = this.scope.bind(this)
    this.unscope = this.unscope.bind(this)

    if (!argv.includes(`--silent`)) {
      if (argv.includes(`--log`)) this.enabled = true
      if (
        this.options.logLevel &&
        [`info`, `log`].includes(this.options.logLevel)
      )
        this.enabled = true
    }

    if (argv.includes(`--verbose`)) {
      this.verbose = true
      this.options.logLevel === `info`
    }

    this.instance = new Signale.Signale(this.options)
    this.instance.config({displayBadge: true, displayLabel: false})
  }

  public debug(...messages: Array<unknown>) {
    if (!this.verbose) return this
    this.instance.debug(...messages)
    return this
  }

  public error(...messages: Array<unknown>) {
    this.instance.error(...messages)
    return this
  }

  public info(...messages: Array<unknown>) {
    if (!this.verbose) return this
    this.instance.info(...messages)
    return this
  }

  public log(...messages: Array<unknown>) {
    if (!this.enabled) return this
    this.instance.log(...messages)
    return this
  }

  public scope(...scopes: Array<string>) {
    if (scopes.length === 0) return this
    this.instance = this.instance.scope(...scopes)

    return this
  }

  public success(...messages: Array<unknown>) {
    if (!this.enabled) return this
    this.instance.success(...messages)
    return this
  }

  public unscope() {
    this.instance.unscope()
    return this
  }

  public warn(...messages: Array<unknown>) {
    this.instance.warn(...messages)
    return this
  }
}

let instance: Logger = new Logger()

export const initialize = (options: SignaleOptions) => {
  instance = new Logger(options)
  instance.log(`logger initialized`)
  return instance
}

export {instance as default, Logger}
