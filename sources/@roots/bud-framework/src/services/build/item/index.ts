import {Bud} from '../../..'
import {Loader, Loaders} from '..'

/**
 * Item interface
 *
 * @public
 */
export interface Item {
  /**
   * The {@link Bud} instance
   *
   * @public
   */
  get app(): Bud

  /**
   * Key from {@link Loaders} registry
   *
   * @remarks
   * Or a callback which returns it
   *
   * @public
   */
  loader:
    | `${keyof Loaders & string}`
    | ((app: Bud) => `${keyof Loaders & string}`)

  /**
   * Set the {@link Loaders} key
   *
   * @public
   */
  setLoader(loader: Item['loader']): Item

  /**
   * Get the associated {@link Loader} instance
   *
   * @public
   */
  getLoader(): Loader

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
  setOptions(
    factory: Item.Options | ((app: Bud) => Item.Options),
  ): Item

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
  mergeOptions(options: Item.Options): void

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
     * Finalized loader
     *
     * @public
     */
    loader: string

    /**
     * Finalized options
     *
     * @public
     */
    options?: Item.Options
  }
}
