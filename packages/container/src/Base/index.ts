import _ from 'lodash'

class Base {
  repository: Container.Repository

  constructor(repository: Container.Repository) {
    this.repository = repository
  }

  public get: Container.Get = function (key: string | number) {
    return _.get(this.repository, key)
  }

  public set: Container.Using = function (
    key: number | string,
    value: any,
  ) {
    _.set(this.repository, key, value)
  }

  public has: Container.Conditional = function (
    key: number | string,
  ) {
    return this.repository[key]
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
  }

  export declare class Arrayed extends Base {
    repository: ArrayedRepository

    constructor(repository?: ArrayedRepository)

    /**
     * Add an item to the repository.
     */
    public add: Using

    public get: Get

    public set: Using

    public has: Conditional

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
     * Conditional check if repository item matches value.
     */
    is: Conditional

    /**
     * Conditionally check assertion is true.
     */
    isTrue: Conditional

    /**
     * Condiionally check assertion as being truth-ish.
     */
    isTruthy: Conditional

    has: Conditional

    merge: Using

    enable: Select

    disable: Select

    enabled: Conditional

    disabled: Conditional

    map: Transform<Repository>

    each: IterateUsing

    all: Transform

    entries: Transform<Array<[string, Item]>>

    keys: Transform<string[]>

    values: Transform<Item[]>

    Map: Transform<Map<string, Item>>
  }
  /**
   * Container iem.
   */
  export type Item = any | Repository | Repository[]

  /**
   * Container repository.
   */
  export type Repository = KeyedRepository | ArrayedRepository

  export type KeyedRepository = {
    [key: string]: Item
  }

  export type ArrayedRepository = Array<any>

  /**
   * Do something
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

  export type Transform<T = any> = (args?: any) => T
}

export {Base}
