/**
 * @roots/bud-sass v.1.0.0 {@link undefined}
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
    if (options) {
        this.options.merge('sass', options);
    }
    return this;
};

export { config };
