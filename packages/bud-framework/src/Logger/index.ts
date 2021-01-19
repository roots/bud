import {pino, yargs} from '@roots/bud-support'
import {Logger} from '@roots/bud-typings'
import Service from '../Service'

/**
 * Logger service
 */
export default class extends Service implements Logger {
  /**
   * Pino
   */
  public logger: pino.Logger

  /**
   * Boot service
   */
  public register(): void {
    this.logger = pino({
      safe: true,
      name: `bud`,
      enabled: yargs.argv.hasOwnProperty('log') ? true : false,
      prettyPrint: {
        colorize: true,
      },
    })
  }

  public boot(): void {
    this.app.options.enabled('log') &&
      this.app.options.enable('ci')
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
    this.logger.info(obj, msg, ...args)
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
    this.logger.fatal(obj, msg, ...args)
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
    this.logger.error(obj, msg, ...args)
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
    this.logger.warn(obj, msg, ...args)
  }
}
