import {Framework} from '../..'
import {Loader, Loaders} from '..'

/**
 * Item interface
 *
 * @public
 */
export interface Item {
  /**
   * The {@link Framework} instance
   * @public
   */
  get app(): Framework

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
    | ((app: Framework) => `${keyof Loaders & string}`)

  /**
   * Set the {@link Loaders} key
   * 
   * @public
   */
  setLoader(loader: Item['loader']): Item
  getLoader(): Loader

  /**
   * Item.Options
   *
   * @public
   */
  options: Item.Options | ((app: Framework) => Item.Options)

  /**
   * Set options
   *
   * @param factory - {@link Item.OptionsFactory}
   * @returns void
   *
   * @public
   */
  setOptions(factory: Item['options']): Item
  getOptions(): Item['options']

  /**
   * Merge option
   *
   * @param options - Item.Options to merge
   * @param app - {@link Framework}
   * @returns void
   *
   * @public
   */
  mergeOptions(options: Item['options']): void

  /**
   * Makes final Item output
   *
   * @param app - {@link Framework}
   * @returns finalized Item
   *
   * @public
   */
  toWebpack(): Item.Output
}

export namespace Item {
  /**
   * Item.Options interface
   * @public
   */
  export interface Options {
    [key: string]: any
  }

  /**
   * Constructor interface
   * @public
   */
  export type ConstructorOptions = {
    loader?: Item['loader']
    options?: Item['options']
  }

  /**
   * Output interface
   * @public
   */
  export interface Output {
    /**
     * Finalized loader
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
