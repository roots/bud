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
      ctx.push(
        this.app.options.config.location.project
          .split('/')
          .pop(),
      )

    !this.app.isRoot && this.app.name && ctx.push(this.app.name)

    return ctx
  }

  /**
   * Scoped logger
   *
   * @public
   */
  public scoped(...scope: Array<string>) {
    return this.instance.scope(
      ...[...this.context, ...(scope ?? [])],
    )
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
    return !isUndefined(this.flags.log) ? this.flags.log : true
  }

  /**
   * Logger level
   *
   * @public
   */
  public get level(): string {
    if (isUndefined(this.flags['log.level'])) return LEVEL['vvv']
    if (this.flags['log.level'] === 'v') return LEVEL['v']
    if (this.flags['log.level'] === 'vv') return LEVEL['vv']
    if (this.flags['log.level'] === 'vvv') return LEVEL['vvv']
    if (this.flags['log.level'] === 'vvvv') return LEVEL['vvvv']
  }

  /**
   * Logger interactive mode
   *
   * @public
   */
  public get interactive(): boolean {
    return !isUndefined(this.flags['log.papertrail'])
      ? !this.flags['log.papertrail']
      : false
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
      types: types(this.app.options.config),
      logLevel: this.level,
    }

    this.instance = this.makeInstance()
  }

  /**
   * @public
   * @decorator `@bind`
   */
  @bind
  public makeInstance(
    options?: SignaleOptions,
    config?: SignaleConfig,
  ) {
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
