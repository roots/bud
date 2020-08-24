"use strict";
exports.__esModule = true;
exports.api = void 0;
var api = function (blacklist) {
    this.options.set('webpack.plugins.palettePlugin.blacklist', blacklist);
    return this;
};
exports.api = api;
//# sourceMappingURL=api.js.map