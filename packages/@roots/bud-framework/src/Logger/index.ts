import {SignaleConfig, SignaleOptions} from 'signale'

import {
  INSTANCE_CONFIG,
  INSTANCE_TYPES,
} from './logger.constants'
import {bind, Signale} from './logger.dependencies'
import type {Framework} from './logger.interface'

/**
 * Logger service
 *
 * @public
 */
export class Logger {
  /**
   * Logger instance
   *
   * @public
   */
  public instance: Signale

  /**
   * Logger enabled
   */
  public enabled: boolean = true

  /**
   * Logger interactive mode
   */
  public interactive: boolean = !process.argv.includes('--log')

  /**
   * Logger secrets hidden in process stdout
   */
  public secrets: Array<string> = [process.cwd()]

  /**
   * Stream destinations
   */
  public stream = [process.stdout]

  /**
   * Config
   */
  public config: INSTANCE_CONFIG = INSTANCE_CONFIG

  /**
   * Config
   */
  public types: INSTANCE_TYPES = INSTANCE_TYPES

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(protected app: Framework) {
    this.instantiate()
  }

  @bind
  public instantiate() {
    this.instance = this.makeInstance(
      {
        disabled: !this.enabled,
        interactive: this.interactive,
        secrets: this.secrets,
        stream: this.stream,
        types: this.types,
      },
      this.config,
    )
  }

  @bind
  public makeInstance(
    options?: SignaleOptions,
    config?: SignaleConfig,
  ) {
    const instance = new Signale({
      disabled: !this.enabled,
      interactive: this.interactive,
      secrets: this.secrets,
      stream: this.stream,
      types: this.types,
      ...options,
    })

    instance.config({
      ...this.config,
      ...config,
    })

    return instance
  }

  /**
   * Scope of logger labels
   */
  @bind
  public getScope(): Array<string> {
    const scope = []

    this.app.isRoot && scope.push('root')

    !this.app.isRoot &&
      this.app.name &&
      scope.push(this.app.name)

    return scope
  }
}
