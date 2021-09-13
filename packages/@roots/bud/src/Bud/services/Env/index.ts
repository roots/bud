import type {Env as Contract, Index} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework'
import {dotenv, dotenvExpand} from '@roots/bud-support'
import {boundMethod as bind} from 'autobind-decorator'

class Env extends Service<Index<any>> implements Contract {
  public name = 'env'

  /**
   * The service bootstrap method
   *
   * @decorator `@bind`
   */
  @bind
  public bootstrap() {
    this.setStore(this.getParsedEnv())
  }

  /**
   * Returns path to .env file
   *
   * @readonly
   */
  public get envPath(): string {
    return this.app.path('project', '.env')
  }

  /**
   * get parsed .env
   *
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

export {Env}
