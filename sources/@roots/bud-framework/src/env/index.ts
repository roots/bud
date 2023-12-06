import type {Bud} from '@roots/bud-framework'

import {ServiceContainer} from '@roots/bud-framework/service'
import {bind} from '@roots/bud-support/decorators/bind'

/**
 * Env service
 */
export default class Env extends ServiceContainer {
  /**
   * Bootstrap event callback
   */
  @bind
  public override async bootstrap(bud: Bud) {
    const records = bud.context?.env ?? {}
    const coerce = (a: Record<string, any>, [k, v]) => {
      switch (v) {
        case `true`:
          return {...a, [k]: true}
        case `false`:
          return {...a, [k]: false}
        default:
          return {...a, [k]: v}
      }
    }

    this.setStore(Object.entries(records).reduce(coerce, {}))
  }

  /**
   * Filter public env
   */
  @bind
  public filterPublicEnv([key]: [string, string]): boolean {
    return key.startsWith(`PUBLIC_`)
  }

  /**
   * Get entries from .env which include `APP_PUBLIC` in their name
   *
   * @public
   * @decorator `@bind`
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
   */
  @bind
  public transformPublicEnv([rawKey, rawValue]: [string, string]): [
    string,
    string,
  ] {
    return [rawKey.replace(`PUBLIC_`, ``), rawValue]
  }
}
