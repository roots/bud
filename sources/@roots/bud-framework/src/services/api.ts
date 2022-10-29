import Container from '@roots/container/container'

import type {Bud} from '../bud'
import * as BaseService from '../service.js'

export abstract class Service extends BaseService.Service {
  /**
   * @public
   */
  public abstract bootstrap(): Promise<void>

  /**
   * @public
   */
  public abstract registered(): Promise<void>

  /**
   * @public
   */
  public abstract processQueue(): Promise<void>

  /**
   * @public
   */
  public abstract call(name: string, ...args: any): Promise<void>

  /**
   * @public
   */
  public abstract bindFacade(key: string, fn: CallableFunction): void

  /**
   * Queued method calls
   *
   * @public
   */
  public queue: Array<[string, ...any[]]> = []

  /**
   * Trace of all method calls
   *
   * @public
   */
  public trace: Array<[string, ...any[]]> = []

  /**
   * Registered methods
   *
   * @public
   */
  public data: Container = new Container()

  /**
   * Does method exist
   *
   * @public
   */
  public has: Container['has']

  /**
   * Get registered method
   *
   * @public
   */
  public get: Container['get']

  /**
   * Set registered method
   *
   * @public
   */
  public set: Container['set']

  /**
   * Is string
   *
   * @public
   */
  public isString: Container['isString']

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(app: () => Bud) {
    super(app)

    this.has = this.data.has
    this.get = this.data.get
    this.set = this.data.set
    this.isString = this.data.isString
  }
}
