import type {Bud} from '@roots/bud-framework'
import {ServiceContainer} from '@roots/bud-framework/service'
import {bind} from '@roots/bud-support/decorators'

/**
 * Env service
 *
 * @public
 */
export default class Env extends ServiceContainer {
  /**
   * Service label
   *
   * @public
   */
  public static override label = `env`

  /**
   * Bootstrap event callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public override async bootstrap(bud: Bud) {
    this.setStore(bud.context.env)
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
