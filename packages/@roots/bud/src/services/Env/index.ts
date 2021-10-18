import type {Env as Base, Index} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework'
import {bind, dotenv, dotenvExpand} from '@roots/bud-support'

/**
 * {@inheritDoc @roots/bud-framework#Env}
 *
 * @public
 */
export class Env extends Service<Index<any>> implements Base {
  /**
   * Accessor: path to .env file
   *
   * @public @readonly
   */
  public get envPath(): string {
    return this.app.path('project', '.env')
  }

  /**
   * {@inheritDoc @roots/bud-framework#Service.bootstrap}
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public bootstrap() {
    this.setStore(this.getParsedEnv())
  }

  /**
   * get parsed .env
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getParsedEnv(): Index<any> {
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
  public getPublicEnv(): Index<any> {
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
