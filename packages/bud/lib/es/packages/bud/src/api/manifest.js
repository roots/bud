/**
 * @roots/bud v.2.0.0-next {@link https://roots.io/bud}
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
var manifest = function (options) {
    var _a, _b, _c, _d;
    this.features.set('manifest', (_a = options === null || options === void 0 ? void 0 : options.enabled) !== null && _a !== void 0 ? _a : true);
    this.options.set('manifest.name', (_b = options === null || options === void 0 ? void 0 : options.name) !== null && _b !== void 0 ? _b : 'manifest.json');
    this.options.set('manifest.publicPath', (_c = options === null || options === void 0 ? void 0 : options.publicPath) !== null && _c !== void 0 ? _c : null);
    this.options.set('manifest.writeToFileEmit', (_d = options === null || options === void 0 ? void 0 : options.writeToFileEmit) !== null && _d !== void 0 ? _d : true);
    return this;
};

export { manifest };
