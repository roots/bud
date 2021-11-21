import type {Env as Base} from '@roots/bud-framework'
import {Service} from '@roots/bud-framework'
import {
  bind,
  dotenv,
  dotenvExpand,
  once,
} from '@roots/bud-support'
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
   * @internal
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
   * @internal
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
      this.log('log', `value set`, k, '=', v)
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
  @once
  public getPublicEnv(): Record<string, any> {
    return this.getEntries()
      .filter(([k, v]: [string, string]) => {
        const isPublic = k.startsWith('PUBLIC_')

        if (!isPublic) return false

        this.log('log', {
          message: 'public env',
          suffix: JSON.stringify({key: k, value: v, isPublic}),
        })

        return isPublic
      })
      .map(([rawKey, rawValue]: [string, string]) => {
        const interpolated = rawKey.replace('PUBLIC_', '')
        const value = isString(rawValue)
          ? rawValue
          : JSON.stringify(rawValue)

        this.log('log', {
          message: `public env retrieved ${interpolated} => ${value}`,
        })

        return [interpolated, value]
      })
      .reduce((a, [k, v]) => ({...a, [k]: v}), {})
  }
}
