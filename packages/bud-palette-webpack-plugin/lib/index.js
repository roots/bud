"use strict";
exports.__esModule = true;
exports.paletteWebpackPlugin = void 0;
var adapter_1 = require("./adapter");
var api_1 = require("./api");
/**
 * ## bud.paletteWebpackPlugin
 */
var paletteWebpackPlugin = function (bud) { return ({
    bud: bud,
    name: 'palette-webpack-plugin',
    make: function () {
        this.bud.apply('setPaletteBlacklist', api_1.api);
        this.bud.plugins.add(adapter_1.adapter);
    }
}); };
exports.paletteWebpackPlugin = paletteWebpackPlugin;
//# sourceMappingURL=index.js.map