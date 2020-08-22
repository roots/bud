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
import MiniCssExtractPlugin from 'mini-css-extract-plugin';

var miniCssExtract = function (bud) { return ({
    bud: bud,
    name: 'mini-css-extract-plugin',
    options: {
        hmr: bud.features.enabled('hot'),
        filename: bud.features.enabled('hash')
            ? bud.options.get('filenameTemplate').hashed + ".css"
            : bud.options.get('filenameTemplate')["default"] + ".css",
    },
    make: function () {
        return new MiniCssExtractPlugin(this.options);
    },
    when: function () {
        return (this.bud.options.get('resolve.extensions').includes('.css') ||
            this.bud.options.get('resolve.extensions').includes('.scss') ||
            this.bud.options.get('resolve.extensions').includes('.sass'));
    },
}); };

export { miniCssExtract };
