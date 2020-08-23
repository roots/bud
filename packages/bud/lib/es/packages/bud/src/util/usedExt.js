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
import { __spreadArrays } from 'tslib';

var usedExt = function (entries, bud) {
    entries.forEach(function (entry) {
        var ext = "." + entry.split('.')[entry.split('.').length - 1];
        !bud.options.get('webpack.resolve.extensions').includes(ext) &&
            bud.options.set('webpack.resolve.extensions', __spreadArrays(bud.options.get('webpack.resolve.extensions'), [
                ext,
            ]));
    });
};

export { usedExt };
