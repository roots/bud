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

var bundle = function (name, entries) {
    var _a;
    this.util.usedExt(entries, this);
    this.options.set('webpack.entry', __assign(__assign({}, this.options.get('webpack.entry')), this.hooks.filter('api.bundle.filter', (_a = {},
        _a["" + name] = entries,
        _a))));
    return this;
};

export { bundle };
