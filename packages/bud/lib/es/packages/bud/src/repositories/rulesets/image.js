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
import { uses } from './uses.js';

var image = function (bud) {
    return bud.hooks.filter('webpack.module.rules.image', {
        test: bud.hooks.filter('webpack.module.rules.image.test', bud.patterns.get('image')),
        use: bud.hooks.filter('webpack.module.rules.image.use', [
            uses.file(bud),
        ]),
    });
};

export { image };
