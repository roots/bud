import type {Bud, Extension, Mode, Services} from '../index.js'
import type {Service} from '../service.js'
import type {Context} from './context.js'

/**
 * Constructor options
 *
 * @public
 */
export interface Options extends Partial<Context> {
  /**
   * name
   *
   * @defaultValue `default`
   *
   * @public
   */
  label?: string

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
  services?: Partial<
    Record<
      keyof Services.Registry & string,
      new (...args: any[]) => Service
    >
  >

  /**
   * @internal
   */
  root?: Bud

  /**
   * Directory
   *
   * @public
   */
  basedir?: string

  /**
   * Extensions to be registered
   *
   * @public
   */
  extensions?: Array<Extension | (new (...args: any[]) => Extension)>

  /**
   * Application (bud)
   *
   * @public
   */
  application?: any
}
