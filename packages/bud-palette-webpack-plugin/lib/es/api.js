/**
 * @roots/palette-webpack-plugin v.1.0.0 {@link undefined}
 *
 * Adds json palette support for Gutenberg to Bud
 *
 * Issues? {@link https://github.com/roots/bud/issues}
 *
 * Consider funding our work 🙏🏽 {@link https://github.com/sponsors/roots}
 *
 * @copyright 2020 Roots {@link https://roots.io}
 * @license MIT
 */
const api = function (blacklist) {
    this.options.set('palette-blacklist', blacklist);
    return this;
};

export { api };
