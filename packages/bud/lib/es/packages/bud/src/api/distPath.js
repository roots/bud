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
import { join } from 'path';

var distPath = function (dir) {
    this.paths.set('dist', this.hooks.filter('api.distPath', join(this.paths.get('project'), dir)));
    return this;
};

export { distPath };
