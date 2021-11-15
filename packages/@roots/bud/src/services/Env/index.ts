import type {Env as Base} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework'
import {bind, dotenv, dotenvExpand} from '@roots/bud-support'
import {isString} from 'lodash'

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
   * Service ident
   *
   * @public
   */
  public ident = 'bud.env'

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
  public async bootstrap() {
    const values = this.getParsedEnv()

    this.log('log', {message: 'loading env', values})

    if (values) this.setStore(values)

    if (this.isEmpty()) {
      this.log('warn', 'no env values found')
    }

    this.getEntries().forEach(([k, v]) => {
      this.log('info', `value set`, k, '=', v)
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
    const raw = dotenv.config({path: this.envPath})
    if (!raw) return {}

    const {parsed, error} = raw
    if (error || !parsed) return {}

    const expanded = dotenvExpand(parsed)
    if (!expanded) return {}

    return expanded
  }

  /**
   * Get entries from .env which include `APP_PUBLIC` in their name
   *
   * @public
   * @decorator `@bind`
   */
  @bind
  public getPublicEnv(): Record<string, any> {
    if (this.isEmpty()) {
      return {}
    }

    return this.getEntries()
      .filter(([k]: [string, string]) =>
        k.includes('APP_PUBLIC'),
      )
      .map(([k, v]: [string, string]) => [
        k.replace('APP_PUBLIC_', ''),
        isString(v) ? v : JSON.stringify(v),
      ])
      .reduce((a, [k, v]) => ({...a, [k]: v}), {})
  }
}
