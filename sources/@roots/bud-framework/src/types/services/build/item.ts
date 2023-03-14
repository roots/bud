import type {Bud} from '../../../bud.js'
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
   * Identifier
   */
  ident: string

  /**
   * Key from {@link Loaders} registry
   */
  loader: `${keyof Loaders & string}` | Loader

  /**
   * Set the {@link Loaders} key
   */
  setLoader(loader: `${keyof Loaders & string}` | Loader): this

  /**
   * Get the associated {@link Loader} instance
   */
  getLoader(): Loader

  /**
   * Set the {@link Loaders} key
   */
  setIdent(ident: string): this

  /**
   * Get the associated {@link Ident} instance
   */
  getIdent(): string

  /**
   * Associated {@link Loader} options
   */
  options: Item.Options | ((app: Partial<Bud>) => Item.Options)

  /**
   * Set {@link Item.Options}
   */
  setOptions(factory: Item.Options | ((app: Bud) => Item.Options)): this

  /**
   * Get associated {@link Loader} options
   */
  getOptions(): Item.Options

  /**
   * Merge option
   *
   * @param options - Item.Options to merge
   * @returns void
   */
  mergeOptions(options: Item.Options): this

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
    options?: string | {[index: string]: any}
  }
}
