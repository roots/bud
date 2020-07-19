"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.manifest = void 0;
var webpack_manifest_plugin_1 = __importDefault(require("webpack-manifest-plugin"));
var manifest = function (bud) { return ({
    options: {
        publicPath: "" + bud.paths.public,
        filename: 'manifest.json',
        writeToFileEmit: true
    },
    make: function () {
        return new webpack_manifest_plugin_1["default"](this.options);
    }
}); };
exports.manifest = manifest;
