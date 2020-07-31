"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.manifest = void 0;
var webpack_manifest_plugin_1 = __importDefault(require("webpack-manifest-plugin"));
var manifest = function () { return ({
    setOptions: function () {
        var _a;
        return {
            publicPath: (_a = this.bud.paths.public) !== null && _a !== void 0 ? _a : '/',
            filename: 'manifest.json',
            writeToFileEmit: true
        };
    },
    make: function () {
        return new webpack_manifest_plugin_1["default"](this.options);
    },
    when: function () {
        return this.bud.features.enabled('manifest');
    }
}); };
exports.manifest = manifest;
//# sourceMappingURL=manifest.js.map