import {Bud, Mode, Registry, Service, Services} from '..'
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
   * @public
   */
  mode?: Mode

  /**
   * The object providing initial configuration values.
   *
   * @remarks
   * It is probable that extensions and services will modify
   * values introduced in this object. If you are looking to simply modify
   * configuration values it is generally a better idea to use the
   * {@link Services.Hooks} instead.
   *
   * @public
   */
  config?: Partial<Registry.RegistryStore>

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
