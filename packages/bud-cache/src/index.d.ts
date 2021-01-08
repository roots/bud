import Service from './Service';
/**
 * ## bud.cache [🏠 Internal]
 *
 * Cache utlity for Webpack modules.
 *
 * [🏡 Project home](https://roots.io/bud)
 * [🧑‍💻 roots/bud](#)
 * [📦 @roots/bud-cache](#)
 * [🔗 Documentation](#)
 */
export declare class Cache extends Service {
    /**
     * ## bud.cache.enabled [🏠 Internal]
     *
     * Returns boolean true if cache is enabled
     *
     * Cache is enabled when there is a cache record to read on disk and
     * the buildCache feature is enabled.
     *
     * ```js
     * bud.cache.enabled()
     * // => true if cache is enabled
     * ```
     */
    enabled(): boolean;
    /**
     * ## bud.cache.setCache [🏠 Internal]
     *
     * Sets the cache object in the webpack configuration.
     */
    setCache(): void;
}
//# sourceMappingURL=index.d.ts.map