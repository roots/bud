import {Bud, Mode, Service, Services} from '..'
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
   * Seed values for the {@link Bud.hooks} service
   *
   * @public
   */
  seed?:
    | Partial<Bud['hooks']['store']>
    | ((bud: Bud) => Partial<Bud['hooks']['store']>)

  /**
   * Services
   *
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
