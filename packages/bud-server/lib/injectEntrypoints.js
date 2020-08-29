"use strict";
exports.__esModule = true;
exports["default"] = void 0;
var injectEntrypoints = function (domain, options) {
    var client = [
        options.devServer.hotOnly
            ? 'webpack/hot/only-dev-server'
            : 'webpack/hot/dev-server',
        "webpack-hot-middleware/client?" + domain + "/__webpack_hmr",
    ];
    var prepend = function (entry) {
        if (typeof entry === 'function') {
            return function () { return Promise.resolve(entry()).then(prepend); };
        }
        if (typeof entry === 'object' && !Array.isArray(entry)) {
            var entryClone_1 = {};
            Object.keys(entry).forEach(function (key) {
                entryClone_1[key] = client.concat(entry[key]);
            });
            return entryClone_1;
        }
    };
    return prepend(options.entry);
};
exports["default"] = injectEntrypoints;
//# sourceMappingURL=injectEntrypoints.js.map