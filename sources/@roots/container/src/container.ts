import {bind} from 'helpful-decorators'
import get from 'lodash/get.js'
import has from 'lodash/has.js'
import isArray from 'lodash/isArray.js'
import isEmpty from 'lodash/isEmpty.js'
import isEqual from 'lodash/isEqual.js'
import isFunction from 'lodash/isFunction.js'
import isNull from 'lodash/isNull.js'
import isNumber from 'lodash/isNumber.js'
import isString from 'lodash/isString.js'
import isUndefined from 'lodash/isUndefined.js'
import set from 'lodash/set.js'
import size from 'lodash/size.js'
import uniq from 'lodash/uniq.js'
// eslint-disable-next-line n/no-unpublished-import
import type {ValueOf} from 'type-fest'

import {mergeable} from './utilities.js'

/**
 * Container repository interface
 */
export interface Repository extends Record<string, any> {}

/**
 * Provides a simple chainable interface for working with collections of data
 */
export default class Container<I = any> {
  /**
   * Identifier
   */
  public ident?: string = `container`

  /**
   * The container store
   */
  public repository: Record<string, any>

  /**
   * Class constructor
   *
   * @param repository - Key-value data store
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
   */
  @bind
  public setStore(repository: Repository): this {
    if (isUndefined(repository)) {
      throw new Error(`Repository cannot be empty`)
    }

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
   */
  @bind
  public mergeStore(values: Repository): this {
    return this.setStore({...this.all(), ...values})
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
   */
  @bind
  public transformStore(transformFn: (value: any) => any): any {
    return transformFn(this.all())
  }

  /**
   * Runs the entire repository through the supplied fn and returns
   * the transformed value. The transformed repository replaces the
   * original.
   *
   * @example
   * ```js
   * container.mutate('key', currentValue => modifiedValue)
   * ```
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
   */
  @bind
  public get<T = any>(key: string | Array<string>) {
    return get(this.repository, key) as T
  }

  /**w
   * Returns a repository key and value as a tuple
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
  @bind
  public getEntries<T = any>(key?: string): [string, ValueOf<T>][] {
    if (!key) return Object.entries(this.repository)

    if (!this.has(key)) {
      throw new Error(`Key ${key} does not exist`)
    }

    return Object.entries(this.get(key)) as [string, ValueOf<T>][]
  }

  /**
   * Merges object created from an array of tuples with the repository.
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
   * Calls a supplied function for every repository value, passing
   * the item's key and value as callback parameters.
   *
   * @example
   * ```js
   * container.withEntries('key', (key, value) => doSomething)
   * ```
   */
  @bind
  public every(fn: (key: string, value: any) => any): this {
    this.getEntries().forEach(([key, value]: [string, any]) => {
      fn(key, value)
    })

    return this
  }

  /**
   * Returns an array of values of the enumerable properties of a repository object
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
  @bind
  public getValues(key?: string): any[] {
    return Object.values(key ? this.get(key) : this.all())
  }

  /**
   * Returns an array of values of the enumerable keys of a repository object
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
  @bind
  public getKeys(key?: string): string[] {
    return Object.keys(key ? this.get(key) : this.all())
  }

  /**
   * Get a repository item as a {@link MapConstructor}.
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
  @bind
  public getMap(key?: string): Map<string, any> {
    const reducer: [
      (acc: Map<string, any>, curr: [string, any]) => Map<string, any>,
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
   * Set a repository value
   *
   * @example
   * ```js
   * container.set('key', value)
   * ```
   */
  @bind
  public set(key: string | Array<string>, value: any): this {
    set(this.repository, key, value)

    return this
  }

  /**
   * Returns unique elements of an array item
   *
   * @example
   * ```js
   * container.unique('item')
   * ```
   */
  @bind
  public unique(key: string): any {
    if (!this.has(key)) {
      throw new Error(`${key} does not exist in the container`)
    }

    const value = this.get(key)

    if (!isArray(value)) {
      throw new Error(`${key} is not an array`)
    }

    return uniq(value)
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
   */
  @bind
  public transform(key: string, mutationFn: (value?: any) => any): any {
    return mutationFn(this.get(key))
  }

  /**
   * Mutate a repository item
   *
   * @example
   * ```js
   * container.mutate('key', currentValue => modifiedValue)
   * ```
   *
   * @param key - The key of the item to mutate
   * @param mutationFn - The mutation function to run on the item
   */
  @bind
  public mutate(key: string, mutationFn: (value?: any) => any): this {
    this.set(key, this.transform(key, mutationFn))

    return this
  }

  /**
   * Merge a supplied value with an existing repository value
   *
   * @example
   * ```js
   * container.merge('key', {merge: values})
   * ```
   *
   * @param key - The key of the item to merge
   * @param value - The value to merge with the existing value
   */
  @bind
  public merge(key: string, value: any): this {
    const existent = this.get(key)

    if (typeof existent !== typeof value) {
      throw new Error(
        `Cannot merge ${typeof value} with ${typeof existent}`,
      )
    }

    if (!mergeable(existent))
      throw new Error(
        `${key} is a ${typeof existent} and cannot be merged with`,
      )

    if (isArray(value)) {
      if (!isArray(existent)) {
        throw new Error(
          `${key} is not an array and cannot have an array merged onto it`,
        )
      }

      this.set(key, [...existent, ...value])
    } else {
      this.set(key, {...existent, ...value})
    }

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
  @bind
  public has(key: string): boolean {
    return has(this.repository, key)
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
   */
  @bind
  public is(key: string, value: any): boolean {
    return isEqual(this.get(key), value)
  }

  /**
   * Return a number indicating the length of a matched key
   * in the repository.
   *
   * If no key is provided, returns the length of the repository.
   *
   * @param key - search key
   * @returns count of items
   */
  @bind
  public count(key?: string): number {
    if (key) {
      if (!this.has(key)) {
        throw new Error(`${key} does not exist in the container`)
      }

      return size(this.get(key))
    }

    return size(this.repository)
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
   */
  @bind
  public isFalse(key: string): boolean {
    return this.is(key, false)
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
   */
  @bind
  public isArray(key: string): boolean {
    return this.has(key) && isArray(this.get(key))
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
   */
  @bind
  public isNotArray(key: string): boolean {
    return this.has(key) && !isArray(this.get(key))
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
   */
  @bind
  public isString(key: string): boolean {
    return this.has(key) && isString(this.get(key))
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
   */
  @bind
  public isNotString(key: string): boolean {
    return this.has(key) && !isString(this.get(key))
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
   */
  @bind
  public isNumber(key: string): boolean {
    return this.has(key) && isNumber(this.get(key))
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
   */
  @bind
  public isNotNumber(key: string): boolean {
    return this.has(key) && !isNumber(this.get(key))
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
    return this.has(key) && isNull(this.get(key))
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
   */
  @bind
  public isNotNull(key: string): boolean {
    return this.has(key) && !isNull(this.get(key))
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
   */
  @bind
  public isDefined(key: string): boolean {
    return this.has(key) && !isUndefined(this.get(key))
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
   */
  @bind
  public isUndefined(key: string): boolean {
    return !this.has(key) || isUndefined(this.get(key))
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
   */
  @bind
  public isFunction(key: string): boolean {
    return this.has(key) && isFunction(this.get(key))
  }

  /**
   * Return true if object is not a function
   *
   * @example
   * ```js
   * container.isNotFunction('my-key')
   * // True if object associated with 'my-key' is not a fn.
   * ```
   *
   * @param key - The key to check.
   * @returns True if object is not a function.
   */
  @bind
  public isNotFunction(key: string): boolean {
    return this.has(key) && !isFunction(this.get(key))
  }

  /**
   * Return true if object is an instance of a class.
   *
   * @example
   * ```js
   * container.isInstanceOf('my-key', MyClass)
   * // True if object associated with 'my-key' is an instance of MyClass.
   * ```
   *
   * @param key - The key to check.
   * @param instance - The class to check.
   * @returns True if object is an instance of the class.
   */
  @bind
  public isInstanceOf(key: string, instance: any): boolean {
    return this.has(key) && this.get(key) instanceof instance
  }

  /**
   * Return true if object is not an instance of a class.
   *
   * @example
   * ```js
   * container.isNotInstanceOf('my-key', MyClass)
   * // True if object associated with 'my-key' is not an instance of MyClass.
   * ```
   *
   * @param key - The key to check.
   * @param instance - The class to check against
   * @returns
   */
  @bind
  public isNotInstanceOf(key: string, instance: any): boolean {
    return this.has(key) && !(this.get(key) instanceof instance)
  }

  /**
   * Return true if object is an instance of any of the classes.
   *
   * @example
   * ```js
   * container.isInstanceOfAny('my-key', [MyClass, MyOtherClass])
   * // True if object associated with 'my-key' is an instance of MyClass or MyOtherClass.
   * ```
   *
   * @param key - the key to check
   * @param instances - The classes to check against
   * @returns
   */
  @bind
  public isInstanceOfAny(key: string, instances: any[]): boolean {
    return (
      this.has(key) &&
      instances.some(instance => this.get(key) instanceof instance)
    )
  }

  /**
   * Return true if object is not an instance of any of the classes.
   *
   * @example
   * ```js
   * container.isNotInstanceOfAny('my-key', [MyClass, MyOtherClass])
   * // True if object associated with 'my-key' is not an instance of MyClass or MyOtherClass.
   * ```
   *
   * @param key - search key
   * @param instances - classes
   * @returns
   */
  @bind
  public isNotInstanceOfAny(key: string, instances: any[]): boolean {
    return (
      this.has(key) &&
      !instances.some(instance => this.get(key) instanceof instance)
    )
  }

  /**
   * Checks if value is empty. A value is considered empty unless
   * it’s an arguments object, array, string, or jQuery-like
   * collection with a length greater than 0 or an object with
   * own enumerable properties.
   *
   * @example
   * ```js
   * container.isEmpty('my-key')
   * // True if object associated with 'my-key' is empty.
   * ```
   *
   * @param key - search key
   * @returns True if object is empty.
   */
  @bind
  public isEmpty(key?: string): boolean {
    if (key) {
      return this.has(key) && isEmpty(this.get(key))
    }

    return isEmpty(this.repository)
  }

  /**
   * Checks if value is not empty. A value is considered empty unless
   * it’s an arguments object, array, string, or jQuery-like
   * collection with a length greater than 0 or an object with
   * own enumerable properties.
   *
   * @example
   * ```js
   * container.isNotEmpty('my-key')
   * // True if object associated with 'my-key' is not empty.
   * ```
   *
   * @param key - search key
   * @returns True if object is not empty.
   */
  @bind
  public isNotEmpty(key: string): boolean {
    return this.has(key) && !isEmpty(this.get(key))
  }
}
