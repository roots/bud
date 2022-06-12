import type {Bud, Extension, Mode, Service} from '../index.js'
import type {Context} from './context.js'

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
  seed?: Partial<Bud['hooks']['store']>

  /**
   * Services
   *
   * @public
   */
  services?: Record<string, new (...params: Array<any>) => Service>

  /**
   * @internal
   */
  root?: Bud

  /**
   * Extensions to be registered
   *
   * @public
   */
  extensions?: Array<Extension | Extension.Constructor>
}
