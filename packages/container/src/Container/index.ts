import _ from 'lodash'
import {ValueOf} from 'type-fest'

/**
 * Indexed container value store.
 */
export type Repository<I = any> = {
  [key: string]: I
}

/**
 * @roots/container
 */
export class Container<I = any> {
  /**
   * The container store
   */
  repository: any

  /**
   * Class constructor
   */
  constructor(repository?: I) {
    this.setStore(repository ?? {})
  }

  /**
   * ## container.all
   *
   * Does the same thing as container.all
   *
   * ### Usage
   *
   * ```js
   * container.all()
   * ```
   */
  public all() {
    return this.repository
  }

  /**
   * ## container.setStore
   *
   * Replace the store with an all new set of values
   *
   * ### Usage
   *
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
   * ## container.mergeStore
   *
   * Merge values onto the container store.
   *
   * ### Usage
   *
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
   * ## container.transformStore
   *
   * Retrieve the container store, running it through the supplied fn.
   *
   * Returns the transformed value.
   *
   * ### Usage
   *
   * ```js
   * container.transform('key', currentValue => modifiedValue)
   * ```
   */
  public transformStore(transformFn: (value: any) => any): any {
    return transformFn(this.all())
  }

  /**
   * ## container.mutateStore
   *
   * Mutate the container store.
   *
   * ### Usage
   *
   * ```js
   * container.mutate('key', currentValue => modifiedValue)
   * ```
   */
  public mutateStore(mutationFn: (value?: I) => I): this {
    this.setStore(this.transformStore(mutationFn))

    return this
  }

  /**
   * ## container.mutateStore
   *
   * Mutate the container store.
   *
   * ### Usage
   *
   * ```js
   * container.mutateStoreEntries((key, value) => value + 1)
   * ```
   */
  public mutateStoreEntries(
    mutateFn: (key: string, value: I) => I,
  ): this {
    this.fromEntries(
      this.getEntries().map(([key, value]: [string, I]) => [
        key,
        mutateFn(key, value),
      ]),
    )

    return this
  }

  /**
   * ## container.get
   *
   * Get a value from the container.
   *
   * If no key is passed the container store will be returned.
   *
   * ### Usage
   *
   * ```js
   * container.get('container.container-item')
   * ```
   *
   * ```js
   * container.get(['container', 'container-item'])
   * ```
   */
  public get<T = any>(key: any) {
    return _.get(this.repository, key) as T
  }

  /**
   * ## container.getEntries
   *
   * Get container value as [K, V] tuples.
   *
   * If no key is passed the container store will be used.
   *
   * ### Usage
   *
   * ```js
   * container.getEntries()
   * ```
   *
   * ```js
   * container.getEntries('key')
   * ```
   */
  public getEntries<T = any>(
    key?: keyof T,
  ): [keyof T, ValueOf<T>][] {
    return Object.entries(
      key ? this.get(key as string) : this.all(),
    ) as [keyof T, ValueOf<T>][]
  }

  /**
   * ## container.fromEntries
   *
   * Set container value from [K, V] tuples.
   *
   * If no key is passed the container store will be used.
   *
   * ### Usage
   *
   * ```js
   * container.getEntries()
   * ```
   *
   * ```js
   * container.getEntries('key')
   * ```
   */
  public fromEntries(entries: [string, any][]): this {
    this.mergeStore(Object.fromEntries(entries))

    return this
  }

  /**
   * ## container.withEntries
   *
   * Use each value as parameters in a supplied callback
   *
   * ### Usage
   *
   * ```js
   * container.withEntries('key', (key, value) => doSomething)
   * ```
   */
  public each(key: string, callFn: (key, value) => void): this {
    this.getEntries(key).forEach(([key, value]) => [
      key,
      callFn(key, value),
    ])

    return this
  }

  /**
   * ## container.every
   *
   * Use each value as parameters in a supplied callback
   *
   * ### Usage
   *
   * ```js
   * container.withEntries('key', (key, value) => doSomething)
   * ```
   */
  public every(fn: (key: string, value: any) => any): this {
    this.getEntries().forEach(([key, value]: [string, any]) => {
      fn(key, value)
    })

    return this
  }

  public findKey(...searchItem: any): any {
    return _.findKey(this.repository, ...searchItem)
  }

  public findKeyOf(key: string, ...searchItem: any[]): any {
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
   * ## container.mutateEntries
   *
   * Mutate each value via a supplied mutagen.
   *
   * ### Usage
   *
   * ```js
   * container.mutateEntries('key', (key, value) => value + 1)
   * ```
   */
  public mutateEntries(
    key: string,
    mutateFn: (key: string, value: any) => any,
  ): this {
    this.fromEntries(
      this.getEntries(key).map(([key, value]: [string, any]) => [
        key,
        mutateFn(key, value),
      ]),
    )

    return this
  }

  /**
   * ## container.getValues
   *
   * Get an item value.
   *
   * If no key is passed the container store will be used.
   *
   * ### Usage
   *
   * ```js
   * container.getValues('container.container-item')
   * ```
   *
   * ```js
   * container.getValues()
   * // => returns values from entire store
   * ```
   */
  public getValues(key?: string): any[] {
    return Object.values(key ? this.get(key) : this.all())
  }

  /**
   * ## container.getKeys
   *
   * Get an item's keys.
   *
   * If no key is passed the container store will be used.
   *
   * ### Usage
   *
   * ```js
   * container.getKeys('item')
   * // => returns keys of container.repository[item]
   * ```
   *
   * ```js
   * container.getKeys()
   * // => returns keys of container.repository
   * ```
   */
  public getKeys(key?: string): string[] {
    return Object.keys(key ? this.get(key) : this.all())
  }

  /**
   * ## container.getMap
   *
   * Get an item as a Map datatype.
   *
   * If no key is passed the container store will be used.
   *
   * ### Usage
   *
   * ```js
   * container.getMap('item')
   * // => returns a map of container.repository[item]
   * ```
   *
   * ```js
   * container.getMap()
   * // => returns a map of container.repository
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
   * ## container.set
   *
   * Set a value on a container item.
   *
   * ### Usage
   *
   * ```js
   * container.set('key', value)
   * ```
   */
  public set(key: string, value: any): this {
    _.set(this.repository, key, value)

    return this
  }

  /**
   * ## container.push
   *
   * Push an item or entry onto the container
   *
   * ```js
   * container.unique('containerKey') // unique values of containerKey
   * ```
   *
   * ```js
   * container.unique() // unique values of container
   * ```
   */
  public push(value: any, key?: any) {
    if (key) {
      this.mutate(key, k => k.push(value))
      return this
    }

    if (!_.isArray(this.all())) {
      throw new Error(
        'Type mismatch: Attempted to push onto object container as if it were an array.',
      )
    }

    this.setStore(this.all().push(value))

    return this
  }

  /**
   * ## container.transform
   *
   * Retrieve a container item, running it through the supplied fn.
   *
   * Returns the transformed value.
   *
   * ### Usage
   *
   * ```js
   * container.transform('key', currentValue => modifiedValue)
   * ```
   */
  public transform(
    key: string,
    mutationFn: (value?: any) => any,
  ): any {
    return mutationFn(this.get(key))
  }

  /**
   * ## container.mutate
   *
   * Mutate a container item.
   *
   * ### Usage
   *
   * ```js
   * container.mutate('key', currentValue => modifiedValue)
   * ```
   */
  public mutate(
    key: string,
    mutationFn: (value?: any) => any,
  ): this {
    this.set(key, this.transform(key, mutationFn))

    return this
  }

  /**
   * ## container.merge
   *
   * Merge a container item.
   *
   * If no key is supplied the value will be merged onto the store itself.
   *
   * ```js
   * container.merge('key', {merge: values})
   * ```
   */
  public merge(key: string, value: any): this {
    this.set(key, _.merge(this.get(key), value))

    return this
  }

  /**
   * ## container.has
   *
   * Return a boolean indicating if a given key exists.
   *
   * ### Usage
   *
   * ```js
   * container.has('my-key')
   * // true if container.repository['my-key'] exists
   * ```
   */
  public has(key: string): boolean {
    return _.has(this.repository, key) ? true : false
  }

  /**
   * ## container.delete
   *
   * Delete an entry from the repository
   *
   * ### Usage
   *
   * ```js
   * container.remove('my-key')
   * // Remove container.repository['my-key']
   * ```
   */
  public remove(key: string): this {
    delete this.repository[key]

    return this
  }

  /**
   * ## container.is
   *
   * Return a boolean indicating if the given key matches the given value.
   *
   * ### Usage
   *
   * ```js
   * container.is('my-key', {whatever: 'value'})
   * // True if container.repository['my-key'] === {whatever: 'value'}
   * ```
   */
  public is(key: string, value: any): boolean {
    return this.get(key) === value
  }

  /**
   * ## container.isTrue
   *
   * Return a boolean indicating if the given key's value is true
   *
   * ### Usage
   *
   * ```js
   * container.isTrue('my-key')
   * // True if container.repository['my-key'] === true
   * ```
   */
  public isTrue(key: string): boolean {
    return this.is(key, true || 'true')
  }

  /**
   * ## container.enabled
   *
   * Same as container.isTrue.
   *
   * Return a boolean indicating if the given key's value is true
   *
   * ### Usage
   *
   * ```js
   * container.isTrue('my-key')
   * // True if container.repository['my-key'] === true
   * ```
   */
  public enabled(key: string): boolean {
    return this.is(key, true || 'true')
  }

  /**
   * ## container.isFalse
   *
   * Return a boolean indicating if the given key's value is false
   *
   * ### Usage
   *
   * ```js
   * container.isFalse('my-key')
   * // True if container.repository['my-key'] === false
   * ```
   */
  public isFalse(key: string): boolean {
    return this.is(key, false || 'false')
  }

  /**
   * ## container.disabled
   *
   * Same as container.isFalse
   *
   * Return a boolean indicating if the given key's value is `false`
   *
   * ### Usage
   *
   * ```js
   * container.isFalse('my-key')
   * // True if container.repository['my-key'] === false
   * ```
   */
  public disabled(key: string): boolean {
    return this.isFalse(key || 'false')
  }

  /**
   * ## container.enable
   *
   * Set the value of the given key to `true`.
   *
   * ### Usage
   *
   * ```js
   * container.enable('my-key')
   * // => container.repository['my-key'] === false
   * ```
   */
  public enable(key: string): void {
    this.set(key, true)
  }

  /**
   * ## container.disable
   *
   * Set the value of the given key to `false`.
   *
   * ### Usage
   *
   * ```js
   * container.disable('my-key')
   * // => container.repository['my-key'] === false
   * ```
   */
  public disable(key: string): void {
    this.set(key, false)
  }

  /**
   * ## container.isIndexed
   *
   * Return true if object is likely a vanilla object with
   * string keys.
   *
   * ### Usage
   *
   * ```js
   * container.isIndexed('my-key')
   * // True if container.repository['my-key'] appears to be an object.
   * ```
   */
  public isIndexed(key?: string): boolean {
    const value = key ? this.get(key) : this.all()
    return (
      this.has(key) &&
      _.isObject(value) &&
      !_.isArrayLikeObject(value)
    )
  }

  /**
   * ## container.isArray
   *
   * Return true if object is an array.
   *
   * ### Usage
   *
   * ```js
   * container.isArray('my-key')
   * // True if container.repository['my-key'] is an array
   * ```
   */
  public isArray(key: string): boolean {
    return this.has(key) && _.isArray(this.get(key))
  }

  /**
   * ## container.isNotArray
   *
   * Return true if object is not an array.
   *
   * ### Usage
   *
   * ```js
   * container.isNotArray('my-key')
   * // True if container.repository['my-key'] is not an array
   * ```
   */
  public isNotArray(key: string): boolean {
    return this.has(key) && !_.isArray(this.get(key))
  }

  /**
   * ## container.isString
   *
   * Return true if object is a string.
   *
   * ### Usage
   *
   * ```js
   * container.isString('my-key')
   * // True if container.repository['my-key'] is a string
   * ```
   */
  public isString(key: string): boolean {
    return this.has(key) && _.isString(this.get(key))
  }

  /**
   * ## container.isNotString
   *
   * Return true if object is a string.
   *
   * ### Usage
   *
   * ```js
   * container.isString('my-key')
   * // True if container.repository['my-key'] is not a string
   * ```
   */
  public isNotString(key: string): boolean {
    return this.has(key) && !_.isString(this.get(key))
  }

  /**
   * ## container.isNumber
   *
   * Return true if object is a number.
   *
   * ### Usage
   *
   * ```js
   * container.isNumber('my-key')
   * // True if container.repository['my-key'] is a number
   * ```
   */
  public isNumber(key: string): boolean {
    return this.has(key) && _.isNumber(this.get(key))
  }

  /**
   * ## container.isNotNumber
   *
   * Return true if object is not a number.
   *
   * ### Usage
   *
   * ```js
   * container.isNumber('my-key')
   * // True if container.repository['my-key'] is not a number
   * ```
   */
  public isNotNumber(key: string): boolean {
    return this.has(key) && !_.isNumber(this.get(key))
  }

  /**
   * ## container.isNull
   *
   * Return true if object is null.
   *
   * ### Usage
   *
   * ```js
   * container.isNull('my-key')
   * // True if container.repository['my-key'] is null
   * ```
   */
  public isNull(key: string): boolean {
    return this.has(key) && _.isNull(this.get(key))
  }

  /**
   * ## container.isNotNull
   *
   * Return true if object is not null.
   *
   * ### Usage
   *
   * ```js
   * container.isNotNull('my-key')
   * // True if container.repository['my-key'] is not null
   * ```
   */
  public isNotNull(key: string): boolean {
    return this.has(key) && !_.isNull(this.get(key))
  }

  /**
   * ## container.isDefined
   *
   * Return true if object is defined.
   *
   * ### Usage
   *
   * ```js
   * container.isDefined('my-key')
   * // True if container has a 'my-key' entry with a definite value.
   * ```
   */
  public isDefined(key: string): boolean {
    return this.has(key) && !_.isUndefined(this.get(key))
  }

  /**
   * ## container.isUndefined
   *
   * Return true if object is defined.
   *
   * ### Usage
   *
   * ```js
   * container.isDefined('my-key')
   * // True if container has a 'my-key' entry with a definite value.
   * ```
   */
  public isUndefined(key: string): boolean {
    return !this.has(key) || _.isUndefined(this.get(key))
  }

  /**
   * ## container.isFunction
   *
   * Return true if object is a function
   *
   * ### Usage
   *
   * ```js
   * container.isFunction('my-key')
   * // True if object associated with 'my-key' is a fn.
   * ````
   */
  public isFunction(key: string): boolean {
    return _.isFunction(this.get(key))
  }
}
