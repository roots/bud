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
import { argv } from 'yargs';

var _a, _b, _c, _d, _e, _f, _g;
var args = {
    name: 'args',
    register: {
        mode: (_a = argv['env']) !== null && _a !== void 0 ? _a : 'none',
        host: (_b = argv['host']) !== null && _b !== void 0 ? _b : false,
        port: (_c = argv['port']) !== null && _c !== void 0 ? _c : null,
        proxy: (_d = argv['proxy']) !== null && _d !== void 0 ? _d : null,
        src: (_e = argv['src']) !== null && _e !== void 0 ? _e : null,
        dist: (_f = argv['dist']) !== null && _f !== void 0 ? _f : null,
        feature: (_g = argv['feature']) !== null && _g !== void 0 ? _g : null,
    },
};

export { args };
