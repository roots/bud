import {Logger} from '@roots/bud-typings'
import {Signale, SignaleConfig, SignaleOptions} from 'signale'
import Service from '../Service'

/**
 * Logger service
 */
export default class extends Service implements Logger {
  public name = 'framework/logger'

  public _framework: Signale

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
    this.framework = this.makeLogger()
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

  public get framework() {
    return this._framework
  }

  public set framework(framework: Signale) {
    this._framework = framework
  }

  /**
   * Log at `'info'` level the given msg. If the first argument is an object, all its properties will be included in the JSON line.
   * If more args follows `msg`, these will be used to format `msg` using `util.format`.
   *
   * @typeParam T: the interface of the object being serialized. Default is object.
   * @param obj: object to be serialized
   * @param msg: the log message to write
   * @param ...args: format string values when `msg` is a format string
   */
  public info(
    obj: {[key: string]: any},
    msg?: string,
    ...args: any[]
  ) {
    this.framework.info(obj, msg, ...args)
  }

  /**
   * Log at `'fatal'` level the given msg. If the first argument is an object, all its properties will be included in the JSON line.
   * If more args follows `msg`, these will be used to format `msg` using `util.format`.
   *
   * @typeParam T: the interface of the object being serialized. Default is object.
   * @param obj: object to be serialized
   * @param msg: the log message to write
   * @param ...args: format string values when `msg` is a format string
   */
  public fatal(
    obj: {[key: string]: any},
    msg?: string,
    ...args: any[]
  ) {
    this.framework.fatal(obj, msg, ...args)
  }

  /**
   * Log at `'error'` level the given msg. If the first argument is an object, all its properties will be included in the JSON line.
   * If more args follows `msg`, these will be used to format `msg` using `util.format`.
   *
   * @typeParam T: the interface of the object being serialized. Default is object.
   * @param obj: object to be serialized
   * @param msg: the log message to write
   * @param ...args: format string values when `msg` is a format string
   */
  public error(
    obj: {[key: string]: any},
    msg?: string,
    ...args: any[]
  ) {
    this.framework.error(obj, msg, ...args)
  }

  /**
   * Log at `'warn'` level the given msg. If the first argument is an object, all its properties will be included in the JSON line.
   * If more args follows `msg`, these will be used to format `msg` using `util.format`.
   *
   * @typeParam T: the interface of the object being serialized. Default is object.
   * @param obj: object to be serialized
   * @param msg: the log message to write
   * @param ...args: format string values when `msg` is a format string
   */
  public warn(
    obj: {[key: string]: any},
    msg?: string,
    ...args: any[]
  ) {
    this.framework.warn(obj, msg, ...args)
  }
}
