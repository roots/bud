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
    var _a;
    if (options) {
        this.options.set('sass', {
            ...((_a = this.options.get('sass')) !== null && _a !== void 0 ? _a : []),
            ...options,
        });
    }
    return this;
};
export { config };
//# sourceMappingURL=api.js.map