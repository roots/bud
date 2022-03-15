import type {Env as Base} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework'
import {bind, lodash, once} from '@roots/bud-support'

const {isString} = lodash

/**
 * Env service
 *
 * @public
 */
export class Env extends Service implements Base {
  /**
   * Service ident
   *
   * @internal
   */
  public ident = 'env'

  /**
   * Bootstrap event callback
   *
   * @internal
   * @decorator `@bind`
   */
  @bind
  public async bootstrap() {
    this.setStore(this.app.context.env)
  }

  /**
   * Get entries from .env which include `APP_PUBLIC` in their name
   *
   * @public
   * @decorator `@bind`
   * @decorator `@once`
   */
  @bind
  @once
  public getPublicEnv(): Record<string, any> {
    if (this.isEmpty()) return {}

    return this.getEntries()
      .filter(Env.filterPublicEnv)
      .map(Env.transformPublicEnv)
      .reduce((a, [k, v]) => ({...a, [k]: v}), {})
  }

  /**
   * Transform public env
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public static transformPublicEnv([rawKey, rawValue]: [string, string]) {
    const interpolated = rawKey.replace('PUBLIC_', '')

    const value = isString(rawValue) ? rawValue : JSON.stringify(rawValue)

    return [interpolated, value]
  }

  /**
   * Filter public env
   *
   * @public
   */
  public static filterPublicEnv([key]: [string, string]) {
    if (!key || typeof key !== 'string' || !key.startsWith('PUBLIC_'))
      return false

    return true
  }
}
