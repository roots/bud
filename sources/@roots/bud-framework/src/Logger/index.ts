import {isUndefined} from 'lodash'
import {SignaleConfig, SignaleOptions} from 'signale'

import {INSTANCE_CONFIG, LEVEL, types} from './logger.constants'
import {bind, Signale} from './logger.dependencies'
import type {Framework} from './logger.interface'

/**
 * Logger service
 *
 * @public
 */
export class Logger {
  /**
   * Context
   */
  public get context(): Array<string> {
    const ctx = []
    this.app.options.config.location.project &&
      ctx.push(this.app.options.config.location.project.split('/').pop())

    !this.app.isRoot && this.app.name && ctx.push(this.app.name)

    return ctx
  }

  /**
   * Scoped logger
   *
   * @public
   */
  public scoped(...scope: Array<string>) {
    return this.instance.scope(...[...this.context, ...(scope ?? [])])
  }

  /**
   * Logger instance
   *
   * @public
   */
  public instance: Signale

  /**
   * Logger enabled
   *
   * @public
   */
  public get enabled(): boolean {
    const logEnabled = !isUndefined(this.flags.log) ? this.flags.log : true

    return logEnabled
  }

  /**
   * Logger level
   *
   * @public
   */
  public get level(): string {
    if (isUndefined(this.flags['log.level'])) return LEVEL['v']
    return LEVEL[this.flags['log.level']]
  }

  /**
   * Logger interactive mode
   *
   * @public
   */
  public get interactive(): boolean {
    const usesPapertrail = !isUndefined(this.flags['log.papertrail'])
      ? !this.flags['log.papertrail']
      : false

    return usesPapertrail
  }

  /**
   * Logging flags
   *
   * @public
   */
  public get flags(): Record<string, any> {
    return this.app.options.config.cli.flags
  }

  /**
   * Logger secrets hidden in process stdout
   *
   * @public
   */
  public secrets: Array<string> = [
    process.cwd(),
    ...(this.flags['log.secret'] ?? []),
  ]

  /**
   * Stream destinations
   *
   * @public
   */
  public stream = [process.stdout]

  /**
   * Config
   *
   * @public
   */
  public config: INSTANCE_CONFIG = INSTANCE_CONFIG
  public options: SignaleOptions

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(private app: Framework) {
    this.instantiate()
    this.scoped('logger').debug('config', this.instance.config)
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public instantiate() {
    this.options = {
      disabled: !this.enabled,
      interactive: this.interactive,
      secrets: this.secrets,
      stream: this.stream,
      types: types(),
      logLevel: this.level,
    }

    this.instance = this.makeInstance()
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public makeInstance(options?: SignaleOptions, config?: SignaleConfig) {
    options = {
      ...this.options,
      ...(options ?? {}),
    }

    config = {
      ...this.config,
      ...(config ?? {}),
    }

    const instance = new Signale(options)
    instance.config(config)

    return instance
  }
}
