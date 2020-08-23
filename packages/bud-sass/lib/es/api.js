/**
 * @roots/bud-sass v.2.0.0-next.0 {@link undefined}
 *
 * Adds sass support to Bud.
 *
 * Issues? {@link https://github.com/roots/bud/issues}
 *
 * Consider funding our work 🙏🏽 {@link https://github.com/sponsors/roots}
 *
 * @copyright 2020 Roots {@link https://roots.io}
 * @license MIT
 */
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
