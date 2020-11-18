import _ from 'lodash'

/**
 * Container iem.
 */
export type Item<T = any> = T

/**
 * Indexed container value store.
 */
export type Repository<I = any> = {
  [key: string]: Item<I>
}

/**
 * @roots/container
 */
export class Container<I = any> {
  /**
   * The container store
   */
  public repository: Repository<I>

  /**
   * Class constructor
   */
  constructor(repository: Repository) {
    this.setStore(repository ?? {})
  }

  /**
   * ## container.getStore
   *
   * Get the store contents
   *
   * ### Usage
   *
   * ```js
   * container.getStore()
   * ```
   */
  public getStore(): Repository {
    return this.repository
  }

  /**
   * ## container.getStore
   *
   * Does the same thing as container.getStore
   *
   * ### Usage
   *
   * ```js
   * container.all()
   * ```
   */
  public all(): Repository {
    return this.getStore()
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
  public get(key: string): any {
    return _.get(this.repository, key)
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
  public getEntries<T = any>(key?: string): [string, T][] {
    return Object.entries(key ? this.get(key) : this.getStore())
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
  public getValues(key?: string): unknown[] {
    return Object.values(key ? this.get(key) : this.getStore())
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
    return Object.keys(key ? this.get(key) : this.getStore())
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
  public getMap<T = unknown>(key?: string): Map<string, T> {
    const reducer: [
      (acc: Map<string, T>, curr: [string, T]) => Map<string, T>,
      Map<string, T>,
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
  public set<T = any>(key: string, value: T): this {
    _.set(this.repository, key, value)

    return this
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
  public mutate<T = any>(
    key: string,
    mutationFn: (value?: T) => T,
  ): T {
    const value = mutationFn(this.get(key))

    this.set<T>(key, value)

    return value
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
  public merge<T = any>(key: string, value: T): this {
    this.set<T>(key, _.merge(this.get(key), value))

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
  public is<T = any>(key: string, value: T): boolean {
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
    return this.is<boolean>(key, true)
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
    return this.isTrue(key)
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
    return this.is<boolean>(key, false)
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
    return this.isFalse(key)
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
    this.set<boolean>(key, true)
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
    const value = key ? this.get(key) : this.getStore()
    return _.isObject(value) && !_.isArrayLikeObject(value)
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
    return _.isArray(this.get(key))
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
    return _.isString(this.get(key))
  }

  /**
   * ## container.isArray
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
    return _.isNumber(this.get(key))
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
    return _.isNull(this.get(key))
  }
}
