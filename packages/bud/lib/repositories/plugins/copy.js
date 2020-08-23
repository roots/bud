"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
exports.copy = void 0;
var copy_webpack_plugin_1 = __importDefault(require("copy-webpack-plugin"));
var copy = function (bud) { return ({
    bud: bud,
    name: 'copy-webpack-plugin',
    options: bud.options.get('webpack.plugins.copy'),
    make: function () {
        return new copy_webpack_plugin_1["default"](this.options);
    },
    when: function () {
        return this.options.patterns.length > 0;
    }
}); };
exports.copy = copy;
//# sourceMappingURL=copy.js.map