import {Container} from '@roots/container'
import {
  FileContainer,
  Framework,
  Logger,
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

  protected _app: () => Framework

  protected _glob: typeof globby = globby

  protected _path: typeof path = path

  protected _fs: typeof fs = fs

  protected _lodash: typeof lodash = lodash

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
   * fs util
   *
   * @see fs-extra
   */
  public get fs(): typeof fs {
    return this._fs
  }

  public get _(): typeof lodash {
    return this._lodash
  }

  public get readJson(): CallableFunction {
    return this.fs.readJSONSync
  }

  /**
   * Globby library.
   */
  public get glob(): typeof globby {
    return this._glob
  }

  /**
   * cwd
   */
  public get path(): typeof path {
    return this._path
  }

  public get dirname(): CallableFunction {
    return this.path.dirname
  }

  public get resolve(): CallableFunction {
    return this.path.resolve
  }

  public filterUnique(value, index, self) {
    return self.indexOf(value) === index
  }

  /**
   * Path to node_modules
   */
  public modulePath(path?: string): string {
    const base = this.resolve(
      this.app.store.get('locations.project'),
      this.app.store.get('locations.modules'),
    )

    return path ? this.path.join(base, path) : base
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
   * Access containerized property (which may or may not be callable.)
   */
  public access<I = unknown>(key: string | number): I {
    return this.isFunction(key)
      ? this.get(key)(this.app)
      : this.get(key)
  }

  /**
   * Log info message
   */
  public info(obj: {[key: string]: any}) {
    this.app.get<Logger>('logger').info(obj, this.name)
  }

  /**
   * Log warning message
   */
  public warning(obj: {[key: string]: any}) {
    this.app.get<Logger>('logger').info(obj, this.name)
  }

  /**
   * Log error message
   */
  public error(obj: {[key: string]: any}) {
    this.app.get<Logger>('logger').error(obj, this.name)
  }
}
