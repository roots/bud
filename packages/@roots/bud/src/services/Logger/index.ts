import {
  Logger as Contract,
  Bootstrapper,
  Framework,
} from '@roots/bud-framework'
import {Container} from '@roots/container'
import {Signale, SignaleConfig} from 'signale'
import {boundMethod as bind} from 'autobind-decorator'

/**
 * Logger service
 */
export class Logger
  extends Container
  implements Contract, Bootstrapper
{
  public name = 'service/logger'

  public _app: Framework['get']

  public _instance: Signale

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

  public options = {
    disabled: true,
    interactive: false,
    secrets: [process.cwd()],
    stream: process.stdout,
  }

  public get instance() {
    return this._instance
  }

  public set instance(instance) {
    this._instance = instance
  }

  public get app(): Framework {
    return this._app()
  }

  public constructor(app: Framework['get']) {
    super()
    this._app = app
  }

  @bind
  public bootstrap() {
    this.instance = this.makeLogger()

    if (process.argv.includes('--log')) {
      this.instance.enable()
    }
  }

  @bind
  public makeLogger() {
    const logger = new Signale(this.options)
    logger.config(this.config)
    logger.scope('framework')

    return logger
  }
}
