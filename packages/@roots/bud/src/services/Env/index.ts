import type {Env as Base} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework'
import {bind, dotenv, dotenvExpand} from '@roots/bud-support'

/**
 * Env service
 *
 * @public
 */
export class Env
  extends Service<Record<string, any>>
  implements Base
{
  /**
   * Path to .env file
   *
   * @public @readonly
   */
  public get envPath(): string {
    return this.app.path('project', '.env')
  }

  /**
   * Bootstrap event callback
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public bootstrap() {
    this.setStore(this.getParsedEnv())
    if (!this.getEntries().length) {
      this.app.warn('no env values found')
    }

    this.getEntries().forEach(([k, v]) => {
      this.app.info(`env value set`, k, '=>', v)
    })
  }

  /**
   * Retrieve parsed env object
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getParsedEnv(): Record<string, any> {
    return dotenv?.config
      ? dotenvExpand(dotenv.config({path: this.envPath})).parsed
      : {}
  }

  /**
   * Get entries from .env which include `APP_PUBLIC` in their name
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getPublicEnv(): Record<string, any> {
    return this.repository
      ? this.getEntries()
          .filter(([k]: [string, string]) =>
            k.includes('APP_PUBLIC'),
          )
          .reduce(
            (a, [k, v]) => ({...a, [k]: JSON.stringify(v)}),
            {},
          )
      : {}
  }
}
