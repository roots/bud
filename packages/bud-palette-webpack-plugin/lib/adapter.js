"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.plugin = void 0;
var palette_webpack_plugin_1 = __importDefault(require("palette-webpack-plugin"));
var plugin = function (bud) { return ({
    bud: bud,
    name: 'palette-webpack-plugin',
    make: function () {
        return new palette_webpack_plugin_1["default"](this.bud.options.get('webpack.plugins.palettePlugin'));
    }
}); };
exports.plugin = plugin;
//# sourceMappingURL=adapter.js.map