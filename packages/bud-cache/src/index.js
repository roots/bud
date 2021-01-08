"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Cache = void 0;
const Service_1 = __importDefault(require("./Service"));
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
class Cache extends Service_1.default {
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
    enabled() {
        return (this.app.store.get('features.buildCache') &&
            this.app.disk
                .get('project')
                .exists(this.app.store.get('webpack.webpack.recordsPath')));
    }
    /**
     * ## bud.cache.setCache [🏠 Internal]
     *
     * Sets the cache object in the webpack configuration.
     */
    setCache() {
        this.enabled() &&
            this.app.hooks.on('webpack.cache', (bud) => this.app.disk
                .get('project')
                .readJson(bud.store.get('webpack.webpack.recordsPath')));
    }
}
exports.Cache = Cache;
//# sourceMappingURL=index.js.map