"use strict";
exports.__esModule = true;
exports.palette = void 0;
var adapter_1 = require("./adapter");
var api_1 = require("./api");
var palette = function (bud) { return ({
    bud: bud,
    name: 'palette-webpack-plugin',
    make: function () {
        this.bud.apply('setPaletteBlacklist', api_1.api);
        this.bud.plugins.push(adapter_1.plugin);
    }
}); };
exports.palette = palette;
//# sourceMappingURL=index.js.map