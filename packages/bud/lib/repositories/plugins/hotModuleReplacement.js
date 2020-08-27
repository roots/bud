"use strict";
exports.__esModule = true;
exports.hotModuleReplacement = void 0;
var webpack_1 = require("webpack");
var hotModuleReplacement = function (bud) { return ({
    bud: bud,
    name: 'hot-module-replacement-plugin',
    make: function () {
        return new webpack_1.HotModuleReplacementPlugin();
    },
    when: function () {
        return this.bud.features.enabled('hot');
    }
}); };
exports.hotModuleReplacement = hotModuleReplacement;
//# sourceMappingURL=hotModuleReplacement.js.map