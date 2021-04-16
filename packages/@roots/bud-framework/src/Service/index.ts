import {Framework} from '../Framework'
import path from 'path'
import fs from 'fs-extra'
import globby from 'globby'
import {Container} from '@roots/container'
import {FileContainer} from '@roots/filesystem'
import _ from 'lodash'
import {boundMethod as bind} from 'autobind-decorator'

/**
 * Framework service
 */
export class Service extends Container {
  /**
   * Loose
   */
  [key: string]: any

  /**
   * Name
   */
  public name: string | number

  /**
   * Application
   */
  private _app: Framework['get']

  /**
   * Constructor
   */
  public constructor(app: Framework['get']) {
    super()
    this._app = app
  }

  /**
   * Application instance
   */
  public get app(): Framework {
    return this._app()
  }

  /**
   * fs util
   *
   * @see fs-extra
   */
  public get fs(): typeof fs {
    return fs
  }

  /**
   * lodash
   */
  public get _(): typeof _ {
    return _
  }

  /**
   * read json
   */
  public get readJson(): CallableFunction {
    return fs.readJSONSync
  }

  /**
   * Globby library.
   */
  public get glob(): typeof globby {
    return globby
  }

  /**
   * cwd
   */
  public get path(): typeof path {
    return path
  }

  /**
   * Dirname
   */
  public get dirname(): CallableFunction {
    return path.dirname
  }

  /**
   * Resolve
   */
  public get resolve(): CallableFunction {
    return path.resolve
  }

  /**
   * Path to node_modules
   */
  @bind
  public modulePath(path?: string): string {
    const base = this.path.posix.resolve(
      this.subscribe('location/project'),

      this.subscribe('location/modules'),
    )

    return path ? this.path.join(base, path) : base
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
  public get subscribe() {
    return this.app.subscribe
  }

  /**
   * Publish
   */
  public get publish() {
    return this.app.publish
  }

  /**
   * Access containerized property (which may or may not be callable.)
   */
  public get access() {
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
