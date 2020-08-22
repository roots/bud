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

var vendor = function (options) {
    this.features.enable('vendor');
    options &&
        this.options.set('optimization.splitChunks.cacheGroup.vendor', __assign(__assign({}, this.options.get('optimization.splitChunks.cacheGroup.vendor')), options));
    return this;
};

export { vendor };
