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
import { __assign } from 'tslib';
import { entry } from './entry.js';
import { devServer } from './devServer.js';
import { externals } from './externals.js';
import { general } from './general.js';
import { rules } from './rules.js';
import { optimization } from './optimization.js';
import { output } from './output.js';
import { webpackResolve } from './webpackResolve.js';
import { plugins } from './plugins.js';

var builders = [
    devServer,
    entry,
    general,
    rules,
    externals,
    output,
    optimization,
    plugins,
    webpackResolve,
];
var build = function (bud) {
    var builderReducer = function (acc, curr) { return (__assign(__assign({}, (acc !== null && acc !== void 0 ? acc : {})), curr(bud))); };
    return builders.reduce(builderReducer, {});
};

export { build };
