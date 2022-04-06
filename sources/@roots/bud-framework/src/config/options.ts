import {Bud} from '../bud'
import {Service} from '../service'
import * as Services from '../services'
import {Store} from '../store'
import {Context} from './context'

/**
 * Constructor options
 *
 * @public
 */
export interface Options {
  /**
   * Application context
   *
   * @public
   */
  context?: Context

  /**
   * name
   *
   * @defaultValue `bud`
   *
   * @public
   */
  name?: string

  /**
   * Build mode
   *
   * @remarks
   * One of: `production` | `development`
   *
   * @defaultValue `production`
   *
   * @public
   */
  mode?: 'production' | 'development'

  /**
   * The object providing initial configuration values.
   *
   * @remarks
   * It is probable that extensions and services will modify
   * values introduced in this object. If you are looking to simply modify
   * configuration values it is generally a better idea to use the
   * {@link @roots/bud-hooks#Hooks | Hooks class} instead.
   *
   * @public
   */
  config?: Partial<Store.Repository>

  /**
   * Services
   * @public
   */
  services?: Record<string, new (...params: Array<any>) => Service>

  /**
   * @internal
   */
  childOf?: Bud

  /**
   * Extensions to be registered
   *
   * @public
   */
  extensions?: () => Record<string, Services.Extensions.Module>
}
