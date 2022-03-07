import {lodash} from '@roots/bud-support'

import {INSTANCE_CONFIG, types} from './logger.constants'
import {bind, Signale} from './logger.dependencies'
import type {Framework} from './logger.interface'

const {isUndefined} = lodash

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
    const ctx = ['root']

    !this.app.isRoot &&
      this.options.config['build.name'] &&
      ctx.push(this.options.config['build.name'])

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
   * Logger level
   *
   * @public
   */
  public get level(): string {
    return this.app.options.config['log.level'] ?? 'vvv'
  }

  /**
   * Logger secrets hidden in process stdout
   *
   * @public
   */
  public secrets: Array<string> = [process.cwd()]

  /**
   * Config
   *
   * @public
   */
  public config = INSTANCE_CONFIG

  /**
   * Signale options
   *
   * @public
   */
  public options: any

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(private app: Framework) {
    this.instantiate()
  }

  /**
   * Instantiate primary framework logger
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public instantiate() {
    this.options = {
      disabled: !isUndefined(this.app.options.config['features.log'])
        ? this.app.options.config['features.log'] === false
        : true,
      interactive: false,
      secrets: [process.cwd()],
      types: types(),
      logLevel: this.app.options.config['log.level'] ?? 'vvv',
    }

    this.instance = this.makeInstance()
  }

  /**
   * Make signale instance
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public makeInstance(options?: any, config?: any): Signale {
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
