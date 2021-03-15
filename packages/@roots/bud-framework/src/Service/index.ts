import {Container} from '@roots/container'
import {
  FileContainer,
  Framework,
  Service,
} from '@roots/bud-typings'
import {fs, globby, lodash} from '@roots/bud-support'
import path from 'path'

/**
 * Framework service
 */
export default class extends Container implements Service {
  [key: string]: any

  public name: string | number

  private _app: () => Framework

  public constructor(
    app: () => Framework,
    repository?: Container['repository'],
    dependencies?: {[key: string]: any},
  ) {
    super(repository)

    this._app = app

    dependencies &&
      Object.entries(dependencies).forEach(
        ([name, item]) => (this[name] = item),
      )
  }

  /**
   * Application instance
   */
  public get app(): Framework {
    return this._app()
  }

  /**
   * Store
   */
  public get store() {
    return this.app.store
  }

  /**
   * fs util
   *
   * @see fs-extra
   */
  public get fs(): typeof fs {
    return fs
  }

  public get _(): typeof lodash {
    return lodash
  }

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

  public get dirname(): CallableFunction {
    return path.dirname
  }

  public get resolve(): CallableFunction {
    return path.resolve
  }

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
   * Topics
   */
  public get topics() {
    return this.app.topics
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
   * Access disk
   */
  public disk<T = FileContainer>(diskName: string | number): T {
    return this.app.disk.get(diskName)
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

  /**
   * Path to node_modules
   */
  public modulePath(path?: string): string {
    const base = this.resolve(
      this.app.subscribe(
        'location/project',
        '@roots/bud/service/modulePath',
      ),
      this.subscribe(
        'location/modules',
        '@roots/bud/service/modulePath',
      ),
    )

    return path ? this.path.join(base, path) : base
  }
}
