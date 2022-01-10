/**
 * The {@link @roots/container# | @roots/container} package provides
 * a simple chainable interface for working with collections of data
 *
 * @packageDocumentation
 */

import { ValueOf } from 'type-fest';

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
    ident?: string;
    /**
     * The container store
     *
     * @public
     */
    repository: Record<string, any>;
    /**
     * Class constructor
     *
     * @param repository - Key-value data store
     *
     * @public
     */
    constructor(repository?: I);
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
    all(): Record<string, any>;
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
    setStore(repository: Repository): this;
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
    mergeStore(values: Repository): this;
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
    transformStore(transformFn: (value: any) => any): any;
    /**
     * Runs the entire repository through the supplied fn and returns
     * the transformed value. The transformed repository replaces the
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
    mutateStore(mutationFn: (value?: I) => I): this;
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
    get<T = any>(key: string): T;
    /**
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
     *
     * @public
     * @decorator `@bind`
     */
    getEntries<T = any>(key?: string): [string, ValueOf<T>][];
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
     *
     * @public
     * @decorator `@bind`
     */
    fromEntries(entries: [string, any][]): this;
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
    each(key: string, callFn: (key: any, value: any) => void): this;
    /**
     * Calls a supplied function for every repository value, passing
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
    every(fn: (key: string, value: any) => any): this;
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
     *
     * @public
     * @decorator `@bind`
     */
    getValues(key?: string): any[];
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
     *
     * @public
     * @decorator `@bind`
     */
    getKeys(key?: string): string[];
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
     *
     * @public
     * @decorator `@bind`
     */
    getMap(key?: string): Map<string, any>;
    /**
     * Set a repository value
     *
     * @example
     * ```js
     * container.set('key', value)
     * ```
     *
     * @public
     * @decorator `@bind`
     */
    set(key: string, value: any): this;
    /**
     * Returns unique elements of an array item
     *
     * @example
     * ```js
     * container.unique('item')
     * ```
     *
     * @public
     * @decorator `@bind`
     */
    unique(key: string): any;
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
    transform(key: string, mutationFn: (value?: any) => any): any;
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
     *
     * @public
     * @decorator `@bind`
     */
    mutate(key: string, mutationFn: (value?: any) => any): this;
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
     *
     * @public
     * @decorator `@bind`
     */
    merge(key: string, value: any): this;
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
    has(key: string): boolean;
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
    remove(key: string): this;
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
    is(key: string, value: any): boolean;
    /**
     * Return a number indicating the length of a matched key
     * in the repository.
     *
     * If no key is provided, returns the length of the repository.
     *
     * @param key - search key
     * @returns count of items
     *
     * @public
     * @decorator `@bind`
     */
    count(key?: string): number;
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
    isTrue(key: string): boolean;
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
    isFalse(key: string): boolean;
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
    isArray(key: string): boolean;
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
    isNotArray(key: string): boolean;
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
    isString(key: string): boolean;
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
    isNotString(key: string): boolean;
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
    isNumber(key: string): boolean;
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
    isNotNumber(key: string): boolean;
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
    isNull(key: string): boolean;
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
    isNotNull(key: string): boolean;
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
    isDefined(key: string): boolean;
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
    isUndefined(key: string): boolean;
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
    isFunction(key: string): boolean;
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
     *
     * @public
     * @decorator `@bind`
     */
    isNotFunction(key: string): boolean;
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
     *
     * @public
     * @decorator `@bind`
     */
    isInstanceOf(key: string, instance: any): boolean;
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
     *
     * @public
     * @decorator `@bind`
     */
    isNotInstanceOf(key: string, instance: any): boolean;
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
     *
     * @public
     * @decorator `@bind`
     */
    isInstanceOfAny(key: string, instances: any[]): boolean;
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
     *
     * @public
     * @decorator `@bind`
     */
    isNotInstanceOfAny(key: string, instances: any[]): boolean;
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
     *
     * @public
     * @decorator `@bind`
     */
    isEmpty(key?: string): boolean;
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
     *
     * @public
     * @decorator `@bind`
     */
    isNotEmpty(key: string): boolean;
}

/**
 * Indexed container value store.
 *
 * @public
 */
export declare interface Repository extends Record<string, any> {
}

export { }
