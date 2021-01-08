"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.options = exports.when = exports.make = void 0;
const clean_webpack_plugin_1 = require("clean-webpack-plugin");
const make = options => new clean_webpack_plugin_1.CleanWebpackPlugin(options.all());
exports.make = make;
const when = bud => bud.store.enabled('features.clean');
exports.when = when;
const options = () => ({
    cleanOnceBeforeBuildPatterns: ['**/*', '!dll/*'],
});
exports.options = options;
//# sourceMappingURL=cleanWebpack.js.map