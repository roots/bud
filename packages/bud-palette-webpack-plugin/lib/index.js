"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.palette = void 0;
var palette_webpack_plugin_1 = __importDefault(require("palette-webpack-plugin"));
var palette = function () { return ({
    make: function () {
        this.bud.apply('setPaletteBlacklist', function (blacklist) {
            this.options.set('webpack.plugins.palettePlugin.blacklist', blacklist);
            return this;
        });
        this.bud.plugins.set('palette-webpack-plugin', function () { return ({
            make: function () {
                return new palette_webpack_plugin_1["default"](this.bud.options.get('webpack.plugins.palettePlugin'));
            }
        }); });
    }
}); };
exports.palette = palette;
//# sourceMappingURL=index.js.map