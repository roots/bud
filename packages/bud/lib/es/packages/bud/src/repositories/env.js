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
import { join } from 'path';
import dotenv from 'dotenv';

var env = {
    name: 'env',
    boot: function (bud) { var _a; return (_a = dotenv.config({
        path: join(bud.paths.get('project'), '.env'),
    }).parsed) !== null && _a !== void 0 ? _a : {}; },
};

export { env };
