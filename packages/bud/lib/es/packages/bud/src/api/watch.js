/**
 * @roots/bud v.2.0.0-rc.7 {@link https://roots.io/bud}
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
var watch = function (options) {
    (options === null || options === void 0 ? void 0 : options.enabled) && this.features.enable('watch');
    (options === null || options === void 0 ? void 0 : options.paths) &&
        this.options.set('watch', this.hooks.filter('api.watch', options.paths));
    return this;
};

export { watch };
