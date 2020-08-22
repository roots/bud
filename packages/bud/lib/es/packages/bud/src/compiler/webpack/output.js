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
var output = function (bud) {
    return bud.hooks.filter('webpack.output', {
        output: {
            path: bud.hooks.filter('webpack.output.path', bud.paths.get('dist')),
            publicPath: bud.hooks.filter('webpack.output.publicPath', bud.paths.get('public')),
            filename: bud.hooks.filter('webpack.output.filename', bud.features.enabled('hash')
                ? bud.options.get('filenameTemplate').hashed + ".js"
                : bud.options.get('filenameTemplate')["default"] + ".js"),
        },
    });
};

export { output };
