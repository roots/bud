"use strict";
exports.__esModule = true;
exports.runtimeManifest = void 0;
var runtimeManifest = function (args) {
    var _a;
    this.features.set('runtimeChunk', (_a = args === null || args === void 0 ? void 0 : args.enabled) !== null && _a !== void 0 ? _a : true);
    (args === null || args === void 0 ? void 0 : args.name) &&
        this.options.set('webpack.optimization.runtimeChunk.name', args.name);
    return this;
};
exports.runtimeManifest = runtimeManifest;
//# sourceMappingURL=runtimeManifest.js.map