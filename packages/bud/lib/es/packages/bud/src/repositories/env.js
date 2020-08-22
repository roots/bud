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
import dotenv from 'dotenv';

var env = function (paths) {
    var _a;
    return ((_a = dotenv.config({
        path: join(paths.get('project'), '.env'),
    }).parsed) !== null && _a !== void 0 ? _a : {});
};

export { env };
