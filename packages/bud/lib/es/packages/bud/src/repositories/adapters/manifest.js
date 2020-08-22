/**
 * @roots/bud v.2.0.0-rc.7 {@link https://roots.io/bud}
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
import ManifestPlugin from 'webpack-manifest-plugin';

var manifest = function (bud) {
    var _a, _b, _c, _d;
    return ({
        bud: bud,
        name: 'webpack-manifest-plugin',
        options: {
            publicPath: (_b = (_a = bud.options.get('manifest.publicPath')) !== null && _a !== void 0 ? _a : bud.paths.get('public')) !== null && _b !== void 0 ? _b : '/',
            filename: (_c = bud.options.get('manifest.name')) !== null && _c !== void 0 ? _c : 'manifest.json',
            writeToFileEmit: (_d = bud.options.get('manifest.writeToFileEmit')) !== null && _d !== void 0 ? _d : true,
        },
        make: function () {
            return new ManifestPlugin(this.options);
        },
        when: function () {
            return this.bud.features.enabled('manifest');
        },
    });
};

export { manifest };
