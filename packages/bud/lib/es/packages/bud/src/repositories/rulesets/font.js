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

var font = function (bud) {
    return bud.hooks.filter('webpack.module.rules.font', {
        test: bud.hooks.filter('bud.module.rules.font.test', bud.patterns.get('font')),
        use: bud.hooks.filter('bud.module.rules.font.use', [
            uses.file(bud),
        ]),
    });
};

export { font };
