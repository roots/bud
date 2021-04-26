import {
  Logger as Contract,
  Bootstrapper,
  Framework,
} from '@roots/bud-framework'
import {Signale, SignaleConfig} from 'signale'
import {boundMethod as bind} from 'autobind-decorator'

/**
 * Logger service
 */
export class Logger implements Contract, Bootstrapper {
  /**
   * Service ident
   */
  public name = 'service/logger'

  /**
   * Framework
   */
  public _app: Framework['get']

  /**
   * Logger instance
   */
  public _instance: Signale

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
   * Options
   */
  public options = {
    disabled: true,
    interactive: false,
    secrets: [process.cwd()],
    stream: process.stdout,
  }

  /**
   * Get logger instance
   */
  public get instance() {
    return this._instance
  }

  /**
   * Set logger instance
   */
  public set instance(instance) {
    this._instance = instance
  }

  /**
   * Get Framework
   */
  public get app(): Framework {
    return this._app()
  }

  /**
   * Constructor
   */
  public constructor(app: Framework['get']) {
    this._app = app
  }

  /**
   * Framework lifecycle: bootstrapped
   */
  @bind
  public bootstrapped() {
    this.instance = this.makeLogger()
  }

  /**
   * Framework lifecycle: registered
   */
  @bind
  public registered() {
    if (process.argv.includes('--log')) {
      this.app.logger.instance.enable()
    }
  }

  /**
   * Make logger
   */
  @bind
  public makeLogger() {
    const logger = new Signale(this.options)
    logger.config(this.config)
    logger.scope('framework')

    return logger
  }
}
