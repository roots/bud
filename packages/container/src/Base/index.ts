import _ from 'lodash'

class Base implements Container.Base {
  repository: Container.Repository

  constructor(repository: Container.Repository) {
    this.repository = repository
  }

  public get: Container.Get = function (key: string | number) {
    return _.get(this.repository, key)
  }

  public set: Container.Using = function (
    key: number | string,
    value: unknown,
  ) {
    _.set(this.repository, key, value)
  }

  public mutate = function (
    key: string | number,
    mutationFn: (unknown) => unknown,
  ): void {
    this.set(key, mutationFn(this.get(key)))
  }

  public has: Container.Conditional = function (
    key: number | string,
  ): boolean {
    return this.repository.hasOwnProperty(key)
  }

  public delete: Container.Using = function (
    key: number | string,
  ) {
    delete this.repository[key]
  }
}

/**
 * Common container
 */
export namespace Container {
  /**
   * A basic container object.
   */
  export declare class Base {
    /**
     * Store.
     */
    repository: Repository

    /**
     * Class constructor.
     */
    constructor(repository?: Repository)

    /**
     * Get an item from the repo.
     */
    public get: Get

    /**
     * Set an item on the repo.
     */
    public set: Using

    /**
     * Check if an item exists in the repo.
     */
    public has: Conditional

    /**
     * Delete an item from the repo.
     */
    public delete: Using

    /**
     * Overwrite a repository value with the result of a callback.
     */
    public mutate: (
      key: string | number,
      mutationFn: (any) => any,
    ) => any
  }

  export declare class Arrayed extends Base {
    repository: ArrayedRepository

    constructor(repository?: ArrayedRepository)

    /**
     * Add an item to the repository.
     */
    public add: Using

    /**
     * Get an item from the repository
     */
    public get: Get

    /**
     * Set a repository item's value
     */
    public set: Using

    /**
     * Check if repository key exists.
     */
    public has: Conditional

    /**
     * Delete an item from the repository.
     */
    public delete: Using
  }

  export declare class Indexed extends Base {
    repository: KeyedRepository

    constructor(repository?: KeyedRepository)

    /**
     * Push an entry onto an arrayed repository item.
     */
    push: Using

    /**
     * Conditional check that repository item matches value.
     */
    is: Conditional

    /**
     * Conditional check that item is true.
     */
    isTrue: Conditional

    /**
     * Conditional check that item is truth-adjacent.
     */
    isTruthy: Conditional

    /**
     * Conditional check that item key exists
     */
    has: Conditional

    /**
     * Merge values onto a repository item.
     */
    merge: Using

    /**
     * For a boolean item, set to true.
     */
    enable: Select

    /**
     * For a boolean item, set to false.
     */
    disable: Select

    /**
     * Check that a boolean value is true.
     */
    enabled: Conditional

    /**
     * Check that a boolean value is false.
     */
    disabled: Conditional

    /**
     * Returns a function
     */
    map:
      | Transform<Repository>
      | ((handler: (item: unknown) => unknown) => unknown[])

    /**
     * Do something with each item in the repository
     */
    each: IterateUsing

    /**
     * Return the entire repository contents
     */
    all: Transform

    /**
     * Return repository contents as a tuple (object.entries)
     */
    entries: Transform<Array<[string, Item]>>

    /**
     * Return the repository keys (object.keys)
     */
    keys: Transform<string[]>

    /**
     * Return the repository values (object.values)
     */
    values: Transform<Item[]>

    /**
     * Return an ES6 of the repository.
     */
    Map: Transform<Map<string, Item>>
  }
  /**
   * Container iem.
   */
  export type Item = any | Repository | Repository[]

  /**
   * Container value store.
   */
  export type Repository = KeyedRepository | ArrayedRepository

  /**
   * Indexed container value store.
   */
  export type KeyedRepository = {
    [key: string]: Item
  }

  /**
   * Arrayed container value store.
   */
  export type ArrayedRepository = Array<any>

  /**
   * Do something with a repository item.
   */
  export type Using = (key: string | number, value: Item) => void

  /**
   * Do a conditional check against a repository item by key.
   */
  export type Conditional = (
    key: string | number,
    comparison?: any,
  ) => boolean

  /**
   * Do something with a repository item by key.
   */
  export type Select = (key: string | number) => void

  /**
   * Get a repository item by key.
   */
  export type Get = (key: string | number) => Item

  /**
   * Handler for iterable methods.
   */
  export type Handler = (params: unknown) => unknown

  /**
   * Do something
   */
  export type IterateUsing = (
    key: string | number,
    handler: Handler,
  ) => unknown

  /**
   * Transform a repository item.
   */
  export type Transform<T = any> = (args?: any) => T
}

export {Base}
