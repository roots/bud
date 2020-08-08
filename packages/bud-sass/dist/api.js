"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
/**
 * ## bud.scss
 *
 * Enable/disable scss support
 *
 * ```js
 * bud.scss(true)
 * ```
 *
 * ```js
 * bud.scss(false)
 * ```
 */
const config = function (enabled, options) {
    if (options) {
        this.options.merge('sass', options);
    }
    return this;
};
exports.config = config;
//# sourceMappingURL=api.js.map