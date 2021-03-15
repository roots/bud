import {Logger} from '@roots/bud-typings'
import {
  Signale,
  SignaleConfig,
  SignaleOptions,
} from '@roots/bud-support'
import Service from '../Service'

/**
 * Logger service
 */
export default class extends Service implements Logger {
  public name = 'framework/logger'

  public _instance: Signale

  public baseOptions: SignaleOptions<'remind'> = {
    disabled: false,
    interactive: false,
    scope: 'framework',
    secrets: [process.cwd()],
    stream: process.stdout,
    logLevel: 'info',
  }

  public baseConfig: SignaleConfig = {
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
   * Boot service
   */
  public register(): void {
    this.instance = this.makeLogger()
  }

  public makeLogger(props?: {
    scope?: any
    options?: any
    config?: any
  }) {
    const options = props?.options ?? this.baseOptions
    const config = props?.config ?? this.baseConfig
    const logger = props?.scope
      ? this.framework.scope(props.scope)
      : new Signale({
          ...options,
          disabled:
            !this.app.store.isTrue('options.log') &&
            !this.app.store.isTrue('options.ci'),
        })

    logger.config(config)

    return logger.scope(props?.scope ?? 'framework')
  }

  public get instance() {
    return this._instance
  }

  public set instance(instance: Signale) {
    this._instance = instance
  }
}
