"use strict";
exports.__esModule = true;
exports.injectHot = void 0;
var injectHot = function (_a) {
    var config = _a.config, overlay = _a.overlay, reload = _a.reload;
    var client = "webpack-hot-middleware/client?path=/__webpack_hmr&timeout=20000&reload=" + reload + "&overlay=" + overlay;
    Object.keys(config.entry).forEach(function (entry) {
        config.entry[entry] = [client].concat(config.entry[entry]);
    });
    return config;
};
exports.injectHot = injectHot;
//# sourceMappingURL=injectHot.js.map