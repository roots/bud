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
var plugins = function (bud) {
    return bud.hooks.filter('webpack.plugins', {
        plugins: bud.adapters
            .entries()
            .map(function (adapter) {
            return bud.hooks.filter("webpack.plugins." + adapter.name, bud.adapters.controller(bud, adapter).build());
        })
            .filter(function (adapter) { return adapter; }),
    });
};

export { plugins };
