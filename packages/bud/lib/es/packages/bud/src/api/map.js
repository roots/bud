/**
 * @roots/bud v.2.0.0-next.0 {@link https://roots.io/bud}
 *
 * A friendly build tool to help manage your project assets.
 *
 * Issues? {@link https://github.com/roots/bud/issues}
 *
 * Consider funding our work 🙏🏽 {@link https://github.com/sponsors/roots}
 *
 * @copyright 2020 Roots {@link https://roots.io}
 * @license MIT
 */
var map = function (enabled) {
    if (enabled === void 0) { enabled = true; }
    this.features.set('sourceMap', enabled !== null && enabled !== void 0 ? enabled : true);
    return this;
};

export { map };
