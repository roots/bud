/**
 * The {@link @roots/container# | @roots/container} package provides
 * a simple chainable interface for working with collections of data
 *
 * @packageDocumentation @betaDocumentation
 */

import type {ValueOf} from 'type-fest'

/**
 * Provides a simple chainable interface for working with collections of data
 *
 * @public
 */
export declare class Container<I = any> {
  /**
   * Identifier
   *
   * @public
   */
  ident: string
  /**
   * The container store
   *
   * @public
   */
  repository: {
    [key: string]: any
  }
  /**
   * Class constructor
   *
   * @param repository - Key-value data store
   *
   * @public
   */
  constructor(repository?: I)
  /**
   * Returns the repository in its entirety as a plain JS object
   *
   * @example
   * ```js
   * container.all()
   * ```
   *
   * @public
   * @decorator `@bind`
   */
  all(): {
    [key: string]: any
  }
  /**
   * Replace the store with an all new set of values
   *
   * @example
   * ```js
   * container.setStore({
   *  new: ['store', 'contents'],
   * })
   * ```
   *
   * @public
   * @decorator `@bind`
   */
  setStore(repository: Repository): this
  /**
   * Merge values onto the container store.
   *
   * @example
   * ```js
   * container.mergeStore({test: 'foo'})
   * ```
   *
   * @param values - Values to merge onto the container store
   * @returns The container instance
   *
   * @public
   * @decorator `@bind`
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
   *
   * @param fn - Function to run on the repository
   * @returns The transformed repository
   *
   * @public
   * @decorator `@bind`
   */
  transformStore(transformFn: (value: any) => any): any
  /**
   * Runs the entire {@link (Repository:interface) | Repository} through the supplied fn and returns
   * the transformed value. The transformed {@link (Repository:interface) | Repository} replaces the
   * original.
   *
   * @example
   * ```js
   * container.mutate('key', currentValue => modifiedValue)
   * ```
   *
   * @public
   * @decorator `@bind`
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
   *
   * @public
   * @decorator `@bind`
   */
  get<T = any>(key: string | number): T
  /**
   * Returns a {@link (Repository:interface) | Repository} key and value as a tuple
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
   *
   * @public
   * @decorator `@bind`
   */
  getEntries<T = any>(
    key?: string | number,
  ): [string, ValueOf<T>][]
  /**
   * Merges object created from an array of tuples with the {@link (Repository:interface) | Repository}.
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
   *
   * @public
   * @decorator `@bind`
   */
  fromEntries(entries: [string, any][]): this
  /**
   * Use each value as parameters in a supplied callback
   *
   * @example
   * ```js
   * container.withEntries('key', (key, value) => doSomething)
   * ```
   *
   * @public
   * @decorator `@bind`
   */
  each(
    key: string | number,
    callFn: (key: any, value: any) => void,
  ): this
  /**
   * Calls a supplied function for every {@link (Repository:interface) | Repository} value, passing
   * the item's key and value as callback parameters.
   *
   * @example
   * ```js
   * container.withEntries('key', (key, value) => doSomething)
   * ```
   *
   * @public
   * @decorator `@bind`
   */
  every(fn: (key: string | number, value: any) => any): this
  /**
   * Find
   */
  findKey(...searchItem: any): any
  /**
   * Gets a nested value from the {@link (Repository:interface) | Repository}
   *
   * @example
   * ```js
   * container.findKeyIn('top-level-key', 'inner', 'nested', 'item')
   * // returns repository['top-level-key'].inner.nested.item
   * ```
   *
   * @public
   * @decorator `@bind`
   */
  findKeyIn(key: string | number, ...searchItem: any[]): any
  /**
   * Returns an array of values of the enumerable properties of a {@link (Repository:interface) | Repository} object
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
   *
   * @public
   * @decorator `@bind`
   */
  getValues(key?: string): any[]
  /**
   * Returns an array of values of the enumerable keys of a {@link (Repository:interface) | Repository} object
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
   *
   * @public
   * @decorator `@bind`
   */
  getKeys(key?: string): string[]
  /**
   * Get a {@link (Repository:interface) | Repository} item as a {@link MapConstructor}.
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
   *
   * @public
   * @decorator `@bind`
   */
  getMap(key?: string): Map<string, any>
  /**
   * Set a {@link (Repository:interface) | Repository} value
   *
   * @example
   * ```js
   * container.set('key', value)
   * ```
   *
   * @public
   * @decorator `@bind`
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
   *
   * @param key - The key of the item to transform
   * @param fn - The function to transform the item with
   *
   * @public
   * @decorator `@bind`
   */
  transform(
    key: string | number,
    mutationFn: (value?: any) => any,
  ): any
  /**
   * Mutate a {@link (Repository:interface) | Repository} item
   *
   * @example
   * ```js
   * container.mutate('key', currentValue => modifiedValue)
   * ```
   *
   * @param key - The key of the item to mutate
   * @param mutationFn - The mutation function to run on the item
   *
   * @public
   * @decorator `@bind`
   */
  mutate(
    key: string | number,
    mutationFn: (value?: any) => any,
  ): this
  /**
   * Merge a supplied value with an existing {@link (Repository:interface) | Repository} value
   *
   * @example
   * ```js
   * container.merge('key', {merge: values})
   * ```
   *
   * @param key - The key of the item to merge
   * @param value - The value to merge with the existing value
   *
   * @public
   * @decorator `@bind`
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
   *
   * @public
   * @decorator `@bind`
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
   *
   * @public
   * @decorator `@bind`
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
   *
   * @public
   * @decorator `@bind`
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
   *
   * @param key - The key to check
   * @returns True if the key's value is true
   *
   * @public
   * @decorator `@bind`
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
   *
   * @param key - The key to check
   * @returns True if the key's value is false
   *
   * @public
   * @decorator `@bind`
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
   *
   * @param key - The key to check
   * @returns True if the key is likely an object.
   *
   * @public
   * @decorator `@bind`
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
   *
   * @param key - The key to check
   * @returns True if the value is an array
   *
   * @public
   * @decorator `@bind`
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
   *
   * @param key - The key to check
   * @returns True if object is not an array
   *
   * @public
   * @decorator `@bind`
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
   *
   * @param key - The key to check
   * @returns True if object is a string
   *
   * @public
   * @decorator `@bind`
   */
  isString(key: string | number): boolean
  /**
   * Return true if object is not a string.
   *
   * @example
   * ```js
   * container.isString('my-key')
   * // True if container.repository['my-key'] is not a string
   * ```
   *
   * @param key - The key to check
   * @returns True if object is not a string
   *
   * @public
   * @decorator `@bind`
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
   *
   * @param key - The key to check
   * @returns True if object is a number
   *
   * @public
   * @decorator `@bind`
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
   *
   * @param key - The key to check
   * @returns True if object is not a number
   *
   * @public
   * @decorator `@bind`
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
   *
   * @param key - The key to check
   * @returns True if object is null
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
   *
   * @param key - The key to check
   * @returns True if object is not null
   *
   * @public
   * @decorator `@bind`
   */
  isNotNull(key: string | number): boolean
  /**
   * Return true if object is defined.
   *
   * @example
   * True if container has a 'my-key' entry with a definite value.
   *
   * ```js
   * container.isDefined('my-key')
   * ```
   *
   * @param key - The key to check.
   * @returns True if the key is defined.
   *
   * @public
   * @decorator `@bind`
   */
  isDefined(key: string | number): boolean
  /**
   * Return true if object is not defined.
   *
   * @example
   * ```js
   * container.isDefined('my-key')
   * // True if container has a 'my-key' entry with a definite value.
   * ```
   *
   * @param key - The key to check.
   * @returns True if the key is not defined.
   *
   * @public
   * @decorator `@bind`
   */
  isUndefined(key: string | number): boolean
  /**
   * Return true if object is a function
   *
   * @example
   * ```js
   * container.isFunction('my-key')
   * // True if object associated with 'my-key' is a fn.
   * ```
   *
   * @param key - The key to check.
   * @returns True if object is a function.
   *
   * @public
   * @decorator `@bind`
   */
  isFunction(key: string | number): boolean
}

/**
 * Indexed container value store.
 *
 * @public
 */
export declare interface Repository {
  [key: string]: any
}

/**
 * Repository namespace
 *
 * @public
 */
export declare namespace Repository {
  /**
   * Repository key
   *
   * @public
   */
  export type Key<I> = (string | number) & keyof I
}

export {}
