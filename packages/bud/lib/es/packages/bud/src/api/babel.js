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
import { __assign, __spreadArrays } from 'tslib';

var babel = function (options) {
    var _a, _b;
    this.features.enable('babel');
    this.options.set('babel', this.hooks.filter('api.babel', __assign(__assign({}, this.options.get('babel')), { plugins: this.hooks.filter('api.babel.plugins', __spreadArrays(this.options.get('babel.plugins'), ((_a = options.plugins) !== null && _a !== void 0 ? _a : []))), presets: this.hooks.filter('api.babel.presets', __spreadArrays(this.options.get('babel.presets'), ((_b = options.presets) !== null && _b !== void 0 ? _b : []))) })));
    return this;
};

export { babel };
