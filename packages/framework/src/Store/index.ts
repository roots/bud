import Container from '@roots/container'
import Framework from '../types'

/**
 * Store class
 *
 * @description
 *  A container of containers.
 */
class Store {
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
  public constructor(repo?: Framework.Store.Constructor) {
    this.state = new Container()

    this.create = this.create.bind(this)

    repo &&
      Object.entries(repo).forEach(([key, val]) => {
        this.create(key, val)
      })
  }

  /**
   * Create a new store.
   *
   * @type {Store.Create}
   * @memberof Store
   */
  public create: Framework.Store.Create = function (
    name: string,
    state: Container.Repository,
  ) {
    this.state[name] = new Container(state)

    Object.defineProperty(this, name, {
      get: () => {
        return this.state[name]
      },
    })

    return this.use(name)
  }

  /**
   * Get a value from a store.
   *
   * @type {Store.Get}
   * @memberof Store
   */
  public get: Framework.Store.Get = function (
    name: string,
    query: string | string[],
  ) {
    return this.use(name).get(query)
  }

  /**
   * Set a value in a store.
   *
   * @type {Store.Get}
   * @memberof Store
   */
  public set: Framework.Store.Set = function (
    name: string,
    query: string | string[],
    val: unknown,
  ) {
    return this.use(name).set(query, val)
  }

  /**
   * Merge a set of values into a store.
   */
  public merge: Framework.Store.Merge = function (
    name: string,
    state: Container.Repository,
  ) {
    return (this[name].repository = {
      ...this[name].repository,
      ...state,
    })
  }

  /**
   * Return an array of several stores.
   */
  public query: Framework.Store.Query = function (
    stores: string[],
  ) {
    return stores.map(store => this.state[store])
  }

  /**
   * Return a single store.
   */
  public use: Framework.Store.Use = function (name: string) {
    return this.state[name]
  }
}

export default Store
