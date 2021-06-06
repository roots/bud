import {Container} from '@roots/container'
import {boundMethod as bind} from 'autobind-decorator'
import {Framework} from '../Framework'

abstract class Bootstrapper extends Container {
  /**
   * Loose
   */
  [key: string]: any

  /**
   * Bootstrap
   */
  public bootstrap?(app: Framework): any

  /**
   * Bootstrapped
   */
  public bootstrapped?(app: Framework): any

  /**
   * Register
   */
  public register?(app: Framework): any

  /**
   * Post registered callback
   */
  public registered?(app: Framework): any

  /**
   * Boot
   */
  public boot?(ap: Framework): any

  /**
   * Post boot callback
   */
  public booted?(app: Framework): any
}

abstract class Service extends Bootstrapper {
  [key: string]: any

  public name: string

  private _app: Framework['get']

  public get app(): Framework {
    return this._app()
  }

  public constructor(app: Framework['get']) {
    super()
    this._app = app
  }

  public get access(): Framework['access'] {
    return this.app.access
  }

  public get logger() {
    return this.app.logger.instance.scope(this.name as string)
  }

  public get log() {
    return this.logger.log
  }

  public get info() {
    return this.logger.info
  }

  public get warn() {
    return this.logger.warn
  }

  public get error() {
    return this.logger.error
  }

  public get debug() {
    return this.logger.debug
  }

  @bind
  public filterUnique(value, index, self) {
    return self.indexOf(value) === index
  }

  @bind
  public service<T = any>(serviceName: string | number): T {
    return this.app.services.get<T>(serviceName)
  }
}

export {Bootstrapper, Service}
