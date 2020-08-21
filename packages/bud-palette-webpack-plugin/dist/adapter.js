"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const palette_webpack_plugin_1 = __importDefault(require("palette-webpack-plugin"));
const adapter = () => ({
    make: function () {
        return new palette_webpack_plugin_1.default({
            blacklist: this.bud.options.get('palette-blacklist'),
        });
    },
});
module.exports = adapter;
//# sourceMappingURL=adapter.js.map