import {bind} from 'helpful-decorators'
import * as _ from 'lodash'
import type {ValueOf} from 'type-fest'

import type {Repository} from './Repository'

/**
 * Provides a simple chainable interface for working with collections of data
 *
 * @public
 */
export class Container<I = any> {
  /**
   * Identifier
   *
   * @public
   */
  public ident?: string = 'container'

  /**
   * The container store
   *
   * @public
   */
  public repository: {[key: string]: any}

  /**
   * Class constructor
   *
   * @param repository - Key-value data store
   *
   * @public
   */
  public constructor(repository?: I) {
    this.setStore(repository ?? {})
  }

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
  @bind
  public all() {
    return this.repository
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
  @bind
  public setStore(repository: Repository): this {
    this.repository = repository

    return this
  }

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
  @bind
  public mergeStore(values: Repository): this {
    this.setStore({
      ...this.all(),
      ...values,
    })

    return this
  }

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
  @bind
  public transformStore(transformFn: (value: any) => any): any {
    return transformFn(this.all())
  }

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
  @bind
  public mutateStore(mutationFn: (value?: I) => I): this {
    const transform = this.transformStore(mutationFn)

    this.setStore(transform)

    return this
  }

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
  @bind
  public get<T = any>(key: string) {
    return _.get(this.repository, key) as T
  }

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
  @bind
  public getEntries<T = any>(
    key?: string,
  ): [string, ValueOf<T>][] {
    let data = []

    if (!key) {
      this.all() &&
        Object.entries(this.all()).map(entry => data.push(entry))
    } else {
      this.has(key) &&
        this.isIndexed(key) &&
        Object.entries(this.get(key)).map(entry =>
          data.push(entry),
        )
    }

    return data as [string, ValueOf<T>][]
  }

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
  @bind
  public fromEntries(entries: [string, any][]): this {
    this.mergeStore(Object.fromEntries(entries))

    return this
  }

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
  @bind
  public each(key: string, callFn: (key, value) => void): this {
    this.getEntries(key).forEach(([key, value]) => [
      key,
      callFn(key, value),
    ])

    return this
  }

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
  @bind
  public every(fn: (key: string, value: any) => any): this {
    this.getEntries().forEach(([key, value]: [string, any]) => {
      fn(key, value)
    })

    return this
  }

  /**
   * Find
   */
  public findKey(...searchItem: any): any {
    return _.findKey(this.repository, ...searchItem)
  }

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
  @bind
  public findKeyIn(key: string, ...searchItem: any[]): any {
    const parseInner = v =>
      (!_.isArray(v) ? Object.entries(v) : v).reduce(
        (a, [k, v]) => ({
          ...a,
          [k]: v,
        }),
        {},
      )

    return _.findKey(parseInner(this.get(key)), ...searchItem)
  }

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
  @bind
  public getValues(key?: string): any[] {
    return Object.values(key ? this.get(key) : this.all())
  }

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
  @bind
  public getKeys(key?: string): string[] {
    return Object.keys(key ? this.get(key) : this.all())
  }

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
  @bind
  public getMap(key?: string): Map<string, any> {
    const reducer: [
      (
        acc: Map<string, any>,
        curr: [string, any],
      ) => Map<string, any>,
      Map<string, any>,
    ] = [
      (map, [key, value]) => {
        map.set(key, value)
        return map
      },
      new Map(),
    ]

    return this.getEntries(key ?? null).reduce(...reducer)
  }

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
  @bind
  public set(key: string, value: any): this {
    _.set(this.repository, key, value)

    return this
  }

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
  @bind
  public transform(
    key: string,
    mutationFn: (value?: any) => any,
  ): any {
    return mutationFn(this.get(key))
  }

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
  @bind
  public mutate(
    key: string,
    mutationFn: (value?: any) => any,
  ): this {
    this.set(key, this.transform(key, mutationFn))

    return this
  }

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
  @bind
  public merge(key: string, value: any): this {
    this.set(key, _.merge(this.get(key), value))

    return this
  }

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
  @bind
  public has(key: string): boolean {
    return _.has(this.repository, key)
  }

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
  @bind
  public remove(key: string): this {
    delete this.repository[key]

    return this
  }

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
  @bind
  public is(key: string, value: any): boolean {
    return _.isEqual(this.get(key), value)
  }

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
  @bind
  public isTrue(key: string): boolean {
    return this.is(key, true)
  }

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
  @bind
  public isFalse(key: string): boolean {
    return this.is(key, false)
  }

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
  @bind
  public isIndexed(key?: string): boolean {
    const value = key ? this.get(key) : this.all()
    return (
      this.has(key) &&
      _.isObject(value) &&
      !_.isArrayLikeObject(value)
    )
  }

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
  @bind
  public isArray(key: string): boolean {
    return this.has(key) && _.isArray(this.get(key))
  }

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
  @bind
  public isNotArray(key: string): boolean {
    return this.has(key) && !_.isArray(this.get(key))
  }

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
  @bind
  public isString(key: string): boolean {
    return this.has(key) && _.isString(this.get(key))
  }

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
  @bind
  public isNotString(key: string): boolean {
    return this.has(key) && !_.isString(this.get(key))
  }

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
  @bind
  public isNumber(key: string): boolean {
    return this.has(key) && _.isNumber(this.get(key))
  }

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
  @bind
  public isNotNumber(key: string): boolean {
    return this.has(key) && !_.isNumber(this.get(key))
  }

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
  @bind
  public isNull(key: string): boolean {
    return this.has(key) && _.isNull(this.get(key))
  }

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
  @bind
  public isNotNull(key: string): boolean {
    return this.has(key) && !_.isNull(this.get(key))
  }

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
  @bind
  public isDefined(key: string): boolean {
    return this.has(key) && !_.isUndefined(this.get(key))
  }

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
  @bind
  public isUndefined(key: string): boolean {
    return !this.has(key) || _.isUndefined(this.get(key))
  }

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
  @bind
  public isFunction(key: string): boolean {
    return this.has(key) && _.isFunction(this.get(key))
  }
}
