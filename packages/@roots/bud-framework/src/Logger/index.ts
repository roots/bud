import {INSTANCE_CONFIG} from './logger.constants'
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
   * Class constructor
   *
   * @public
   */
  public constructor(protected app: Framework) {
    this.instantiate()
  }

  @bind
  public instantiate() {
    this.instance = new Signale({
      disabled: !this.enabled,
      interactive: this.interactive,
      secrets: this.secrets,
      stream: this.stream,
    })

    this.instance.config(INSTANCE_CONFIG)
  }

  /**
   * Scope of logger labels
   */
  @bind
  public getScope(): Array<string> {
    const scope = []
    this.app.parent?.name && scope.push(this.app.parent.name)
    this.app.name && scope.push(this.app.name)

    return scope
  }
}
