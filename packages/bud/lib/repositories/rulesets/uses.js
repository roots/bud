"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
exports.uses = void 0;
var uses = {
    name: 'uses',
    register: {
        babel: function (bud) {
            return bud.hooks.filter('webpack.module.babel', {
                loader: bud.hooks.filter('webpack.module.babel.loader', bud.loaders.get('babel')),
                options: bud.hooks.filter('webpack.module.babel.options', __assign({ cacheDirectory: bud.hooks.filter('webpack.module.babel.options.cacheDirectory', true), cacheCompression: bud.hooks.filter('webpack.module.babel.options.cacheCompression', true) }, bud.options.get('babel')))
            });
        },
        file: function (bud) { return ({
            loader: bud.loaders.get('file'),
            options: {
                name: '[path][name].[ext]'
            }
        }); },
        miniCss: function (bud) {
            return bud.hooks.filter('webpack.modules.miniCss', {
                loader: bud.hooks.filter('webpack.modules.miniCss.loader', bud.loaders.get('miniCss')),
                options: bud.hooks.filter('webpack.modules.miniCss.options', {
                    hot: bud.hooks.filter('webpack.modules.miniCss.loader.hot', bud.features.enabled('hot'))
                })
            });
        },
        css: function (bud) {
            return bud.hooks.filter('webpack.modules.css', {
                loader: bud.hooks.filter('webpack.modules.css.loader', bud.loaders.get('css'))
            });
        },
        resolveUrl: function (bud) {
            return bud.hooks.filter('webpack.modules.resolveurl', {
                loader: bud.hooks.filter('webpack.modules.resolveurl.loader', bud.loaders.get('resolveUrl')),
                options: bud.hooks.filter('webpack.module.resolveurl.options', {
                    sourceMap: bud.features.enabled('sourceMap'),
                    debug: true
                })
            });
        },
        postCss: function (bud) {
            return bud.hooks.filter('webpack.module.postcss', {
                loader: bud.hooks.filter('webpack.module.postcss.loader', bud.loaders.get('postCss')),
                options: bud.hooks.filter('webpack.module.postcss.options', __assign({ ident: bud.hooks.filter('webpack.module.postcss.options.ident', 'postcss') }, bud.options.get('postcss')))
            });
        },
        style: function (bud) {
            return bud.hooks.filter('webpack.module.style', {
                loader: bud.hooks.filter('webpack.module.style.loader', bud.loaders.get('style'))
            });
        }
    }
};
exports.uses = uses;
//# sourceMappingURL=uses.js.map