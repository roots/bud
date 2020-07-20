"use strict";
exports.__esModule = true;
exports.hotModuleReplacement = void 0;
var webpack_1 = require("webpack");
var hotModuleReplacement = function () { return ({
    setOptions: function () {
        return this.bud.options.hotModuleReplacement;
    },
    make: function () {
        return new webpack_1.HotModuleReplacementPlugin();
    },
    when: function () {
        return this.bud.features.hot;
    }
}); };
exports.hotModuleReplacement = hotModuleReplacement;
