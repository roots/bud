"use strict";
exports.__esModule = true;
exports.cleanWebpack = void 0;
var clean_webpack_plugin_1 = require("clean-webpack-plugin");
var cleanWebpack = function () { return ({
    make: function () {
        return new clean_webpack_plugin_1.CleanWebpackPlugin(this.options);
    },
    when: function () {
        this.bud.featureEnabled('clean');
    }
}); };
exports.cleanWebpack = cleanWebpack;
//# sourceMappingURL=cleanWebpack.js.map