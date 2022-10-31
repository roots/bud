import type {Bud} from '../../../bud'
import type {Base} from './base'
import type {Loader} from './loader'
import type {Loaders} from './registry'

/**
 * Item interface
 *
 * @public
 */
export interface Item extends Base {
  _app: () => Bud
  app: Bud

  /**
   * Identifier
   *
   * @public
   */
  ident: string

  /**
   * Key from {@link Loaders} registry
   *
   * @public
   */
  loader: `${keyof Loaders & string}` | Loader

  /**
   * Set the {@link Loaders} key
   *
   * @public
   */
  setLoader(loader: `${keyof Loaders & string}` | Loader): this

  /**
   * Get the associated {@link Loader} instance
   *
   * @public
   */
  getLoader(): Loader

  /**
   * Set the {@link Loaders} key
   *
   * @public
   */
  setIdent(ident: string): this

  /**
   * Get the associated {@link Ident} instance
   *
   * @public
   */
  getIdent(): string

  /**
   * Associated {@link Loader} options
   *
   * @public
   */
  options: Item.Options | ((app: Bud) => Item.Options)

  /**
   * Set {@link Item.Options}
   *
   * @public
   */
  setOptions(factory: Item.Options | ((app: Bud) => Item.Options)): this

  /**
   * Get associated {@link Loader} options
   *
   * @public
   */
  getOptions(): Item.Options

  /**
   * Merge option
   *
   * @param options - Item.Options to merge
   * @returns void
   *
   * @public
   */
  mergeOptions(options: Item.Options): this

  /**
   * Makes final Item output
   *
   * @public
   */
  toWebpack(): Item.Output
}

export namespace Item {
  /**
   * Item.Options interface
   *
   * @public
   */
  export interface Options {
    [key: string]: any
  }

  /**
   * Constructor interface
   *
   * @public
   */
  export type ConstructorOptions = {
    loader?: Item['loader']
    options?: Item.Options
  }

  /**
   * Output interface
   *
   * @public
   */
  export interface Output {
    /**
     * Unique loader options identifier.
     */
    ident?: string
    /**
     * Loader name.
     */
    loader?: string
    /**
     * Loader options.
     */
    options?: string | {[index: string]: any}
  }
}
