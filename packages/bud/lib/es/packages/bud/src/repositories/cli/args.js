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
import { argv } from 'yargs';

var args = function (env) {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    return ({
        log: argv['log'],
        hot: argv['hot'],
        watch: argv['watch'],
        level: (_a = argv['level']) !== null && _a !== void 0 ? _a : 'info',
        mode: (_c = (_b = argv['env']) !== null && _b !== void 0 ? _b : env.get('APP_ENV')) !== null && _c !== void 0 ? _c : 'none',
        host: (_e = (_d = argv['host']) !== null && _d !== void 0 ? _d : env.get('APP_DEV_HOST')) !== null && _e !== void 0 ? _e : false,
        port: (_g = (_f = argv['port']) !== null && _f !== void 0 ? _f : env.get('APP_DEV_PORT')) !== null && _g !== void 0 ? _g : null,
        proxy: (_j = (_h = argv['proxy']) !== null && _h !== void 0 ? _h : env.get('APP_DEV_PROXY')) !== null && _j !== void 0 ? _j : null,
        src: (_l = (_k = argv['src']) !== null && _k !== void 0 ? _k : env.get('APP_SRC')) !== null && _l !== void 0 ? _l : null,
        dist: (_o = (_m = argv['dist']) !== null && _m !== void 0 ? _m : env.get('APP_DIST')) !== null && _o !== void 0 ? _o : null,
        feature: (_q = (_p = argv['feature']) !== null && _p !== void 0 ? _p : env.get('APP_BUILD_FEATURE')) !== null && _q !== void 0 ? _q : null,
    });
};

export { args };
