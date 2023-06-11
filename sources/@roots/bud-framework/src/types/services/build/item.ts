import type {Bud} from '../../../index.js'
import type {Loaders} from '../../../index.js'
import type {Base} from './base.js'
import type {Loader} from './loader.js'

/**
 * Item interface
 */
export interface Item extends Base {
  _app: () => Bud
  app: Bud

  /**
   * Get the associated {@link Ident} instance
   */
  getIdent(): string

  /**
   * Get the associated {@link Loader} instance
   */
  getLoader(): Loader

  /**
   * Get associated {@link Loader} options
   */
  getOptions(): Item.Options

  /**
   * Identifier
   */
  ident: string

  /**
   * Key from {@link Loaders} registry
   */
  loader: `${keyof Loaders & string}` | Loader

  /**
   * Merge option
   *
   * @param options - Item.Options to merge
   * @returns void
   */
  mergeOptions(options: Item.Options): this

  /**
   * Associated {@link Loader} options
   */
  options: ((app: Partial<Bud>) => Item.Options) | Item.Options

  /**
   * Set the {@link Loaders} key
   */
  setIdent(ident: string): this

  /**
   * Set the {@link Loaders} key
   */
  setLoader(loader: `${keyof Loaders & string}` | Loader): this

  /**
   * Set {@link Item.Options}
   */
  setOptions(factory: ((app: Bud) => Item.Options) | Item.Options): this

  /**
   * Makes final Item output
   */
  toWebpack(): Item.Output
}

export namespace Item {
  /**
   * Item.Options interface
   */
  export interface Options {
    [key: string]: any
  }

  /**
   * Constructor interface
   */
  export type ConstructorOptions = {
    loader?: Item['loader']
    options?: Item.Options
  }

  /**
   * Output interface
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
    options?: {[index: string]: any} | string
  }
}
