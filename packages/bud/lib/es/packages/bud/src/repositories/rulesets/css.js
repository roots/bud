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
var css = function (bud) {
    return bud.hooks.filter('webpack.module.rules.css', {
        test: bud.hooks.filter('webpack.module.rules.css.test', bud.patterns.get('css')),
        exclude: bud.hooks.filter('webpack.module.rules.css.exclude', bud.patterns.get('vendor')),
        use: bud.hooks.filter('webpack.module.rules.css.use', [
            bud.uses.get('miniCss')(bud),
            bud.uses.get('css')(bud),
            bud.uses.get('resolveUrl')(bud),
            bud.uses.get('postCss')(bud),
        ]),
    });
};

export { css };
