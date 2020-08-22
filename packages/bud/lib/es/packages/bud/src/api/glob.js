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
import { __assign } from 'tslib';

// eslint-disable-next-line @typescript-eslint/no-var-requires
var globby = require('globby');
var glob = function (name, files) {
    var entry = this.options.get('entry');
    /**
     * Glob matching files.
     */
    var included = globby.sync(files, {
        expandDirectories: true,
    });
    /**
     * Enable support for matching extensions
     */
    this.util.usedExt(included, this);
    /**
     * Add matching files as indviduated entrypoints.
     */
    included.forEach(function (match) {
        var _a;
        entry = __assign(__assign({}, entry), (_a = {}, _a[name + "/"] = match, _a));
    });
    this.options.set('entry', entry);
    return this;
};

export { glob };
