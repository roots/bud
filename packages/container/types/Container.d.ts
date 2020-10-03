import Container from './'
/**
 * Keyed item store.
 */
export default class implements Container.Interface {
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
//# sourceMappingURL=Container.d.ts.map
