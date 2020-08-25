"use strict";
exports.__esModule = true;
var vue_loader_1 = require("vue-loader");
var vuePlugin = function (bud) { return ({
    bud: bud,
    name: 'vue',
    make: function () {
        return new vue_loader_1.VueLoaderPlugin();
    }
}); };
exports["default"] = vuePlugin;
//# sourceMappingURL=adapter.js.map