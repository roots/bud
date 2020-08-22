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

var uses = {
    repository: 'uses',
    contents: {
        babel: function (bud) {
            return bud.hooks.filter('webpack.module.babel', {
                loader: bud.hooks.filter('webpack.module.babel.loader', bud.loaders.get('babel')),
                options: bud.hooks.filter('webpack.module.babel.options', __assign({ cacheDirectory: bud.hooks.filter('webpack.module.babel.options.cacheDirectory', true), cacheCompression: bud.hooks.filter('webpack.module.babel.options.cacheCompression', true) }, bud.options.get('babel'))),
            });
        },
        file: function (bud) { return ({
            loader: bud.loaders.get('file'),
            options: {
                name: '[path][name].[ext]',
            },
        }); },
        miniCss: function (bud) {
            return bud.hooks.filter('webpack.modules.miniCss', {
                loader: bud.hooks.filter('webpack.modules.miniCss.loader', bud.loaders.get('miniCss')),
                options: bud.hooks.filter('webpack.modules.miniCss.options', {
                    hot: bud.hooks.filter('webpack.modules.miniCss.loader.hot', bud.features.enabled('hot')),
                }),
            });
        },
        css: function (bud) {
            return bud.hooks.filter('webpack.modules.css', {
                loader: bud.hooks.filter('webpack.modules.css.loader', bud.loaders.get('css')),
            });
        },
        resolveUrl: function (bud) {
            return bud.hooks.filter('webpack.modules.resolveurl', {
                loader: bud.hooks.filter('webpack.modules.resolveurl.loader', bud.loaders.get('resolveUrl')),
                options: bud.hooks.filter('webpack.module.resolveurl.options', {
                    sourceMap: bud.features.enabled('sourceMap'),
                    debug: true,
                }),
            });
        },
        postCss: function (bud) {
            return bud.hooks.filter('webpack.module.postcss', {
                loader: bud.hooks.filter('webpack.module.postcss.loader', bud.loaders.get('postCss')),
                options: bud.hooks.filter('webpack.module.postcss.options', __assign({ ident: bud.hooks.filter('webpack.module.postcss.options.ident', 'postcss') }, bud.options.get('postcss'))),
            });
        },
        style: function (bud) {
            return bud.hooks.filter('webpack.module.style', {
                loader: bud.hooks.filter('webpack.module.style.loader', bud.loaders.get('style')),
            });
        },
    },
};

export { uses };
