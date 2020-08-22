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
import { __rest, __assign, __spreadArrays } from 'tslib';

var postcss = function (_a) {
    var _b;
    var enabled = _a.enabled, options = __rest(_a, ["enabled"]);
    this.features.set('postcss', enabled !== null && enabled !== void 0 ? enabled : true);
    if (this.features.enabled('postcss')) {
        this.options.set('postcss', __assign(__assign(__assign({}, this.options.get('postcss')), options), { plugins: __spreadArrays(((_b = options.plugins) !== null && _b !== void 0 ? _b : []), this.options.get('postcss.plugins')) }));
    }
    return this;
};

export { postcss };
