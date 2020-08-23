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
var general = function (bud) {
    var _a;
    return ({
        context: bud.hooks.filter('webpack.context', bud.paths.get('project')),
        devtool: bud.hooks.filter('webpack.devtool', (_a = bud.options.get('webpack.devtool')) !== null && _a !== void 0 ? _a : false),
        mode: bud.hooks.filter('webpack.mode', bud.mode),
        node: bud.hooks.filter('webpack.node', bud.options.get('webpack.node')),
        stats: bud.hooks.filter('webpack.stats', bud.options.get('webpack.stats')),
        target: bud.hooks.filter('webpack.target', bud.options.get('webpack.target')),
        watch: bud.hooks.filter('webpack.watch', bud.features.enabled('watch')),
    });
};

export { general };
