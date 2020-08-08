var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { parse } from 'path';
// eslint-disable-next-line @typescript-eslint/no-var-requires
var globby = require('globby');
var glob = function (files) {
    var _this = this;
    this.logger.info({ name: 'bud.api', files: files }, "bud.glob called");
    var entry = this.options.get('entry');
    /**
     * Glob matching files.
     */
    var included = globby.sync(this.src(files), {
        expandDirectories: true
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
        var dest = match.replace(_this.src('/'), '').replace(parse(match).ext, '');
        entry = __assign(__assign({}, entry), (_a = {}, _a[dest] = match, _a));
    });
    this.options.set('entry', entry);
    return this;
};
export { glob };
//# sourceMappingURL=glob.js.map