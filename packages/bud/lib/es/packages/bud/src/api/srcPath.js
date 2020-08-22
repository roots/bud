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
import { join } from 'path';

var srcPath = function (dir) {
    var setPath = join(this.paths.get('project'), dir);
    /**
     * If set, CLI arguments take precendence over config.
     */
    !this.args.get('src') && this.paths.set('src', setPath);
    return this;
};

export { srcPath };
