import type {Env, Index} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework'
import {dotenv, dotenvExpand} from '@roots/bud-support'
import {boundMethod as bind} from 'autobind-decorator'

/**
 * {@inheritDoc @roots/bud-framework#Env}
 *
 * @public
 */
export default class extends Service<Index<any>> implements Env {
  /**
   * {@inheritDoc @roots/bud-framework#Service.env}
   *
   * @public
   */
  public name = 'env'

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
