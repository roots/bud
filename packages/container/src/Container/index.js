"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Container = void 0;
const lodash_1 = __importDefault(require("lodash"));
/**
 * @roots/container
 */
class Container {
    /**
     * Class constructor
     */
    constructor(repository) {
        this.setStore(repository !== null && repository !== void 0 ? repository : {});
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
    getStore() {
        return this.repository;
    }
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
    all() {
        return this.getStore();
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
    setStore(repository) {
        this.repository = repository;
        return this;
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
    mergeStore(values) {
        this.setStore(Object.assign(Object.assign({}, this.getStore()), values));
        return this;
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
    transformStore(transformFn) {
        return transformFn(this.getStore());
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
    mutateStore(mutationFn) {
        this.setStore(this.transformStore(mutationFn));
        return this;
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
    mutateStoreEntries(mutateFn) {
        this.fromEntries(this.getEntries().map(([key, value]) => [
            key,
            mutateFn(key, value),
        ]));
        return this;
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
    get(key) {
        return lodash_1.default.get(this.repository, key);
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
    getEntries(key) {
        return Object.entries(key ? this.get(key) : this.getStore());
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
    fromEntries(entries) {
        this.mergeStore(Object.fromEntries(entries));
        return this;
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
    each(key, callFn) {
        this.getEntries(key).forEach(([key, value]) => [
            key,
            callFn(key, value),
        ]);
        return this;
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
    every(fn) {
        this.getEntries().forEach(([key, value]) => {
            fn(key, value);
        });
        return this;
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
    mutateEntries(key, mutateFn) {
        this.fromEntries(this.getEntries(key).map(([key, value]) => [
            key,
            mutateFn(key, value),
        ]));
        return this;
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
    getValues(key) {
        return Object.values(key ? this.get(key) : this.getStore());
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
    getKeys(key) {
        return Object.keys(key ? this.get(key) : this.getStore());
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
    getMap(key) {
        const reducer = [
            (map, [key, value]) => {
                map.set(key, value);
                return map;
            },
            new Map(),
        ];
        return this.getEntries(key !== null && key !== void 0 ? key : null).reduce(...reducer);
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
    set(key, value) {
        lodash_1.default.set(this.repository, key, value);
        return this;
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
    transform(key, mutationFn) {
        return mutationFn(this.get(key));
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
    mutate(key, mutationFn) {
        this.set(key, this.transform(key, mutationFn));
        return this;
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
    merge(key, value) {
        this.set(key, lodash_1.default.merge(this.get(key), value));
        return this;
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
    has(key) {
        return lodash_1.default.has(this.repository, key) ? true : false;
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
    remove(key) {
        delete this.repository[key];
        return this;
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
    is(key, value) {
        return this.get(key) === value;
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
    isTrue(key) {
        return this.is(key, true);
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
    enabled(key) {
        return this.isTrue(key);
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
    isFalse(key) {
        return this.is(key, false);
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
    disabled(key) {
        return this.isFalse(key);
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
    enable(key) {
        this.set(key, true);
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
    disable(key) {
        this.set(key, false);
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
    isIndexed(key) {
        const value = key ? this.get(key) : this.getStore();
        return (this.has(key) &&
            lodash_1.default.isObject(value) &&
            !lodash_1.default.isArrayLikeObject(value));
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
    isArray(key) {
        return this.has(key) && lodash_1.default.isArray(this.get(key));
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
    isNotArray(key) {
        return this.has(key) && !lodash_1.default.isArray(this.get(key));
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
    isString(key) {
        return this.has(key) && lodash_1.default.isString(this.get(key));
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
    isNotString(key) {
        return this.has(key) && !lodash_1.default.isString(this.get(key));
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
    isNumber(key) {
        return this.has(key) && lodash_1.default.isNumber(this.get(key));
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
    isNotNumber(key) {
        return this.has(key) && !lodash_1.default.isNumber(this.get(key));
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
    isNull(key) {
        return this.has(key) && lodash_1.default.isNull(this.get(key));
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
    isNotNull(key) {
        return this.has(key) && !lodash_1.default.isNull(this.get(key));
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
    isDefined(key) {
        return this.has(key) && !lodash_1.default.isUndefined(this.get(key));
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
    isUndefined(key) {
        return !this.has(key) || lodash_1.default.isUndefined(this.get(key));
    }
}
exports.Container = Container;
//# sourceMappingURL=index.js.map