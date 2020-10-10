/**
 * Build Item
 *
 * @description loader implementation
 */
declare class Item {
  /**
   * The Bud instance.
   *
   * @type {Bud}
   */
  bud: Framework.Bud
  /**
   * Ident
   */
  ident?: Build.Item['ident']
  /**
   * Loader
   */
  loader?: Build.Item['loader']
  /**
   * Options
   */
  options?: Build.Item['options']
  /**
   * Query
   */
  query?: Build.Item['query']
  /**
   * Creates an instance of Item.
   *
   * @param {Bud} bud
   * @param {Build.Item.Module} rule
   */
  constructor(bud: Framework.Bud, module: Build.Item.Module)
  /**
   * Set the loader definition
   */
  set: Build.Item['set']
  /**
   * Set the loader ident
   */
  setIdent: Build.Item['setIdent']
  /**
   * Set the loader options
   */
  setOptions: Build.Item['setOptions']
  /**
   * Set the loader query
   */
  setQuery: Build.Item['setQuery']
  /**
   * Set the loader
   */
  setLoader: Build.Item['setLoader']
  /**
   * Make
   */
  make: Build.Item['make']
}
export default Item
//# sourceMappingURL=index.d.ts.map
