"use strict";
exports.__esModule = true;
exports.config = void 0;
var config = function () {
    return this.hooks.filter('bud.compiler.filter', this.compiler.buildConfig().config);
};
exports.config = config;
//# sourceMappingURL=config.js.map