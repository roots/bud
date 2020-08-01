"use strict";
exports.__esModule = true;
exports.hotModuleReplacement = void 0;
var webpack_1 = require("webpack");
var hotModuleReplacement = {
    setOptions: function () {
        return this.bud.options.get('hotModuleReplacement');
    },
    make: function () {
        return new webpack_1.HotModuleReplacementPlugin();
    },
    when: function () {
        return this.bud.features.enabled('hot');
    }
};
exports.hotModuleReplacement = hotModuleReplacement;
//# sourceMappingURL=hotModuleReplacement.js.map