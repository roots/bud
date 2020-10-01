import Container from '@roots/container'

class Store implements Store.IStore {
  state: Container

  public constructor(repo: Store.Constructor) {
    this.state = new Container()

    this.create = this.create.bind(this)

    repo &&
      Object.entries(repo).forEach(([key, val]) => {
        this.create(key, val)
      })
  }

  public create: Store.Create = function (name, state) {
    this.state[name] = new Container(state)

    Object.defineProperty(this, name, {
      get: () => {
        return this.state[name]
      },
      set: val => {
        this.state['name'] = val
      },
    })

    return this.use(name)
  }

  public query: Store.Query = function (stores) {
    return stores.map(store => this.state[store])
  }

  public use: Store.Use = function (name: string) {
    return this.state[name]
  }
}

/**
 * ## Bud.Store
 */
declare namespace Store {
  /**
   * Store objects keyed by string.
   *
   * @note Objects will be containerized in the Store.
   * do not call new Container() before passing.
   *
   * @todo make this okay.
   */
  export interface Constructor {
    [key: string]: {[key: string]: any}
  }

  /**
   * Application state stores.
   */
  export interface IStore {
    state: Container
    /**
     * Create a new store.
     */
    create: Store.Create
    /**
     * Use a store.
     */
    query: Store.Query
    /**
     * Get the state from an array of store keys
     */
    use: Store.Use
  }

  export type Use = (this: IStore, name: string) => Container

  export type Query = (
    this: IStore,
    name: string[],
  ) => Container[]

  export type Create = (
    this: IStore,
    name: string,
    repo: Container['repository'],
  ) => void

  /**
   * ## Application state container.
   */
  export type State = {
    /**
     * ## Project package.json info.
     *
     * ```js
     * bud.package.get('dependencies')
     * ```
     */
    package?: Container

    /**
     * ## bud.paths
     *
     * Project and framework paths.
     */
    paths?: Container

    /**
     * ## bud.patterns
     *
     * RegExp stash box.
     */
    patterns?: Container

    /**
     * ## bud.server
     *
     * Dev server
     */
    server?: Container

    /**
     * ## bud.args
     *
     * Arguments passed on invocation.
     *
     * ```js
     * bud.args.get('hot')
     * ```
     */
    args?: Container

    /**
     * ## bud.env
     *
     * Project environment variables.
     *
     * ```js
     * bud.env.get('APP_NAME')
     * ```
     *
     * ```js
     * bud.env.get('APP_SECRET')
     * ```
     */
    env?: Container

    /**
     * ## bud.features
     *
     * Status of features
     */
    features?: Container

    /**
     * ## bud.loaders
     */
    loaders?: Container

    /**
     * ## bud.plugins
     *
     * @see Webpack.RuleSetRule
     */
    rules?: Container

    /**
     * ## bud.uses
     *
     * @see Webpack.RuleSetLoader
     */
    uses?: Container
  }
}

export default Store
