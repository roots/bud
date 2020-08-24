"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.adapter = void 0;
var palette_webpack_plugin_1 = __importDefault(require("palette-webpack-plugin"));
var adapter = function (bud) { return ({
    bud: bud,
    name: 'palette-webpack-plugin',
    make: function () {
        return new palette_webpack_plugin_1["default"]({
            blacklist: this.bud.options.get('palette-blacklist')
        });
    }
}); };
exports.adapter = adapter;
//# sourceMappingURL=adapter.js.map