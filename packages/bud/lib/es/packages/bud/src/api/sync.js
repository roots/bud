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
import { __assign } from 'tslib';

var sync = function (_a) {
    var _b = _a.enabled, enabled = _b === void 0 ? true : _b, options = _a.options;
    this.features.set('adapters.browsersync', enabled !== null && enabled !== void 0 ? enabled : true);
    this.options.set('adapters.browsersync', __assign(__assign({}, this.options.get('adapters.browsersync')), options));
    return this;
};

export { sync };
