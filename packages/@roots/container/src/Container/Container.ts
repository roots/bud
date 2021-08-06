import * as _ from 'lodash'
import type {ValueOf} from 'type-fest'

import type {Repository} from './Repository'

/**
 * Stores and provides utilities for manipulating {@link Repository data}
 */
export class Container<I = any> {
  /**
   * Identifier
   */
  public ident: 'container'

  /**
   * The container store
   */
  public repository: Repository

  /**
   * Class constructor
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
   */
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
   */
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
   */
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
   */
  public transformStore(transformFn: (value: any) => any): any {
    return transformFn(this.all())
  }

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
   */
  public get<T = any>(key: string | number) {
    return _.get(this.repository, key) as T
  }

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
  public getEntries<T = any>(
    key?: string | number,
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
   */
  public each(
    key: string | number,
    callFn: (key, value) => void,
  ): this {
    this.getEntries(key).forEach(([key, value]) => [
      key,
      callFn(key, value),
    ])

    return this
  }

  /**
   * Calls a supplied function for every {@link Repository} value, passing
   * the item's key and value as callback parameters.
   *
   * @example
   * ```js
   * container.withEntries('key', (key, value) => doSomething)
   * ```
   */
  public every(
    fn: (key: string | number, value: any) => any,
  ): this {
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
   * Gets a nested value from the {@link Repository}
   *
   * @example
   * ```js
   * container.findKeyIn('top-level-key', 'inner', 'nested', 'item')
   * // returns repository['top-level-key'].inner.nested.item
   * ```
   */
  public findKeyIn(
    key: string | number,
    ...searchItem: any[]
  ): any {
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
  public getValues(key?: string): any[] {
    return Object.values(key ? this.get(key) : this.all())
  }

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
  public getKeys(key?: string): string[] {
    return Object.keys(key ? this.get(key) : this.all())
  }

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
   * Set a {@link Repository} value
   *
   * @example
   * ```js
   * container.set('key', value)
   * ```
   */
  public set(key: string | number, value: any): this {
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
   */
  public transform(
    key: string | number,
    mutationFn: (value?: any) => any,
  ): any {
    return mutationFn(this.get(key))
  }

  /**
   * Mutate a {@link Repository} item
   *
   * @example
   * ```js
   * container.mutate('key', currentValue => modifiedValue)
   * ```
   */
  public mutate(
    key: string | number,
    mutationFn: (value?: any) => any,
  ): this {
    this.set(key, this.transform(key, mutationFn))

    return this
  }

  /**
   * Merge a supplied value with an existing {@link Repository} value
   *
   * @example
   * ```js
   * container.merge('key', {merge: values})
   * ```
   */
  public merge(key: string | number, value: any): this {
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
   */
  public has(key: string | number | number): boolean {
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
   */
  public remove(key: string | number): this {
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
   */
  public is(key: string | number, value: any): boolean {
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
   */
  public isTrue(key: string | number): boolean {
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
   */
  public isFalse(key: string | number): boolean {
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
   */
  public isIndexed(key?: string | number): boolean {
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
   */
  public isArray(key: string | number): boolean {
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
   */
  public isNotArray(key: string | number): boolean {
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
   */
  public isString(key: string | number): boolean {
    return this.has(key) && _.isString(this.get(key))
  }

  /**
   * Return true if object is a string.
   *
   * @example
   * ```js
   * container.isString('my-key')
   * // True if container.repository['my-key'] is not a string
   * ```
   */
  public isNotString(key: string | number): boolean {
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
   */
  public isNumber(key: string | number): boolean {
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
   */
  public isNotNumber(key: string | number): boolean {
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
   */
  public isNull(key: string | number): boolean {
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
   */
  public isNotNull(key: string | number): boolean {
    return this.has(key) && !_.isNull(this.get(key))
  }

  /**
   * Return true if object is defined.
   *
   * @example
   * ```js
   * container.isDefined('my-key')
   * // True if container has a 'my-key' entry with a definite value.
   * ```
   */
  public isDefined(key: string | number): boolean {
    return this.has(key) && !_.isUndefined(this.get(key))
  }

  /**
   * Return true if object is defined.
   *
   * @example
   * ```js
   * container.isDefined('my-key')
   * // True if container has a 'my-key' entry with a definite value.
   * ```
   */
  public isUndefined(key: string | number): boolean {
    return !this.has(key) || _.isUndefined(this.get(key))
  }

  /**
   * Return true if object is a function
   *
   * @example
   * ```js
   * container.isFunction('my-key')
   * // True if object associated with 'my-key' is a fn.
   * ````
   */
  public isFunction(key: string | number): boolean {
    return this.has(key) && _.isFunction(this.get(key))
  }
}
