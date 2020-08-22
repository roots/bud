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
import { uses } from './uses.js';

var css = function (bud) {
    return bud.hooks.filter('webpack.module.rules.css', {
        test: bud.hooks.filter('webpack.module.rules.css.test', bud.patterns.get('css')),
        exclude: bud.hooks.filter('webpack.module.rules.css.exclude', bud.patterns.get('vendor')),
        use: bud.hooks.filter('webpack.module.rules.css.use', [
            uses.miniCss(bud),
            uses.css(bud),
            uses.resolveUrl(bud),
            uses.postCss(bud),
        ]),
    });
};

export { css };
