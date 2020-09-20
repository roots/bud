import __ from 'lodash'

export type Item = any | Loose | Loose[]

export interface Loose {
  [key: string]: Item
}

/**
 * Generic store.
 *
 * @typedef ContainerInterface
 * @extends Loose
 */
export interface ContainerInterface extends Loose {
  repository: Loose

  /**
   * Push a new value onto an array item
   */
  add(this: ContainerInterface, key: string, item: Item): void

  /**
   * Push a new value onto an array item
   */
  push(this: ContainerInterface, key: string, item: Item): void

  /**
   * Get a value
   */
  get(this: ContainerInterface, key: string): Item

  /**
   * Check a value
   */
  is(this: ContainerInterface, key: string, value: Item): boolean

  /**
   * Set a value
   */
  set(this: ContainerInterface, key: string, value: Item): void

  /**
   * Check if an item exists in the repository.
   */
  has(this: ContainerInterface, key: string): boolean

  /**
   * Merge an item value.
   */
  merge(this: ContainerInterface, key: string, value: Item): void

  /**
   * Delete an item from the repository
   */
  delete(this: ContainerInterface, key: string): void

  /**
   * Set an item to true
   */
  enable(this: ContainerInterface, key: string): void

  /**
   * Set an item to false
   */
  disable(this: ContainerInterface, key: string): void

  /**
   * Set if an item is true
   */
  enabled(this: ContainerInterface, key: string): boolean

  /**
   * Check if an item is false
   */
  disabled(this: ContainerInterface, key: string): boolean

  /**
   * Map a callback onto an iterable item
   */
  map(
    this: ContainerInterface,
    key: string,
    callback: (params: unknown) => unknown,
  ): unknown

  /**
   * Get all of the repository contents
   */
  entries(this: ContainerInterface): Loose
}

/**
 * Keyed item store.
 */
class Container implements ContainerInterface {
  repository: Loose

  constructor(repository?: Loose) {
    this.repository = repository || {}
  }

  /**
   * Push a new value onto an array item
   * @deprecated
   */
  public add(
    this: ContainerInterface,
    key: string,
    item: Item,
  ): void {
    this.repository[key].push(item)
  }

  /**
   * Push a new value onto an array item
   */
  public push(
    this: ContainerInterface,
    key: string,
    item: Item,
  ): void {
    this.repository[key].push(item)
  }

  /**
   * Get a value of a repository item.
   */
  public get(this: ContainerInterface, key: string): Item {
    return __.get(this.repository, key)
  }

  public is(
    this: ContainerInterface,
    key: string,
    value: Item,
  ): boolean {
    return this.get(key) == value
  }

  public set(
    this: ContainerInterface,
    key: string,
    value: Item,
  ): void {
    __.set(this.repository, key, value)
  }

  public has(this: ContainerInterface, key: string): boolean {
    return this.repository.hasOwnProperty(key) ? true : false
  }

  public merge(
    this: ContainerInterface,
    key: string,
    value: Item,
  ): void {
    this.set(key, __.merge(this.get(key), value))
  }

  public delete: ContainerInterface['delete'] = function (
    this: ContainerInterface,
    key: string,
  ) {
    delete this.repository[key]
  }

  public enable(this: ContainerInterface, key: string): void {
    this.repository[key] = true
  }

  public disable(this: ContainerInterface, key: string): void {
    this.repository[key] = false
  }

  public enabled(
    this: ContainerInterface,
    key: string,
  ): boolean {
    return this.is(key, true)
  }

  public disabled(
    this: ContainerInterface,
    key: string,
  ): boolean {
    return this.is(key, false)
  }

  public map(
    this: ContainerInterface,
    key: string,
    callback: (params: unknown) => unknown,
  ): unknown {
    return this.get(key).map(callback)
  }

  /**
   * Get all of the repository contents
   */
  public entries(): Loose {
    return Object.entries(this.repository)
  }
}

export {Container as default}
