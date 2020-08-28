"use strict";
exports.__esModule = true;
exports.provide = void 0;
var webpack_1 = require("webpack");
var provide = function (bud) { return ({
    bud: bud,
    make: function () {
        return new webpack_1.ProvidePlugin(bud.options.get('webpack.plugins.provide') || {});
    }
}); };
exports.provide = provide;
//# sourceMappingURL=provide.js.map