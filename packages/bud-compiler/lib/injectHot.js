"use strict";
exports.__esModule = true;
exports.injectHot = void 0;
var injectHot = function (_a) {
    var config = _a.config, bud = _a.bud;
    Object.keys(config.entry).forEach(function (entry) {
        config.entry[entry] = [
            'webpack/hot/only-dev-server',
            "webpack-dev-server/client?http://localhost:3000",
        ].concat(config.entry[entry]);
    });
    return config;
};
exports.injectHot = injectHot;
//# sourceMappingURL=injectHot.js.map