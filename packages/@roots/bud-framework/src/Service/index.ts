import {Container} from '@roots/container'
import {FileContainer} from '@roots/filesystem'
import {boundMethod as bind} from 'autobind-decorator'
import {Framework} from '../Framework/index'

/**
 * Framework service
 */
export class Service extends Container {
  [key: string]: any

  public name: string | number

  private _app: Framework['get']

  public get app(): Framework {
    return this._app()
  }

  public constructor(app: Framework['get']) {
    super()
    this._app = app
  }

  /**
   * Filter unique
   */
  @bind
  public filterUnique(value, index, self) {
    return self.indexOf(value) === index
  }

  /**
   * Application service
   */
  @bind
  public service<T = any>(serviceName: string | number): T {
    return this.app.services.get<T>(serviceName)
  }

  /**
   * Access disk
   */
  @bind
  public disk<T = FileContainer>(diskName: string | number): T {
    return this.app.disk.get(diskName)
  }

  /**
   * Subscriptions
   */
  public get subscribe(): Framework['subscribe'] {
    return this.app.subscribe
  }

  /**
   * Publish
   */
  public get publish(): Framework['publish'] {
    return this.app.publish
  }

  /**
   * Access containerized property (which may or may not be callable.)
   */
  public get access(): Framework['access'] {
    return this.app.access
  }

  /**
   * Log info message
   */
  public get logger() {
    return this.app.logger.instance.scope(this.name)
  }

  /**
   * Log message
   */
  public get log() {
    return this.logger.log
  }

  /**
   * Log info message
   */
  public get info() {
    return this.logger.info
  }

  /**
   * Log warning message
   */
  public get warning() {
    return this.logger.warning
  }

  /**
   * Log error message
   */
  public get error() {
    return this.logger.error
  }

  /**
   * Log debug message
   */
  public get debug() {
    return this.logger.debug
  }
}
