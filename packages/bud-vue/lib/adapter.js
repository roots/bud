"use strict";
exports.__esModule = true;
var vue_loader_1 = require("vue-loader");
var adapter = function (bud) { return ({
    bud: bud,
    name: 'vue',
    make: function () {
        return new vue_loader_1.VueLoaderPlugin();
    }
}); };
exports["default"] = adapter;
//# sourceMappingURL=adapter.js.map