import Container from '@roots/container'
import Framework from '../types'
/**
 * Store class
 *
 * @description
 *  A container of containers.
 */
declare class Store {
  /**
   * The store repository
   *
   * @type {Container}
   * @memberof Store
   */
  state: Container
  /**
   * Creates an instance of Store.
   *
   * @param {Store.Constructor} [repo]
   * @memberof Store
   */
  constructor(repo?: Framework.Store.Constructor)
  /**
   * Create a new store.
   *
   * @type {Store.Create}
   * @memberof Store
   */
  create: Framework.Store.Create
  /**
   * Get a value from a store.
   *
   * @type {Store.Get}
   * @memberof Store
   */
  get: Framework.Store.Get
  /**
   * Set a value in a store.
   *
   * @type {Store.Get}
   * @memberof Store
   */
  set: Framework.Store.Set
  /**
   * Merge a set of values into a store.
   */
  merge: Framework.Store.Merge
  /**
   * Return an array of several stores.
   */
  query: Framework.Store.Query
  /**
   * Return a single store.
   */
  use: Framework.Store.Use
}
export default Store
//# sourceMappingURL=index.d.ts.map
