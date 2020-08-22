/**
 * @roots/bud-stylelint v.2.0.0-next.0 {@link undefined}
 *
 * Adds stylelint support to Bud
 *
 * Issues? {@link https://github.com/roots/bud/issues}
 *
 * Consider funding our work 🙏🏽 {@link https://github.com/sponsors/roots}
 *
 * @copyright 2020 Roots {@link https://roots.io}
 * @license MIT
 */
const api = function (options) {
    var _a;
    this.features.set('stylelint', (_a = options === null || options === void 0 ? void 0 : options.enabled) !== null && _a !== void 0 ? _a : true);
    this.features.enabled('stylelint') &&
        this.options.set('stylelint', {
            configFile: this.configs.get('stylelint'),
            ...options,
        });
    return this;
};

export default api;
