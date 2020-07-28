"use strict";
exports.__esModule = true;
exports.copyAll = void 0;
var path_1 = require("path");
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