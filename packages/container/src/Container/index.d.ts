/**
 * Container iem.
 */
export declare type Item<T = any> = T;
/**
 * Indexed container value store.
 */
export declare type Repository<I = any> = {
    [key: string]: Item<I>;
};
/**
 * @roots/container
 */
export declare class Container<I = any> {
    /**
     * The container store
     */
    repository: Repository<I>;
    /**
     * Class constructor
     */
    constructor(repository?: Repository);
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
    getStore(): Repository;
    /**
     * ## container.all
     *
     * Does the same thing as container.getStore
     *
     * ### Usage
     *
     * ```js
     * container.all()
     * ```
     */
    all(): Repository;
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
    setStore(repository: Repository): this;
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
    mergeStore(values: Repository): this;
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
    transformStore(transformFn: (value: any) => any): any;
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
    mutateStore<T = any>(mutationFn: (value?: T) => T): this;
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
    mutateStoreEntries<T = any>(mutateFn: (key: string, value: T) => T): this;
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
    get(key: string): any;
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
    getEntries<T = any>(key?: string): [string, T][];
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
    fromEntries<T = any>(entries: [string, T][]): this;
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
    each<T = any>(key: string, callFn: (key: string, value: T) => void): this;
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
    every(fn: (key: string, value: any) => any): this;
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
    mutateEntries<T = any>(key: string, mutateFn: (key: string, value: T) => T): this;
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
    getValues(key?: string): unknown[];
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
    getKeys(key?: string): string[];
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
    getMap<T = unknown>(key?: string): Map<string, T>;
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
    set<T = any>(key: string, value: T): this;
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
    transform<T = any>(key: string, mutationFn: (value?: T) => T): T;
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
    mutate<T = any>(key: string, mutationFn: (value?: T) => T): this;
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
    merge<T = any>(key: string, value: T): this;
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
    has(key: string): boolean;
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
    remove(key: string): this;
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
    is<T = any>(key: string, value: T): boolean;
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
    isTrue(key: string): boolean;
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
    enabled(key: string): boolean;
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
    isFalse(key: string): boolean;
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
    disabled(key: string): boolean;
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
    enable(key: string): void;
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
    disable(key: string): void;
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
    isIndexed(key?: string): boolean;
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
    isArray(key: string): boolean;
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
    isNotArray(key: string): boolean;
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
    isString(key: string): boolean;
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
    isNotString(key: string): boolean;
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
    isNumber(key: string): boolean;
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
    isNotNumber(key: string): boolean;
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
    isNull(key: string): boolean;
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
    isNotNull(key: string): boolean;
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
    isDefined(key: string): boolean;
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
    isUndefined(key: string): boolean;
}
//# sourceMappingURL=index.d.ts.map