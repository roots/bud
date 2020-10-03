import __ from 'lodash'

/**
 * Keyed item store.
 */
class Container implements Container.Interface {
  repository: Container.Repository

  constructor(repository?: Container.Repository) {
    this.repository = repository || {}
  }

  /**
   * Push a new value onto an array item
   *
   * @deprecated
   */
  public add(key: string, item: Container.Item): void {
    this.repository[key].push(item)
  }

  /**
   * Push a new value onto an array item
   */
  public push(key: string, item: Container.Item): void {
    this.repository[key].push(item)
  }

  /**
   * Get a value of a repository item.
   */
  public get(key: string): Container.Item {
    return __.get(this.repository, key)
  }

  /**
   * Check the value for a given key
   */
  public is(key: string, value: Container.Item): boolean {
    return this.get(key) == value
  }

  /**
   * Check if a given key is true
   */
  public isTrue(key: string): boolean {
    return this.get(key) === true
  }

  /**
   * Check if a given key is truthy
   */
  public isTruthy(key: string): boolean {
    return this.get(key) == true
  }

  /**
   * Set the value of a key
   */
  public set(key: string, value: Container.Item): void {
    __.set(this.repository, key, value)
  }

  public has(key: string): boolean {
    return this.repository.hasOwnProperty(key) ? true : false
  }

  public merge(key: string, value: Container.Item): void {
    this.set(key, __.merge(this.get(key), value))
  }

  public delete: Container.Interface['delete'] = function (
    key: string,
  ) {
    delete this.repository[key]
  }

  public enable(key: string): void {
    this.repository[key] = true
  }

  public disable(key: string): void {
    this.repository[key] = false
  }

  public enabled(key: string): boolean {
    return this.is(key, true)
  }

  public disabled(key: string): boolean {
    return this.is(key, false)
  }

  public map(
    key: string,
    callback: (params: unknown) => unknown,
  ): unknown {
    return this.get(key).map(callback)
  }

  public each(
    callback: (value: any, index: number, array: any[]) => void,
    key?: string,
  ): unknown {
    return !key
      ? Object.values(this.repository).forEach(callback)
      : Object.values(this.get(key)).forEach(callback)
  }

  /**
   * Get all of the repository contents
   */
  public entries(): Container.Repository {
    return Object.entries(this.repository)
  }
}

declare namespace Container {
  export type Item = any | Loose | Loose[]

  export type Repository = Loose

  export interface Loose {
    [key: string]: Item
  }

  export interface Interface extends Repository {
    repository: Repository

    /**
     * Push a new value onto an array item
     */
    add(this: this, key: string, item: Item): void

    /**
     * Push a new value onto an array item
     */
    push(this: this, key: string, item: Item): void

    /**
     * Get a value
     */
    get(this: this, key: string): Item

    /**
     * Check a value
     */
    is(this: this, key: string, value: Item): boolean

    /**
     * Check if a given key is true
     */
    isTrue(this: this, key: string): boolean

    /**
     * Check if a given key is truthy
     */
    isTruthy(this: this, key: string): boolean

    /**
     * Set a value
     */
    set(this: this, key: string, value: Item): void

    /**
     * Check if an item exists in the repository.
     */
    has(this: this, key: string): boolean

    /**
     * Merge an item value.
     */
    merge(this: this, key: string, value: Item): void

    /**
     * Delete an item from the repository
     */
    delete(this: this, key: string): void

    /**
     * Set an item to true
     */
    enable(this: this, key: string): void

    /**
     * Set an item to false
     */
    disable(this: this, key: string): void

    /**
     * Set if an item is true
     */
    enabled(this: this, key: string): boolean

    /**
     * Check if an item is false
     */
    disabled(this: this, key: string): boolean

    /**
     * Map a callback onto an iterable item
     */
    map(
      this: this,
      key: string,
      callback: (params: unknown) => unknown,
    ): unknown

    each(
      this: this,
      callback: (
        value: any,
        index: number,
        array: any[],
      ) => void,
      key?: string,
    ): unknown

    /**
     * Get all of the repository contents
     */
    entries(this: this): Loose
  }
}

export default Container
