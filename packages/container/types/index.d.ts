/**
 * Keyed item store.
 */
declare class Container implements Container.Interface {
  repository: Container.Repository
  constructor(repository?: Container.Repository)
  /**
   * Push a new value onto an array item
   *
   * @deprecated
   */
  add(key: string, item: Container.Item): void
  /**
   * Push a new value onto an array item
   */
  push(key: string, item: Container.Item): void
  /**
   * Get a value of a repository item.
   */
  get(key: string): Container.Item
  /**
   * Check the value for a given key
   */
  is(key: string, value: Container.Item): boolean
  /**
   * Check if a given key is true
   */
  isTrue(key: string): boolean
  /**
   * Check if a given key is truthy
   */
  isTruthy(key: string): boolean
  /**
   * Set the value of a key
   */
  set(key: string, value: Container.Item): void
  has(key: string): boolean
  merge(key: string, value: Container.Item): void
  delete: Container.Interface['delete']
  enable(key: string): void
  disable(key: string): void
  enabled(key: string): boolean
  disabled(key: string): boolean
  map(
    key: string,
    callback: (params: unknown) => unknown,
  ): unknown
  each(
    callback: (value: any, index: number, array: any[]) => void,
    key?: string,
  ): unknown
  /**
   * Get all of the repository contents
   */
  entries(): Container.Repository
}
declare namespace Container {
  type Item = any | Loose | Loose[]
  type Repository = Loose
  interface Loose {
    [key: string]: Item
  }
  interface Interface extends Repository {
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
//# sourceMappingURL=index.d.ts.map
