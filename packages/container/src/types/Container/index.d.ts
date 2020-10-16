export type Item = any | Repository | Repository[]

export interface Repository {
  [key: string]: Item
}

export type Handler = (params: unknown) => unknown

export type Using = (key: string, value: Item) => void

export type Conditional = (key: string, comparison: any) => boolean

export type Select = (key: string) => void

export type Get = (key: string) => Item

export type IterateUsing = (
  key: string,
  handler: Handler,
) => unknown

export type Transform<T=any> = (arguments?: any) => T

export declare class Container implements Repository {
  /**
   * Container storage object.
   */
  public repository: Repository

  /**
   * Push a new value onto an array item
   */
  public add: Using

  /**
   * Push a new value onto an array item
   */
  public push: Using

  /**
   * Get a value
   */
  public get: Select

  /**
   * Check a value
   */
  public is: Conditional

  /**
   * Check if a given key is true
   */
  public isTrue: Conditional

  /**
   * Check if a given key is truthy
   */
  public isTruthy: Conditional

  /**
   * Set a value
   */
  public set: Using

  /**
   * Check if an item exists in the repository.
   */
  public has: Conditional

  /**
   * Merge an item value.
   */
  public merge: Using

  /**
   * Delete an item from the repository
   */
  public delete: Select

  /**
   * Set an item to true
   */
  public enable: Select

  /**
   * Set an item to false
   */
  public disable: Select

  /**
   * Set if an item is true
   */
  public enabled: Conditional

  /**
   * Check if an item is false
   */
  public disabled: Conditional

  /**
   * Map a callback onto an iterable item
   */
  public map: MapUsing

  /**
   * Get all of the repository contents
   */
  public entries: Transform

  /**
   * Get repo keys.
   */
  public keys: Transform

  /**
   * Get repo values.
   */
  public values: Transform

  /**
   * Produce a Map of the repo
   */
  public Map: Transform
}
