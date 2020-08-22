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

var auto = function (options) {
    var _this = this;
    Object.entries(options).forEach(function (_a) {
        var key = _a[0], modules = _a[1];
        modules.forEach(function (handle) {
            var _a;
            _this.options.set('auto', __assign(__assign({}, _this.options.get('auto')), (_a = {}, _a[handle] = key, _a)));
        });
    });
    return this;
};

export { auto };
