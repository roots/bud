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
import WriteFilePlugin from 'write-file-webpack-plugin';

var writeFile = function (bud) { return ({
    bud: bud,
    name: 'write-file-webpack-plugin',
    make: function () {
        return new WriteFilePlugin();
    },
}); };

export { writeFile };
