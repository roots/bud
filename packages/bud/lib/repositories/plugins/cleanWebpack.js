"use strict";
exports.__esModule = true;
exports.cleanWebpack = void 0;
var clean_webpack_plugin_1 = require("clean-webpack-plugin");
var cleanWebpack = function (bud) { return ({
    bud: bud,
    name: 'clean-webpack-plugin',
    options: bud.options.get('webpack.plugins.clean'),
    make: function () {
        return new clean_webpack_plugin_1.CleanWebpackPlugin(this.options);
    },
    when: function () {
        return this.bud.features.enabled('clean');
    }
}); };
exports.cleanWebpack = cleanWebpack;
//# sourceMappingURL=cleanWebpack.js.map