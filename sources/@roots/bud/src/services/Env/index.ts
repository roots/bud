import type {Env as Base} from '@roots/bud-framework'
import {ContainerService} from '@roots/bud-framework'
import {bind, lodash} from '@roots/bud-support'

const {isString} = lodash

/**
 * Env service
 *
 * @public
 */
export class Env extends ContainerService implements Base.Service {
  /**
   * Bootstrap event callback
   *
   * @public
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
  public getPublicEnv(): Record<string, any> {
    return this.getEntries()
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
    const interpolated = rawKey.replace('PUBLIC_', '')

    const value = isString(rawValue)
      ? rawValue
      : this.app.json.stringify(rawValue)

    return [interpolated, value]
  }

  /**
   * Filter public env
   *
   * @public
   */
  @bind
  public filterPublicEnv([key]: [string, string]) {
    return key.startsWith('PUBLIC_')
  }
}
