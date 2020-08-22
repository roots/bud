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
var runtimeManifest = function (args) {
    var _a, _b;
    this.features.set('runtimeChunk', (_a = args === null || args === void 0 ? void 0 : args.enabled) !== null && _a !== void 0 ? _a : true);
    this.options.set('optimization.runtimeChunk.name', (_b = args === null || args === void 0 ? void 0 : args.name) !== null && _b !== void 0 ? _b : this.options.get('optimization.runtimeChunk.name'));
    return this;
};

export { runtimeManifest };
