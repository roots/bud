"use strict";
exports.__esModule = true;
exports.copyAll = void 0;
var path_1 = require("path");
/**
 * ## bud.copyAll
 *
 * Copy all files from a specified source to a specified destination.
 *
 * ```js
 * bud.copyAll(bud.src('images'), bud.dist('images'))
 * ```
 */
var copyAll = function (from, to) {
    this.state.options.copy.patterns.push({
        from: '**/*',
        context: from,
        to: to ? to : path_1.join(this.state.paths.dist, from),
        globOptions: {
            ignore: '.*'
        },
        noErrorOnMissing: true
    });
    return this;
};
exports.copyAll = copyAll;
//# sourceMappingURL=copyAll.js.map