import type {Bud} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework/service'
import type {Env as Base} from '@roots/bud-framework/services'
import {bind} from '@roots/bud-support/decorators'
import Container from '@roots/container'

/**
 * Env service
 *
 * @public
 */
export default class Env extends Service implements Base.Service {
  /**
   * Service label
   *
   * @public
   */
  public static label = `env`

  /**
   * Env data
   *
   * @public
   */
  public data: Container

  /**
   * Has env value
   *
   * @public
   * @deprecated use {@link Env.data.has} instead
   */
  public has: Container['has']

  /**
   * Get env value
   *
   * @public
   * @deprecated use {@link Env.data.get} instead
   */
  public get: Container['get']

  /**
   * Set env value
   *
   * @public
   * @deprecated Use {@link Env.data.set} instead
   */
  public set: Container['set']

  /**
   * Is env value a string
   *
   * @public
   * @deprecated use {@link Env.data.isString} instead
   */
  public isString: Container['isString']

  /**
   * Is env value a function
   *
   * @public
   * @deprecated use {@link Env.data.isFunction} instead
   */
  public isFunction: Container['isFunction']

  /**
   * Class constructor
   *
   * @public
   */
  public constructor(app: Bud) {
    super(app)
    this.data = new Container()

    this.has = this.data.has
    this.get = this.data.get
    this.set = this.data.set
    this.isFunction = this.data.isFunction
    this.isString = this.data.isString
  }

  /**
   * Bootstrap event callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public async bootstrap() {
    this.data.setStore(this.app.context.env)
  }

  /**
   * Get entries from .env which include `APP_PUBLIC` in their name
   *
   * @public
   * @decorator `@bind`
   * @decorator `@once`
   */
  @bind
  public getPublicEnv(): Record<string, any> {
    return this.data
      .getEntries()
      .filter(this.filterPublicEnv)
      .map(this.transformPublicEnv)
      .reduce((a, [k, v]) => ({...a, [k]: v}), {})
  }

  /**
   * Transform public env
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public transformPublicEnv([rawKey, rawValue]: [string, string]) {
    return [rawKey.replace(`PUBLIC_`, ``), rawValue]
  }

  /**
   * Filter public env
   *
   * @public
   */
  @bind
  public filterPublicEnv([key]: [string, string]) {
    return key.startsWith(`PUBLIC_`)
  }
}
