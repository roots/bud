import type {ValueOf} from 'type-fest'
import type {Repository} from './Repository'
/**
 * Provides a simple chainable interface for working with collections of data
 */
export declare class Container<I = any> {
  /**
   * Identifier
   */
  ident: string
  /**
   * The container store
   */
  repository: any
  /**
   * Class constructor
   */
  constructor(repository?: I)
  /**
   * Returns the repository in its entirety as a plain JS object
   *
   * @example
   * ```js
   * container.all()
   * ```
   */
  all(): any
  /**
   * Replace the store with an all new set of values
   *
   * @example
   * ```js
   * container.setStore({
   *  new: ['store', 'contents'],
   * })
   * ```
   */
  setStore(repository: Repository): this
  /**
   * Merge values onto the container store.
   *
   * @example
   * ```js
   * container.mergeStore({test: 'foo'})
   * ```
   */
  mergeStore(values: Repository): this
  /**
   * Runs the entire repository through the supplied fn and returns
   * the transformed value.
   *
   * @example
   * ```js
   * container.transform(store=> modifiedStore)
   * ```
   */
  transformStore(transformFn: (value: any) => any): any
  /**
   * Runs the entire {@link Repository} through the supplied fn and returns
   * the transformed value. The transformed {@link Repository} replaces the
   * original.
   *
   * @example
   * ```js
   * container.mutate('key', currentValue => modifiedValue)
   * ```
   */
  mutateStore(mutationFn: (value?: I) => I): this
  /**
   * Returns a value from the the repository.
   *
   * @remarks
   * If no key is passed the container store will be returned.
   *
   * @example
   * ```js
   * container.get('container.container-item')
   * ```
   *
   * @example
   * ```js
   * container.get(['container', 'container-item'])
   * ```
   */
  get<T = any>(key: string | number): T
  /**
   * Returns a {@link Repository} key and value as a tuple
   *
   * @remarks
   * If no key is passed the container store will be used.
   *
   * @example
   * ```js
   * container.getEntries()
   * ```
   *
   * @example
   * ```js
   * container.getEntries('key')
   * ```
   */
  getEntries<T = any>(
    key?: string | number,
  ): [string, ValueOf<T>][]
  /**
   * Merges object created from an array of tuples with the {@link Repository}.
   *
   * @example
   * ```js
   * container.getEntries()
   * ```
   *
   * @example
   * ```js
   * container.getEntries('key')
   * ```
   */
  fromEntries(entries: [string, any][]): this
  /**
   * Use each value as parameters in a supplied callback
   *
   * @example
   * ```js
   * container.withEntries('key', (key, value) => doSomething)
   * ```
   */
  each(
    key: string | number,
    callFn: (key: any, value: any) => void,
  ): this
  /**
   * Calls a supplied function for every {@link Repository} value, passing
   * the item's key and value as callback parameters.
   *
   * @example
   * ```js
   * container.withEntries('key', (key, value) => doSomething)
   * ```
   */
  every(fn: (key: string | number, value: any) => any): this
  /**
   * Find
   */
  findKey(...searchItem: any): any
  /**
   * Gets a nested value from the {@link Repository}
   *
   * @example
   * ```js
   * container.findKeyIn('top-level-key', 'inner', 'nested', 'item')
   * // returns repository['top-level-key'].inner.nested.item
   * ```
   */
  findKeyIn(key: string | number, ...searchItem: any[]): any
  /**
   * Returns an array of values of the enumerable properties of a {@link Repository} object
   *
   * @example
   * ```js
   * container.getValues('container.container-item')
   * ```
   *
   * @example
   * ```js
   * container.getValues()
   * // => returns values from entire store
   * ```
   */
  getValues(key?: string): any[]
  /**
   * Returns an array of values of the enumerable keys of a {@link Repository} object
   *
   * @example
   * ```js
   * container.getKeys('item')
   * // => returns keys of container.repository[item]
   * ```
   *
   * @example
   * ```js
   * container.getKeys()
   * // => returns keys of container.repository
   * ```
   */
  getKeys(key?: string): string[]
  /**
   * Get a {@link Repository} item as a {@link Map}.
   *
   * @remarks
   * If no key is passed the container store is mapped.
   *
   * @example
   * Returns `repository.item` as a Map:
   * ```js
   * container.getMap('item')
   * ```
   *
   * @example
   * Returns the entire repository as a Map:
   *
   * ```js
   * container.getMap()
   * ```
   */
  getMap(key?: string): Map<string, any>
  /**
   * Set a {@link Repository} value
   *
   * @example
   * ```js
   * container.set('key', value)
   * ```
   */
  set(key: string | number, value: any): this
  /**
   * Retrieve a container item, running it through the supplied fn.
   *
   * @remarks
   * Returns the transformed value.
   *
   * @example
   * ```js
   * container.transform('key', currentValue => modifiedValue)
   * ```
   */
  transform(
    key: string | number,
    mutationFn: (value?: any) => any,
  ): any
  /**
   * Mutate a {@link Repository} item
   *
   * @example
   * ```js
   * container.mutate('key', currentValue => modifiedValue)
   * ```
   */
  mutate(
    key: string | number,
    mutationFn: (value?: any) => any,
  ): this
  /**
   * Merge a supplied value with an existing {@link Repository} value
   *
   * @example
   * ```js
   * container.merge('key', {merge: values})
   * ```
   */
  merge(key: string | number, value: any): this
  /**
   * Return a boolean indicating if a given key exists.
   *
   * @example
   * ```js
   * container.has('my-key')
   * // true if container.repository['my-key'] exists
   * ```
   */
  has(key: string | number | number): boolean
  /**
   * delete
   *
   * Delete an entry from the repository
   *
   * @example
   * ```js
   * container.remove('my-key')
   * // Remove container.repository['my-key']
   * ```
   */
  remove(key: string | number): this
  /**
   * Return a boolean indicating if the given key matches the given value.
   *
   * @example
   * ```js
   * container.is('my-key', {whatever: 'value'})
   * // True if container.repository['my-key'] === {whatever: 'value'}
   * ```
   */
  is(key: string | number, value: any): boolean
  /**
   * Return a boolean indicating if the given key's value is true
   *
   * @example
   * ```js
   * container.isTrue('my-key')
   * // True if container.repository['my-key'] === true
   * ```
   */
  isTrue(key: string | number): boolean
  /**
   * Return a boolean indicating if the given key's value is false
   *
   * @example
   * ```js
   * container.isFalse('my-key')
   * // True if container.repository['my-key'] === false
   * ```
   */
  isFalse(key: string | number): boolean
  /**
   * Return true if object is likely a vanilla object with string keys.
   *
   * @example
   * ```js
   * container.isIndexed('my-key')
   * // True if container.repository['my-key'] appears to be an object.
   * ```
   */
  isIndexed(key?: string | number): boolean
  /**
   * Return true if object is an array.
   *
   * @example
   * ```js
   * container.isArray('my-key')
   * // True if container.repository['my-key'] is an array
   * ```
   */
  isArray(key: string | number): boolean
  /**
   * Return true if object is not an array.
   *
   * @example
   * ```js
   * container.isNotArray('my-key')
   * // True if container.repository['my-key'] is not an array
   * ```
   */
  isNotArray(key: string | number): boolean
  /**
   * Return true if object is a string.
   *
   * @example
   * ```js
   * container.isString('my-key')
   * // True if container.repository['my-key'] is a string
   * ```
   */
  isString(key: string | number): boolean
  /**
   * Return true if object is a string.
   *
   * @example
   * ```js
   * container.isString('my-key')
   * // True if container.repository['my-key'] is not a string
   * ```
   */
  isNotString(key: string | number): boolean
  /**
   * Return true if object is a number.
   *
   * @example
   * ```js
   * container.isNumber('my-key')
   * // True if container.repository['my-key'] is a number
   * ```
   */
  isNumber(key: string | number): boolean
  /**
   * Return true if object is not a number.
   *
   * @example
   * ```js
   * container.isNumber('my-key')
   * // True if container.repository['my-key'] is not a number
   * ```
   */
  isNotNumber(key: string | number): boolean
  /**
   * Return true if object is null.
   *
   * @example
   * ```js
   * container.isNull('my-key')
   * // True if container.repository['my-key'] is null
   * ```
   */
  isNull(key: string | number): boolean
  /**
   * Return true if object is not null.
   *
   * @example
   * ```js
   * container.isNotNull('my-key')
   * // True if container.repository['my-key'] is not null
   * ```
   */
  isNotNull(key: string | number): boolean
  /**
   * Return true if object is defined.
   *
   * @example
   * ```js
   * container.isDefined('my-key')
   * // True if container has a 'my-key' entry with a definite value.
   * ```
   */
  isDefined(key: string | number): boolean
  /**
   * Return true if object is defined.
   *
   * @example
   * ```js
   * container.isDefined('my-key')
   * // True if container has a 'my-key' entry with a definite value.
   * ```
   */
  isUndefined(key: string | number): boolean
  /**
   * Return true if object is a function
   *
   * @example
   * ```js
   * container.isFunction('my-key')
   * // True if object associated with 'my-key' is a fn.
   * ````
   */
  isFunction(key: string | number): boolean
}
//# sourceMappingURL=Container.d.ts.map
