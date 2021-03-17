import {Logger as Contract} from '@roots/bud-typings'
import {
  Signale,
  SignaleConfig,
  SignaleOptions,
} from '@roots/bud-support'

/**
 * Logger service
 */
export class Logger implements Contract {
  /**
   * Service ident
   */
  public name = 'service/logger'

  /**
   * Logger options
   */
  public options: SignaleOptions<'remind'> = {
    disabled: true,
    interactive: false,
    scope: 'framework',
    secrets: [process.cwd()],
    stream: process.stdout,
    logLevel: 'all',
  }

  /**
   * Logger config
   */
  public config: SignaleConfig = {
    displayScope: true,
    displayBadge: false,
    displayDate: false,
    displayFilename: false,
    displayLabel: true,
    displayTimestamp: false,
    underlineLabel: false,
    underlineMessage: false,
    underlinePrefix: false,
    underlineSuffix: false,
    uppercaseLabel: false,
  }

  /**
   * Logger instance
   */
  public _instance: Signale

  public get instance() {
    return this._instance
  }

  public set instance(instance) {
    this._instance = instance
  }

  public constructor(enabled: boolean) {
    this.makeLogger = this.makeLogger.bind(this)

    this.instance = this.makeLogger()

    if (enabled) {
      this.instance.enable()
    }
  }

  /**
   * Make logger
   */
  public makeLogger() {
    const logger = new Signale({
      ...this.options,
    })

    logger.config(this.config)

    return logger.scope('framework')
  }
}
