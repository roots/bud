"use strict";
exports.__esModule = true;
exports.runtimeManifest = void 0;
var runtimeManifest = function (args) {
    var _a, _b;
    this.features.set('runtimeChunk', (_a = args === null || args === void 0 ? void 0 : args.enabled) !== null && _a !== void 0 ? _a : true);
    this.options.set('webpack.optimization.runtimeChunk.name', (_b = args === null || args === void 0 ? void 0 : args.name) !== null && _b !== void 0 ? _b : this.options.get('webpack.optimization.runtimeChunk.name'));
    return this;
};
exports.runtimeManifest = runtimeManifest;
//# sourceMappingURL=runtimeManifest.js.map