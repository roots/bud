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
import { __spreadArrays } from 'tslib';
import { join } from 'path';

var copy = function (from, to) {
    this.options.set('copy.patterns', __spreadArrays(this.options.get('copy.patterns'), [
        {
            from: from,
            to: to !== null && to !== void 0 ? to : join(this.paths.get('dist'), from),
        },
    ]));
    return this;
};

export { copy };
