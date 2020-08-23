"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.manifest = void 0;
var webpack_manifest_plugin_1 = __importDefault(require("webpack-manifest-plugin"));
var manifest = function (bud) {
    var _a, _b, _c, _d;
    return ({
        bud: bud,
        name: 'webpack-manifest-plugin',
        options: {
            publicPath: (_b = (_a = bud.options.get('manifest.publicPath')) !== null && _a !== void 0 ? _a : bud.paths.get('public')) !== null && _b !== void 0 ? _b : '/',
            filename: (_c = bud.options.get('manifest.name')) !== null && _c !== void 0 ? _c : 'manifest.json',
            writeToFileEmit: (_d = bud.options.get('manifest.writeToFileEmit')) !== null && _d !== void 0 ? _d : true
        },
        make: function () {
            return new webpack_manifest_plugin_1["default"](this.options);
        },
        when: function () {
            return this.bud.features.enabled('manifest');
        }
    });
};
exports.manifest = manifest;
//# sourceMappingURL=manifest.js.map