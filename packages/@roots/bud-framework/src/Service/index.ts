import type {Framework} from '../Framework'
import {fs, globby, lodash, Container} from '@roots/bud-support'
import {FileContainer} from '@roots/filesystem'
import path from 'path'

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
   * Register
   */
  public register() {}

  /**
   * Boot
   */
  public boot() {}

  /**
   * Framework lifecycle: bootstrapped
   */
  public bootstrapped(app: Framework) {}

  /**
   * Framework lifecycle: registered
   */
  public registered(app: Framework) {}

  /**
   * Framework lifecycle: booted
   */
  public booted(app: Framework) {}

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
  public get _(): typeof lodash {
    return lodash
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
  public modulePath(path?: string): string {
    const base = this.path.posix.resolve(
      this.app.subscribe(
        'location/project',
        'framework/service@modulePath',
      ),

      this.subscribe(
        'location/modules',
        'framework/service@modulePath',
      ),
    )

    return path ? this.path.join(base, path) : base
  }

  /**
   * Filter unique
   */
  public filterUnique(value, index, self) {
    return self.indexOf(value) === index
  }

  /**
   * Application service
   */
  public service<T = any>(serviceName: string | number): T {
    return this.app.get<T>(serviceName)
  }

  /**
   * Access disk
   */
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
    return this.app.logger.instance.scope(this.name).log
  }

  /**
   * Log info message
   */
  public get info() {
    return this.app.logger.instance.scope(this.name).info
  }

  /**
   * Log warning message
   */
  public get warning() {
    return this.app.logger.instance.scope(this.name).warning
  }

  /**
   * Log error message
   */
  public get error() {
    return this.app.logger.instance.scope(this.name).error
  }

  /**
   * Log debug message
   */
  public get debug() {
    return this.app.logger.instance.scope(this.name).debug
  }
}
