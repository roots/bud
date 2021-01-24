import {Container} from '@roots/container'
import {
  FileContainer,
  Framework,
  Logger,
  Service,
} from '@roots/bud-typings'

/**
 * Framework service
 */
export default class extends Container implements Service {
  [key: string]: any

  public name: string

  _app: () => Framework

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
   * Application service
   */
  public service<T = any>(serviceName: string): T {
    return this.app.get(serviceName)
  }

  /**
   * Access disk
   */
  public disk<T = FileContainer>(diskName: string): T {
    return this.app.disk.get(diskName)
  }

  /**
   * Access store property (which may or may not be callable.)
   */
  public access<T = any>(
    /**
     * Container key
     */
    key: any,
    /**
     * If true, result is returned as a new container
     */
    containerize?: boolean,
    /**
     * Object to bind lexeical scope of returned result
     */
    binding?: any,
  ): T | null {
    if (this.isFunction(key)) {
      const value = (binding ? this.get(key) : this.get(key))(
        this.app,
      )

      return containerize ? this.app.makeContainer(value) : value
    }

    if (this.get(key)) {
      const value = this.get(key)
      return containerize ? this.app.makeContainer(value) : value
    }

    return null
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
